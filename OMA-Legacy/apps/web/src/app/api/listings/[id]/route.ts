import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/db';
import { apiListings, users, reviews } from '@/lib/db';
import { eq, sql, and } from 'drizzle-orm';
import { Listing, ListingDetail } from '@/lib/types';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundErrorResponse,
  unauthorizedErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const requestId = generateRequestId();

  try {
    const { id } = await params;
    const numericId = parseInt(id);
    if (isNaN(numericId)) {
      logger.warn('Invalid listing ID format', { id, requestId });
      return validationErrorResponse('Invalid ID format', undefined, requestId);
    }

    const [listing] = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        currency: apiListings.currency,
        rating: apiListings.rating,
        reviewCount: apiListings.reviewCount,
        usageCount: apiListings.usageCount,
        verified: apiListings.verified,
        featured: apiListings.featured,
        endpoint: apiListings.endpointUrl,
        type: apiListings.type,
        installCommand: apiListings.installCommand,
        contextWindow: apiListings.contextWindow,
        documentation: apiListings.documentation,
        metadata: apiListings.metadata,
        capabilities: apiListings.capabilities,
        tags: apiListings.tags,
        status: apiListings.status,
        ownerId: apiListings.ownerId,
        ownerName: users.name,
        ownerWallet: users.solanaWalletAddress,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .leftJoin(users, eq(apiListings.ownerId, users.id))
      .where(eq(apiListings.id, numericId))
      .limit(1);

    if (!listing) {
      logger.warn('Listing not found', { id: numericId, requestId });
      return notFoundErrorResponse('Listing', requestId);
    }

    const listingReviews = await db
      .select({
        id: reviews.id,
        userId: reviews.userId,
        rating: reviews.rating,
        title: reviews.title,
        content: reviews.content,
        helpfulCount: reviews.helpfulCount,
        createdAt: reviews.createdAt,
        userName: users.name,
      })
      .from(reviews)
      .leftJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.apiId, numericId))
      .orderBy(sql`${reviews.createdAt} desc`)
      .limit(10);

    const avgRatingResult = await db
      .select({
        avgRating: sql<number>`AVG(${reviews.rating})`,
        reviewCount: sql<number>`COUNT(*)`,
      })
      .from(reviews)
      .where(eq(reviews.apiId, numericId));

    const relatedListings = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        currency: apiListings.currency,
        rating: apiListings.rating,
        reviewCount: apiListings.reviewCount,
        usageCount: apiListings.usageCount,
        verified: apiListings.verified,
        featured: apiListings.featured,
        capabilities: apiListings.capabilities,
        status: apiListings.status,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .where(
        and(
          eq(apiListings.status, 'approved'),
          eq(apiListings.category, listing.category),
          sql`${apiListings.id} != ${numericId}`
        )
      )
      .orderBy(sql`${apiListings.createdAt} desc`)
      .limit(3);

    const responseListing: ListingDetail = {
      ...listing,
      price: Number(listing.price),
      capabilities: Array.isArray(listing.capabilities) ? listing.capabilities : [],
      rating: avgRatingResult[0]?.avgRating || 0,
      reviewCount: Number(avgRatingResult[0]?.reviewCount || 0),
      totalUsage: 0,
      endpoint: listing.endpoint || undefined,
      installCommand: listing.installCommand || undefined,
      contextWindow: listing.contextWindow || undefined,
      documentation: listing.documentation || undefined,
      metadata: (listing.metadata as Record<string, unknown>) || undefined,
      ownerWallet: listing.ownerWallet || undefined,
      ownerName: listing.ownerName || undefined,
      category: listing.category as Listing['category'],
      pricingType: listing.pricingType as Listing['pricingType'],
      status: listing.status as Listing['status'],
      reviews: listingReviews.map((r) => ({
        id: r.id,
        userId: r.userId,
        user: r.userName ? { id: r.userId, name: r.userName } : undefined,
        rating: r.rating,
        content: r.content,
        title: r.title,
        helpfulCount: r.helpfulCount,
        date: r.createdAt?.toISOString() || new Date().toISOString(),
      })),
      relatedListings: relatedListings.map((r) => ({
        ...r,
        price: Number(r.price),
        capabilities: Array.isArray(r.capabilities) ? r.capabilities : [],
        rating: Number(r.rating),
        reviewCount: Number(r.reviewCount),
        totalUsage: Number(r.usageCount || 0),
        status: (r.status || 'approved') as Listing['status'],
        category: r.category as Listing['category'],
        pricingType: r.pricingType as Listing['pricingType'],
      })),
    };

    logger.info('Listing fetched successfully', { listingId: numericId, requestId });
    return successResponse(responseListing);
  } catch (error) {
    logger.error('Error fetching listing', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const requestId = generateRequestId();

  try {
    const { id } = await params;
    const numericId = parseInt(id);

    if (isNaN(numericId)) {
      logger.warn('Invalid listing ID format', { id, requestId });
      return validationErrorResponse('Invalid ID format', undefined, requestId);
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      logger.warn('Unauthorized listing update attempt', { requestId });
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    const body = await request.json();

    const [existing] = await db
      .select()
      .from(apiListings)
      .where(sql`${apiListings.id} = ${numericId}`)
      .limit(1);

    if (!existing) {
      logger.warn('Listing not found for update', { id: numericId, requestId });
      return notFoundErrorResponse('Listing', requestId);
    }

    const [updated] = await db
      .update(apiListings)
      .set({
        title: body.name || existing.title,
        description: body.description || existing.description,
        category: body.category || existing.category,
        pricingType: body.pricingType || existing.pricingType,
        price: body.price !== undefined ? Number(body.price) : existing.price,
        endpointUrl: body.endpoint || existing.endpointUrl,
        metadata: body.metadata || existing.metadata,
        capabilities: Array.isArray(body.capabilities) ? body.capabilities : existing.capabilities,
        tags: Array.isArray(body.tags) ? body.tags : existing.tags,
        verified: typeof body.verified === 'boolean' ? body.verified : existing.verified,
        featured: typeof body.featured === 'boolean' ? body.featured : existing.featured,
        updatedAt: new Date(),
      })
      .where(sql`${apiListings.id} = ${numericId}`)
      .returning();

    logger.info('Listing updated successfully', {
      listingId: numericId,
      userId: user.id,
      requestId,
    });
    return successResponse(updated);
  } catch (error) {
    logger.error('Error updating listing', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = generateRequestId();

  try {
    const { id } = await params;
    const numericId = parseInt(id);

    if (isNaN(numericId)) {
      logger.warn('Invalid listing ID format', { id, requestId });
      return validationErrorResponse('Invalid ID format', undefined, requestId);
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      logger.warn('Unauthorized listing delete attempt', { requestId });
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    const [existing] = await db
      .select()
      .from(apiListings)
      .where(sql`${apiListings.id} = ${numericId}`)
      .limit(1);

    if (!existing) {
      logger.warn('Listing not found for deletion', { id: numericId, requestId });
      return notFoundErrorResponse('Listing', requestId);
    }

    await db.delete(apiListings).where(sql`${apiListings.id} = ${numericId}`);

    logger.info('Listing deleted successfully', {
      listingId: numericId,
      userId: user.id,
      requestId,
    });
    return successResponse({ message: 'Listing deleted successfully' });
  } catch (error) {
    logger.error('Error deleting listing', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
