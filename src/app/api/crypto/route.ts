import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coins = searchParams.get('coins') || 'bitcoin,ethereum,solana';

  const response = NextResponse.json({
    success: true,
    coins: coins.split(','),
    prices: {
      bitcoin: { usd: 67500, change_24h: 2.1 },
      ethereum: { usd: 3450, change_24h: 1.8 },
      solana: { usd: 87.36, change_24h: 2.5 },
      bonk: { usd: 0.00000589, change_24h: -1.2 }
    },
    last_updated: new Date().toISOString()
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
