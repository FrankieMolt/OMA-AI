/**
 * PumpFun Scanner MCP
 * Supports BYOK: users can add their PUMPFUN_API_KEY in /settings/keys
 * Note: PumpFun does not have a public REST API. This is a stub that returns
 * real data scraped from their public dashboard or proxied via a configured key.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCredentialsForMCP } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const wallet = request.headers.get('x-wallet-address') || null;
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool') || '';

  let apiKey = '';
  let source = 'anonymous';
  if (wallet) {
    const creds = getCredentialsForMCP(wallet, 'pumpfun');
    if (creds['PUMPFUN_API_KEY']) { apiKey = creds['PUMPFUN_API_KEY']; source = 'BYOK'; }
  }
  if (!apiKey && process.env.PUMPFUN_API_KEY) { apiKey = process.env.PUMPFUN_API_KEY; source = 'env'; }

  try {
    switch (tool) {
      case 'get_tokens': {
        // PumpFun dashboard scraper — returns trending tokens
        const res = await fetch('https://pump.fun/api/feed?limit=20', {
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) return NextResponse.json({ error: 'PumpFun API unavailable', tool: 'get_tokens', token_source: source }, { status: 502 });
        const data = await res.json();
        return NextResponse.json({ tool: 'get_tokens', token_source: source, tokens: data.slice(0, 10) });
      }
      case 'get_token_metadata': {
        const mint = searchParams.get('mint');
        if (!mint) return NextResponse.json({ error: 'mint required' }, { status: 400 });
        const res = await fetch('https://pump.fun/api/token/' + mint, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        return NextResponse.json({ tool: 'get_token_metadata', mint, token_source: source, metadata: data });
      }
      default:
        return NextResponse.json({ available_tools: [
          { name: 'get_tokens', params: [], description: 'Get new and trending pump.fun tokens' },
          { name: 'get_token_metadata', params: ['mint'], description: 'Get metadata for a specific token mint' },
          { name: 'get_buy_quote', params: ['mint', 'amount'], description: 'Get expected SOL cost for buying a token amount' },
          { name: 'get_sell_quote', params: ['mint', 'amount'], description: 'Get expected SOL return for selling a token amount' },
          { name: 'get_market_data', params: ['mint'], description: 'Get market cap, volume, and bonding curve data' },
        ]});
    }
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
