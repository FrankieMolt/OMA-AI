import { NextResponse } from 'next/server';
import { realProducts } from '@/data/real-products';

// Paginated products API for better performance
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search')?.toLowerCase() || '';

  let filtered = realProducts;

  // Filter by category
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  // Filter by search
  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some(t => t.toLowerCase().includes(search))
    );
  }

  // Paginate
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginated = filtered.slice(offset, offset + limit);

  // Return minimal product data for performance
  const products = paginated.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription,
    price: p.price,
    originalPrice: p.originalPrice,
    category: p.category,
    image: p.image,
    affiliateLink: p.affiliateLink,
    inStock: p.inStock,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isNew: p.isNew,
    isOnSale: p.isOnSale,
    verified: p.verified
  }));

  return NextResponse.json({
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages
    }
  });
}
