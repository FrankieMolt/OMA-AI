import { NextResponse } from 'next/server';

/**
 * Unified API error handler
 * Standardizes error logging and response format across all API routes
 */

export interface ApiErrorOptions {
  context?: string;
  statusCode?: number;
  userMessage?: string;
  logDetails?: boolean;
}

/**
 * Handles API errors with standardized logging and response format
 *
 * @param error - The error object (can be unknown)
 * @param routeName - The API route name (e.g., "GET /api/agents")
 * @param options - Additional options for error handling
 * @returns NextResponse with standardized error format
 */
export function handleApiError(
  error: unknown,
  routeName: string,
  options: ApiErrorOptions = {}
): NextResponse {
  const {
    context,
    statusCode = 500,
    userMessage = 'Internal server error',
    logDetails = true,
  } = options;

  // Build context string
  const fullContext = context ? `${routeName} (${context})` : routeName;

  // Extract error details safely
  const errorDetails = extractErrorDetails(error);

  // Log error with consistent format
  if (logDetails) {
    console.error(`[${fullContext}] Error:`, {
      message: errorDetails.message,
      code: errorDetails.code,
      stack: errorDetails.stack,
    });
  }

  // Return standardized error response
  return NextResponse.json(
    {
      error: userMessage,
      route: routeName,
      ...(process.env.NODE_ENV === 'development' && {
        details: errorDetails.message,
        code: errorDetails.code,
      }),
    },
    { status: statusCode }
  );
}

/**
 * Validates required request fields
 *
 * @param body - Request body object
 * @param requiredFields - Array of required field names
 * @returns Error response if validation fails, null if valid
 */
export function validateRequiredFields<T extends Record<string, unknown>>(
  body: T,
  requiredFields: (keyof T)[]
): NextResponse | null {
  const missingFields = requiredFields.filter(
    field => body[field] === undefined || body[field] === null
  );

  if (missingFields.length > 0) {
    return NextResponse.json(
      {
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields,
      },
      { status: 400 }
    );
  }

  return null;
}

/**
 * Safely extracts error details from unknown error type
 */
function extractErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: (error as any).code,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      code: undefined,
      stack: undefined,
    };
  }

  if (error && typeof error === 'object') {
    return {
      message: (error as any).message || 'Unknown error',
      code: (error as any).code,
      stack: undefined,
    };
  }

  return {
    message: 'Unknown error',
    code: undefined,
    stack: undefined,
  };
}

/**
 * Common error responses for specific scenarios
 */
export const ApiErrors = {
  notFound: (resource: string) =>
    NextResponse.json(
      { error: `${resource} not found` },
      { status: 404 }
    ),

  unauthorized: (message: string = 'Unauthorized') =>
    NextResponse.json({ error: message }, { status: 401 }),

  forbidden: (message: string = 'Forbidden') =>
    NextResponse.json({ error: message }, { status: 403 }),

  badRequest: (message: string = 'Bad request') =>
    NextResponse.json({ error: message }, { status: 400 }),

  conflict: (message: string = 'Conflict') =>
    NextResponse.json({ error: message }, { status: 409 }),

  rateLimited: (message: string = 'Too many requests') =>
    NextResponse.json({ error: message }, { status: 429 }),

  internal: (message: string = 'Internal server error') =>
    NextResponse.json({ error: message }, { status: 500 }),

  serviceUnavailable: (message: string = 'Service unavailable') =>
    NextResponse.json({ error: message }, { status: 503 }),
};

/**
 * API response with caching headers
 */
export function withCache(
  response: NextResponse,
  maxAge: number = 300
): NextResponse {
  response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
