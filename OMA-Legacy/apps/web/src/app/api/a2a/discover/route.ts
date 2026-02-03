import { NextRequest, NextResponse } from 'next/server';
import type { A2AAgentCard } from '@/lib/a2a/types';
import { A2AErrorCode } from '@/lib/a2a/types';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';
import { db, agents, users } from '@/lib/db';
import { sql, eq, and, or, ilike, lte, desc, asc, type SQL } from 'drizzle-orm';
import { type PgColumn } from 'drizzle-orm/pg-core';
import { a2aCapabilityMatcher } from '@/lib/a2a/services';

/**
 * A2A Agent Discovery Endpoint
 * Returns machine-readable agent cards for A2A protocol with advanced filtering
 */
export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 100 })(request);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const categoryParam = searchParams.get('category');
    const minRatingParam = searchParams.get('minRating');
    const maxCostParam = searchParams.get('maxCost');
    const searchParam = searchParams.get('search');

    const query: DiscoveryQuery = {
      category: categoryParam && categoryParam.length > 0 ? categoryParam : undefined,
      capability: searchParams.getAll('capability'),
      model: searchParams.getAll('model'),
      pricingType: searchParams.getAll('pricingType'),
      minRating: minRatingParam ? parseFloat(minRatingParam) : undefined,
      maxCost: maxCostParam ? parseFloat(maxCostParam) : undefined,
      onlineOnly: searchParams.get('onlineOnly') === 'true',
      limit: Math.min(parseInt(searchParams.get('limit') || '50'), 100),
      offset: parseInt(searchParams.get('offset') || '0'),
      search: searchParam && searchParam.length > 0 ? searchParam : undefined,
      sortBy: (searchParams.get('sortBy') as DiscoveryQuery['sortBy'] | undefined) || 'relevance',
    };

    // Validate parameters
    if (query.limit < 1 || query.limit > 100) {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: {
            code: A2AErrorCode.InvalidParams,
            message: 'Invalid limit: Must be between 1 and 100',
          },
          id: null,
        },
        { status: 400 }
      );
    }

    if (query.offset < 0) {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: {
            code: A2AErrorCode.InvalidParams,
            message: 'Invalid offset: Must be non-negative',
          },
          id: null,
        },
        { status: 400 }
      );
    }

    // Build query conditions
    const conditions = [];

    // Status filter (only active agents)
    conditions.push(eq(agents.status, 'active'));

    // Category filter
    if (query.category) {
      conditions.push(eq(agents.category, query.category));
    }

    // Apply max cost filter
    if (query.maxCost !== undefined) {
      conditions.push(lte(agents.baseCostUsd, query.maxCost));
    }

    // Search filter
    if (query.search) {
      const searchTerm = `%${query.search}%`;
      conditions.push(or(ilike(agents.name, searchTerm), ilike(agents.description, searchTerm)));
    }

    // Build sorting expression
    let orderBy: SQL | PgColumn | undefined = desc(agents.reputationWeight);
    switch (query.sortBy) {
      case 'rating':
        orderBy = desc(sql`avgRating`);
        break;
      case 'cost_low':
        orderBy = asc(agents.baseCostUsd);
        break;
      case 'cost_high':
        orderBy = desc(agents.baseCostUsd);
        break;
      case 'newest':
        orderBy = desc(agents.createdAt);
        break;
    }

    // Execute query with pagination
    const agentsData = await db
      .select({
        id: agents.id,
        name: agents.name,
        slug: agents.slug,
        description: agents.description,
        category: agents.category,
        capabilities: agents.capabilities,
        pricingType: agents.pricingType,
        baseCostUsd: agents.baseCostUsd,
        maxCostUsd: agents.maxCostUsd,
        reputationWeight: agents.reputationWeight,
        historicalPerformance: agents.historicalPerformance,
        mcpStack: agents.mcpStack,
        models: agents.models,
        ownerId: agents.ownerId,
        ownerName: users.name,
        ownerAvatar: users.profile,
        avgRating: sql<number>`(SELECT COALESCE(AVG(rating), 0) FROM agent_reviews WHERE agent_id = ${agents.id})`,
        reviewCount: sql<number>`(SELECT COUNT(id) FROM agent_reviews WHERE agent_id = ${agents.id})`,
        createdAt: agents.createdAt,
        updatedAt: agents.updatedAt,
      })
      .from(agents)
      .leftJoin(users, eq(agents.ownerId, users.id))
      .where(and(...conditions))
      .orderBy(orderBy)
      .limit(query.limit)
      .offset(query.offset);

    // Get total count for pagination
    const totalCountQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(agents)
      .where(and(...conditions));

    const [totalResult] = await totalCountQuery;
    const total = Number(totalResult?.count || 0);

    // Apply additional client-side filters (capabilities, models, pricing types, rating)
    let filteredAgents = agentsData;

    if (query.capability.length > 0) {
      filteredAgents = filteredAgents.filter((agent) =>
        hasCapabilities(
          { ...agent, capabilities: agent.capabilities as string[] | null },
          query.capability
        )
      );
    }

    if (query.model.length > 0) {
      filteredAgents = filteredAgents.filter((agent) =>
        hasModels({ ...agent, models: agent.models as string[] | null }, query.model)
      );
    }

    if (query.pricingType.length > 0) {
      filteredAgents = filteredAgents.filter((agent) =>
        query.pricingType.includes(agent.pricingType as string)
      );
    }

    if (query.minRating !== undefined) {
      const minRating = query.minRating;
      filteredAgents = filteredAgents.filter((agent) => (agent.avgRating as number) >= minRating);
    }

    // Transform to A2A format
    const a2aCards: (A2AAgentCard | null)[] = await Promise.all(
      filteredAgents.map(async (agent) => {
        return await a2aCapabilityMatcher.getAgentCapabilities(agent.id.toString());
      })
    );

    // Filter out null results
    const validCards = a2aCards.filter((card): card is A2AAgentCard => card !== null);

    return NextResponse.json({
      jsonrpc: '2.0',
      result: {
        agents: validCards,
        total: validCards.length,
        filtered: validCards.length,
        limit: query.limit,
        offset: query.offset,
        hasMore: query.offset + query.limit < total,
      },
      id: null,
    });
  } catch (error) {
    logger.error('A2A Discovery Error', { error });

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: A2AErrorCode.InternalError,
          message: 'Failed to discover agents',
          data: error instanceof Error ? error.message : String(error),
        },
        id: null,
      },
      { status: 500 }
    );
  }
}

