import { db, agents, agentTasks, x402Escrows } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import {
  A2ANegotiationRequest,
  A2ANegotiationResponse,
  A2ANegotiationTerms,
  A2ANegotiationConstraints,
  A2ATask,
  A2ATaskSpec,
  A2AErrorCode,
} from '../types';

export interface NegotiationState {
  id: string;
  taskId: string;
  requesterAgentId: string;
  targetAgentId: string;
  taskSpec: A2ATaskSpec;
  status: 'pending' | 'accepted' | 'rejected' | 'counter_offered' | 'expired';
  terms?: A2ANegotiationTerms;
  counterOffer?: A2ATaskSpec;
  createdAt: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
}

export class A2ANegotiationService {
  private negotiations = new Map<string, NegotiationState>();
  private readonly DEFAULT_NEGOTIATION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

  /**
   * Initiate a negotiation between agents
   */
  async initiateNegotiation(request: A2ANegotiationRequest): Promise<A2ANegotiationResponse> {
    const { taskId, requesterAgentId, targetAgentId, task, constraints, timeoutMs } =
      request.params;

    try {
      // Validate agents exist
      const [requester, target] = await Promise.all([
        db
          .select()
          .from(agents)
          .where(eq(agents.id, parseInt(requesterAgentId)))
          .limit(1),
        db
          .select()
          .from(agents)
          .where(eq(agents.id, parseInt(targetAgentId)))
          .limit(1),
      ]);

      if (!requester.length || !target.length) {
        return this.createErrorResponse(
          A2AErrorCode.AgentNotFound,
          'One or both agents not found',
          request.id
        );
      }

      // Validate agent status
      if (target[0].status !== 'active') {
        return this.createErrorResponse(
          A2AErrorCode.AgentOffline,
          'Target agent is not available',
          request.id
        );
      }

      // Create negotiation ID
      const negotiationId = this.generateId('neg');

      // Calculate initial terms
      const terms = await this.calculateTerms(task, target[0], constraints);

      // Create negotiation state
      const negotiationState: NegotiationState = {
        id: negotiationId,
        taskId,
        requesterAgentId,
        targetAgentId,
        taskSpec: task,
        status: 'pending',
        terms,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(
          Date.now() + (timeoutMs || this.DEFAULT_NEGOTIATION_TIMEOUT)
        ).toISOString(),
        metadata: {
          constraints,
        },
      };

      this.negotiations.set(negotiationId, negotiationState);

      logger.info('Negotiation initiated', {
        negotiationId,
        taskId,
        requesterAgentId,
        targetAgentId,
      });

      return {
        jsonrpc: '2.0',
        result: {
          negotiationId,
          status: 'pending',
          terms,
          expiresAt: negotiationState.expiresAt,
        },
        id: request.id,
      };
    } catch (error) {
      logger.error('Failed to initiate negotiation', { error, request });
      return this.createErrorResponse(
        A2AErrorCode.InternalError,
        'Failed to initiate negotiation',
        request.id,
        error
      );
    }
  }

  /**
   * Accept a negotiation
   */
  async acceptNegotiation(
    negotiationId: string,
    acceptingAgentId: string
  ): Promise<A2ANegotiationResponse> {
    try {
      const negotiation = this.negotiations.get(negotiationId);

      if (!negotiation) {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          'Negotiation not found',
          negotiationId
        );
      }

      if (negotiation.expiresAt && new Date(negotiation.expiresAt) < new Date()) {
        negotiation.status = 'expired';
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          'Negotiation has expired',
          negotiationId
        );
      }

      if (negotiation.targetAgentId !== acceptingAgentId) {
        return this.createErrorResponse(
          A2AErrorCode.AuthenticationFailed,
          'Unauthorized: Only target agent can accept',
          negotiationId
        );
      }

