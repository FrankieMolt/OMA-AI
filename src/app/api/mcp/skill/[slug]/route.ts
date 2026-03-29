import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase/client';
import { MARKETPLACE_MCPS } from '@/lib/mcp-data';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const supabase = getSupabaseClient();

    if (supabase) {
      const { data: mcp, error } = await supabase
        .from('mcp_servers')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && mcp) {
        return NextResponse.json({
          success: true,
          data: {
            ...mcp,
            category: Array.isArray(mcp.category)
              ? mcp.category
              : mcp.category
                ? [mcp.category]
                : ['Utilities'],
            mcp_endpoint: mcp.mcp_endpoint || mcp.endpoint || '',
            pricing_usdc: Number(mcp.pricing_usdc) || 0,
            total_calls: mcp.total_calls || mcp.calls || 0,
            success_rate: Number(mcp.success_rate) || 100,
            rating: Number(mcp.rating) || 0,
            x402_enabled: mcp.x402_enabled ?? true,
            verified: mcp.verified ?? false,
            author: mcp.author || 'Unknown',
            tools: mcp.tools || [],
            tags: mcp.tags || [],
            website_url: mcp.website_url || null,
            repository_url: mcp.repository_url || null,
            documentation_url: mcp.documentation_url || null,
            version: mcp.version || '1.0.0',
            created_at: mcp.created_at || new Date().toISOString(),
            updated_at: mcp.updated_at || new Date().toISOString(),
          },
        });
      }
    }

    // Fallback to static MARKETPLACE_MCPS data
    const staticMcp = MARKETPLACE_MCPS.find((m) => m.slug === slug);
    if (staticMcp) {
      return NextResponse.json({ success: true, data: staticMcp });
    }

    return NextResponse.json(
      { success: false, error: 'MCP server not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('[GET /api/mcp/skill]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
