import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { success: false, error: 'Query parameter required' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    data: {
      query,
      results: [
        {
          title: 'Example result for: ' + query,
          url: 'https://example.com',
          snippet: 'This is a placeholder result...'
        }
      ],
      total: 1
    },
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
  return response;
}
