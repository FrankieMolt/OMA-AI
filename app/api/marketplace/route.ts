import { NextRequest, NextResponse } from 'next/server';
import { apiServices } from '@/lib/mock-api-data';

export const runtime = 'edge';

// GET /api/marketplace - Return available services
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');

    let services = [...apiServices];

    // Filter by category
    if (category && category !== 'all') {
      services = services.filter(s =>
        s.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      services = services.filter(s =>
        s.name.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Limit results
    services = services.slice(0, limit);

    return NextResponse.json({
      services: services.map(s => ({
        ...s,
        price_per_use: s.price,
        categories: { name: s.category }
      })),
      total: services.length
    });
  } catch (error) {
    console.error('Marketplace API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services', services: [], total: 0 },
      { status: 500 }
    );
  }
}
