import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : (process.env.FRONTEND_URL || 'https://www.oma-ai.com');
    const response = await fetch(`${baseUrl}/api/prices`, {
      headers: { 'User-Agent': 'OMA-AI-API-Proxy/1.0' }
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[GET /api/pricing] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pricing' },
      { status: 500 }
    );
  }
}
