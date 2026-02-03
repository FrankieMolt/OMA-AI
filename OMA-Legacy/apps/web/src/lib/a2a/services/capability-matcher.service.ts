import { db, agents, usageRecords } from '@/lib/db';
import { eq, and, sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import type { A2ACapabilityMatch, A2ACapabilityMatchRequest, A2AAgentCard } from '../types';

interface CapabilityScore {
  agentId: string;
  score: number;
  confidence: number;
  matchedCapabilities: string[];
  missingCapabilities: string[];
  estimatedCost: number;
  estimatedDuration: number;
}

export class A2ACapabilityMatcher {
  /**
   * Match agents to task requirements
   */
  async matchCapabilities(request: A2ACapabilityMatchRequest): Promise<A2ACapabilityMatch[]> {
    const { taskRequirements, constraints, filters } = request;

    try {
      // Build query for available agents
      const baseQuery = db
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
          status: agents.status,
          reputationWeight: agents.reputationWeight,
          historicalPerformance: agents.historicalPerformance,
          mcpStack: agents.mcpStack,
        })
        .from(agents)
        .where(eq(agents.status, 'active'))
        .$dynamic();

      // Apply filters
      let query = baseQuery;
      if (filters?.category) {
        query = query.where(
          and(eq(agents.status, 'active'), eq(agents.category, filters.category))
        );
      }
      if (filters?.pricingType && filters.pricingType.length > 0) {
        query = query.where(
          and(eq(agents.status, 'active'), sql`${agents.pricingType} = ANY(${filters.pricingType})`)
        );
      }

      const availableAgents = (await query.limit(50)) as Partial<typeof agents.$inferSelect>[];

      // Score each agent
      const scores: CapabilityScore[] = [];

      for (const agent of availableAgents) {
        const score = await this.calculateCapabilityScore(agent, taskRequirements, constraints);

        // Apply cost constraint
        if (constraints?.maxCost && score.estimatedCost > constraints.maxCost) {
          continue;
        }

        // Apply duration constraint
        if (constraints?.maxDuration && score.estimatedDuration > constraints.maxDuration) {
          continue;
        }

        scores.push(score);
      }

      // Sort by score and confidence
      scores.sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (scoreDiff !== 0) return scoreDiff;
        return b.confidence - a.confidence;
      });

      // Return top matches
      return scores.map(this.toCapabilityMatch);
    } catch (error) {
      logger.error('Failed to match capabilities', { error, request });
      return [];
    }
  }

  /**
   * Calculate capability score for an agent
   */
  private async calculateCapabilityScore(
    agent: Partial<typeof agents.$inferSelect>,
    taskRequirements: string[],
    constraints?: A2ACapabilityMatchRequest['constraints']
  ): Promise<CapabilityScore> {
    const agentCapabilities = this.extractAgentCapabilities(agent);

    // Calculate match score
    const { matchedCapabilities, missingCapabilities } = this.analyzeCapabilityMatch(
      agentCapabilities,
      taskRequirements
    );

    const matchScore = this.calculateMatchScore(matchedCapabilities, missingCapabilities);
    const confidence = this.calculateConfidence(agent, matchScore);

    // Estimate cost and duration
    const estimatedCost = this.estimateCost(agent, matchScore, constraints);
    const estimatedDuration = this.estimateDuration(agent, matchScore);

    return {
      agentId: agent.id?.toString() || 'unknown',
      score: matchScore,
      confidence,
      matchedCapabilities,
      missingCapabilities,
      estimatedCost,
      estimatedDuration,
    };
  }

  /**
   * Extract capabilities from agent
   */
  private extractAgentCapabilities(agent: Partial<typeof agents.$inferSelect>): string[] {
    const capabilities: string[] = [];

    // From capabilities field
    if (agent.capabilities && Array.isArray(agent.capabilities)) {
      capabilities.push(...agent.capabilities);
    }

    // From MCP stack
    if (agent.mcpStack && typeof agent.mcpStack === 'object') {
      const mcpStack = agent.mcpStack as Record<string, unknown>;
      if (Array.isArray(mcpStack.tools)) {
        capabilities.push(...mcpStack.tools.map((t: unknown) => String(t)));
      }
    }

    // From category
    if (agent.category) {
      capabilities.push(agent.category);
    }

    return [...new Set(capabilities)];
  }

  /**
   * Analyze capability match between agent and task requirements
   */
  private analyzeCapabilityMatch(
    agentCapabilities: string[],
    taskRequirements: string[]
  ): {
    matchedCapabilities: string[];
    missingCapabilities: string[];
  } {
    const matchedCapabilities: string[] = [];
    const missingCapabilities: string[] = [];

    for (const requirement of taskRequirements) {
      const isMatched = agentCapabilities.some((cap) => this.capabilityMatches(cap, requirement));

      if (isMatched) {
        matchedCapabilities.push(requirement);
      } else {
        missingCapabilities.push(requirement);
      }
    }

    return { matchedCapabilities, missingCapabilities };
  }

  /**
   * Check if a capability matches a requirement
   */
  private capabilityMatches(capability: string, requirement: string): boolean {
    const capLower = capability.toLowerCase();
    const reqLower = requirement.toLowerCase();

    // Exact match
    if (capLower === reqLower) {
      return true;
    }

    // Substring match
    if (capLower.includes(reqLower) || reqLower.includes(capLower)) {
      return true;
    }

    // Semantic matching (basic keyword matching)
    const capabilityKeywords = this.extractKeywords(capability);
    const requirementKeywords = this.extractKeywords(requirement);

    return requirementKeywords.some((kw) => capabilityKeywords.includes(kw));
  }

  /**
   * Extract keywords from a string
   */
  private extractKeywords(text: string): string[] {
    return text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2);
  }

  /**
   * Calculate match score based on matched and missing capabilities
   */
  private calculateMatchScore(
    matchedCapabilities: string[],
    missingCapabilities: string[]
  ): number {
    const total = matchedCapabilities.length + missingCapabilities.length;

    if (total === 0) {
      return 0;
    }

    const baseScore = (matchedCapabilities.length / total) * 100;

    // Penalty for missing capabilities
    const missingPenalty = missingCapabilities.length * 10;

    return Math.max(0, baseScore - missingPenalty);
  }

  /**
   * Calculate confidence score
   */
  private calculateConfidence(
    agent: Partial<typeof agents.$inferSelect>,
    matchScore: number
  ): number {
    let confidence = 0.5; // Base confidence

    // Reputation weight
    const reputationWeight = Number(agent.reputationWeight || 1.0);
    confidence *= reputationWeight;

    // Historical performance
    if (agent.historicalPerformance && typeof agent.historicalPerformance === 'object') {
      const perf = agent.historicalPerformance as Record<string, unknown>;
      const successRate = Number(perf.successRate || 0.9);
      confidence *= successRate;
    }

    // Match score influence
    confidence *= matchScore / 100;

    // Ensure confidence is within bounds
    return Math.min(Math.max(confidence, 0), 1);
  }

  /**
   * Estimate cost for task execution
   */
  private estimateCost(
    agent: Partial<typeof agents.$inferSelect>,
    matchScore: number,
    constraints?: A2ACapabilityMatchRequest['constraints']
  ): number {
    const baseCost = Number(agent.baseCostUsd || 0);
    const maxCost = Number(agent.maxCostUsd || baseCost * 2);

    // Adjust cost based on match score (lower score = higher cost due to inefficiency)
    const matchScoreMultiplier = 1 + (100 - matchScore) / 200;

    let estimatedCost = baseCost * matchScoreMultiplier;

    // Apply min rating constraint (higher rating = higher cost)
    if (constraints?.minRating) {
      const ratingMultiplier = constraints.minRating / 5;
      estimatedCost *= ratingMultiplier;
    }

    return Math.min(estimatedCost, maxCost);
  }

  /**
   * Estimate duration for task execution
   */
  private estimateDuration(_agent: Partial<typeof agents.$inferSelect>, matchScore: number): number {
    const baseDuration = 5 * 60 * 1000; // 5 minutes base

    // Adjust duration based on match score (lower score = longer duration)
    const matchScoreMultiplier = 1 + (100 - matchScore) / 100;

    return baseDuration * matchScoreMultiplier;
  }

  /**
   * Convert capability score to A2ACapabilityMatch
   */
  private toCapabilityMatch(score: CapabilityScore): A2ACapabilityMatch {
    return {
      agentId: score.agentId,
      matchScore: score.score,
      matchedCapabilities: score.matchedCapabilities,
      missingCapabilities: score.missingCapabilities,
      confidence: score.confidence,
      estimatedCost: score.estimatedCost,
      estimatedDuration: score.estimatedDuration,
    };
  }

  /**
   * Find best matching agent for task
   */
  async findBestMatch(request: A2ACapabilityMatchRequest): Promise<A2ACapabilityMatch | null> {
    const matches = await this.matchCapabilities(request);

    if (matches.length === 0) {
      return null;
    }

    // Return top match
    return matches[0];
  }

  /**
   * Get agent capabilities as A2AAgentCard
   */
  async getAgentCapabilities(agentId: string): Promise<A2AAgentCard | null> {
    try {
      const [agent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, parseInt(agentId)))
        .limit(1);

      if (!agent) {
        return null;
      }

      // Get agent performance metrics
      const performance = await this.getAgentPerformance(agent.id);

      return {
        version: '1.0.0',
        metadata: {
          name: agent.name,
          description: agent.description,
          author: `Agent #${agent.id}`,
          license: 'MIT',
          version: agent.version,
          homepage: `https://oma.ai/agents/${agent.slug}`,
        },
        capabilities: {
          protocols: ['a2a', 'http'],
          models: Array.isArray(agent.models) ? agent.models : [],
          tools: this.extractAgentCapabilities(agent),
          languages: ['en'],
          specializations: [agent.category],
        },
        pricing: {
          type: this.mapPricingType(agent.pricingType),
          amount: agent.baseCostUsd?.toString() || '0',
          currency: 'USD',
        },
        endpoints: {
          message: `https://oma.ai/api/a2a/message`,
          status: `https://oma.ai/api/a2a/agents/${agent.id}/status`,
          negotiate: `https://oma.ai/api/a2a/negotiate`,
        },
        performance,
        constraints: {
          maxDuration: 60 * 60 * 1000, // 1 hour max
          maxConcurrentTasks: 10,
          supportedFormats: ['json', 'text'],
        },
      };
    } catch (error) {
      logger.error('Failed to get agent capabilities', { error, agentId });
      return null;
    }
  }

  private mapPricingType(
    pricingType: Partial<typeof agents.$inferSelect>['pricingType']
  ): A2AAgentCard['pricing']['type'] {
    switch (pricingType) {
      case 'subscription':
        return 'subscription';
      case 'per_request':
        return 'per_request';
      case 'per_token':
        return 'per_token';
      case 'usage':
      case 'one-time':
        return 'per_request';
      case 'free':
        return 'free';
      default:
        return 'free';
    }
  }

  /**
   * Get agent performance metrics
   */
  private async getAgentPerformance(agentId: number) {
    try {
      // Get usage records for this agent
      const [usageStats] = await db
        .select({
          totalTasks: sql<number>`count(*)`,
          avgResponseTime: sql<number>`COALESCE(AVG((metadata->>'responseTime')::numeric), 0)`,
        })
        .from(usageRecords)
        .where(eq(usageRecords.apiId, agentId));

      // Calculate success rate based on historical performance
      const agent = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);
      const historicalPerformance = agent[0]?.historicalPerformance as Record<
        string,
        unknown
      > | null;
      const successRate = Number(historicalPerformance?.successRate || 0.95);

      return {
        avgResponseTime: Number(usageStats?.avgResponseTime || 5000),
        successRate,
        uptime: 0.99, // Mock uptime
        totalTasks: Number(usageStats?.totalTasks || 0),
      };
    } catch (error) {
      logger.error('Failed to get agent performance', { error, agentId });
      return {
        avgResponseTime: 5000,
        successRate: 0.95,
        uptime: 0.99,
        totalTasks: 0,
      };
    }
  }

  /**
   * Validate agent has required capabilities
   */
  async validateAgentCapabilities(
    agentId: string,
    requiredCapabilities: string[]
  ): Promise<{ valid: boolean; matched: string[]; missing: string[] }> {
    const agentCard = await this.getAgentCapabilities(agentId);

    if (!agentCard) {
      return { valid: false, matched: [], missing: requiredCapabilities };
    }

    const agentCapabilities = [
      ...agentCard.capabilities.tools,
      ...agentCard.capabilities.models,
      ...agentCard.capabilities.protocols,
    ];

    const { matchedCapabilities, missingCapabilities } = this.analyzeCapabilityMatch(
      agentCapabilities,
      requiredCapabilities
    );

    return {
      valid: missingCapabilities.length === 0,
      matched: matchedCapabilities,
      missing: missingCapabilities,
    };
  }
}

// Export singleton instance
export const a2aCapabilityMatcher = new A2ACapabilityMatcher();
