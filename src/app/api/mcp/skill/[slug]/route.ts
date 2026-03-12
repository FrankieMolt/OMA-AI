import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { success: false, error: 'Supabase not configured', data: null },
      { status: 503 }
    );
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // Fetch MCP by slug
    const { data: mcp, error } = await supabase
      .from('mcp_servers')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error || !mcp) {
      return NextResponse.json(
        { success: false, error: 'MCP not found' },
        { status: 404 }
      );
    }

    // Fetch tools for this MCP
    const { data: tools, error: toolsError } = await supabase
      .from('mcp_tools')
      .select('*')
      .eq('mcp_server_id', mcp.id);

    // Fetch reviews for this MCP
    const { data: reviews, error: reviewsError } = await supabase
      .from('user_reviews')
      .select(`
        *,
        users (
          name,
          avatar_url
        )
      `)
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
  } catch (error: any) {
    console.error('Error fetching MCP:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
