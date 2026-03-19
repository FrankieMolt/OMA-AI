/**
 * CORS Middleware
 *
 * Shared CORS headers for all API routes
 * Eliminates duplication across 34+ API files
 */

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
} as const;

export function applyCORS(response: NextResponse): NextResponse {
  const newResponse = new NextResponse(response.body, response);
  
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  
  return newResponse;
}

export function handleCORSRequest(request: Request): Response | null {
  // Handle OPTIONS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: CORS_HEADERS,
    });
  }

  return null;
}

// Next.js 15 imports
import { NextResponse } from 'next/server';
