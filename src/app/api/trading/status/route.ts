import { NextResponse } from 'next/server';

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
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Trading status API error:', error);
    return NextResponse.json({
      solBalance: 0,
      positions: {},
      dailyTrades: 0,
      signals: {}
    }, { status: 500 });
  }
}
