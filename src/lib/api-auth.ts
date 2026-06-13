import { NextRequest, NextResponse } from 'next/server';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || '';

export function requireAuth(request: NextRequest): { authorized: boolean; error?: NextResponse } {
  if (!ADMIN_API_KEY) {
    return { authorized: true }; // No key configured = open (dev mode)
  }
  
  const authHeader = request.headers.get('authorization');
  const apiKey = authHeader?.replace('Bearer ', '');
  
  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return {
      authorized: false,
      error: NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      ),
    };
  }
  
  return { authorized: true };
}