      if (negotiation.status !== 'pending') {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          `Cannot accept negotiation in ${negotiation.status} state`,
          negotiationId
        );
      }

      // Update negotiation status
      negotiation.status = 'accepted';

      // Create task record
      const taskRecord = await this.createTaskFromNegotiation(negotiation);

      logger.info('Negotiation accepted', {
        negotiationId,
        taskId: taskRecord.id,
        acceptingAgentId,
      });

      return {
        jsonrpc: '2.0',
        result: {
          negotiationId,
          status: 'accepted',
          terms: negotiation.terms,
          taskId: taskRecord.id,
          expiresAt: negotiation.expiresAt,
        },
        id: negotiationId,
      };
    } catch (error) {
      logger.error('Failed to accept negotiation', { error, negotiationId });
      return this.createErrorResponse(
        A2AErrorCode.InternalError,
        'Failed to accept negotiation',
        negotiationId,
        error
      );
    }
  }

  /**
   * Reject a negotiation
   */
  async rejectNegotiation(
    negotiationId: string,
    rejectingAgentId: string,
    reason?: string
  ): Promise<A2ANegotiationResponse> {
    try {
      const negotiation = this.negotiations.get(negotiationId);

      if (!negotiation) {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          'Negotiation not found',
          negotiationId
        );
      }

      if (negotiation.targetAgentId !== rejectingAgentId) {
        return this.createErrorResponse(
          A2AErrorCode.AuthenticationFailed,
          'Unauthorized: Only target agent can reject',
          negotiationId
        );
      }

      if (negotiation.status !== 'pending') {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          `Cannot reject negotiation in ${negotiation.status} state`,
          negotiationId
        );
      }

      negotiation.status = 'rejected';
      negotiation.metadata = {
        ...negotiation.metadata,
        rejectionReason: reason,
      };

      logger.info('Negotiation rejected', {
        negotiationId,
        rejectingAgentId,
        reason,
      });

      return {
        jsonrpc: '2.0',
        result: {
          negotiationId,
          status: 'rejected',
          expiresAt: negotiation.expiresAt,
        },
        id: negotiationId,
      };
    } catch (error) {
      logger.error('Failed to reject negotiation', { error, negotiationId });
      return this.createErrorResponse(
        A2AErrorCode.InternalError,
        'Failed to reject negotiation',
        negotiationId,
        error
      );
    }
  }

  /**
   * Counter-offer a negotiation
   */
  async counterOfferNegotiation(
    negotiationId: string,
    counterAgentId: string,
    counterOffer: A2ATaskSpec,
    counterTerms?: A2ANegotiationTerms
  ): Promise<A2ANegotiationResponse> {
    try {
      const negotiation = this.negotiations.get(negotiationId);

      if (!negotiation) {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          'Negotiation not found',
          negotiationId
        );
      }

      if (negotiation.expiresAt && new Date(negotiation.expiresAt) < new Date()) {
        negotiation.status = 'expired';
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          'Negotiation has expired',
          negotiationId
        );
      }

      if (
        negotiation.targetAgentId !== counterAgentId &&
        negotiation.requesterAgentId !== counterAgentId
      ) {
        return this.createErrorResponse(
          A2AErrorCode.AuthenticationFailed,
          'Unauthorized: Only participating agents can counter-offer',
          negotiationId
        );
      }

      if (negotiation.status !== 'pending') {
        return this.createErrorResponse(
          A2AErrorCode.NegotiationFailed,
          `Cannot counter-offer negotiation in ${negotiation.status} state`,
          negotiationId
        );
      }

      negotiation.status = 'counter_offered';
      negotiation.counterOffer = counterOffer;
      if (counterTerms) {
        negotiation.terms = counterTerms;
      }

      logger.info('Negotiation counter-offered', {
        negotiationId,
        counterAgentId,
      });

      return {
        jsonrpc: '2.0',
        result: {
          negotiationId,
          status: 'counter_offered',
          terms: negotiation.terms,
          counterOffer,
          expiresAt: negotiation.expiresAt,
        },
        id: negotiationId,
      };
    } catch (error) {
      logger.error('Failed to counter-offer negotiation', { error, negotiationId });
      return this.createErrorResponse(
        A2AErrorCode.InternalError,
        'Failed to counter-offer negotiation',
        negotiationId,
        error
      );
    }
  }

  /**
   * Get negotiation status
   */
  getNegotiationStatus(negotiationId: string): NegotiationState | null {
    return this.negotiations.get(negotiationId) || null;
  }

  /**
   * Cancel a negotiation
   */
  async cancelNegotiation(negotiationId: string, cancellingAgentId: string): Promise<boolean> {
    const negotiation = this.negotiations.get(negotiationId);

    if (!negotiation) {
      return false;
    }

    if (
      negotiation.requesterAgentId !== cancellingAgentId &&
      negotiation.targetAgentId !== cancellingAgentId
    ) {
      return false;
    }

    negotiation.status = 'rejected';
    negotiation.metadata = {
      ...negotiation.metadata,
      cancelledBy: cancellingAgentId,
    };

    logger.info('Negotiation cancelled', { negotiationId, cancellingAgentId });

    return true;
  }

  /**
   * Cleanup expired negotiations
   */
  cleanupExpiredNegotiations(): void {
    const now = new Date();
    let cleaned = 0;

    for (const negotiation of this.negotiations.values()) {
      if (negotiation.expiresAt && new Date(negotiation.expiresAt) < now) {
        if (negotiation.status === 'pending') {
          negotiation.status = 'expired';
        }
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.info('Cleaned up expired negotiations', { count: cleaned });
    }
  }

  /**
   * Calculate negotiation terms based on task and agent capabilities
   */
  private async calculateTerms(
    task: A2ATaskSpec,
    agent: typeof agents.$inferSelect,
    constraints?: A2ANegotiationConstraints
  ): Promise<A2ANegotiationTerms> {
    const baseCost = Number(agent.baseCostUsd || 0);
    const maxCost = Number(agent.maxCostUsd || baseCost * 2);

    // Calculate cost based on task complexity
    let costMultiplier = 1;
    switch (task.complexity) {
      case 'high':
        costMultiplier = 1.5;
        break;
      case 'medium':
        costMultiplier = 1.2;
        break;
      case 'low':
      default:
        costMultiplier = 1.0;
    }

    // Apply quality bias
    if (constraints?.qualityLevel) {
      switch (constraints.qualityLevel) {
        case 'quality':
          costMultiplier *= 1.3;
          break;
        case 'speed':
          costMultiplier *= 0.9;
          break;
        case 'balanced':
        default:
          break;
      }
    }

    const estimatedCost = Math.min(baseCost * costMultiplier, maxCost);
    const estimatedDuration = this.estimateDuration(task, agent, constraints);

    return {
      cost: estimatedCost,
      currency: 'USD',
      estimatedDuration,
      paymentMethod: 'x402',
      serviceLevel: constraints?.qualityLevel || 'balanced',
      deliverables: [task.type],
      conditions: constraints?.deadline ? [`Complete by ${constraints.deadline}`] : undefined,
    };
  }

  /**
   * Estimate task duration based on complexity and agent capabilities
   */
  private estimateDuration(
    task: A2ATaskSpec,
    _agent: typeof agents.$inferSelect,
    constraints?: A2ANegotiationConstraints
  ): number {
    const baseDuration = 5 * 60 * 1000; // 5 minutes base

    let durationMultiplier = 1;
    switch (task.complexity) {
      case 'high':
        durationMultiplier = 3;
        break;
      case 'medium':
        durationMultiplier = 2;
        break;
      case 'low':
      default:
        durationMultiplier = 1;
    }

    const estimatedDuration = baseDuration * durationMultiplier;

    // Apply deadline constraint
    if (constraints?.deadline) {
      const deadline = new Date(constraints.deadline).getTime();
      const now = Date.now();
      const maxAllowedDuration = deadline - now;

      if (estimatedDuration > maxAllowedDuration) {
        return maxAllowedDuration;
      }
    }

    return estimatedDuration;
  }

  /**
   * Create task record from accepted negotiation
   */
  private async createTaskFromNegotiation(negotiation: NegotiationState): Promise<A2ATask> {
    const taskId = this.generateId('task');

    // Create task in database
    const [taskRecord] = await db
      .insert(agentTasks)
      .values({
        hireId: parseInt(negotiation.taskId), // Using taskId as hireId for now
        goal: negotiation.taskSpec.description,
        budget: negotiation.terms ? Number(negotiation.terms.cost) : 0,
        deadlineMinutes: Math.ceil((negotiation.terms?.estimatedDuration || 300000) / 60000),
        qualityBias: negotiation.terms?.serviceLevel || 'balanced',
        settlementMethod: 'x402',
        status: 'accepted',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Create escrow record if using x402
    if (negotiation.terms?.paymentMethod === 'x402' && negotiation.terms?.cost) {
      await db.insert(x402Escrows).values({
        userId: parseInt(negotiation.requesterAgentId),
        taskId: taskRecord.id,
        amount: negotiation.terms.cost,
        currency: negotiation.terms.currency,
        recipientAddress: '', // Will be set by agent
        network: 'base-sepolia',
        status: 'escrowed',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return {
      id: taskId,
      status: 'accepted',
      requesterAgentId: negotiation.requesterAgentId,
      executorAgentId: negotiation.targetAgentId,
      negotiationId: negotiation.id,
      taskSpec: negotiation.taskSpec,
      createdAt: new Date().toISOString(),
      metadata: {
        negotiationTerms: negotiation.terms,
      },
    };
  }

  /**
   * Generate unique ID with prefix
   */
  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Create error response
   */
  private createErrorResponse(
    code: A2AErrorCode,
    message: string,
    id: string | number,
    data?: unknown
  ): A2ANegotiationResponse {
    return {
      jsonrpc: '2.0',
      error: {
        code,
        message,
        data,
      },
      id,
    };
  }
}

// Export singleton instance
export const a2aNegotiationService = new A2ANegotiationService();

// Schedule cleanup of expired negotiations
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    a2aNegotiationService.cleanupExpiredNegotiations();
  }, 60 * 1000); // Every minute
}
