import { NextRequest } from 'next/server';
import { mcpRegistryService } from '@/lib/mcp/mcp-registry.service';
import { z } from 'zod';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

const discoverSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  pricingType: z.enum(['free', 'usage', 'subscription', 'one-time']).optional(),
  healthStatus: z.enum(['healthy', 'unhealthy', 'offline']).optional(),
  minRating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(20),
  offset: z.number().min(0).default(0),
});

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    const searchParams = request.nextUrl.searchParams;

    const minRatingRaw = searchParams.get('minRating');
    const filters = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      pricingType:
        (searchParams.get('pricingType') as z.infer<typeof discoverSchema.shape.pricingType>) ||
        undefined,
      healthStatus:
        (searchParams.get('healthStatus') as z.infer<typeof discoverSchema.shape.healthStatus>) ||
        undefined,
      minRating: minRatingRaw ? parseFloat(minRatingRaw) : undefined,
      tags: searchParams.get('tags')?.split(',') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validation = discoverSchema.safeParse(filters);

    if (!validation.success) {
      logger.warn('Invalid MCP discover filters', { errors: validation.error.format(), requestId });
      return validationErrorResponse(
        'Invalid filters',
        { errors: validation.error.format() },
        requestId
      );
    }

    const result = await mcpRegistryService.listServers(validation.data);

    logger.info('MCP servers discovered successfully', {
      count: result.servers.length,
      total: result.total,
      requestId,
    });
    return successResponse({
      data: result.servers,
      meta: {
        total: result.total,
        limit: validation.data.limit,
        offset: validation.data.offset,
      },
    });
  } catch (error) {
    logger.error('MCP discovery error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return errorResponse(
      'Failed to discover MCP servers',
      500,
      'INTERNAL_SERVER_ERROR',
      {
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      requestId
    );
  }
}
