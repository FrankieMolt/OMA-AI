import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'SOL';

    const prices: Record<string, { price: number; change_24h: number }> = {
      SOL: { price: 87.36, change_24h: 2.5 },
      BTC: { price: 67500, change_24h: 2.1 },
      ETH: { price: 3450, change_24h: 1.8 },
      BONK: { price: 0.00000589, change_24h: -1.2 },
      JUP: { price: 1.67, change_24h: 3.1 },
      RAY: { price: 0.588, change_24h: 4.5 }
    };

    const upperSymbol = symbol.toUpperCase();
    const data = prices[upperSymbol] || { price: 0, change_24h: 0 };

    const response = NextResponse.json({
      success: !!prices[upperSymbol],
      symbol: upperSymbol,
      price: data.price,
      change_24h: data.change_24h,
      last_updated: new Date().toISOString()
    });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=30');
    return response;
  } catch (error) {
    console.error('[GET /api/price] error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
