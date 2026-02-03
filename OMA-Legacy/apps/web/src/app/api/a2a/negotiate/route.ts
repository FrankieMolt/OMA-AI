import { NextRequest, NextResponse } from 'next/server';
import type { A2ANegotiationRequest, A2ANegotiationResponse } from '@/lib/a2a/types';
import { A2AErrorCode } from '@/lib/a2a/types';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';
import { a2aNegotiationService, a2aCommunicationLogger } from '@/lib/a2a/services';

/**
 * A2A Negotiation Endpoint
 * Handles task negotiation between agents
 */
export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 20 })(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const startTime = Date.now();

  try {
    const body = await req.json();

    // Extract agent information from headers
    const fromAgentId = req.headers.get('x-agent-id');
    const toAgentId = req.headers.get('x-target-agent-id');

    // Log incoming request
    const logId = await a2aCommunicationLogger.logRequest(
      fromAgentId || 'unknown',
      toAgentId || 'oma',
      'negotiate',
      body
    );

    // Validate JSON-RPC format
    if (body.jsonrpc !== '2.0' || !body.method) {
      await a2aCommunicationLogger.logError(
        logId,
        'Invalid JSON-RPC request',
        Date.now() - startTime
      );

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: {
            code: A2AErrorCode.InvalidRequest,
            message: 'Invalid Request: Must include jsonrpc="2.0" and method',
          },
          id: body.id || null,
        },
        { status: 400 }
      );
    }

    let result: unknown;
    let statusCode = 200;

    // Route to appropriate negotiation handler
    switch (body.method) {
      case 'negotiate.initiate':
        const initiateResult = await handleNegotiateInitiate(body.params, fromAgentId);
        result = initiateResult.result;
        statusCode = initiateResult.statusCode;
        break;

      case 'negotiate.accept':
        const acceptResult = await handleNegotiateAccept(body.params, fromAgentId);
        result = acceptResult.result;
        statusCode = acceptResult.statusCode;
        break;

      case 'negotiate.reject':
        const rejectResult = await handleNegotiateReject(body.params, fromAgentId);
        result = rejectResult.result;
        statusCode = rejectResult.statusCode;
        break;

      case 'negotiate.counter':
        const counterResult = await handleNegotiateCounter(body.params, fromAgentId);
        result = counterResult.result;
        statusCode = counterResult.statusCode;
        break;

      case 'negotiate.cancel':
        const cancelResult = await handleNegotiateCancel(body.params, fromAgentId);
        result = cancelResult.result;
        statusCode = cancelResult.statusCode;
        break;

      case 'negotiate.status':
        const statusResult = await handleNegotiateStatus(body.params);
        result = statusResult.result;
        statusCode = statusResult.statusCode;
        break;

      default:
        await a2aCommunicationLogger.logError(logId, 'Method not found', Date.now() - startTime);

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            error: {
              code: A2AErrorCode.MethodNotFound,
              message: `Method not found: ${body.method}`,
            },
            id: body.id,
          },
          { status: 404 }
        );
    }

    const response: A2ANegotiationResponse = {
      jsonrpc: '2.0',
      // @ts-expect-error - Result type varies dynamically based on method
      result: result,
      id: body.id,
    };

    // Log successful response
    await a2aCommunicationLogger.logResponse(logId, result, Date.now() - startTime, 'success');

    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logger.error('A2A Negotiation Error', { error });

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: A2AErrorCode.ParseError,
          message: 'Parse Error: Invalid JSON or request format',
          data: error instanceof Error ? error.message : String(error),
        },
        id: null,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle negotiation initiation
 */
