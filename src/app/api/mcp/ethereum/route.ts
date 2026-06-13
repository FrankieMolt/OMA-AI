/**
 * Ethereum RPC MCP (via Alchemy)
 * Supports BYOK: users can add their ALCHEMY_API_KEY in /settings/keys
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCredentialsForMCP } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

function getAlchemyUrl(key: string) {
  return 'https://eth-mainnet.g.alchemy.com/v2/' + key;
}

async function alchemyRpc(key: string, method: string, params: unknown[] = []) {
  const res = await fetch(getAlchemyUrl(key), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    signal: AbortSignal.timeout(8000),
  });
  return res.json();
}

export async function GET(request: NextRequest) {
  const wallet = request.headers.get('x-wallet-address') || null;
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool') || '';

  let apiKey = '';
  let source = 'anonymous';
  if (wallet) {
    const creds = getCredentialsForMCP(wallet, 'ethereum');
    if (creds['ALCHEMY_API_KEY']) { apiKey = creds['ALCHEMY_API_KEY']; source = 'BYOK'; }
  }
  if (!apiKey && process.env.ALCHEMY_API_KEY) { apiKey = process.env.ALCHEMY_API_KEY; source = 'env'; }
  if (!apiKey) return NextResponse.json({ error: 'No Alchemy API key configured. Add one at /settings/keys or set ALCHEMY_API_KEY env var.' }, { status: 401 });

  try {
    switch (tool) {
      case 'eth_getBalance': {
        const addr = searchParams.get('address');
        if (!addr) return NextResponse.json({ error: 'address required' }, { status: 400 });
        const data = await alchemyRpc(apiKey, 'eth_getBalance', [addr, 'latest']);
        const wei = parseInt(data.result || '0x0', 16);
        return NextResponse.json({ tool: 'eth_getBalance', address: addr, token_source: source, wei, eth: wei / 1e18 });
      }
      case 'eth_call': {
        const to = searchParams.get('to');
        const data = searchParams.get('data') || '0x';
        if (!to) return NextResponse.json({ error: 'to (contract address) required' }, { status: 400 });
        const result = await alchemyRpc(apiKey, 'eth_call', [{ to, data }, 'latest']);
        return NextResponse.json({ tool: 'eth_call', to, data, token_source: source, result: result.result || null });
      }
      case 'eth_getLogs': {
        const address = searchParams.get('address');
        const fromBlock = searchParams.get('fromBlock') || '0x0';
        const toBlock = searchParams.get('toBlock') || 'latest';
        const topics = searchParams.get('topics') ? searchParams.get('topics')!.split(',') : [];
        const args: Record<string, unknown> = { fromBlock, toBlock };
        if (address) args.address = address;
        if (topics.length) args.topics = topics;
        const result = await alchemyRpc(apiKey, 'eth_getLogs', [args]);
        return NextResponse.json({ tool: 'eth_getLogs', token_source: source, logs: result.result || [], count: (result.result || []).length });
      }
      case 'eth_getTransactionReceipt': {
        const txHash = searchParams.get('txHash');
        if (!txHash) return NextResponse.json({ error: 'txHash required' }, { status: 400 });
        const result = await alchemyRpc(apiKey, 'eth_getTransactionReceipt', [txHash]);
        return NextResponse.json({ tool: 'eth_getTransactionReceipt', txHash, token_source: source, receipt: result.result || null });
      }
      case 'eth_sendRawTransaction': {
        const signedTx = searchParams.get('signedTx');
        if (!signedTx) return NextResponse.json({ error: 'signedTx required' }, { status: 400 });
        const result = await alchemyRpc(apiKey, 'eth_sendRawTransaction', [signedTx]);
        return NextResponse.json({ tool: 'eth_sendRawTransaction', token_source: source, txHash: result.result || null, error: result.error?.message });
      }
      default:
        return NextResponse.json({ available_tools: [
          { name: 'eth_getBalance', params: ['address'], description: 'Get ETH balance for a wallet address' },
          { name: 'eth_call', params: ['to', 'data'], description: 'Call a read-only function on a smart contract' },
          { name: 'eth_getLogs', params: ['address', 'fromBlock', 'toBlock', 'topics'], description: 'Get historical event logs from a contract' },
          { name: 'eth_getTransactionReceipt', params: ['txHash'], description: 'Get receipt for a transaction' },
          { name: 'eth_sendRawTransaction', params: ['signedTx'], description: 'Broadcast a signed transaction to the network' },
        ]});
    }
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
