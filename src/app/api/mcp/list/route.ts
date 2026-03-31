import { NextResponse } from 'next/server';
import { MARKETPLACE_MCPS } from '@/lib/mcp-data';
import { getSupabaseClient } from '@/lib/supabase/client';
import { getAllCategories } from '@/lib/category-icons';

interface NormalizedMCP {
  id: string; name: string; slug: string; category: string[];
  description: string; long_description?: string; author: string;
  repository?: string; repository_url?: string | null;
  documentation_url?: string | null; mcp_endpoint: string;
  pricing_usdc: number; x402_enabled: boolean; verified: boolean;
  rating: number; calls: number; total_calls: number; success_rate: number;
  tier: 'free' | 'premium'; color?: string; featured?: boolean;
  tags: string[]; tools?: { name: string; description: string }[];
  tools_count: number; version: string; created_at?: string;
}

function normalizeMCP(m: Record<string, unknown>): NormalizedMCP {
  const category = Array.isArray(m.category) ? m.category : m.category ? [m.category as string] : ['Utilities'];
  const tools = Array.isArray(m.tools) ? m.tools as { name: string; description: string }[] : [];
  const tags = Array.isArray(m.tags) ? m.tags as string[] : [];
  return {
    id: String(m.id ?? ''),
    name: String(m.name ?? ''),
    slug: String(m.slug ?? m.id ?? ''),
    category,
    description: String(m.description ?? ''),
    long_description: m.long_description as string || m.description as string,
    author: String(m.author ?? 'Unknown'),
    repository: m.repository as string || undefined,
    repository_url: m.repository_url == null ? undefined : String(m.repository_url) as string | null,
    documentation_url: m.documentation_url as string || null,
    mcp_endpoint: String(m.mcp_endpoint ?? m.endpoint ?? ''),
    pricing_usdc: Number(m.pricing_usdc ?? 0),
    x402_enabled: Boolean(m.x402_enabled ?? false),
    verified: Boolean(m.verified ?? false),
    rating: Number(m.rating ?? 0),
    calls: Number(m.calls ?? m.total_calls ?? 0),
    total_calls: Number(m.total_calls ?? m.calls ?? 0),
    success_rate: Number(m.success_rate ?? 100),
    tier: m.tier === 'premium' ? 'premium' : 'free',
    color: m.color as string || undefined,
    featured: Boolean(m.featured ?? false),
    tags,
    tools,
    tools_count: Array.isArray(m.tools) ? m.tools.length : Number(m.tools_count ?? 0),
    version: String(m.version ?? '1.0.0'),
    created_at: m.created_at as string || undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'rating';
  const verified = searchParams.get('verified');
  const tier = searchParams.get('tier') || 'all';

  const supabase = getSupabaseClient();
  let data: NormalizedMCP[] = MARKETPLACE_MCPS.map(m => normalizeMCP(m as unknown as Record<string, unknown>));
  let total = data.length;
  let useSupabase = false;

  // Try direct REST fetch — anon key works from Vercel (service role key returns 401)
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (sbUrl && sbKey) {
    try {
      const searchParams = new URLSearchParams({ select: '*', count: 'exact' });
      if (category !== 'all') searchParams.set('category', `eq.${category}`);
      if (search) searchParams.set('or', `name.ilike.%${search}%,description.ilike.%${search}%`);
      if (verified === 'true') searchParams.set('verified', 'eq.true');
      if (tier !== 'all') searchParams.set('tier', `eq.${tier}`);
      searchParams.set('order', `${sortBy === 'rating' ? 'rating' : 'total_calls'}.desc`);
      searchParams.set('offset', String((page - 1) * limit));
      searchParams.set('limit', String(limit));

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25_000);

      const res = await fetch(`${sbUrl}/rest/v1/mcp_servers?${searchParams}`, {
        headers: {
          // apikey is sufficient for PostgREST anon read — Authorization Bearer causes 401 from some Vercel infra
          'apikey': sbKey,
          'Content-Type': 'application/json',
          'Prefer': 'count=exact',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok && res.status !== 204) {
        const dbData = (await res.json()) as Record<string, unknown>[];
        const totalStr = res.headers.get('content-range')?.split('/')[1];
        if (Array.isArray(dbData) && dbData.length > 0) {
          data = dbData.map(m => normalizeMCP(m as Record<string, unknown>));
          total = totalStr ? parseInt(totalStr) : dbData.length;
          useSupabase = true;
        }
      }
    } catch (e) {
      const err = e as Error;
      console.error('[mcp/list] REST fetch FAILED:', err.name, err.message, 'URL:', sbUrl ? 'SET' : 'MISSING', 'KEY:', sbKey ? 'SET' : 'MISSING');
    }
  }

  // Try Supabase JS client as secondary fallback
  if (!useSupabase && supabase) {
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
      if (tier !== 'all') {
        query = query.eq('tier', tier);
      }

      const { data: dbData, count, error } = await query
        .order(sortBy === 'rating' ? 'rating' : 'total_calls', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (!error && dbData && dbData.length > 0) {
        data = dbData.map(m => normalizeMCP(m as unknown as Record<string, unknown>));
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
      data = data.filter(m => m.category.includes(category));
    }
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (verified === 'true') {
      data = data.filter(m => m.verified === true);
    } else if (verified === 'false') {
      data = data.filter(m => m.verified === false);
    }
    if (tier !== 'all') {
      data = data.filter(m => m.tier === tier);
    }

    data.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'calls') return b.total_calls - a.total_calls;
      if (sortBy === 'price') return a.pricing_usdc - b.pricing_usdc;
      return 0;
    });

    total = data.length;
    data = data.slice((page - 1) * limit, page * limit);
  }

  // Use the category-icons system for consistent categories
  const knownCategories = getAllCategories();
  const usedCategories = Array.from(new Set(MARKETPLACE_MCPS.flatMap(m => m.category as string[])));
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
