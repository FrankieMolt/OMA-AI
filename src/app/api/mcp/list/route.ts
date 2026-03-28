import { NextResponse } from 'next/server';
import { MARKETPLACE_MCPS } from '@/lib/mcp-data';
import { getSupabaseClient } from '@/lib/supabase/client';
import { getAllCategories } from '@/lib/category-icons';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'rating';
  const verified = searchParams.get('verified');

  const supabase = getSupabaseClient();
  let data = [...MARKETPLACE_MCPS];
  let total = data.length;
  let useSupabase = false;

  // Try Supabase first
  if (supabase) {
    try {
      let query = supabase.from('mcp_servers').select('*', { count: 'exact' });

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
        .order(sortBy === 'rating' ? 'rating' : 'total_calls', { ascending: false })
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
    if (category !== 'all') {
      data = data.filter(m => m.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.tags || []).some((t: string) => t.toLowerCase().includes(q))
      );
    }
    if (verified === 'true') {
      data = data.filter(m => m.verified === true);
    } else if (verified === 'false') {
      data = data.filter(m => m.verified === false);
    }

    data.sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'calls') return (b.total_calls || 0) - (a.total_calls || 0);
      if (sortBy === 'price') return (a.pricing_usdc || 0) - (b.pricing_usdc || 0);
      return 0;
    });

    total = data.length;
    data = data.slice((page - 1) * limit, page * limit);
  }

  // Use the category-icons system for consistent categories
  const knownCategories = getAllCategories();
  const usedCategories = Array.from(new Set(MARKETPLACE_MCPS.map(m => m.category)));
  const normalizedCategories = usedCategories.filter(c => knownCategories.includes(c) || c !== 'all');

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
      totalMCPs: MARKETPLACE_MCPS.length,
      verifiedCount: MARKETPLACE_MCPS.filter(m => m.verified).length,
    },
    source: useSupabase ? 'supabase' : 'fallback',
  });

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Cache-Control', 'public, max-age=300');
  return response;
}
