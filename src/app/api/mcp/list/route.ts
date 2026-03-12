import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Check if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: 'Supabase not configured',
        message: 'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables',
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0, hasNextPage: false, hasPrevPage: false },
        filters: { categories: [], verifiedSkillsCount: 0, totalSkills: 0 },
      },
      { status: 503 }
    );
  }

  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const verified = searchParams.get('verified') === 'true';
  const author = searchParams.get('author') || '';
  const search = searchParams.get('search') || '';

  // Build query
  let query = supabase
    .from('mcp_servers')
    .select('*', { count: 'exact' })
    .eq('status', 'active');

  // Apply filters
  if (category !== 'all') {
    query = query.eq('category', category);
  }

  if (verified) {
    query = query.eq('verified', true);
  }

  if (author) {
    query = query.eq('author', author);
  }

  if (search) {
    query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
  }

  // Pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query
    .order('rating', { ascending: false })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching MCP servers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch MCP servers', details: error.message },
      { status: 500 }
    );
  }

  // Get unique categories for filters
  const { data: categoriesData } = await supabase
    .from('mcp_servers')
    .select('category')
    .eq('status', 'active');

  const categories = Array.from(new Set(
    (categoriesData || []).map((m: any) => m.category)
  ));

  const response = NextResponse.json({
    success: true,
    data: data || [],
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      hasNextPage: from + limit < (count || 0),
      hasPrevPage: page > 1,
    },
    filters: {
      categories: categories.sort(),
      verifiedSkillsCount: (data || []).filter((s: any) => s.verified).length,
      totalSkills: count || 0,
    },
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');

  return response;
}
