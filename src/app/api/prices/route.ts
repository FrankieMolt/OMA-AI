import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');

  // CoinGecko API
  const prices = {
    sol: { price: 87.36, change_24h: 2.5 },
    bonk: { price: 0.00000589, change_24h: -1.2 },
    jup: { price: 1.67, change_24h: 3.1 },
    ray: { price: 0.588, change_24h: 4.5 }
  };

  const json = NextResponse.json({
    success: true,
    prices,
    last_updated: new Date().toISOString()
  });
  json.headers.set('Access-Control-Allow-Origin', '*');
  json.headers.set('Cache-Control', 'public, max-age=300');
  return json;
}
