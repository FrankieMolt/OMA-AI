/**
 * Alpha Vantage MCP (stock/FX/crypto market data)
 * Supports BYOK: users can add their ALPHA_VANTAGE_KEY in /settings/keys
 * Docs: https://www.alphavantage.co/documentation/
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
    const creds = getCredentialsForMCP(wallet, 'alpha-vantage');
    if (creds['ALPHA_VANTAGE_KEY']) { apiKey = creds['ALPHA_VANTAGE_KEY']; source = 'BYOK'; }
  }
  if (!apiKey && process.env.ALPHA_VANTAGE_KEY) { apiKey = process.env.ALPHA_VANTAGE_KEY; source = 'env'; }
  if (!apiKey) return NextResponse.json({ error: 'No Alpha Vantage API key. Get free key at alphavantage.co' }, { status: 401 });

  const base = 'https://www.alphavantage.co/query';

  try {
    switch (tool) {
      case 'get_quote': {
        const symbol = searchParams.get('symbol');
        if (!symbol) return NextResponse.json({ error: 'symbol required' }, { status: 400 });
        const url = base + '?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + apiKey;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        const q = data['Global Quote'] || {};
        return NextResponse.json({
          tool: 'get_quote', symbol, token_source: source,
          price: parseFloat(q['05. price'] || '0'),
          change: parseFloat(q['09. change'] || '0'),
          volume: parseInt(q['06. volume'] || '0', 10),
        });
      }
      case 'search_symbols': {
        const keywords = searchParams.get('keywords');
        if (!keywords) return NextResponse.json({ error: 'keywords required' }, { status: 400 });
        const url = base + '?function=SYMBOL_SEARCH&keywords=' + encodeURIComponent(keywords) + '&apikey=' + apiKey;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        const matches = (data.bestMatches || []) as Array<Record<string, string>>;
        return NextResponse.json({
          tool: 'search_symbols', keywords, token_source: source,
          results: matches.map((m) => ({ symbol: m['1. symbol'], name: m['2. name'], type: m['3. type'], region: m['4. region'] })),
        });
      }
      case 'get_intraday': {
        const symbol = searchParams.get('symbol');
        if (!symbol) return NextResponse.json({ error: 'symbol required' }, { status: 400 });
        const url = base + '?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=5min&apikey=' + apiKey;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        const series = data['Time Series (5min)'] as Record<string, Record<string, string>> || {};
        const keys = Object.keys(series).slice(0, 10);
        return NextResponse.json({
          tool: 'get_intraday', symbol, token_source: source,
          bars: keys.map((k) => ({ time: k, open: series[k]['1. open'], high: series[k]['2. high'], low: series[k]['3. low'], close: series[k]['4. close'], volume: series[k]['5. volume'] })),
        });
      }
      case 'get_crypto': {
        const fsym = searchParams.get('fsym') || 'BTC';
        const tsym = searchParams.get('tsym') || 'USD';
        const url = base + '?function=CURRENCY_EXCHANGE_RATE&from_currency=' + fsym + '&to_currency=' + tsym + '&apikey=' + apiKey;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        const data = await res.json();
        const fx = data['Realtime Currency Exchange Rate'] as Record<string, string> || {};
        return NextResponse.json({ tool: 'get_crypto', fsym, tsym, token_source: source, rate: parseFloat(fx['5. Exchange Rate'] || '0'), lastUpdated: fx['6. Last Refreshed'] });
      }
      default:
        return NextResponse.json({ available_tools: [
          { name: 'get_quote', params: ['symbol'], description: 'Get real-time quote for a stock or crypto symbol' },
          { name: 'search_symbols', params: ['keywords'], description: 'Search for stock/crypto symbols by keyword' },
          { name: 'get_intraday', params: ['symbol'], description: 'Intraday OHLCV data for a symbol' },
          { name: 'get_crypto', params: ['fsym', 'tsym'], description: 'Daily cryptocurrency data' },
        ]});
    }
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
