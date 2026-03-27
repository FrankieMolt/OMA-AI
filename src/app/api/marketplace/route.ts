import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface LocalMCP {
  slug: string;
  name: string;
  category: string;
  description: string;
  downloads?: number;
  rating?: number;
  tools?: Array<{ name: string }>;
}

interface SupabaseMCP {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  downloads: number;
  rating: number;
  is_official: boolean;
  is_featured: boolean;
  pricing: string;
  status: string;
}

interface SupabaseCategory {
  slug: string;
  name: string;
  icon: string;
  sort_order?: number;
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Simple in-memory cache with 30-second TTL to reduce Supabase calls
const _cache: { data: string | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL_MS = 30_000; // 30 seconds

export async function GET() {
  try {
    // Try cache first
    if (_cache.data && Date.now() - _cache.ts < CACHE_TTL_MS) {
      return new NextResponse(_cache.data, {
        headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      });
    }

    // Try to fetch real data from local Supabase
    if (SUPABASE_SERVICE_ROLE_KEY) {
      const headers = {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      };

      // Fetch MCPs with correct columns (using is_official instead of verified)
      const mcpsRes = await fetch(
        `${SUPABASE_URL}/rest/v1/mcps?select=id,name,slug,category,description,downloads,rating,is_official,is_featured,pricing,status&order=downloads.desc&limit=20`,
        { headers, cache: 'no-store' }
      );

      if (mcpsRes.ok) {
        const mcps = await mcpsRes.json();

        // Calculate stats
        const totalMCPs = mcps.length;
        const totalDownloads = mcps.reduce((sum: number, m: SupabaseMCP) => sum + (m.downloads || 0), 0);
        const avgRating = mcps.filter((m: SupabaseMCP) => m.rating > 0).length > 0
          ? (mcps.reduce((sum: number, m: SupabaseMCP) => sum + (m.rating || 0), 0) / mcps.filter((m: SupabaseMCP) => m.rating > 0).length).toFixed(1)
          : '0.0';

        // Get trending (top 5 by downloads)
        const trending = mcps.slice(0, 5).map((m: SupabaseMCP) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          category: m.category,
          downloads: m.downloads,
          rating: m.rating,
        }));

        // Derive categories from mcp_servers data
        const categoryMap: Record<string, number> = {};
        const categoryNames: Record<string, string> = {
          'productivity': 'Productivity',
          'development': 'Development',
          'analytics': 'Analytics',
          'communication': 'Communication',
          'security': 'Security',
          'database': 'Database',
          'ai': 'AI & ML',
          'social': 'Social',
          'ecommerce': 'E-Commerce',
          'finance': 'Finance',
          'media': 'Media',
          'other': 'Other',
        };
        const categoryIcons: Record<string, string> = {
          'productivity': '⚡',
          'development': '🔧',
          'analytics': '📊',
          'communication': '💬',
          'security': '🔒',
          'database': '🗄️',
          'ai': '🤖',
          'social': '🌐',
          'ecommerce': '🛒',
          'finance': '💰',
          'media': '🎨',
          'other': '📦',
        };
        mcps.forEach((m: SupabaseMCP) => {
          const cat = m.category || 'other';
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });

        // Build categories array from derived data
        const categories = Object.entries(categoryMap).map(([slug, count]) => ({
          slug,
          name: categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1),
          icon: categoryIcons[slug] || '📦',
          count,
        })).sort((a, b) => b.count - a.count);

        const response = NextResponse.json({
          success: true,
          marketplace: {
            total_mcp_servers: totalMCPs,
            total_downloads: totalDownloads,
            avg_rating: parseFloat(avgRating),
            categories: Object.keys(categoryMap),
          },
          trending,
          categories,
          recent: mcps.slice(0, 10).map((m: SupabaseMCP) => ({
            id: m.id,
            name: m.name,
            slug: m.slug,
            description: m.description,
            category: m.category,
            downloads: m.downloads,
            rating: m.rating,
            is_official: m.is_official,
            is_featured: m.is_featured,
            pricing: m.pricing,
            status: m.status,
          })),
        });

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
        // Store in cache before returning
        const respClone = response.clone();
        respClone.text().then(text => { _cache.data = text; _cache.ts = Date.now(); });
        return response;
      } else {
        console.error('[Marketplace API] Supabase error:', mcpsRes.status, await mcpsRes.text());
      }
    }

    // Fallback to local registry data if Supabase is not available
    const dbPath = path.join(process.cwd(), 'database', '20-mcps-registration.json');
    let localMcps = [];
    if (fs.existsSync(dbPath)) {
      localMcps = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }

    const categories = Array.from(new Set(localMcps.map((m: LocalMCP) => m.category || 'Other')));
    const trending = localMcps.slice(0, 5).map((m: LocalMCP) => ({
      id: m.slug,
      name: m.name,
      slug: m.slug,
      category: m.category || 'Other',
      downloads: 0,
      rating: 5.0
    }));

    const response = NextResponse.json({
      success: true,
      marketplace: {
        total_mcp_servers: localMcps.length,
        total_skills: localMcps.reduce((acc: number, m: LocalMCP) => acc + (m.tools?.length || 0), 0),
        categories: categories as string[]
      },
      trending,
      recent: localMcps.slice(0, 10),
      fallback: true,
      message: 'Using local registry data'
    });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Cache-Control', 'public, max-age=300');
    return response;

  } catch (error) {
    console.error('[Marketplace API] Error:', error);
    
    // Return standard error response
    const response = NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
