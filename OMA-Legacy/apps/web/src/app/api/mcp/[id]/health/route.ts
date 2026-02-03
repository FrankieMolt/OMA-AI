import { NextRequest } from 'next/server';
import { mcpHealthCheckService } from '@/lib/mcp/mcp-health-check.service';
import { mcpRegistryService } from '@/lib/mcp/mcp-registry.service';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const requestId = generateRequestId();

  try {
    const { id } = await params;
    const serverId = parseInt(id);

    if (isNaN(serverId)) {
      logger.warn('Invalid server ID', { id, requestId });
      return validationErrorResponse('Invalid server ID', undefined, requestId);
    }

    const server = await mcpRegistryService.getServerById(serverId);

    if (!server) {
      logger.warn('MCP server not found', { serverId, requestId });
      return notFoundErrorResponse('MCP server', requestId);
    }

    const healthResult = await mcpHealthCheckService.checkServer(serverId);

    logger.info('MCP server health check completed', {
      serverId,
      status: healthResult.status,
      requestId,
    });
    return successResponse(healthResult);
  } catch (error) {
    logger.error('MCP health check error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return errorResponse(
      'Failed to check MCP server health',
      500,
      'INTERNAL_SERVER_ERROR',
      {
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      requestId
    );
  }
}
