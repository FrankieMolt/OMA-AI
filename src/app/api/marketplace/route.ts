import { NextResponse } from 'next/server';
import { MARKETPLACE_MCPS } from '@/lib/mcp-data';
import { CATEGORIES } from '@/lib/category-icons';
import type { MCPSkill } from '@/lib/types';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // MARKETPLACE_MCPS is typed loosely (Record) to accommodate legacy field names
    // in the raw data objects. Cast to MCPSkill for type-safe field access.
    const mcps = MARKETPLACE_MCPS as unknown as MCPSkill[];
    const totalMCPs = mcps.length;
    const totalTools = mcps.reduce((sum, m) => sum + (m.tools_count ?? 0), 0);
    const avgRating = (
      mcps.filter(m => m.rating > 0).reduce((sum, m) => sum + m.rating, 0) /
      mcps.filter(m => m.rating > 0).length
    ).toFixed(1);

    const trending = [...mcps]
      .sort((a, b) => (b.calls ?? 0) - (a.calls ?? 0))
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
        total_calls: mcps.reduce((sum, m) => sum + (m.calls ?? 0), 0),
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
