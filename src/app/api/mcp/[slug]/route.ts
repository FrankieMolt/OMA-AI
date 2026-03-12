import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase not configured', message: 'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables' },
        { status: 503 }
      );
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get MCP server details
    const { data: mcp, error } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error || !mcp) {
      return NextResponse.json(
        { error: 'MCP server not found' },
        { status: 404 }
      );
    }

    // Get MCP tools
    const { data: tools } = await supabase
      .from('mcp_tools')
      .select('*')
      .eq('mcp_server_id', mcp.id);

    // Get MCP reviews
    const { data: reviews } = await supabase
      .from('mcp_reviews')
      .select('*')
      .eq('mcp_server_id', mcp.id)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      success: true,
      data: {
        ...mcp,
        tools: tools || [],
        reviews: reviews || [],
      },
    });

  } catch (error) {
    console.error('Error fetching MCP server:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Delete MCP server (cascade will delete tools, usage, reviews)
    const { error } = await supabase
      .from('mcp_servers')
      .delete()
      .eq('slug', slug);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete MCP server', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'MCP server deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting MCP server:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
