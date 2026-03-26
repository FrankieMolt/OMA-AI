import { NextResponse } from 'next/server';

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://www.oma-ai.com';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('http://localhost:3008/api/status', {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch trading status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': FRONTEND_URL
      }
    });
  } catch (error) {
    console.error('Trading status API error:', error);
    const response = NextResponse.json({
      success: false,
      error: "Trading bot integration coming soon"
    }, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', FRONTEND_URL);
    return response;
  }
}
