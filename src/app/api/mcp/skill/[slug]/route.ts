import { NextRequest, NextResponse } from 'next/server';
import { MCP_DATA } from '@/database/mcp-data';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Look up MCP from the shared MCP_DATA source (same as marketplace)
    const mcp = MCP_DATA.find(m => m.slug === slug);

    if (!mcp) {
      return NextResponse.json(
        { success: false, error: 'MCP server not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...mcp,
        // Normalize category to always be an array for UI compatibility
        category: Array.isArray(mcp.category) ? mcp.category : mcp.category ? [mcp.category] : ['Utilities'],
        // Add computed fields the UI expects
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
  } catch (error) {
    console.error('[GET /api/mcp/skill]', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
