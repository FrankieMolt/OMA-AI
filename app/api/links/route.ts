import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseEnabled } from '@/lib/supabase';
import { allowPublicAccess, createDemoResponse } from '@/lib/auth-public';
import { buildShortUrl } from '@/lib/shortener';
import { addSecurityHeaders } from '@/lib/security';

// Demo links for public API (no auth required)
const DEMO_LINKS = [
  {
    id: 'demo-1',
    short_code: 'oma-ai',
    short_url: 'https://oma-ai.com',
    original_url: 'https://oma-ai.com',
    created_at: new Date().toISOString(),
    clicks: 1524,
    title: 'OMA-AI GitHub Repo'
  },
  {
    id: 'demo-2',
    short_code: 'spendthrone',
    short_url: 'https://spendthrone.com',
    original_url: 'https://github.com/FrankieMolt/SpendThrone',
    created_at: new Date().toISOString(),
    clicks: 892,
    title: 'SpendThrone GitHub'
  },
  {
    id: 'demo-3',
    short_code: 'lethometry',
    short_url: 'https://lethometry.com',
    original_url: 'https://github.com/FrankieMolt/Lethometry',
    created_at: new Date().toISOString(),
    clicks: 423,
    title: 'Lethometry GitHub'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Check if public access is allowed
    const access = await allowPublicAccess(request, {
      allowedRoutes: ['/api/links', '/api/health'],
      demoMode: true
    });

    // If not allowed, return unauthorized
    if (!access.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
          demo: true,
          hint: 'Public demo mode is available'
        },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search')?.toLowerCase() || '';

    // Filter demo links
    let filtered = DEMO_LINKS;

    if (search) {
      filtered = filtered.filter(link =>
        link.title.toLowerCase().includes(search) ||
        link.short_code.toLowerCase().includes(search)
      );
    }

    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const page = Math.floor(offset / limit) + 1;
    const paginated = filtered.slice(offset, offset + limit);

    // Return demo data
    const response = createDemoResponse({
      links: paginated.map(link => ({
        id: link.id,
        short_code: link.short_code,
        short_url: link.short_url,
        original_url: link.original_url,
        title: link.title,
        created_at: link.created_at,
        clicks: link.clicks
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    }, '/api/links');

    // Add security headers
    addSecurityHeaders(response);

    return response;
  } catch (error) {
    console.error('Links API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        demo: true
      },
      { status: 500 }
    );
  }
}
