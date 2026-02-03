import { db, skills, users, skillReviews, skillDownloads } from '@/lib/db';
import { and, sql, SQL, eq, desc } from 'drizzle-orm';

export class SkillsRepository {
  async findMany(params: { where?: SQL; limit?: number; offset?: number; orderBy?: SQL }) {
    const { where, limit = 20, offset = 0, orderBy = desc(skills.createdAt) } = params;

    return await db
      .select({
        id: skills.id,
        name: skills.name,
        slug: skills.slug,
        description: skills.description,
        category: skills.category,
        price: skills.price,
        pricingType: skills.pricingType,
        rating: skills.rating,
        reviewCount: skills.reviewCount,
        downloads: skills.downloads,
        tags: skills.tags,
        capabilities: skills.capabilities,
        verified: skills.verified,
        featured: skills.featured,
        status: skills.status,
        createdAt: skills.createdAt,
        updatedAt: skills.updatedAt,
        ownerName: users.name,
        ownerAvatar: users.profile,
      })
      .from(skills)
      .leftJoin(users, sql`${skills.ownerId} = ${users.id}`)
      .where(where)
      .limit(limit)
      .offset(offset)
      .orderBy(orderBy);
  }

  async findById(id: number) {
    const [skill] = await db
      .select({
        skill: skills,
        owner: {
          name: users.name,
          email: users.email,
          profile: users.profile,
        },
      })
      .from(skills)
      .leftJoin(users, sql`${skills.ownerId} = ${users.id}`)
      .where(eq(skills.id, id))
      .limit(1);

    return skill;
  }

  async findBySlug(slug: string) {
    const [skill] = await db
      .select({
        skill: skills,
        owner: {
          name: users.name,
          email: users.email,
          profile: users.profile,
        },
      })
      .from(skills)
      .leftJoin(users, sql`${skills.ownerId} = ${users.id}`)
      .where(eq(skills.slug, slug))
      .limit(1);

    return skill;
  }

  async findBySlugSimple(slug: string) {
    const [skill] = await db.select().from(skills).where(eq(skills.slug, slug)).limit(1);
    return skill;
  }

  async create(data: typeof skills.$inferInsert) {
    const [newSkill] = await db.insert(skills).values(data).returning();
    return newSkill;
  }

  async update(id: number, data: Partial<typeof skills.$inferInsert>) {
    const [updated] = await db
      .update(skills)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return updated;
  }

  async delete(id: number) {
    await db.delete(skills).where(eq(skills.id, id));
  }

  async getSkillReviews(skillId: number, limit: number = 20, offset: number = 0) {
    return await db
      .select({
        id: skillReviews.id,
        rating: skillReviews.rating,
        comment: skillReviews.comment,
        verified: skillReviews.verified,
        createdAt: skillReviews.createdAt,
        user: {
          name: users.name,
          profile: users.profile,
        },
      })
      .from(skillReviews)
      .leftJoin(users, eq(skillReviews.userId, users.id))
      .where(eq(skillReviews.skillId, skillId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(skillReviews.createdAt));
  }

  async getSkillDownloads(skillId: number, limit: number = 20, offset: number = 0) {
    return await db
      .select({
        id: skillDownloads.id,
        downloadUrl: skillDownloads.downloadUrl,
        expiresAt: skillDownloads.expiresAt,
        createdAt: skillDownloads.createdAt,
        user: {
          name: users.name,
          profile: users.profile,
        },
      })
      .from(skillDownloads)
      .leftJoin(users, eq(skillDownloads.userId, users.id))
      .where(eq(skillDownloads.skillId, skillId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(skillDownloads.createdAt));
  }

  async createReview(data: typeof skillReviews.$inferInsert) {
    const [review] = await db.insert(skillReviews).values(data).returning();
    return review;
  }

  async getUserReview(skillId: number, userId: number) {
    const [review] = await db
      .select()
      .from(skillReviews)
      .where(and(eq(skillReviews.skillId, skillId), eq(skillReviews.userId, userId)))
      .limit(1);
    return review;
  }

  async createDownload(data: typeof skillDownloads.$inferInsert) {
    const [download] = await db.insert(skillDownloads).values(data).returning();
    return download;
  }

  async incrementDownloads(skillId: number) {
    await db
      .update(skills)
      .set({
        downloads: sql`${skills.downloads} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(skills.id, skillId));
  }

  async getReviewCount(skillId: number) {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(skillReviews)
      .where(eq(skillReviews.skillId, skillId));
    return result?.count || 0;
  }

  async getDownloadCount(skillId: number) {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(skillDownloads)
      .where(eq(skillDownloads.skillId, skillId));
    return result?.count || 0;
  }

  async getCategories() {
    const categories = await db
      .select({
        category: skills.category,
        count: sql<number>`count(*)`,
      })
      .from(skills)
      .where(eq(skills.status, 'active'))
      .groupBy(skills.category)
      .orderBy(sql`count(*) desc`);

    return categories;
  }
}

export const skillsRepository = new SkillsRepository();
