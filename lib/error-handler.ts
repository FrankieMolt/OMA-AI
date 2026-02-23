/**
 * Centralized Error Handler
 * Provides consistent error handling across API routes
 */

import { NextResponse } from "next/server";

/**
 * Custom error classes for better error handling
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, "VALIDATION_ERROR", details);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string = "Insufficient permissions") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends ApiError {
  constructor(resetTime: number) {
    super("Too many requests", 429, "RATE_LIMIT_ERROR", { resetTime });
    this.name = "RateLimitError";
  }
}

/**
 * Error handler function for API routes
 * Catches errors and returns consistent JSON responses
 */
export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error);

  // Handle known ApiError instances
  if (error instanceof ApiError) {
    const response = NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error.details && { details: error.details }),
      },
      { status: error.statusCode },
    );

    // Add security headers to error responses
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    return response;
  }

  // Handle Zod validation errors
  if (
    error &&
    typeof error === "object" &&
    "name" in error &&
    error.name === "ZodError"
  ) {
    const response = NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: error,
      },
      { status: 400 },
    );
    return response;
  }

  // Handle unknown errors
  const response = NextResponse.json(
    {
      error: "Internal server error",
      code: "INTERNAL_ERROR",
    },
    { status: 500 },
  );

  // Don't expose stack traces in production
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    response.headers.set("X-Error-Details", error.message);
  }

  return response;
}

/**
 * Async wrapper to catch errors in API route handlers
 */
export function withErrorHandler<T>(
  handler: () => Promise<T>,
): Promise<T | NextResponse> {
  return handler().catch(handleApiError);
}

/**
 * Create a standardized success response
 */
export function successResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200,
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      ...(message && { message }),
      data,
    },
    { status: statusCode },
  );
}

/**
 * Create a standardized error response
 */
export function errorResponse(
  message: string,
  statusCode: number = 500,
  code?: string,
  details?: any,
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(code && { code }),
      ...(details && { details }),
    },
    { status: statusCode },
  );
}
