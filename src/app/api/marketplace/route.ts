import { NextResponse } from 'next/server';
import { MARKETPLACE_MCPS, CATEGORIES } from '@/lib/mcp-data';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Build response from static data (always works, no external deps)
    const mcps = MARKETPLACE_MCPS;
    const totalMCPs = mcps.length;
    const totalTools = mcps.reduce((sum, m) => sum + m.tools_count, 0);
    const avgRating = (
      mcps.filter(m => m.rating > 0).reduce((sum, m) => sum + m.rating, 0) /
      mcps.filter(m => m.rating > 0).length
    ).toFixed(1);

    const trending = [...mcps]
      .sort((a, b) => b.calls - a.calls)
      .slice(0, 5)
      .map(m => ({ id: m.id, name: m.name, slug: m.slug, category: m.category, calls: m.calls, rating: m.rating }));

    const response = NextResponse.json({
      success: true,
      mcps,
      marketplace: {
        total_mcp_servers: totalMCPs,
        total_tools: totalTools,
        avg_rating: parseFloat(avgRating),
        categories: CATEGORIES,
      },
      trending,
      recent: mcps.slice(0, 10),
      stats: {
        total_calls: mcps.reduce((sum, m) => sum + m.calls, 0),
        verified_count: mcps.filter(m => m.verified).length,
        free_count: mcps.filter(m => m.pricing_usdc === 0).length,
        paid_count: mcps.filter(m => m.pricing_usdc > 0).length,
      },
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return response;

  } catch (error) {
    console.error('[Marketplace API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
