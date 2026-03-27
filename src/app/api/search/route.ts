import { NextResponse } from 'next/server';
import type { SearchResult } from '@/lib/types';

interface SearxngResult {
  title: string;
  url: string;
  content?: string;
  snippet?: string;
  engine?: string;
  score?: number;
}

export const dynamic = 'force-dynamic';

const SEARXNG_URL = process.env.SEARXNG_URL || 'http://searxng-local:8899';

/**
 * Fetch search results from SearXNG JSON API (no auth — works when limiter is off).
 */
async function fetchSearxngJSON(query: string, limit: number): Promise<SearxngResult[] | null> {
  try {
    const url = `${SEARXNG_URL}/search?q=${encodeURIComponent(query)}&format=json`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; OMA-AI/1.0)',
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return (data.results || []).slice(0, limit).map((r: SearxngResult) => ({
      title: r.title,
      url: r.url,
      snippet: r.content || r.snippet || '',
      engine: r.engine,
      score: r.score
    }));
  } catch {
    return null;
  }
}

/**
 * Parse search results from SearXNG HTML page.
 * Used as fallback when JSON API is unavailable.
 */
async function fetchSearxngHTML(query: string, limit: number): Promise<SearxngResult[]> {
  try {
    const url = `${SEARXNG_URL}/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: { 'Accept': 'text/html', 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];

    const html = await response.text();
    const results: SearxngResult[] = [];
    const seen = new Set<string>();

    // Parse <article class="result"> blocks
    const articleRegex = /<article[^>]*class="result[^"]*"[\s\S]*?<a[^>]*href="(https?:\/\/[^"]+)"[^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
    let match;
    while ((match = articleRegex.exec(html)) !== null && results.length < limit) {
      const url = match[1];
      const title = match[2].replace(/<[^>]+>/g, '').trim();
      const snippet = match[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      if (url && !seen.has(url)) {
        seen.add(url);
        results.push({ title, url, snippet: snippet.slice(0, 300), engine: 'searxng-html' });
      }
    }

    // Fallback: simple link extraction
    if (results.length === 0) {
      const linkRegex = /<a[^>]+href="(https?:\/\/(?!searxng|localhost)[^"]{10,})"[^>]*>([^<]{5,100})<\/a>/gi;
      while ((match = linkRegex.exec(html)) !== null && results.length < limit) {
        const url = match[1];
        const title = match[2].replace(/<[^>]+>/g, '').trim();
        if (!seen.has(url) && title.length > 5) {
          seen.add(url);
          results.push({ title, url, snippet: '', engine: 'searxng-html' });
        }
      }
    }

    return results;
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json({ success: false, error: 'Query parameter required' }, { status: 400 });
  }

  // Try JSON first, then HTML parsing
  let results = await fetchSearxngJSON(query, limit);
  let engine = 'searxng-json';
  if (!results || results.length === 0) {
    results = await fetchSearxngHTML(query, limit);
    engine = 'searxng-html';
  }

  // Final curated fallback
  if (!results || results.length === 0) {
    results = getCuratedFallback(query);
    engine = 'curated';
  }

  return NextResponse.json({
    success: true,
    data: { query, results, total: results.length, engine },
  });
}

function getCuratedFallback(query: string): SearchResult[] {
  const q = query.toLowerCase();
  if (q.includes('solana') || q.includes('crypto') || q.includes('defi') || q.includes('trading')) {
    return [
      { title: 'Solana Docs — Official Developer Documentation', url: 'https://docs.solana.com', snippet: 'Official Solana blockchain documentation for developers.', engine: 'curated' },
      { title: 'Jupiter Aggregator — DEX Swaps on Solana', url: 'https://jup.ag', snippet: 'Swap any Solana SPL token with the best prices via Jupiter.', engine: 'curated' },
      { title: 'Pump.fun — Token Launchpad on Solana', url: 'https://pump.fun', snippet: 'Launch and trade new meme coins on Solana.', engine: 'curated' },
      { title: 'Helius — Solana RPC & Developer Platform', url: 'https://helius.xyz', snippet: 'Enterprise-grade Solana infrastructure.', engine: 'curated' },
      { title: 'OMA-AI — MCP Marketplace', url: 'https://www.oma-ai.com', snippet: 'Discover and integrate AI agent tools and MCP servers.', engine: 'curated' },
    ];
  }
  return [
    { title: 'OMA-AI — AI Agent Tools Marketplace', url: 'https://www.oma-ai.com', snippet: 'Your AI agent tools marketplace on Solana.', engine: 'curated' },
    { title: 'Google Search', url: `https://www.google.com/search?q=${encodeURIComponent(query)}`, snippet: 'Search the web for more results.', engine: 'curated' },
  ];
}
