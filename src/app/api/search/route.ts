import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const SEARXNG_URL = process.env.SEARXNG_URL || 'http://localhost:8899';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${SEARXNG_URL}/search?q=${encodeURIComponent(query)}&format=json`, {
      headers: {
        'Accept': 'application/json'
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`SearXNG error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform SearXNG results to OMA-AI format
    const results = (data.results || []).slice(0, limit).map((r: any) => ({
      title: r.title,
      url: r.url,
      snippet: r.content || r.snippet || '',
      engine: r.engine,
      score: r.score
    }));

    return NextResponse.json({
      success: true,
      data: {
        query,
        results,
        total: results.length,
        engines: data.engines || []
      },
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch search results',
      fallback: true,
      data: {
        query,
        results: [
          {
            title: 'Search Error Fallback',
            url: 'https://oma-ai.com',
            snippet: 'The local search engine is currently unreachable. Please try again later.'
          }
        ]
      }
    }, { status: 500 });
  }
}