interface DiscoveryQuery {
  category?: string;
  capability: string[];
  model: string[];
  pricingType: string[];
  minRating?: number;
  maxCost?: number;
  onlineOnly: boolean;
  limit: number;
  offset: number;
  search?: string;
  sortBy: 'relevance' | 'rating' | 'cost_low' | 'cost_high' | 'newest';
}

/**
 * Check if agent has required capabilities
 */
function hasCapabilities(
  agent: {
    capabilities: string[] | null;
    mcpStack: { tools: string[] } | null | unknown;
    category: string;
  },
  requiredCapabilities: string[]
): boolean {
  if (!agent.capabilities || !Array.isArray(agent.capabilities)) {
    return false;
  }

  const mcpTools =
    agent.mcpStack &&
    typeof agent.mcpStack === 'object' &&
    'tools' in agent.mcpStack &&
    Array.isArray((agent.mcpStack as { tools: unknown[] }).tools)
      ? (agent.mcpStack as { tools: string[] }).tools
      : [];

  const agentCapabilities = [...(agent.capabilities || []), ...mcpTools, agent.category];

  return requiredCapabilities.every((required) =>
    agentCapabilities.some(
      (cap: string) =>
        cap.toLowerCase().includes(required.toLowerCase()) ||
        required.toLowerCase().includes(cap.toLowerCase())
    )
  );
}

/**
 * Check if agent supports required models
 */
function hasModels(agent: { models: string[] | null }, requiredModels: string[]): boolean {
  if (!agent.models || !Array.isArray(agent.models)) {
    return requiredModels.length === 0;
  }

  const models = agent.models;
  return requiredModels.every((required) =>
    models.some((model: string) => model.toLowerCase().includes(required.toLowerCase()))
  );
}
