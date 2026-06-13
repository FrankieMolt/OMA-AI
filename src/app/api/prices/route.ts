import { NextResponse } from 'next/server';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const TOKENS: Record<string, string> = {
  sol: 'solana',
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
};

export const dynamic = 'force-dynamic';
const CACHE = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL_MS = 30_000;

async function getPrice(coinId: string) {
  try {
    const cg = await fetch(
      COINGECKO_API + '/simple/price?ids=' + coinId + '&vs_currencies=usd&include_24hr_change=true',
      { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(5000) }
    );
    if (cg.ok) {
      const data = await cg.json();
      const pd = data[coinId];
      return { price: pd?.usd || 0, change24h: pd?.usd_24h_change || 0 };
    }
  } catch {}
  return { price: 0, change24h: 0 };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const coinsParam = searchParams.get('coins') || 'solana';
  const coins = coinsParam.split(',').map(c => c.trim().toLowerCase());

  const cacheKey = coinsParam;
  const cached = CACHE.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return NextResponse.json({ success: true, source: 'cache', ...cached.data as object });
  }

  const results: Record<string, { usd: number; change_24h: number }> = {};
  for (const coin of coins) {
    const coinId = TOKENS[coin] || coin;
    const pd = await getPrice(coinId);
    results[coin] = { usd: pd.price, change_24h: pd.change24h };
  }

  const payload = { prices: results };
  CACHE.set(cacheKey, { data: payload, ts: Date.now() });
  return NextResponse.json({ success: true, source: 'coingecko', last_updated: new Date().toISOString(), ...payload });
}
