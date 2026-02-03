import { db, apiListings, users, reviews, usageRecords } from '@/lib/db';
import { and, sql, SQL, eq, desc, asc, or, ilike } from 'drizzle-orm';
import { Listing } from '@/lib/types';

export type CreateListingParams = {
  name: string;
  description: string;
  category: string;
  pricingType: 'one-time' | 'free' | 'usage' | 'subscription';
  price: number;
  endpoint: string;
  ownerId: number;
  capabilities?: string[];
  tags?: string[];
  type?: string;
  installCommand?: string;
  contextWindow?: number;
  documentation?: string;
  schema?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export type UpdateListingParams = Partial<CreateListingParams> & {
  status?: 'approved' | 'pending' | 'rejected' | 'suspended';
  verified?: boolean;
  featured?: boolean;
};

export class ListingsService {
  private getAvatarUrl(profile: unknown): string | undefined {
    if (!profile) return undefined;
    if (typeof profile === 'string') return profile;
    if (typeof profile !== 'object') return undefined;

    const record = profile as Record<string, unknown>;
    const candidate = record.avatar_url ?? record.avatarUrl ?? record.avatar;
    return typeof candidate === 'string' ? candidate : undefined;
  }

  async getListings({
    page = 1,
    limit = 20,
    category,
    search,
    sortBy = 'newest',
    status = 'approved',
    tags,
    pricingType,
    minPrice,
    maxPrice,
    minRating,
    verified,
    featured,
    capabilities,
    type,
  }: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    status?: string;
    tags?: string[];
    pricingType?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    verified?: boolean;
    featured?: boolean;
    capabilities?: string[];
    type?: string;
  } = {}) {
    const offset = (page - 1) * limit;

    const conditions: SQL[] = [];

    if (status && status !== 'all') {
      conditions.push(eq(apiListings.status, status));
    }

    if (category && category !== 'all') {
      conditions.push(eq(apiListings.category, category));
    }

    if (type && type !== 'all') {
      conditions.push(eq(apiListings.type, type));
    }

    if (search) {
      const searchCondition = or(
        ilike(apiListings.title, `%${search}%`),
        ilike(apiListings.description, `%${search}%`)
      );
      if (searchCondition) {
        conditions.push(searchCondition);
      }
    }

    if (tags && tags.length > 0) {
      conditions.push(sql`${apiListings.tags} ?| ${tags}`);
    }

    if (pricingType && pricingType !== 'all') {
      conditions.push(eq(apiListings.pricingType, pricingType));
    }

    if (minPrice !== undefined) {
      conditions.push(sql`${apiListings.price} >= ${minPrice}`);
    }

    if (maxPrice !== undefined) {
      conditions.push(sql`${apiListings.price} <= ${maxPrice}`);
    }

    if (verified !== undefined) {
      conditions.push(eq(apiListings.verified, verified));
    }

    if (featured !== undefined) {
      conditions.push(eq(apiListings.featured, featured));
    }

    let orderBy: SQL = desc(apiListings.createdAt);
    if (sortBy === 'popular') {
      // Calculate popularity based on reviews and usage
      orderBy = desc(sql`(SELECT COUNT(*) FROM ${reviews} WHERE api_id = ${apiListings.id})`);
    } else if (sortBy === 'price-low') {
      orderBy = asc(apiListings.price);
    } else if (sortBy === 'price-high') {
      orderBy = desc(apiListings.price);
    } else if (sortBy === 'rating') {
      orderBy = desc(
        sql`(SELECT COALESCE(AVG(rating), 0) FROM ${reviews} WHERE api_id = ${apiListings.id})`
      );
    } else if (sortBy === 'name') {
      orderBy = asc(apiListings.title);
    }

    const data = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        currency: sql<string>`'USDC'`,
        capabilities: apiListings.capabilities,
        rating: sql<number>`(SELECT COALESCE(AVG(rating), 0) FROM ${reviews} WHERE api_id = ${apiListings.id})`,
        reviewCount: sql<number>`(SELECT COUNT(id) FROM ${reviews} WHERE api_id = ${apiListings.id})`,
        totalUsage: sql<number>`(SELECT COUNT(*) FROM ${usageRecords} WHERE api_id = ${apiListings.id})`,
        status: apiListings.status,
        type: apiListings.type,
        installCommand: apiListings.installCommand,
        contextWindow: apiListings.contextWindow,
        documentation: apiListings.documentation,
        verified: apiListings.verified,
        featured: apiListings.featured,
        tags: apiListings.tags,
        ownerName: users.name,
        ownerAvatar: users.profile,
        ownerId: apiListings.ownerId,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .leftJoin(users, eq(apiListings.ownerId, users.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);

    const totalRes = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
    const total = totalRes[0]?.count || 0;

    const listings = data
      .map((item) => {
        const ownerAvatarUrl = this.getAvatarUrl(item.ownerAvatar);
        const listing = {
          ...item,
          category: item.category as Listing['category'],
          pricingType: item.pricingType as Listing['pricingType'],
          status: item.status as Listing['status'],
          price: Number(item.price),
          capabilities: Array.isArray(item.capabilities) ? item.capabilities : [],
          rating: Number(item.rating),
          reviewCount: Number(item.reviewCount),
          totalUsage: Number(item.totalUsage),
          verified: Boolean(item.verified),
          featured: Boolean(item.featured),
          tags: Array.isArray(item.tags) ? item.tags : [],
          ownerAvatar: ownerAvatarUrl,
        };

        // Filter by minRating if specified
        if (minRating !== undefined && listing.rating < minRating) {
          return null;
        }

        // Filter by capabilities if specified
        if (capabilities && capabilities.length > 0) {
          const hasAllCapabilities = capabilities.every((cap) =>
            listing.capabilities.includes(cap)
          );
          if (!hasAllCapabilities) {
            return null;
          }
        }

        return listing;
      })
      .filter(Boolean) as Listing[];

    return { listings, total };
  }

  async getListingById(id: number) {
    const [listing] = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        currency: sql<string>`'USDC'`,
        endpoint: apiListings.endpointUrl,
        type: apiListings.type,
        installCommand: apiListings.installCommand,
        contextWindow: apiListings.contextWindow,
        documentation: apiListings.documentation,
        schema: apiListings.schema,
        metadata: apiListings.metadata,
        capabilities: apiListings.capabilities,
        status: apiListings.status,
        verified: apiListings.verified,
        featured: apiListings.featured,
        tags: apiListings.tags,
        ownerName: users.name,
        ownerAvatar: users.profile,
        ownerWallet: users.solanaWalletAddress,
        ownerId: apiListings.ownerId,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .leftJoin(users, eq(apiListings.ownerId, users.id))
      .where(eq(apiListings.id, id))
      .limit(1);

    if (!listing) return null;

    return {
      ...listing,
      category: listing.category as Listing['category'],
      pricingType: listing.pricingType as Listing['pricingType'],
      status: listing.status as Listing['status'],
      price: Number(listing.price),
      capabilities: Array.isArray(listing.capabilities) ? listing.capabilities : [],
      verified: Boolean(listing.verified),
      featured: Boolean(listing.featured),
      tags: Array.isArray(listing.tags) ? listing.tags : [],
      ownerAvatar: this.getAvatarUrl(listing.ownerAvatar),
      metadata: (listing.metadata as Record<string, unknown>) || {},
    };
  }

  async getListingBySlug(slug: string) {
    const [listing] = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        currency: sql<string>`'USDC'`,
        endpoint: apiListings.endpointUrl,
        type: apiListings.type,
        installCommand: apiListings.installCommand,
        contextWindow: apiListings.contextWindow,
        documentation: apiListings.documentation,
        schema: apiListings.schema,
        capabilities: apiListings.capabilities,
        status: apiListings.status,
        verified: apiListings.verified,
        featured: apiListings.featured,
        tags: apiListings.tags,
        ownerName: users.name,
        ownerAvatar: users.profile,
        ownerWallet: users.solanaWalletAddress,
        ownerId: apiListings.ownerId,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .leftJoin(users, eq(apiListings.ownerId, users.id))
      .where(eq(apiListings.slug, slug))
      .limit(1);

    if (!listing) return null;

    return {
      ...listing,
      category: listing.category as Listing['category'],
      pricingType: listing.pricingType as Listing['pricingType'],
      status: listing.status as Listing['status'],
      price: Number(listing.price),
      capabilities: Array.isArray(listing.capabilities) ? listing.capabilities : [],
      verified: Boolean(listing.verified),
      featured: Boolean(listing.featured),
      tags: Array.isArray(listing.tags) ? listing.tags : [],
      ownerAvatar: this.getAvatarUrl(listing.ownerAvatar),
    };
  }

  async createListing(data: CreateListingParams) {
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Check for existing slug
    const existing = await db.select().from(apiListings).where(eq(apiListings.slug, slug)).limit(1);
    if (existing.length > 0) {
      throw new Error('Listing with this name already exists');
    }

    const [newListing] = await db
      .insert(apiListings)
      .values({
        title: data.name,
        slug,
        description: data.description,
        category: data.category,
        pricingType: data.pricingType,
        price: data.price,
        endpointUrl: data.endpoint,
        type: data.type || 'api',
        installCommand: data.installCommand,
        contextWindow: data.contextWindow,
        documentation: data.documentation,
        schema: data.schema,
        ownerId: data.ownerId,
        status: 'pending',
        capabilities: data.capabilities || [],
        tags: data.tags || [],
        metadata: data.metadata || {},
        verified: false,
        featured: false,
      })
      .returning();

    return newListing;
  }

  async updateListing(id: number, data: UpdateListingParams, userId: number) {
    const listing = await this.getListingById(id);
    if (!listing) {
      throw new Error('Listing not found');
    }

    if (listing.ownerId !== userId) {
      throw new Error('Unauthorized to update this listing');
    }

    const updateData: Partial<typeof apiListings.$inferInsert> = { ...data };
    if (data.name) {
      updateData.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Merge metadata
    if (data.capabilities) {
      updateData.capabilities = data.capabilities;
    }

    if (data.tags) {
      updateData.tags = data.tags;
    }

    if (data.metadata) {
      updateData.metadata = data.metadata;
    }

    if (data.verified !== undefined) {
      updateData.verified = data.verified;
    }

    if (data.featured !== undefined) {
      updateData.featured = data.featured;
    }

    const [updated] = await db
      .update(apiListings)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(apiListings.id, id))
      .returning();

    return updated;
  }

  async deleteListing(id: number, userId: number) {
    const listing = await this.getListingById(id);
    if (!listing) {
      throw new Error('Listing not found');
    }

    if (listing.ownerId !== userId) {
      throw new Error('Unauthorized to delete this listing');
    }

    await db.delete(apiListings).where(eq(apiListings.id, id));
    return { success: true };
  }

  async getFeaturedListings(limit: number = 10) {
    const listings = await this.getListings({
      limit,
      sortBy: 'popular',
      featured: true,
      status: 'approved',
    });

    return listings.listings;
  }

  async getCategories() {
    const categories = await db
      .select({
        category: apiListings.category,
        count: sql<number>`count(*)`,
      })
      .from(apiListings)
      .where(eq(apiListings.status, 'approved'))
      .groupBy(apiListings.category)
      .orderBy(sql`count(*) desc`);

    return categories;
  }

  async getUserListings(userId: number, page: number = 1, limit: number = 20) {
    const offset = (page - 1) * limit;

    const data = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        description: apiListings.description,
        category: apiListings.category,
        pricingType: apiListings.pricingType,
        price: apiListings.price,
        status: apiListings.status,
        createdAt: apiListings.createdAt,
        updatedAt: apiListings.updatedAt,
      })
      .from(apiListings)
      .where(eq(apiListings.ownerId, userId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(apiListings.createdAt));

    const totalRes = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(eq(apiListings.ownerId, userId));
    const total = totalRes[0]?.count || 0;

    return { listings: data, total };
  }
}

export const listingsService = new ListingsService();
