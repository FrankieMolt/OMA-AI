import { NextResponse } from 'next/server';

// Real CoinGecko API integration
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const COIN_IDS: Record<string, string> = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  solana: 'solana',
  bonk: 'bonk',
  jup: 'jupiter-exchange-solana',
  raydium: 'raydium',
  chain: 'chaincoin',
  msol: 'marinade-finance',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinsParam = searchParams.get('coins') || 'bitcoin,ethereum,solana';
  const coins = coinsParam.split(',').map(c => c.trim().toLowerCase());
  
  try {
    // Map coin symbols to CoinGecko IDs
    const coinIds = coins
      .map(coin => COIN_IDS[coin] || coin)
      .join(',');
    
    // Fetch real prices from CoinGecko
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`,
      { 
        next: { revalidate: 60 } // Cache for 60 seconds
      }
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform to our response format
    const prices: Record<string, { usd: number; change_24h: number }> = {};
    for (const coin of coins) {
      const geckoId = COIN_IDS[coin] || coin;
      if (data[geckoId]) {
        prices[coin] = {
          usd: data[geckoId].usd,
          change_24h: data[geckoId].usd_24h_change || 0
        };
      }
    }
    
    const responseJson = NextResponse.json({
      success: true,
      coins,
      prices,
      last_updated: new Date().toISOString(),
      source: 'coingecko'
    });
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    responseJson.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return responseJson;
    
  } catch (error) {
    console.error('Crypto API error:', error);
    
    const responseJson = NextResponse.json({
      success: false,
      error: 'Failed to fetch crypto prices',
      coins,
      prices: {},
      last_updated: new Date().toISOString()
    }, { status: 503 });
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    return responseJson;
  }
}
