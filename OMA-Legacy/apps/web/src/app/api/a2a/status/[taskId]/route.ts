import { NextRequest, NextResponse } from 'next/server';
import { A2AErrorCode } from '@/lib/a2a/types';
import { logger } from '@/lib/logger';
import { rateLimit } from '@/lib/rate-limit';
import { a2aTaskQueueManager, a2aCommunicationLogger } from '@/lib/a2a/services';

/**
 * GET /api/a2a/status/[taskId]
 * Get task status by ID
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 60 })(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const startTime = Date.now();
  const { taskId } = await params;

  try {
    // Extract agent information from headers
    const fromAgentId = req.headers.get('x-agent-id');

    // Log incoming request
    const logId = await a2aCommunicationLogger.logRequest(
      fromAgentId || 'unknown',
      'oma',
      'task.status',
      { taskId }
    );

    // Get task status
    const taskStatus = a2aTaskQueueManager.getTaskStatus(taskId);

    if (taskStatus.status === 'not_found') {
      await a2aCommunicationLogger.logError(logId, 'Task not found', Date.now() - startTime);

      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: {
            code: A2AErrorCode.TaskNotFound,
            message: 'Task not found',
          },
          id: null,
        },
        { status: 404 }
      );
    }

    const response = {
      jsonrpc: '2.0',
      result: {
        taskId,
        ...taskStatus,
      },
      id: null,
    };

    // Log successful response
    await a2aCommunicationLogger.logResponse(
      logId,
      response.result,
      Date.now() - startTime,
      'success'
    );

    return NextResponse.json(response);
  } catch (error) {
    logger.error('A2A Task Status Error', { error, taskId });

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: A2AErrorCode.InternalError,
          message: 'Internal server error',
          data: error instanceof Error ? error.message : String(error),
        },
        id: null,
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/a2a/status/[taskId]
 * Update task status or complete task
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ taskId: string }> }) {
  // Apply rate limiting
  const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 20 })(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const startTime = Date.now();
  const { taskId } = await params;

  try {
    // Extract agent information from headers
    const fromAgentId = req.headers.get('x-agent-id');

    if (!fromAgentId) {
      return NextResponse.json(
        {
          jsonrpc: '2.0',
          error: {
            code: A2AErrorCode.AuthenticationFailed,
            message: 'Unauthorized: Missing x-agent-id header',
          },
          id: null,
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Log incoming request
    const logId = await a2aCommunicationLogger.logRequest(fromAgentId, 'oma', 'task.update', {
      taskId,
      ...body,
    });

    // Handle different update actions
    let result: unknown;
    let statusCode = 200;

    switch (body.action) {
      case 'complete':
        const completeResult = await handleTaskComplete(taskId, body, fromAgentId);
        result = completeResult.result;
        statusCode = completeResult.statusCode;
        break;

      case 'fail':
        const failResult = await handleTaskFail(taskId, body, fromAgentId);
        result = failResult.result;
        statusCode = failResult.statusCode;
        break;

      case 'cancel':
        const cancelResult = await handleTaskCancel(taskId, body, fromAgentId);
        result = cancelResult.result;
        statusCode = cancelResult.statusCode;
        break;

      default:
        await a2aCommunicationLogger.logError(logId, 'Invalid action', Date.now() - startTime);

        return NextResponse.json(
          {
            jsonrpc: '2.0',
            error: {
              code: A2AErrorCode.InvalidParams,
              message: 'Invalid action. Supported: complete, fail, cancel',
            },
            id: null,
          },
          { status: 400 }
        );
    }

    const response = {
      jsonrpc: '2.0',
      result,
      id: null,
    };

    // Log response
    if (statusCode >= 200 && statusCode < 300) {
      await a2aCommunicationLogger.logResponse(logId, result, Date.now() - startTime, 'success');
    } else {
      await a2aCommunicationLogger.logError(logId, 'Task update failed', Date.now() - startTime);
    }

    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logger.error('A2A Task Update Error', { error, taskId });

    return NextResponse.json(
      {
        jsonrpc: '2.0',
        error: {
          code: A2AErrorCode.ParseError,
          message: 'Invalid JSON or request format',
          data: error instanceof Error ? error.message : String(error),
        },
        id: null,
      },
      { status: 500 }
    );
  }
}

/**
 * Handle task completion
 */
async function handleTaskComplete(
  taskId: string,
  body: {
    result?: unknown;
    actualCost?: number;
    actualDuration?: number;
  },
  _fromAgentId: string
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const success = await a2aTaskQueueManager.completeTask(
      taskId,
      body.result,
      body.actualCost,
      body.actualDuration
    );

    if (!success) {
      return {
        result: {
          error: 'Failed to complete task: Task not found or already completed',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        taskId,
        status: 'completed',
        message: 'Task completed successfully',
        result: body.result,
        actualCost: body.actualCost,
        actualDuration: body.actualDuration,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error completing task', { error, taskId });
    return {
      result: {
        error: 'Failed to complete task',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle task failure
 */
async function handleTaskFail(
  taskId: string,
  body: {
    error?: string;
  },
  _fromAgentId: string
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const success = await a2aTaskQueueManager.failTask(
      taskId,
      body.error || 'Task failed without error message'
    );

    if (!success) {
      return {
        result: {
          error: 'Failed to mark task as failed: Task not found',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        taskId,
        status: 'failed',
        message: 'Task marked as failed',
        error: body.error,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error failing task', { error, taskId });
    return {
      result: {
        error: 'Failed to mark task as failed',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}

/**
 * Handle task cancellation
 */
async function handleTaskCancel(
  taskId: string,
  body: {
    reason?: string;
  },
  _fromAgentId: string
): Promise<{
  result: unknown;
  statusCode: number;
}> {
  try {
    const success = await a2aTaskQueueManager.cancelTask(taskId, body.reason);

    if (!success) {
      return {
        result: {
          error: 'Failed to cancel task: Task not found or unauthorized',
        },
        statusCode: 404,
      };
    }

    return {
      result: {
        taskId,
        status: 'cancelled',
        message: 'Task cancelled successfully',
        reason: body.reason,
      },
      statusCode: 200,
    };
  } catch (error) {
    logger.error('Error cancelling task', { error, taskId });
    return {
      result: {
        error: 'Failed to cancel task',
        details: error instanceof Error ? error.message : String(error),
      },
      statusCode: 500,
    };
  }
}
