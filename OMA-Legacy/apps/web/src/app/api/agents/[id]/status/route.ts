import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, agents, agentTasks } from '@/lib/db';
import { eq, sql, desc, and } from 'drizzle-orm';
import { agentStatusSchema } from '@/lib/validators';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 60 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const agentId = parseInt((await params).id);

    if (isNaN(agentId)) {
      return validationErrorResponse('Invalid agent ID', undefined, requestId);
    }

    // Fetch agent details
    const [agent] = await db
      .select({
        id: agents.id,
        name: agents.name,
        slug: agents.slug,
        description: agents.description,
        status: agents.status,
        category: agents.category,
        pricingType: agents.pricingType,
        baseCostUsd: agents.baseCostUsd,
        maxCostUsd: agents.maxCostUsd,
        reputationWeight: agents.reputationWeight,
        capabilities: agents.capabilities,
        models: agents.models,
        historicalPerformance: agents.historicalPerformance,
        ownerId: agents.ownerId,
        ownerName: users.name,
        createdAt: agents.createdAt,
        updatedAt: agents.updatedAt,
      })
      .from(agents)
      .leftJoin(users, eq(agents.ownerId, users.id))
      .where(eq(agents.id, agentId))
      .limit(1);

    if (!agent) {
      return notFoundErrorResponse('Agent', requestId);
    }

    // Calculate real-time status based on active tasks
    const activeTasks = await db
      .select({ count: sql<number>`count(*)` })
      .from(agentTasks)
      .where(and(eq(agentTasks.status, 'in_progress')));

    const totalTasks = await db
      .select({ count: sql<number>`count(*)` })
      .from(agentTasks)
      .where(eq(agentTasks.hireId, agentId));

    const recentTasks = await db
      .select({
        id: agentTasks.id,
        goal: agentTasks.goal,
        status: agentTasks.status,
        budget: agentTasks.budget,
        actualCost: agentTasks.actualCost,
        deadlineMinutes: agentTasks.deadlineMinutes,
        qualityBias: agentTasks.qualityBias,
        allowedAgents: agentTasks.allowedAgents,
        createdAt: agentTasks.createdAt,
        updatedAt: agentTasks.updatedAt,
      })
      .from(agentTasks)
      .where(eq(agentTasks.hireId, agentId))
      .orderBy(desc(agentTasks.createdAt))
      .limit(10);

    // Calculate uptime (time since creation)
    const now = new Date();
    const createdAt = new Date(agent.createdAt);
    const uptime = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // in seconds

    // Calculate performance metrics from historical data
    const completedTasks = await db
      .select({ count: sql<number>`count(*)`, avgCost: sql<number>`COALESCE(AVG(actual_cost), 0)` })
      .from(agentTasks)
      .where(and(eq(agentTasks.hireId, agentId), eq(agentTasks.status, 'completed')));

    // Determine current status
    let currentStatus: 'online' | 'offline' | 'busy' | 'error';
    if (agent.status === 'inactive' || agent.status === 'suspended') {
      currentStatus = 'offline';
    } else if (Number(activeTasks[0]?.count || 0) > 0) {
      currentStatus = 'busy';
    } else {
      currentStatus = 'online';
    }

    // Performance metrics
    const performanceMetrics = {
      totalTasks: Number(totalTasks[0]?.count || 0),
      completedTasks: Number(completedTasks[0]?.count || 0),
      successRate:
        Number(totalTasks[0]?.count || 0) > 0
          ? (Number(completedTasks[0]?.count || 0) / Number(totalTasks[0]?.count || 0)) * 100
          : 0,
      avgCostPerTask: Number(completedTasks[0]?.avgCost || 0),
      reputationWeight: Number(agent.reputationWeight),
      activeTasks: Number(activeTasks[0]?.count || 0),
    };

    // Build response
    const agentStatus = {
      agentId: agent.id,
      agentName: agent.name,
      status: currentStatus,
      uptime,
      lastActivity: agent.updatedAt,
      activeTasks: Number(activeTasks[0]?.count || 0),
      totalTasks: Number(totalTasks[0]?.count || 0),
      performanceMetrics,
      capabilities: agent.capabilities as string[],
      models: agent.models as string[],
      pricing: {
        type: agent.pricingType,
        baseCost: Number(agent.baseCostUsd || 0),
        maxCost: Number(agent.maxCostUsd || 0),
      },
      recentTasks,
      owner: {
        id: agent.ownerId,
        name: agent.ownerName,
      },
      timestamp: now.toISOString(),
    };

    return successResponse(agentStatus);
  } catch (error) {
    logger.error('Error fetching agent status', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 20 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      return errorResponse('Authentication required', 401, 'UNAUTHORIZED', undefined, requestId);
    }

    // Get internal user ID
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);
    if (!user) {
      return errorResponse('User profile not found', 404, 'NOT_FOUND', undefined, requestId);
    }

    const agentId = parseInt((await params).id);

    if (isNaN(agentId)) {
      return validationErrorResponse('Invalid agent ID', undefined, requestId);
    }

    // Validate request body
    const body = await request.json();
    const validatedBody = agentStatusSchema.safeParse(body);

    if (!validatedBody.success) {
      return validationErrorResponse(
        'Invalid request body',
        { errors: validatedBody.error.errors },
        requestId
      );
    }

    // Check if user owns the agent or is admin
    const [agent] = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);

    if (!agent) {
      return notFoundErrorResponse('Agent', requestId);
    }

    if (agent.ownerId !== user.id && user.role !== 'admin') {
      return errorResponse(
        'Unauthorized to update this agent',
        403,
        'FORBIDDEN',
        undefined,
        requestId
      );
    }

    // Update agent status (only status field is allowed for external updates)
    if (validatedBody.data.status) {
      await db
        .update(agents)
        .set({
          status: validatedBody.data.status,
          updatedAt: new Date(),
        })
        .where(eq(agents.id, agentId));
    }

    // Update historical performance if provided
    if (validatedBody.data.performanceMetrics) {
      await db
        .update(agents)
        .set({
          historicalPerformance: validatedBody.data.performanceMetrics,
          updatedAt: new Date(),
        })
        .where(eq(agents.id, agentId));
    }

    logger.info('Agent status updated', { agentId, userId: user.id, requestId });
    return successResponse({ success: true, message: 'Agent status updated successfully' });
  } catch (error) {
    logger.error('Error updating agent status', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
