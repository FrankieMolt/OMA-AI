import { NextResponse } from 'next/server';
import { db, apiListings } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { withCache } from '@/lib/cache';
import { getServerSession, authOptions } from '@/lib/auth';
import { listingsService } from '@/lib/services/listings';

// Optimized GET with pagination, caching, and analytics
async function getListingsHandler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100); // Max 100 per page
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const pricingType = searchParams.get('pricingType') || undefined;
    const type = searchParams.get('type') || undefined;

    const { listings, total } = await listingsService.getListings({
      page,
      limit,
      search,
      category,
      pricingType,
      type,
    });

    const totalPages = Math.ceil(total / limit);
    const currentPage = page;

    return Response.json({
      data: listings,
      meta: {
        total,
        page: currentPage,
        limit,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
      },
    });
  } catch (error) {
    console.error('Listings API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// Export with caching (5 minute TTL for listings)
export const GET = withCache(getListingsHandler, 300);

// Optimized POST with better validation and error handling
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Enhanced validation
    const requiredFields = ['name', 'description', 'category'];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(', ')}`,
          details: { missingFields },
        },
        { status: 400 }
      );
    }

    // Validate data types
    if (typeof body.price !== 'undefined' && (isNaN(body.price) || body.price < 0)) {
      return NextResponse.json(
        {
          error: 'Price must be a valid positive number',
          details: { price: body.price },
        },
        { status: 400 }
      );
    }

    // Get authenticated user from session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: 'Authentication required',
          message: 'Please log in to create listings',
        },
        { status: 401 }
      );
    }

    const ownerId = parseInt(session.user.id);

    if (isNaN(ownerId)) {
      return NextResponse.json(
        {
          error: 'Invalid user session',
          message: 'User ID malformed',
        },
        { status: 400 }
      );
    }

    // Generate unique slug
    const baseSlug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check for existing slug efficiently
    const existing = await db
      .select({ slug: apiListings.slug })
      .from(apiListings)
      .where(eq(apiListings.slug, baseSlug));
    const finalSlug = existing.length > 0 ? `${baseSlug}-${Date.now()}` : baseSlug;

    const newListing = await db
      .insert(apiListings)
      .values({
        title: body.name.trim(),
        slug: finalSlug,
        description: body.description?.trim(),
        category: body.category.toLowerCase(),
        endpointUrl: body.endpoint?.trim(),
        pricingType: body.pricingType?.toLowerCase() || 'free',
        price: Number(body.price || 0),
        ownerId,
        type: body.category === 'agent' ? 'agent' : 'api',
        status: 'pending', // Pending verification
        metadata: body.metadata || {},
        capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
        tags: Array.isArray(body.tags) ? body.tags : [],
        verified: Boolean(body.verified),
        featured: Boolean(body.featured),
      })
      .returning();

    return NextResponse.json(newListing[0], { status: 201 });
  } catch (error) {
    console.error('Create Listing API Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to create listing',
        message:
          process.env.NODE_ENV === 'development'
            ? (error as Error)?.message
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
