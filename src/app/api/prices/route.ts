import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana,bonk,jup,raydium&vs_currencies=usd&include_24hr_change=true',
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();

    const prices = {
      sol: { price: data.solana?.usd || 0, change_24h: data.solana?.usd_24h_change || 0 },
      bonk: { price: data.bonk?.usd || 0, change_24h: data.bonk?.usd_24h_change || 0 },
      jup: { price: data.jup?.usd || 0, change_24h: data.jup?.usd_24h_change || 0 },
      ray: { price: data.raydium?.usd || 0, change_24h: data.raydium?.usd_24h_change || 0 }
    };

    const json = NextResponse.json({
      success: true,
      prices,
      last_updated: new Date().toISOString()
    });
    json.headers.set('Access-Control-Allow-Origin', '*');
    json.headers.set('Cache-Control', 'public, max-age=300');
    return json;
  } catch (error) {
    console.error('Price API error:', error);
    const json = NextResponse.json({
      success: false,
      error: "Failed to fetch prices"
    }, { status: 500 });
    json.headers.set('Access-Control-Allow-Origin', '*');
    return json;
  }
}
