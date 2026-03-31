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
            tier: mcp.tier || 'free',
            color: mcp.color || null,
            long_description: mcp.long_description || mcp.description || '',
            featured: mcp.featured ?? false,
            created_at: mcp.created_at || new Date().toISOString(),
            updated_at: mcp.updated_at || new Date().toISOString(),
          },
        });
      }
    }

    // Fallback to static MARKETPLACE_MCPS data
    const staticMcp = MARKETPLACE_MCPS.find((m) => m.slug === slug);
    if (staticMcp) {
      // Normalize for MCPSkill compatibility
      return NextResponse.json({
        success: true,
        data: {
          id: staticMcp.id,
          name: staticMcp.name,
          slug: staticMcp.slug,
          category: staticMcp.category,
          description: staticMcp.description,
          long_description: staticMcp.long_description || staticMcp.description,
          author: staticMcp.author,
          repository_url: staticMcp.repository || null,
          documentation_url: staticMcp.documentation_url || null,
          mcp_endpoint: staticMcp.mcp_endpoint,
          pricing_usdc: staticMcp.pricing_usdc,
          x402_enabled: staticMcp.x402_enabled,
          verified: staticMcp.verified,
          rating: staticMcp.rating,
          total_calls: staticMcp.calls,
          success_rate: 100,
          tier: staticMcp.tier,
          color: staticMcp.color || null,
          featured: staticMcp.featured ?? false,
          tools: staticMcp.tools || [],
          tags: staticMcp.tags,
          version: staticMcp.version,
          created_at: new Date().toISOString(),
        },
      });
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
