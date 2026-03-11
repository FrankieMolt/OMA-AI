import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  const { name, slug, category, description, author, pricing_usdc, x402_enabled } = body;

  if (!name || !slug || !category || !description || !author) {
    return NextResponse.json(
      { error: 'Missing required fields: name, slug, category, description, author' },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    message: 'MCP skill registered successfully',
    data: {
      id: Date.now().toString(),
      name,
      slug,
      category: Array.isArray(category) ? category : [category],
      description,
      author,
      pricing_usdc: pricing_usdc || 0,
      x402_enabled: x402_enabled || false,
      verified: false,
      rating: 0,
      total_calls: 0,
      success_rate: 0,
      created_at: new Date().toISOString()
    }
  });
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}
