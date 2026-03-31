import { NextResponse } from 'next/server';
import type { MCPToolInput } from '@/lib/types';

export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: 'Supabase not configured' },
        { status: 503 }
      );
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const body = await request.json();

    // Required fields
    const required = [
      'name', 'slug', 'category', 'description',
      'author', 'mcp_endpoint', 'transport', 'pricing_usdc'
    ];

    const missing = required.filter(field => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { success: false, error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate transport
    if (!['stdio', 'sse', 'websocket'].includes(body.transport)) {
      return NextResponse.json(
        { success: false, error: 'Invalid transport. Must be stdio, sse, or websocket' },
        { status: 400 }
      );
    }

    // Validate pricing
    if (body.pricing_usdc < 0) {
      return NextResponse.json(
        { success: false, error: 'Pricing must be non-negative' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const { data: existing } = await supabase
      .from('mcp_servers')
      .select('id')
      .eq('slug', body.slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'MCP server with this slug already exists' },
        { status: 409 }
      );
    }

    // Insert MCP server
    const { data, error } = await supabase
      .from('mcp_servers')
      .insert({
        slug: body.slug,
        name: body.name,
        category: body.category,
        description: body.description,
        long_description: body.long_description || null,
        author: body.author,
        author_email: body.author_email || null,
        repository_url: body.repository_url || null,
        website_url: body.website_url || null,
        documentation_url: body.documentation_url || null,
        logo_url: body.logo_url || null,
        version: body.version || '1.0.0',
        mcp_endpoint: body.mcp_endpoint,
        transport: body.transport,
        pricing_usdc: body.pricing_usdc,
        x402_enabled: body.x402_enabled || false,
        verified: false,
        status: 'pending', // Requires manual verification
        tags: body.tags || [],
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to register MCP server', details: error.message },
        { status: 500 }
      );
    }

    // Insert tools if provided
    if (body.tools && Array.isArray(body.tools) && body.tools.length > 0) {
      const toolsToInsert = body.tools.map((tool: MCPToolInput) => ({
        mcp_server_id: data.id,
        name: tool.name,
        description: tool.description,
        input_schema: tool.input_schema || {},
        pricing_usdc: tool.pricing_usdc || body.pricing_usdc,
      }));

      const { error: toolsError } = await supabase
        .from('mcp_tools')
        .insert(toolsToInsert);

      if (toolsError) {
        console.error('Failed to insert tools:', toolsError);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        status: data.status,
        message: 'MCP server registered successfully. Pending verification.',
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error registering MCP server:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const verified = searchParams.get('verified') === 'true';
  const author = searchParams.get('author') || '';
  const search = searchParams.get('search') || '';

  // Try Supabase first
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (hasSupabase) {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let query = supabase
      .from('mcp_servers')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (category !== 'all') query = query.eq('category', category);
    if (verified) query = query.eq('verified', true);
    if (author) query = query.eq('author', author);
    if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

    const from = (page - 1) * limit;
    query = query.order('created_at', { ascending: false }).range(from, from + limit - 1);

    const { data, error, count } = await query;
    if (!error && data) {
      return NextResponse.json({
        success: true,
        source: 'database',
        data,
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit),
        },
      });
    }
  }

  // Fallback: return static data from mcp-data.ts
  const { MARKETPLACE_MCPS } = await import('@/lib/mcp-data');
  const mcps = MARKETPLACE_MCPS as unknown as import('@/lib/types').MCPSkill[];

  let filtered = mcps;
  if (category !== 'all') filtered = filtered.filter(m => m.category.includes(category));
  if (verified) filtered = filtered.filter(m => m.verified);
  if (author) filtered = filtered.filter(m => m.author === author);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(m =>
      m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    source: hasSupabase ? 'database' : 'fallback',
    warning: hasSupabase ? undefined : 'Supabase not configured — serving cached data',
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