async function handleNegotiateInitiate(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    const initiateParams = params as
      | {
          taskId: string;
          targetAgentId: string;
          task: {
            type: string;
            description: string;
            input: Record<string, unknown>;
            outputFormat?: string;
            complexity?: 'low' | 'medium' | 'high';
            priority?: number;
          };
          constraints?: {
            maxCost?: number;
            maxDuration?: number;
            requiredCapabilities?: string[];
            preferredCapabilities?: string[];
            qualityLevel?: 'speed' | 'balanced' | 'quality';
            deadline?: string;
          };
          timeoutMs?: number;
        }
      | undefined;

    if (!initiateParams?.taskId || !initiateParams?.targetAgentId || !initiateParams?.task) {
      return {
        result: {
          error: 'Invalid params: taskId, targetAgentId, and task are required',
        },
        statusCode: 400,
      };
    }

    // Create negotiation request
    const negotiationRequest: A2ANegotiationRequest = {
      jsonrpc: '2.0',
      method: 'negotiate',
      params: {
        taskId: initiateParams.taskId,
        requesterAgentId: fromAgentId,
        targetAgentId: initiateParams.targetAgentId,
        task: initiateParams.task,
        constraints: initiateParams.constraints,
        timeoutMs: initiateParams.timeoutMs,
      },
      id: `neg_${Date.now()}`,
    };

    const response = await a2aNegotiationService.initiateNegotiation(negotiationRequest);

    if (response.error) {
      return {
        result: response.error,
        statusCode: response.error.code === A2AErrorCode.AgentNotFound ? 404 : 400,
      };
    }

    return {
      result: response.result,
      statusCode: 201,
    };
  } catch (error) {
    logger.error('Error in negotiate.initiate', { error });
    return {
      result: {
        error: 'Failed to initiate negotiation',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle negotiation acceptance
 */
async function handleNegotiateAccept(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    const acceptParams = params as { negotiationId: string } | undefined;

    if (!acceptParams?.negotiationId) {
      return {
        result: {
          error: 'Invalid params: negotiationId required',
        },
        statusCode: 400,
      };
    }

    const response = await a2aNegotiationService.acceptNegotiation(
      acceptParams.negotiationId,
      fromAgentId
    );

    if (response.error) {
      const statusCode =
        response.error.code === A2AErrorCode.AgentNotFound
          ? 404
          : response.error.code === A2AErrorCode.AuthenticationFailed
            ? 403
            : response.error.code === A2AErrorCode.NegotiationFailed
              ? 400
              : 500;

      return {
        result: response.error,
        statusCode,
      };
    }

    return {
      result: response.result,
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in negotiate.accept', { error });
    return {
      result: {
        error: 'Failed to accept negotiation',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle negotiation rejection
 */
async function handleNegotiateReject(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    const rejectParams = params as
      | {
          negotiationId: string;
          reason?: string;
        }
      | undefined;

    if (!rejectParams?.negotiationId) {
      return {
        result: {
          error: 'Invalid params: negotiationId required',
        },
        statusCode: 400,
      };
    }

    const response = await a2aNegotiationService.rejectNegotiation(
      rejectParams.negotiationId,
      fromAgentId,
      rejectParams.reason
    );

    if (response.error) {
      const statusCode =
        response.error.code === A2AErrorCode.AgentNotFound
          ? 404
          : response.error.code === A2AErrorCode.AuthenticationFailed
            ? 403
            : response.error.code === A2AErrorCode.NegotiationFailed
              ? 400
              : 500;

      return {
        result: response.error,
        statusCode,
      };
    }

    return {
      result: response.result,
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in negotiate.reject', { error });
    return {
      result: {
        error: 'Failed to reject negotiation',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle negotiation counter-offer
 */
async function handleNegotiateCounter(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    const counterParams = params as
      | {
          negotiationId: string;
          counterOffer: {
            type: string;
            description: string;
            input: Record<string, unknown>;
            outputFormat?: string;
            complexity?: 'low' | 'medium' | 'high';
            priority?: number;
          };
          counterTerms?: {
            cost: number;
            currency: string;
            estimatedDuration: number;
            paymentMethod: 'x402' | 'direct' | 'escrow';
            serviceLevel: string;
            deliverables: string[];
            conditions?: string[];
          };
        }
      | undefined;

    if (!counterParams?.negotiationId || !counterParams?.counterOffer) {
      return {
        result: {
          error: 'Invalid params: negotiationId and counterOffer are required',
        },
        statusCode: 400,
      };
    }

    const response = await a2aNegotiationService.counterOfferNegotiation(
      counterParams.negotiationId,
      fromAgentId,
      counterParams.counterOffer,
      counterParams.counterTerms
    );

    if (response.error) {
      const statusCode =
        response.error.code === A2AErrorCode.AgentNotFound
          ? 404
          : response.error.code === A2AErrorCode.AuthenticationFailed
            ? 403
            : response.error.code === A2AErrorCode.NegotiationFailed
              ? 400
              : 500;

      return {
        result: response.error,
        statusCode,
      };
    }

    return {
      result: response.result,
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in negotiate.counter', { error });
    return {
      result: {
        error: 'Failed to counter-offer negotiation',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle negotiation cancellation
 */
async function handleNegotiateCancel(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    const cancelParams = params as { negotiationId: string } | undefined;

    if (!cancelParams?.negotiationId) {
      return {
        result: {
          error: 'Invalid params: negotiationId required',
        },
        statusCode: 400,
      };
    }

    const success = await a2aNegotiationService.cancelNegotiation(
      cancelParams.negotiationId,
      fromAgentId
    );

    if (!success) {
      return {
        result: {
          error: 'Failed to cancel negotiation: Not found or unauthorized',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        message: 'Negotiation cancelled successfully',
        negotiationId: cancelParams.negotiationId,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in negotiate.cancel', { error });
    return {
      result: {
        error: 'Failed to cancel negotiation',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle negotiation status query
 */
async function handleNegotiateStatus(params: unknown): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const statusParams = params as { negotiationId: string } | undefined;

    if (!statusParams?.negotiationId) {
      return {
        result: {
          error: 'Invalid params: negotiationId required',
        },
        statusCode: 400,
      };
    }

    const status = a2aNegotiationService.getNegotiationStatus(statusParams.negotiationId);

    if (!status) {
      return {
        result: {
          error: 'Negotiation not found',
        },
        statusCode: 404,
      };
    }

    return {
      result: status,
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in negotiate.status', { error });
    return {
      result: {
        error: 'Failed to retrieve negotiation status',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}
