import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, internalErrorResponse, generateRequestId } from '@/lib/api-response';
import { logger } from '@/lib/logger';

// export const runtime = 'edge'; // Disabled to support winston logger

const LITELLM_BASE_URL = process.env.LITELLM_BASE_URL;

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();

  try {
    const LITELLM_MASTER_KEY = process.env.LITELLM_MASTER_KEY;

    if (!LITELLM_MASTER_KEY) {
      logger.error('LiteLLM master key not configured', { requestId });
      return errorResponse(
        'LiteLLM master key not configured',
        500,
        'INTERNAL_SERVER_ERROR',
        undefined,
        requestId
      );
    }

    const body = await req.json();

    // Forward the request to the LiteLLM Proxy
    const response = await fetch(`${LITELLM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LITELLM_MASTER_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      logger.error('LiteLLM proxy error', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        requestId,
      });
      return errorResponse(
        `LiteLLM Proxy Error: ${response.statusText}`,
        response.status,
        'INTERNAL_SERVER_ERROR',
        { details: errorText },
        requestId
      );
    }

    // Stream the response back if streaming is enabled
    // LiteLLM returns standard OpenAI-compatible stream
    const proxyResponse = new NextResponse(response.body, {
      status: response.status,
      headers: {
        ...response.headers,
        'X-Request-ID': requestId,
      },
    });

    logger.info('LiteLLM proxy request successful', { requestId });
    return proxyResponse;
  } catch (error) {
    logger.error('LiteLLM proxy error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return internalErrorResponse('Failed to process LiteLLM request', requestId);
  }
}
