import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://localhost:54321';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
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
      
      // Fetch categories
      const categoriesRes = await fetch(
        `${SUPABASE_URL}/rest/v1/mcp_categories?select=*&order=sort_order.asc`,
        { headers, cache: 'no-store' }
      );

      if (mcpsRes.ok && categoriesRes.ok) {
        const mcps = await mcpsRes.json();
        const categories = await categoriesRes.json();

        // Calculate stats
        const totalMCPs = mcps.length;
        const totalDownloads = mcps.reduce((sum: number, m: any) => sum + (m.downloads || 0), 0);
        const avgRating = mcps.filter((m: any) => m.rating > 0).length > 0
          ? (mcps.reduce((sum: number, m: any) => sum + (m.rating || 0), 0) / mcps.filter((m: any) => m.rating > 0).length).toFixed(1)
          : '0.0';

        // Get trending (top 5 by downloads)
        const trending = mcps.slice(0, 5).map((m: any) => ({
          id: m.id,
          name: m.name,
          slug: m.slug,
          category: m.category,
          downloads: m.downloads,
          rating: m.rating,
        }));

        // Get categories with counts
        const categoryMap: Record<string, number> = {};
        mcps.forEach((m: any) => {
          const cat = m.category || 'Other';
          categoryMap[cat] = (categoryMap[cat] || 0) + 1;
        });

        const response = NextResponse.json({
          success: true,
          marketplace: {
            total_mcp_servers: totalMCPs,
            total_downloads: totalDownloads,
            avg_rating: parseFloat(avgRating),
            categories: Object.keys(categoryMap),
          },
          trending,
          categories: categories.map((c: any) => ({
            slug: c.slug,
            name: c.name,
            icon: c.icon,
          })),
          recent: mcps.slice(0, 10).map((m: any) => ({
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

    const categories = Array.from(new Set(localMcps.map((m: any) => m.category || 'Other')));
    const trending = localMcps.slice(0, 5).map((m: any) => ({
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
        total_skills: localMcps.reduce((acc: number, m: any) => acc + (m.tools?.length || 0), 0),
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
