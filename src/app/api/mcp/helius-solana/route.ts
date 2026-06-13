/**
 * Helius Solana MCP
 * Supports BYOK: users can add their HELIUS_API_KEY in /settings/keys
 * Falls back to Helius public free tier (no API key required) for basic reads.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCredentialsForMCP } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

// Helius public free tier endpoint — allows basic reads without API key
const HELIUS_PUBLIC_URL = 'https://mainnet.helius-rpc.com/?api-key=free-tier';

function getHeliusUrl(key: string) {
  return `https://mainnet.helius-rpc.com/?api-key=${key}`;
}

async function heliusFetch(key: string, body: object) {
  return fetch(getHeliusUrl(key), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function makeRpc(id: string, method: string, params: unknown[]) {
  return { jsonrpc: '2.0', id, method, params };
}

export async function GET(request: NextRequest) {
  const wallet = request.headers.get('x-wallet-address') || null;
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool') || '';

  // Get API key: BYOK → env → public free tier (anonymous)
  let apiKey = '';
  let source = 'anonymous';
  if (wallet) {
    const creds = getCredentialsForMCP(wallet, 'helius-solana');
    if (creds['HELIUS_API_KEY']) {
      apiKey = creds['HELIUS_API_KEY'];
      source = 'BYOK';
    }
  }
  if (!apiKey && process.env.HELIUS_API_KEY) {
    apiKey = process.env.HELIUS_API_KEY;
    source = 'env';
  }

  // Determine endpoint: use key if available, otherwise public free tier
  const endpointKey = apiKey || 'free-tier';

  async function doRpc(method: string, params: unknown[]) {
    const body = makeRpc('oma-helius', method, params);
    return heliusFetch(endpointKey, body);
  }

  try {
    switch (tool) {
      case 'get_balance': {
        const addr = searchParams.get('address');
        if (!addr) return NextResponse.json({ error: 'address required' }, { status: 400 });
        const res = await doRpc('getBalance', [addr]);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_balance', address: addr, token_source: source,
          lamports: data.result || 0,
          sol: (data.result || 0) / 1e9,
        });
      }
      case 'get_signatures_for_address': {
        const addr = searchParams.get('address');
        const limit = parseInt(searchParams.get('limit') || '10');
        if (!addr) return NextResponse.json({ error: 'address required' }, { status: 400 });
        const res = await doRpc('getSignaturesForAddress', [addr, { limit }]);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_signatures_for_address', address: addr, token_source: source,
          signatures: (data.result || []).map((s: Record<string, unknown>) => ({
            signature: s.signature,
            slot: s.slot,
            timestamp: s.blockTime,
            type: s.err ? 'failed' : 'success',
          })),
        });
      }
      case 'get_transaction': {
        const sig = searchParams.get('signature');
        if (!sig) return NextResponse.json({ error: 'signature required' }, { status: 400 });
        const res = await doRpc('getTransaction', [sig, { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }]);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_transaction', signature: sig, token_source: source,
          slot: data.result?.slot,
          blockTime: data.result?.blockTime,
          err: data.result?.meta?.err || null,
          fee: data.result?.meta?.fee,
        });
      }
      case 'get_block': {
        const slot = parseInt(searchParams.get('slot') || '0');
        const res = await doRpc('getBlock', [slot, { encoding: 'json', maxSupportedTransactionVersion: 0 }]);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_block', slot, token_source: source,
          blockhash: data.result?.blockhash,
          parentSlot: data.result?.parentSlot,
          transactions: data.result?.transactions?.length || 0,
        });
      }
      case 'get_token_accounts': {
        const addr = searchParams.get('address');
        if (!addr) return NextResponse.json({ error: 'address required' }, { status: 400 });
        const res = await doRpc('getTokenAccountsByOwner', [
          addr,
          { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
          { encoding: 'jsonParsed' },
        ]);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_token_accounts', address: addr, token_source: source,
          accounts: (data.result?.value || []).map((a: Record<string, unknown>) => ({
            mint: (a.account as Record<string, unknown>)?.data as Record<string, unknown> || {},
            amount: ((a.account as Record<string, unknown>)?.data as Record<string, unknown>)?.parsed as Record<string, unknown> || {},
          })),
        });
      }
      case 'get_recent_blockhash': {
        const res = await doRpc('getLatestBlockhash', []);
        const data = await res.json();
        return NextResponse.json({
          tool: 'get_recent_blockhash', token_source: source,
          blockhash: data.result?.value?.blockhash,
          lastValidBlockHeight: data.result?.value?.lastValidBlockHeight,
        });
      }
      default:
        return NextResponse.json({
          token_source: source,
          available_tools: [
            { name: 'get_balance', params: ['address'], description: 'Get SOL balance for a wallet' },
            { name: 'get_signatures_for_address', params: ['address', 'limit'], description: 'Get recent transactions for a wallet' },
            { name: 'get_transaction', params: ['signature'], description: 'Get details for a specific transaction' },
            { name: 'get_block', params: ['slot'], description: 'Get confirmed block information' },
            { name: 'get_token_accounts', params: ['address'], description: 'Get SPL token holdings for a wallet' },
            { name: 'get_recent_blockhash', params: [], description: 'Get latest blockhash information' },
          ],
        });
    }
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
