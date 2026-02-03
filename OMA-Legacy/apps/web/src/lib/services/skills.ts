import { skillsRepository } from '@/lib/repositories/skills';
import { skills } from '@/lib/db';
import { and, sql, eq, desc, asc, or, ilike } from 'drizzle-orm';

export type CreateSkillParams = {
  name: string;
  description: string;
  category: string;
  tags?: string[];
  capabilities?: string[];
  pricingType: 'one-time' | 'subscription' | 'free' | 'usage';
  price: number;
  githubUrl?: string;
  demoUrl?: string;
  documentation?: string;
  metadata?: Record<string, unknown>;
};

export type UpdateSkillParams = Partial<CreateSkillParams> & {
  status?: 'active' | 'pending' | 'rejected' | 'suspended';
  featured?: boolean;
  verified?: boolean;
};

export class SkillsService {
  async list(
    params: {
      search?: string;
      category?: string;
      limit?: number;
      offset?: number;
      sortBy?: string;
      status?: string;
      tags?: string[];
      pricingType?: string;
      featured?: boolean;
      verified?: boolean;
    } = {}
  ) {
    const {
      search,
      category,
      sortBy = 'newest',
      status = 'active',
      tags,
      pricingType,
      featured,
      verified,
    } = params;
    const conditions: import('drizzle-orm').SQL[] = [];

    if (search) {
      conditions.push(
        or(
          ilike(skills.name, `%${search}%`),
          ilike(skills.description, `%${search}%`)
        ) as import('drizzle-orm').SQL
      );
    }

    if (category && category !== 'all') {
      conditions.push(eq(skills.category, category));
    }

    if (status && status !== 'all') {
      conditions.push(eq(skills.status, status));
    }

    if (tags && tags.length > 0) {
      conditions.push(sql`${skills.tags} ?| ${tags}`);
    }

    if (pricingType && pricingType !== 'all') {
      conditions.push(eq(skills.pricingType, pricingType));
    }

    if (featured !== undefined) {
      conditions.push(eq(skills.featured, featured));
    }

    if (verified !== undefined) {
      conditions.push(eq(skills.verified, verified));
    }

    let orderBy = desc(skills.createdAt);
    if (sortBy === 'popular') {
      orderBy = desc(skills.downloads);
    } else if (sortBy === 'price-low') {
      orderBy = asc(skills.price);
    } else if (sortBy === 'price-high') {
      orderBy = desc(skills.price);
    } else if (sortBy === 'rating') {
      orderBy = desc(skills.rating);
    } else if (sortBy === 'name') {
      orderBy = asc(skills.name);
    }

    const data = await skillsRepository.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      limit: params.limit,
      offset: params.offset,
      orderBy,
    });

    return data;
  }

  async getById(id: number) {
    return await skillsRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return await skillsRepository.findBySlug(slug);
  }

  async create(data: CreateSkillParams, ownerId: number) {
    const slug = this.generateSlug(data.name);

    const existing = await skillsRepository.findBySlugSimple(slug);
    if (existing) {
      throw new Error('Skill with this name already exists');
    }

    return await skillsRepository.create({
      ...data,
      slug,
      ownerId,
      status: 'pending',
      tags: data.tags || [],
      capabilities: data.capabilities || [],
      metadata: data.metadata || {},
    });
  }

  async update(id: number, data: UpdateSkillParams, userId: number) {
    const skill = await skillsRepository.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }

    if (skill.skill.ownerId !== userId) {
      throw new Error('Unauthorized to update this skill');
    }

    const updateData: UpdateSkillParams & { slug?: string } = { ...data };
    if (data.name) {
      updateData.slug = this.generateSlug(data.name);
    }

    return await skillsRepository.update(id, updateData);
  }

  async delete(id: number, userId: number) {
    const skill = await skillsRepository.findById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }

    if (skill.skill.ownerId !== userId) {
      throw new Error('Unauthorized to delete this skill');
    }

    await skillsRepository.delete(id);
    return { success: true };
  }

  async getReviews(skillId: number, limit: number = 20, offset: number = 0) {
    const reviews = await skillsRepository.getSkillReviews(skillId, limit, offset);
    return reviews;
  }

  async getDownloads(skillId: number, limit: number = 20, offset: number = 0) {
    const downloads = await skillsRepository.getSkillDownloads(skillId, limit, offset);
    return downloads;
  }

  async addReview(skillId: number, userId: number, rating: number, comment: string) {
    const existing = await skillsRepository.getUserReview(skillId, userId);
    if (existing) {
      throw new Error('User has already reviewed this skill');
    }

    const review = await skillsRepository.createReview({
      skillId,
      userId,
      rating,
      comment,
      verified: false,
    });

    // Update skill rating
    await this.updateSkillRating(skillId);
    return review;
  }

  async recordDownload(skillId: number, userId: number, transactionId?: number) {
    const download = await skillsRepository.createDownload({
      skillId,
      userId,
      transactionId,
    });

    // Increment download count
    await skillsRepository.incrementDownloads(skillId);
    return download;
  }

  async getFeatured(limit: number = 10) {
    return await skillsRepository.findMany({
      where: and(eq(skills.featured, true), eq(skills.status, 'active')),
      limit,
      orderBy: desc(skills.downloads),
    });
  }

  async getVerified(limit: number = 10) {
    return await skillsRepository.findMany({
      where: and(eq(skills.verified, true), eq(skills.status, 'active')),
      limit,
      orderBy: desc(skills.rating),
    });
  }

  async getCategories() {
    const categories = await skillsRepository.getCategories();
    return categories;
  }

  async getStats(skillId: number) {
    const skill = await skillsRepository.findById(skillId);
    if (!skill) {
      throw new Error('Skill not found');
    }

    const reviews = await skillsRepository.getReviewCount(skillId);
    const downloads = await skillsRepository.getDownloadCount(skillId);

    return {
      id: skill.skill.id,
      name: skill.skill.name,
      downloads,
      reviewCount: reviews,
      rating: skill.skill.rating,
      createdAt: skill.skill.createdAt,
    };
  }

  private async updateSkillRating(skillId: number) {
    const reviews = await skillsRepository.getSkillReviews(skillId, 1000, 0);
    if (reviews.length === 0) return;

    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await skillsRepository.update(skillId, {
      rating: Number(avgRating.toFixed(2)),
      reviewCount: reviews.length,
    });
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
}

export const skillsService = new SkillsService();
