import { MarketplaceDetailPage } from '@/components/marketplace/MarketplaceDetailPage';
import { db, apiListings, reviews, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { type Listing, ListingDetail } from '@/lib/types';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = params;

  const [dbListing] = await db
    .select()
    .from(apiListings)
    .where(eq(apiListings.slug, slug))
    .limit(1);

  if (!dbListing) {
    notFound();
  }

  const dbReviews = await db
    .select({
      id: reviews.id,
      userId: reviews.userId,
      rating: reviews.rating,
      title: reviews.title,
      content: reviews.content,
      helpfulCount: reviews.helpfulCount,
      createdAt: reviews.createdAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.apiId, dbListing.id));

  const listing: ListingDetail = {
    ...dbListing,
    name: dbListing.title,
    price: Number(dbListing.price),
    currency: dbListing.currency || 'USDC',
    capabilities: (dbListing.capabilities as string[]) || [],
    tags: (dbListing.tags as string[]) || [],
    category: dbListing.category as Listing['category'],
    pricingType: (dbListing.pricingType as Listing['pricingType']) || 'one-time',
    status: dbListing.status as Listing['status'],
    endpointUrl: dbListing.endpointUrl || undefined,
    rating: Number(dbListing.rating || 0),
    reviewCount: dbListing.reviewCount || 0,
    totalUsage: dbListing.usageCount || 0,
    createdAt: dbListing.createdAt,
    updatedAt: dbListing.updatedAt,
    metadata: (dbListing.metadata as Record<string, unknown>) || undefined,
    verified: dbListing.verified,
    featured: dbListing.featured,
    installCommand: dbListing.installCommand || undefined,
    reviews: dbReviews.map((review) => ({
      id: review.id,
      userId: review.userId,
      rating: review.rating,
      title: review.title,
      content: review.content,
      helpfulCount: review.helpfulCount,
      date: review.createdAt.toISOString(),
      user: {
        id: review.userId,
        name: review.userName,
        email: review.userEmail,
      },
    })),
    relatedListings: [],
  } as ListingDetail;

  return <MarketplaceDetailPage listing={listing} />;
}
