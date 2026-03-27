import { NextResponse } from 'next/server';

type SuccessResponse<T> = { success: true; data: T; meta?: Record<string, unknown> };
type ErrorResponse = { success: false; error: string; code?: string };
type ApiSuccessResponse<T> = NextResponse<SuccessResponse<T>>;
type ApiErrorResponse = NextResponse<ErrorResponse>;

export function apiSuccess<T>(data: T, status = 200, meta?: Record<string, unknown>): ApiSuccessResponse<T> {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
}

export function apiError(message: string, status = 400, code?: string): ApiErrorResponse {
  return NextResponse.json({ success: false, error: message, ...(code ? { code } : {}) }, { status });
}

export function apiServerError(message = 'Internal server error'): ApiErrorResponse {
  return NextResponse.json({ success: false, error: message }, { status: 500 });
}
