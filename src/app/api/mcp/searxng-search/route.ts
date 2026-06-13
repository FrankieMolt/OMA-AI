/**
 * SearXNG Web Search MCP
 * Supports BYOK: users can add their SEARXNG_API_KEY in /settings/keys
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCredentialsForMCP } from '@/lib/credentials';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const wallet = request.headers.get('x-wallet-address') || null;
  const { searchParams } = new URL(request.url);
  const tool = searchParams.get('tool') || '';
  const query = searchParams.get('query') || '';
  const limit = parseInt(searchParams.get('limit') || '10');

  let apiKey = '';
  let source = 'anonymous';
  if (wallet) {
    const creds = getCredentialsForMCP(wallet, 'searxng-search');
    if (creds['SEARXNG_API_KEY']) { apiKey = creds['SEARXNG_API_KEY']; source = 'BYOK'; }
  }
  if (!apiKey && process.env.SEARXNG_API_KEY) { apiKey = process.env.SEARXNG_API_KEY; source = 'env'; }

  const searxUrl = process.env.SEARXNG_URL || 'http://localhost:9999';

  try {
    switch (tool) {
      case 'search': {
        if (!query) return NextResponse.json({ error: 'query required' }, { status: 400 });
        const url = searxUrl + '/search?q=' + encodeURIComponent(query) + '&format=json&engines=google,bing,wikipedia';
        const headers: Record<string, string> = { 'Accept': 'application/json' };
        if (apiKey) headers['X-API-Key'] = apiKey;
        const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
        const data = await res.json();
        const results = (data.results || []).slice(0, limit);
        return NextResponse.json({
          tool: 'search', query, token_source: source,
          results: results.map((r: { title?: string; url?: string; content?: string }) => ({ title: r.title, url: r.url, snippet: r.content || '' })),
        });
      }
      case 'fetch_url': {
        const targetUrl = searchParams.get('url');
        if (!targetUrl) return NextResponse.json({ error: 'url required' }, { status: 400 });
        const res = await fetch(targetUrl, { signal: AbortSignal.timeout(10000) });
        const text = await res.text();
        const snippet = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 500);
        return NextResponse.json({ tool: 'fetch_url', url: targetUrl, token_source: source, snippet });
      }
      default:
        return NextResponse.json({ available_tools: [
          { name: 'search', params: ['query', 'limit'], description: 'Search the web (returns results with titles, URLs, snippets)' },
          { name: 'fetch_url', params: ['url'], description: 'Fetch and extract content from a URL' },
        ]});
    }
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }); }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
}
