import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json(
      { error: 'Text parameter required' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    embedding: Array(1536).fill(0).map(() => Math.random() - 0.5),
    model: 'text-embedding-ada-002',
    dimensions: 1536
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'no-cache');
  return response;
}
