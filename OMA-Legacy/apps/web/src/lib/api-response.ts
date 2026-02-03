import { NextResponse } from 'next/server';

export type ErrorCode =
  | 'INTERNAL_SERVER_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'PAYMENT_REQUIRED'
  | 'PAYMENT_PROCESSING_FAILED'
  | 'ACCOUNT_REQUIRED'
  | 'MISSING_TARGET_URL'
  | 'ALREADY_EXISTS'
  | 'INVALID_ID_FORMAT'
  | 'INSUFFICIENT_CREDITS'
  | 'AGENT_NOT_FOUND'
  | 'SKILL_NOT_FOUND'
  | 'AGENT_OFFLINE'
  | 'RATE_LIMIT_EXCEEDED';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  code?: ErrorCode;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  code?: ErrorCode;
  message?: string;
  requestId?: string;
}

export function successResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
  });
}

export function errorResponse(
  error: string,
  status: number = 500,
  code?: ErrorCode,
  additionalData?: Record<string, unknown>,
  requestId?: string
): NextResponse<ErrorResponse> {
  return NextResponse.json(
    {
      error,
      code,
      requestId,
      ...additionalData,
    },
    {
      status,
      headers: requestId ? { 'X-Request-ID': requestId } : undefined,
    }
  );
}

export function internalErrorResponse(
  message: string = 'Internal Server Error',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 500, 'INTERNAL_SERVER_ERROR', { requestId });
}

export function unauthorizedErrorResponse(
  message: string = 'Unauthorized',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 401, 'UNAUTHORIZED', { requestId });
}

export function forbiddenErrorResponse(
  message: string = 'Forbidden',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 403, 'FORBIDDEN', { requestId });
}

export function notFoundErrorResponse(
  resource: string = 'Resource',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(`${resource} not found`, 404, 'NOT_FOUND', { requestId });
}

export function badRequestErrorResponse(
  message: string = 'Bad Request',
  details?: Record<string, unknown>,
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 400, 'BAD_REQUEST', details, requestId);
}

export function validationErrorResponse(
  message: string = 'Validation Error',
  details?: Record<string, unknown>,
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 400, 'VALIDATION_ERROR', details, requestId);
}

export function conflictErrorResponse(
  message: string = 'Conflict',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 409, 'CONFLICT', { requestId });
}

export function paymentRequiredErrorResponse(
  details: Record<string, unknown>,
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse('Payment Required', 402, 'PAYMENT_REQUIRED', details, requestId);
}

export function paymentProcessingErrorResponse(
  message: string = 'Payment processing failed',
  requestId?: string
): NextResponse<ErrorResponse> {
  return errorResponse(message, 500, 'PAYMENT_PROCESSING_FAILED', { requestId });
}

export function generateRequestId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}
