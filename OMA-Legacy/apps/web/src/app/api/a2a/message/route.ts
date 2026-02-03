import { NextRequest, NextResponse } from 'next/server';
import type {
  A2AMessageRequest,
  A2AMessageResponse,
  A2AStreamRequest,
  A2ATaskSpec,
} from '@/lib/a2a/types';
import { A2AErrorCode } from '@/lib/a2a/types';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';
import { db, agents } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import {
  a2aCommunicationLogger,
  a2aCapabilityMatcher,
  a2aTaskQueueManager,
} from '@/lib/a2a/services';

/**
 * A2A Message Endpoint
 * Handles JSON-RPC 2.0 messages with streaming support
 */
export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 100 })(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const startTime = Date.now();

  try {
    const body = (await req.json()) as A2AMessageRequest;

    // Extract agent information from headers
    const fromAgentId = req.headers.get('x-agent-id');
    const toAgentId = req.headers.get('x-target-agent-id');

    // Log incoming request
    const logId = await a2aCommunicationLogger.logRequest(
      fromAgentId || 'unknown',
      toAgentId || 'oma',
      body.method,
      body.params
    );

    // Basic JSON-RPC validation
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

    let result: unknown = {};
    let statusCode = 200;

    // Route to appropriate handler
    switch (body.method) {
      case 'ping':
        result = await handlePing();
        break;

      case 'agent.list':
        const listResult = await handleAgentList(body.params);
        result = listResult.result;
        statusCode = listResult.statusCode;
        break;

      case 'agent.query':
        const queryResult = await handleAgentQuery(body.params);
        result = queryResult.result;
        statusCode = queryResult.statusCode;
        break;

      case 'agent.capabilities':
        const capsResult = await handleAgentCapabilities(body.params);
        result = capsResult.result;
        statusCode = capsResult.statusCode;
        break;

      case 'task.create':
        const createResult = await handleTaskCreate(body.params, fromAgentId);
        result = createResult.result;
        statusCode = createResult.statusCode;
        break;

      case 'task.status':
        const statusResult = await handleTaskStatus(body.params);
        result = statusResult.result;
        statusCode = statusResult.statusCode;
        break;

      case 'stream':
        return handleStreamingRequest(body as A2AStreamRequest, req, logId);

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

    const response: A2AMessageResponse = {
      jsonrpc: '2.0',
      result,
      id: body.id,
    };

    // Log successful response
    await a2aCommunicationLogger.logResponse(logId, result, Date.now() - startTime, 'success');

    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logger.error('A2A Message Error', { error });

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
 * Handle ping request
 */
async function handlePing() {
  return {
    status: 'ok',
    timestamp: Date.now(),
    protocol: 'A2A-1.0',
    version: '1.0.0',
  };
}

/**
 * Handle agent list request
 */
async function handleAgentList(params: unknown): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const queryParams = params as
      | {
          limit?: number;
          category?: string;
          onlineOnly?: boolean;
        }
      | undefined;

    const limit = Math.min(queryParams?.limit || 50, 100);

    const conditions = [eq(agents.status, 'active')];
    if (queryParams?.category) {
      conditions.push(eq(agents.category, queryParams.category));
    }

    const activeAgents = await db
      .select({
        id: agents.id,
        name: agents.name,
        slug: agents.slug,
        description: agents.description,
        category: agents.category,
        capabilities: agents.capabilities,
        pricingType: agents.pricingType,
        baseCostUsd: agents.baseCostUsd,
        status: agents.status,
        reputationWeight: agents.reputationWeight,
      })
      .from(agents)
      .where(and(...conditions))
      .limit(limit);

    return {
      result: {
        agents: activeAgents,
        total: activeAgents.length,
        limit,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in agent.list', { error });
    return {
      result: {
        error: 'Failed to retrieve agent list',
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle agent query request
 */
async function handleAgentQuery(params: unknown): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const queryParams = params as { agentId?: number; agentSlug?: string } | undefined;

    const agentId = queryParams?.agentId;
    const agentSlug = queryParams?.agentSlug;
    const resolvedSlug = agentSlug ?? null;

    if (!agentId && !resolvedSlug) {
      return {
        result: {
          error: 'Invalid params: agentId or agentSlug required',
        },
        statusCode: 400,
      };
    }

    let agent;
    if (agentId) {
      [agent] = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);
    } else {
      if (!resolvedSlug) {
        return {
          result: {
            error: 'Invalid params: agentSlug required',
          },
          statusCode: 400,
        };
      }
      [agent] = await db.select().from(agents).where(eq(agents.slug, resolvedSlug)).limit(1);
    }

    if (!agent) {
      return {
        result: {
          error: 'Agent not found',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        id: agent.id,
        name: agent.name,
        slug: agent.slug,
        description: agent.description,
        category: agent.category,
        capabilities: agent.capabilities,
        pricingType: agent.pricingType,
        baseCostUsd: agent.baseCostUsd,
        maxCostUsd: agent.maxCostUsd,
        reputationWeight: agent.reputationWeight,
        status: agent.status,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in agent.query', { error });
    return {
      result: {
        error: 'Failed to query agent',
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle agent capabilities request
 */
async function handleAgentCapabilities(params: unknown): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const queryParams = params as { agentId?: number; agentSlug?: string } | undefined;

    const agentId = queryParams?.agentId;
    const agentSlug = queryParams?.agentSlug;
    const resolvedSlug = agentSlug ?? null;

    if (!agentId && !resolvedSlug) {
      return {
        result: {
          error: 'Invalid params: agentId or agentSlug required',
        },
        statusCode: 400,
      };
    }

    const capabilityTarget = agentId?.toString() ?? resolvedSlug;
    if (!capabilityTarget) {
      return {
        result: {
          error: 'Invalid params: agentId or agentSlug required',
        },
        statusCode: 400,
      };
    }

    const agentCard = await a2aCapabilityMatcher.getAgentCapabilities(capabilityTarget);

    if (!agentCard) {
      return {
        result: {
          error: 'Agent not found or not available',
        },
        statusCode: 404,
      };
    }

    return {
      result: agentCard,
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in agent.capabilities', { error });
    return {
      result: {
        error: 'Failed to retrieve agent capabilities',
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle task creation request
 */
async function handleTaskCreate(
  params: unknown,
  fromAgentId?: string | null
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const taskParams = params as
      | {
          executorAgentId: string;
          task: A2ATaskSpec;
          priority?: number;
        }
      | undefined;

    if (!taskParams?.executorAgentId || !taskParams?.task) {
      return {
        result: {
          error: 'Invalid params: executorAgentId and task required',
        },
        statusCode: 400,
      };
    }

    if (!fromAgentId) {
      return {
        result: {
          error: 'Unauthorized: Missing x-agent-id header',
        },
        statusCode: 401,
      };
    }

    // Create task
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const queuedTask = await a2aTaskQueueManager.enqueueTask({
      id: taskId,
      taskSpec: taskParams.task,
      requesterAgentId: fromAgentId,
      executorAgentId: taskParams.executorAgentId,
      priority: taskParams.priority || 5,
      estimatedDuration: 5 * 60 * 1000, // Default 5 minutes
      estimatedCost: 1.0, // Default cost
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      status: 'pending',
    });

    if (!queuedTask.success) {
      return {
        result: {
          error: queuedTask.error,
        },
        statusCode: 400,
      };
    }

    return {
      result: {
        taskId: queuedTask.taskId,
        status: 'queued',
        message: 'Task successfully queued for execution',
      },
      statusCode: 201,
    };
  } catch (error) {
    logger.error('Error in task.create', { error });
    return {
      result: {
        error: 'Failed to create task',
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle task status request
 */
async function handleTaskStatus(params: unknown): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const queryParams = params as { taskId?: string } | undefined;

    const taskId = queryParams?.taskId;

    if (!taskId) {
      return {
        result: {
          error: 'Invalid params: taskId required',
        },
        statusCode: 400,
      };
    }

    const taskStatus = a2aTaskQueueManager.getTaskStatus(taskId);

    if (taskStatus.status === 'not_found') {
      return {
        result: {
          error: 'Task not found',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        taskId,
        ...taskStatus,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error in task.status', { error });
    return {
      result: {
        error: 'Failed to retrieve task status',
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle streaming request (SSE)
 */
function handleStreamingRequest(
  request: A2AStreamRequest,
  req: NextRequest,
  logId: string
): Response {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const params = request.params;
        const taskId = params?.taskId;

        if (!taskId) {
          controller.enqueue(
            encoder.encode(
              `event: error\ndata: ${JSON.stringify({
                type: 'error',
                error: 'Invalid params: taskId required',
                timestamp: new Date().toISOString(),
              })}\n\n`
            )
          );
          controller.close();
          return;
        }

        // Send initial connection message
        controller.enqueue(
          encoder.encode(
            `event: connected\ndata: ${JSON.stringify({
              type: 'data',
              data: { message: 'Stream connected', taskId },
              timestamp: new Date().toISOString(),
            })}\n\n`
          )
        );

        // Poll for task status updates
        const interval = setInterval(() => {
          const taskStatus = a2aTaskQueueManager.getTaskStatus(taskId);

          if (taskStatus.status !== 'not_found') {
            controller.enqueue(
              encoder.encode(
                `event: ${params.streamType}\ndata: ${JSON.stringify({
                  type: 'data',
                  data: taskStatus,
                  timestamp: new Date().toISOString(),
                })}\n\n`
              )
            );

            // Stop streaming if task is complete or failed
            if (
              taskStatus.status === 'completed' ||
              taskStatus.status === 'failed' ||
              taskStatus.status === 'cancelled'
            ) {
              controller.enqueue(
                encoder.encode(
                  `event: complete\ndata: ${JSON.stringify({
                    type: 'complete',
                    data: taskStatus,
                    timestamp: new Date().toISOString(),
                  })}\n\n`
                )
              );
              clearInterval(interval);
              controller.close();
            }
          }
        }, 1000); // Poll every second

        // Cleanup on client disconnect
        req.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });

        // Timeout after 5 minutes
        setTimeout(
          () => {
            clearInterval(interval);
            controller.close();
          },
          5 * 60 * 1000
        );
      } catch (error) {
        logger.error('Stream error', { error, logId });
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({
              type: 'error',
              error: 'Stream error occurred',
              timestamp: new Date().toISOString(),
            })}\n\n`
          )
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
