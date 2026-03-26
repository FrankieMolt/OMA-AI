import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/mcp`, {
      headers: { 'User-Agent': 'OMA-AI-API-Proxy/1.0' }
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('[GET /api/mcps] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Failed to fetch MCPS' },
      { status: 500 }
    );
  }
}
