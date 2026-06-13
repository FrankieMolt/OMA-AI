/**
 * Jupiter DEX MCP
 * Supports BYOK: users can add their JUPITER_API_KEY in /settings/keys
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
    const creds = getCredentialsForMCP(wallet, 'jupiter-dex');
    if (creds['JUPITER_API_KEY']) { apiKey = creds['JUPITER_API_KEY']; source = 'BYOK'; }
  }
  if (!apiKey && process.env.JUPITER_API_KEY) { apiKey = process.env.JUPITER_API_KEY; source = 'env'; }

  async function jupiterGet(path: string): Promise<Response> {
    const hasKey = apiKey ? '&apiKey=' + apiKey : '';
    const url = 'https://quote-api.jup.ag/v6' + path + hasKey;
    return fetch(url, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
  }

  try {
    switch (tool) {
      case 'get_price': {
        const mint = searchParams.get('mint');
        if (!mint) return NextResponse.json({ error: 'mint required' }, { status: 400 });
        const res = await jupiterGet('/price?ids=' + mint);
        if (!res.ok) return NextResponse.json({ error: 'Jupiter API error', status: res.status, token_source: source }, { status: 502 });
        const data = await res.json().catch(() => ({}));
        const p = data?.data?.[mint];
        return NextResponse.json({ tool: 'get_price', mint, token_source: source, price: p?.price ?? 0 });
      }
      case 'get_quote': {
        const inputMint = searchParams.get('inputMint') || 'So11111111111111111111111111111111111111112';
        const outputMint = searchParams.get('outputMint');
        const amount = searchParams.get('amount') || '1000000';
        const slippage = searchParams.get('slippage') || '0.5';
        if (!outputMint) return NextResponse.json({ error: 'outputMint required' }, { status: 400 });
        const slippageBps = Math.round(parseFloat(slippage) * 100);
        const res = await jupiterGet('/quote?inputMint=' + inputMint + '&outputMint=' + outputMint + '&amount=' + amount + '&slippageBps=' + slippageBps);
        if (!res.ok) return NextResponse.json({ error: 'Quote failed', status: res.status, token_source: source }, { status: 502 });
        const d = await res.json().catch(() => ({}));
        return NextResponse.json({ tool: 'get_quote', inputMint, outputMint, token_source: source, inAmount: d.inAmount, outAmount: d.outAmount, priceImpactPct: d.priceImpactPct });
      }
      case 'get_swap_instructions': {
        const inputMint = searchParams.get('inputMint') || 'So11111111111111111111111111111111111111112';
        const outputMint = searchParams.get('outputMint');
        const amount = searchParams.get('amount') || '1000000';
        const walletStr = searchParams.get('wallet');
        if (!outputMint || !walletStr) return NextResponse.json({ error: 'outputMint and wallet required' }, { status: 400 });
        const res = await jupiterGet('/swap?inputMint=' + inputMint + '&outputMint=' + outputMint + '&amount=' + amount + '&userWallet=' + walletStr + '&slippageBps=50');
        if (!res.ok) return NextResponse.json({ error: 'Swap instruction failed', status: res.status, token_source: source }, { status: 502 });
        const d = await res.json().catch(() => ({}));
        return NextResponse.json({ tool: 'get_swap_instructions', token_source: source, swapMode: d.swapMode, lastValidBlockHeight: d.lastValidBlockHeight });
      }
      case 'get_tokens': {
        const res = await fetch('https://token.jup.ag/strict', { headers: { 'Accept': 'application/json' }, signal: AbortSignal.timeout(8000) });
        if (!res.ok) return NextResponse.json({ error: 'Token list failed', token_source: source }, { status: 502 });
        const data = await res.json().catch(() => []);
        return NextResponse.json({ tool: 'get_tokens', token_source: source, count: Array.isArray(data) ? data.length : 0 });
      }
      default:
        return NextResponse.json({ available_tools: [
          { name: 'get_price', params: ['mint'], description: 'Get price for Solana tokens' },
          { name: 'get_quote', params: ['inputMint', 'outputMint', 'amount', 'slippage'], description: 'Get swap quote with price impact' },
          { name: 'get_swap_instructions', params: ['inputMint', 'outputMint', 'amount', 'wallet'], description: 'Get transaction instructions for a swap' },
          { name: 'get_tokens', params: [], description: 'List trending and new Solana tokens' },
        ]});
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Internal error', detail: msg, token_source: source }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
