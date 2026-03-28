import { NextResponse } from 'next/server';
import { MCP_DATA } from '@/database/mcp-data';
import { CATEGORIES } from '@/lib/mcp-data';
import { getSupabaseClient } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'rating';
  const verified = searchParams.get('verified');

  const supabase = getSupabaseClient();
  let data = [...MCP_DATA];
  let total = data.length;
  let useSupabase = false;

  // Try Supabase first
  if (supabase) {
    try {
      let query = supabase.from('mcp_servers').select('*', { count: 'exact' });

      // Filter by category (mcp_servers uses TEXT category, not TEXT[])
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }
      if (verified === 'true') {
        query = query.eq('verified', true);
      } else if (verified === 'false') {
        query = query.eq('verified', false);
      }

      const { data: dbData, count, error } = await query
        .order(sortBy === 'rating' ? 'rating' : sortBy === 'calls' ? 'total_calls' : 'created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (!error && dbData && dbData.length > 0) {
        data = dbData;
        total = count || dbData.length;
        useSupabase = true;
      }
    } catch {
      // Fall through to local data
    }
  }

  // Use local data if Supabase unavailable
  if (!useSupabase) {
    // Filter
    if (category !== 'all') {
      data = data.filter(m => m.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (verified === 'true') {
      data = data.filter(m => m.verified === true);
    } else if (verified === 'false') {
      data = data.filter(m => m.verified === false);
    }

    // Sort
    data.sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'calls') return (b.total_calls || 0) - (a.total_calls || 0);
      if (sortBy === 'price') return (a.pricing_usdc || 0) - (b.pricing_usdc || 0);
      if (sortBy === 'newest') return (new Date(b.created_at || 0).getTime()) - (new Date(a.created_at || 0).getTime());
      return 0;
    });

    total = data.length;
    data = data.slice((page - 1) * limit, page * limit);
  }

  // Use normalized categories from CATEGORIES (lib/mcp-data.ts)
  // instead of raw categories from MCP_DATA (database/mcp-data.ts)
  // This ensures category names match across the UI
  const normalizedCategories = CATEGORIES.filter(c => c.id !== 'all').map(c => c.name);

  const response = NextResponse.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
    filters: {
      categories: normalizedCategories,
      totalMCPs: MCP_DATA.length,
      verifiedCount: MCP_DATA.filter(m => m.verified).length,
    },
    source: useSupabase ? 'supabase' : 'fallback',
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');
  return response;
}
