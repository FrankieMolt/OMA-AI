import { NextResponse } from 'next/server';

/**
 * DEPRECATED — redirects to /api/mcp/skill/[slug]
 * Kept for backwards compatibility with any hardcoded references.
 * Do not add new logic here; use /api/mcp/skill/[slug] instead.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.redirect(
    new URL(`/api/mcp/skill/${slug}`, request.url),
    302
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  // DELETE is not supported on /api/mcp/skill/[slug] — delegate to skill route directly
  const { createClient } = await import('@supabase/supabase-js');

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ success: false, error: 'Supabase not configured' }, { status: 503 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase
    .from('mcp_servers')
    .delete()
    .eq('slug', slug);

  if (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete MCP server', details: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data: { message: 'MCP server deleted successfully' } });
}
