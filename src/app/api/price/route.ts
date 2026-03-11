import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coin = searchParams.get('coin') || 'bitcoin';

  const response = NextResponse.json({
    success: true,
    coin: coin,
    price_usd: coin === 'solana' ? 87.36 : coin === 'bonk' ? 0.00000589 : 0,
    change_24h: coin === 'solana' ? 2.5 : 0,
    last_updated: new Date().toISOString()
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');
  return response;
}
