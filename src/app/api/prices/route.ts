import { NextResponse } from 'next/server';

const HELIUS_RPC = process.env.HELIUS_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=' + (process.env.HELIUS_API_KEY || '');

// Token mint addresses for price lookup
const TOKENS = {
  sol: 'So11111111111111111111111111111111111111112',
  bonk: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',  // BONK
  jup: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', // Jupiter
  ray: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6',     // Raydium
};

export const dynamic = 'force-dynamic';
const CACHE = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL_MS = 30_000; // 30 seconds

async function getDexPrice(mint: string): Promise<{ price: number; change24h: number } | null> {
  try {
    const response = await fetch(HELIUS_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'oma-prices',
        method: 'getAsset',
        params: { id: mint },
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const price = parseFloat(data?.result?.price_info?.price_per_token || 0);
    return { price, change24h: 0 };
  } catch {
    return null;
  }
}

async function getSolPrice(): Promise<{ price: number; change24h: number }> {
  // Try CoinGecko first (free, no key)
  try {
    const cg = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true',
      { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(5000) }
    );
    if (cg.ok) {
      const data = await cg.json();
      return {
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
      };
    }
  } catch {}

  // Fallback: use Helius DEX ticker or return cached
  const cached = CACHE.get('sol');
  if (cached) return cached.data as { price: number; change24h: number };
  return { price: 0, change24h: 0 };
}

async function getMultiPrices(): Promise<Record<string, { price: number; change_24h: number }>> {
  // Try CoinGecko (may fail with rate limit)
  try {
    const cg = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana,bonk,jup-launchpad,raydium&vs_currencies=usd&include_24hr_change=true',
      { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(5000) }
    );
    if (cg.ok) {
      const data = await cg.json();
      return {
        sol: { price: data.solana?.usd || 0, change_24h: data.solana?.usd_24h_change || 0 },
        bonk: { price: data.bonk?.usd || 0, change_24h: data.bonk?.usd_24h_change || 0 },
        jup: { price: data['jup-launchpad']?.usd || 0, change_24h: data['jup-launchpad']?.usd_24h_change || 0 },
        ray: { price: data.raydium?.usd || 0, change_24h: data.raydium?.usd_24h_change || 0 },
      };
    }
  } catch {}

  // Fallback: use cached data or return zeros
  const prices: Record<string, { price: number; change_24h: number }> = {};
  for (const [sym, mint] of Object.entries(TOKENS)) {
    const cached = CACHE.get(sym);
    if (cached) {
      prices[sym] = cached.data as { price: number; change_24h: number };
    } else {
      const dex = await getDexPrice(mint);
      prices[sym] = { price: dex?.price || 0, change_24h: dex?.change24h || 0 };
    }
  }
  return prices;
}

export async function GET() {
  try {
    // Check cache first
    const cached = CACHE.get('multi');
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
      const res = NextResponse.json({
        success: true,
        cached: true,
        prices: cached.data,
        last_updated: new Date(cached.ts).toISOString(),
      });
      res.headers.set('Access-Control-Allow-Origin', '*');
      res.headers.set('Cache-Control', 'public, max-age=30');
      return res;
    }

    const prices = await getMultiPrices();

    // Cache the result
    CACHE.set('multi', { data: prices, ts: Date.now() });

    const res = NextResponse.json({
      success: true,
      cached: false,
      prices,
      last_updated: new Date().toISOString(),
    });
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Cache-Control', 'public, max-age=30');
    return res;
  } catch (error) {
    console.error('Prices API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch prices' }, { status: 500 });
  }
}
