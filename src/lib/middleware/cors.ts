/**
 * CORS Middleware
 *
 * Shared CORS headers for all API routes
 * Eliminates duplication across 34+ API files
 */

import type { NextApiResponse } from 'next';

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
} as const;

export function applyCORS(res: NextApiResponse): void {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

export function handleCORSRequest(res: NextApiResponse): boolean {
  if (res.writableEnded) {
    return false;
  }

  applyCORS(res);

  // Handle OPTIONS preflight
  const { method } = res.req as any;
  if (method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  return false;
}
