import {
  db,
  apiListings,
  skills,
  agents,
  transactions,
  usageRecords,
  reviews,
  skillReviews,
  users,
} from '@/lib/db';
import { and, sql, eq, gte, lte, desc, or } from 'drizzle-orm';

export type AnalyticsPeriod = '24h' | '7d' | '30d' | '90d' | 'all';
export type AnalyticsGranularity = 'hour' | 'day' | 'week' | 'month';

export class AnalyticsService {
  private getDateRange(period: AnalyticsPeriod): { startDate: Date; endDate: Date } {
    const now = new Date();
    const startDate = new Date(now);

    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'all':
        startDate.setFullYear(startDate.getFullYear() - 10); // Far back
        break;
    }

    return { startDate, endDate: now };
  }

  async getMarketplaceOverview(period: AnalyticsPeriod = '30d') {
    const { startDate, endDate } = this.getDateRange(period);

    // Total listings count
    const [listingsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(eq(apiListings.status, 'approved'));

    // Total skills count
    const [skillsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(skills)
      .where(eq(skills.status, 'active'));

    // Total agents count
    const [agentsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(agents)
      .where(eq(agents.status, 'active'));

    // Total users count
    const [usersCount] = await db.select({ count: sql<number>`count(*)` }).from(users);

    // New listings in period
    const [newListings] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(
        and(
          eq(apiListings.status, 'approved'),
          gte(apiListings.createdAt, startDate),
          lte(apiListings.createdAt, endDate)
        )
      );

    // New skills in period
    const [newSkills] = await db
      .select({ count: sql<number>`count(*)` })
      .from(skills)
      .where(
        and(
          eq(skills.status, 'active'),
          gte(skills.createdAt, startDate),
          lte(skills.createdAt, endDate)
        )
      );

    // Total revenue in period
    const [revenueResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(ABS(amount)), 0)` })
      .from(transactions)
      .where(
        and(
          eq(transactions.status, 'completed'),
          or(eq(transactions.type, 'deposit'), eq(transactions.type, 'usage')),
          gte(transactions.createdAt, startDate),
          lte(transactions.createdAt, endDate)
        )
      );

    // Total transactions in period
    const [transactionsCount] = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(
        and(
          eq(transactions.status, 'completed'),
          gte(transactions.createdAt, startDate),
          lte(transactions.createdAt, endDate)
        )
      );

    // Average rating
    const [avgRatingResult] = await db
      .select({ avg: sql<number>`COALESCE(AVG(rating), 0)` })
      .from(reviews);

    // Average skill rating
    const [avgSkillRatingResult] = await db
      .select({ avg: sql<number>`COALESCE(AVG(rating), 0)` })
      .from(skillReviews);

    return {
      listings: Number(listingsCount?.count || 0),
      skills: Number(skillsCount?.count || 0),
      agents: Number(agentsCount?.count || 0),
      users: Number(usersCount?.count || 0),
      newListings: Number(newListings?.count || 0),
      newSkills: Number(newSkills?.count || 0),
      revenue: Number(revenueResult?.total || 0),
      transactions: Number(transactionsCount?.count || 0),
      avgRating: Number(avgRatingResult?.avg || 0),
      avgSkillRating: Number(avgSkillRatingResult?.avg || 0),
      period,
    };
  }

  async getCategoryStats(period: AnalyticsPeriod = '30d', category?: string) {
    const { startDate, endDate } = this.getDateRange(period);

    const conditions = [
      eq(apiListings.status, 'approved'),
      gte(apiListings.createdAt, startDate),
      lte(apiListings.createdAt, endDate),
    ];

    if (category) {
      conditions.push(eq(apiListings.category, category));
    }

    const categoryStats = await db
      .select({
        category: apiListings.category,
        count: sql<number>`count(*)`,
        avgPrice: sql<number>`COALESCE(AVG(price), 0)`,
        avgRating: sql<number>`COALESCE((SELECT AVG(rating) FROM ${reviews} WHERE api_id = ${apiListings.id}), 0)`,
      })
      .from(apiListings)
      .where(and(...conditions))
      .groupBy(apiListings.category)
      .orderBy(sql`count(*) desc`);

    return categoryStats;
  }

  async getTopListings(period: AnalyticsPeriod = '30d', limit: number = 10) {
    const { startDate, endDate } = this.getDateRange(period);

    const topListings = await db
      .select({
        id: apiListings.id,
        name: apiListings.title,
        slug: apiListings.slug,
        category: apiListings.category,
        price: apiListings.price,
        usageCount: sql<number>`(SELECT COUNT(*) FROM ${usageRecords} WHERE api_id = ${apiListings.id} AND ${usageRecords.createdAt} >= ${startDate} AND ${usageRecords.createdAt} <= ${endDate})`,
        rating: sql<number>`COALESCE((SELECT AVG(rating) FROM ${reviews} WHERE api_id = ${apiListings.id}), 0)`,
        reviewCount: sql<number>`(SELECT COUNT(*) FROM ${reviews} WHERE api_id = ${apiListings.id})`,
      })
      .from(apiListings)
      .where(eq(apiListings.status, 'approved'))
      .orderBy(
        sql`(SELECT COUNT(*) FROM ${usageRecords} WHERE api_id = ${apiListings.id} AND ${usageRecords.createdAt} >= ${startDate} AND ${usageRecords.createdAt} <= ${endDate}) desc`
      )
      .limit(limit);

    return topListings;
  }

  async getTopSkills(_period: AnalyticsPeriod = '30d', limit: number = 10) {
    const topSkills = await db
      .select({
        id: skills.id,
        name: skills.name,
        slug: skills.slug,
        category: skills.category,
        price: skills.price,
        downloads: skills.downloads,
        rating: skills.rating,
        reviewCount: skills.reviewCount,
      })
      .from(skills)
      .where(eq(skills.status, 'active'))
      .orderBy(desc(skills.downloads))
      .limit(limit);

    return topSkills;
  }

  async getUsageTrends(period: AnalyticsPeriod = '30d', granularity: AnalyticsGranularity = 'day') {
    const { startDate, endDate } = this.getDateRange(period);

    const usageTrends = await db
      .select({
        date: sql<string>`date_trunc('${granularity}', ${usageRecords.createdAt})`,
        count: sql<number>`count(*)`,
        totalCredits: sql<number>`COALESCE(SUM(credits_used), 0)`,
      })
      .from(usageRecords)
      .where(and(gte(usageRecords.createdAt, startDate), lte(usageRecords.createdAt, endDate)))
      .groupBy(sql`date_trunc('${granularity}', ${usageRecords.createdAt})`)
      .orderBy(sql`date_trunc('${granularity}', ${usageRecords.createdAt})`);

    return usageTrends;
  }

  async getRevenueTrends(
    period: AnalyticsPeriod = '30d',
    granularity: AnalyticsGranularity = 'day'
  ) {
    const { startDate, endDate } = this.getDateRange(period);

    const revenueTrends = await db
      .select({
        date: sql<string>`date_trunc('${granularity}', ${transactions.createdAt})`,
        revenue: sql<number>`COALESCE(SUM(ABS(amount)), 0)`,
        count: sql<number>`count(*)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.status, 'completed'),
          gte(transactions.createdAt, startDate),
          lte(transactions.createdAt, endDate)
        )
      )
      .groupBy(sql`date_trunc('${granularity}', ${transactions.createdAt})`)
      .orderBy(sql`date_trunc('${granularity}', ${transactions.createdAt})`);

    return revenueTrends;
  }

  async getUserGrowthTrends(
    period: AnalyticsPeriod = '30d',
    granularity: AnalyticsGranularity = 'day'
  ) {
    const { startDate, endDate } = this.getDateRange(period);

    const userGrowth = await db
      .select({
        date: sql<string>`date_trunc('${granularity}', ${users.createdAt})`,
        count: sql<number>`count(*)`,
      })
      .from(users)
      .where(and(gte(users.createdAt, startDate), lte(users.createdAt, endDate)))
      .groupBy(sql`date_trunc('${granularity}', ${users.createdAt})`)
      .orderBy(sql`date_trunc('${granularity}', ${users.createdAt})`);

    return userGrowth;
  }

  async getListingPerformance(listingId: number, period: AnalyticsPeriod = '30d') {
    const { startDate, endDate } = this.getDateRange(period);

    const [usageStats] = await db
      .select({
        totalUsage: sql<number>`count(*)`,
        totalCredits: sql<number>`COALESCE(SUM(credits_used), 0)`,
        avgCredits: sql<number>`COALESCE(AVG(credits_used), 0)`,
        uniqueUsers: sql<number>`count(DISTINCT user_id)`,
      })
      .from(usageRecords)
      .where(
        and(
          eq(usageRecords.apiId, listingId),
          gte(usageRecords.createdAt, startDate),
          lte(usageRecords.createdAt, endDate)
        )
      );

    const [ratingStats] = await db
      .select({
        totalReviews: sql<number>`count(*)`,
        avgRating: sql<number>`COALESCE(AVG(rating), 0)`,
      })
      .from(reviews)
      .where(eq(reviews.apiId, listingId));

    return {
      period,
      usage: {
        totalUsage: Number(usageStats?.totalUsage || 0),
        totalCredits: Number(usageStats?.totalCredits || 0),
        avgCredits: Number(usageStats?.avgCredits || 0),
        uniqueUsers: Number(usageStats?.uniqueUsers || 0),
      },
      reviews: {
        totalReviews: Number(ratingStats?.totalReviews || 0),
        avgRating: Number(ratingStats?.avgRating || 0),
      },
    };
  }

  async getSkillPerformance(skillId: number, period: AnalyticsPeriod = '30d') {
    const { startDate, endDate } = this.getDateRange(period);

    const skill = await db.select().from(skills).where(eq(skills.id, skillId)).limit(1);

    if (!skill.length) {
      throw new Error('Skill not found');
    }

    const downloadsInPeriod = await db
      .select({ count: sql<number>`count(*)` })
      .from(skillReviews) // Using skillReviews table for tracking
      .where(
        and(
          eq(skillReviews.skillId, skillId),
          gte(skillReviews.createdAt, startDate),
          lte(skillReviews.createdAt, endDate)
        )
      );

    const reviewsInPeriod = await db
      .select({
        count: sql<number>`count(*)`,
        avgRating: sql<number>`COALESCE(AVG(rating), 0)`,
      })
      .from(skillReviews)
      .where(
        and(
          eq(skillReviews.skillId, skillId),
          gte(skillReviews.createdAt, startDate),
          lte(skillReviews.createdAt, endDate)
        )
      );

    return {
      period,
      skill: {
        ...skill[0],
        downloads: Number(skill[0].downloads),
        rating: Number(skill[0].rating),
      },
      performance: {
        downloadsInPeriod: Number(downloadsInPeriod[0]?.count || 0),
        reviewsInPeriod: Number(reviewsInPeriod[0]?.count || 0),
        avgRatingInPeriod: Number(reviewsInPeriod[0]?.avgRating || 0),
      },
    };
  }

  async getAgentPerformance(agentId: number, period: AnalyticsPeriod = '30d') {
    const agent = await db.select().from(agents).where(eq(agents.id, agentId)).limit(1);

    if (!agent.length) {
      throw new Error('Agent not found');
    }

    return {
      period,
      agent: agent[0],
      performance: {
        // Agent-specific performance metrics can be added here
        reputationWeight: Number(agent[0].reputationWeight),
        status: agent[0].status,
      },
    };
  }

  async getUserAnalytics(userId: number, period: AnalyticsPeriod = '30d') {
    const { startDate, endDate } = this.getDateRange(period);

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    const [usageStats] = await db
      .select({
        totalUsage: sql<number>`count(*)`,
        totalCredits: sql<number>`COALESCE(SUM(credits_used), 0)`,
      })
      .from(usageRecords)
      .where(
        and(
          eq(usageRecords.userId, userId),
          gte(usageRecords.createdAt, startDate),
          lte(usageRecords.createdAt, endDate)
        )
      );

    const [transactionStats] = await db
      .select({
        totalTransactions: sql<number>`count(*)`,
        totalDeposits: sql<number>`COALESCE(SUM(CASE WHEN type = 'deposit' THEN ABS(amount) ELSE 0 END), 0)`,
        totalWithdrawals: sql<number>`COALESCE(SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          eq(transactions.status, 'completed'),
          gte(transactions.createdAt, startDate),
          lte(transactions.createdAt, endDate)
        )
      );

    return {
      period,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        credits: Number(user.credits),
        role: user.role,
      },
      usage: {
        totalUsage: Number(usageStats?.totalUsage || 0),
        totalCredits: Number(usageStats?.totalCredits || 0),
      },
      transactions: {
        totalTransactions: Number(transactionStats?.totalTransactions || 0),
        totalDeposits: Number(transactionStats?.totalDeposits || 0),
        totalWithdrawals: Number(transactionStats?.totalWithdrawals || 0),
      },
    };
  }

  async getRealtimeStats() {
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    // Active users in last hour
    const [activeUsers] = await db
      .select({ count: sql<number>`count(DISTINCT user_id)` })
      .from(usageRecords)
      .where(gte(usageRecords.createdAt, hourAgo));

    // Listings created in last hour
    const [newListings] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(gte(apiListings.createdAt, hourAgo));

    // Transactions in last hour
    const [recentTransactions] = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(and(eq(transactions.status, 'completed'), gte(transactions.createdAt, hourAgo)));

    // Revenue in last hour
    const [recentRevenue] = await db
      .select({ total: sql<number>`COALESCE(SUM(ABS(amount)), 0)` })
      .from(transactions)
      .where(
        and(
          eq(transactions.status, 'completed'),
          or(eq(transactions.type, 'deposit'), eq(transactions.type, 'usage')),
          gte(transactions.createdAt, hourAgo)
        )
      );

    return {
      timestamp: now.toISOString(),
      activeUsers: Number(activeUsers?.count || 0),
      newListings: Number(newListings?.count || 0),
      recentTransactions: Number(recentTransactions?.count || 0),
      recentRevenue: Number(recentRevenue?.total || 0),
    };
  }

  async getDashboardData(userEmail: string) {
    const [user] = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);

    if (!user) {
      return null;
    }

    // Get listings count for this user
    const [listingsCountResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(and(eq(apiListings.ownerId, user.id)));

    // Get total usage for this user
    const [usageResult] = await db
      .select({ total: sql<number>`COALESCE(SUM(credits_used), 0)` })
      .from(usageRecords)
      .where(eq(usageRecords.userId, user.id));

    // Get USDC balance (mock data for now)
    const usdcBalance = 0;

    return {
      user,
      listingsCount: Number(listingsCountResult?.count || 0),
      totalUsage: Number(usageResult?.total || 0),
      credits: user.credits || 0,
      usdcBalance,
      totalUsdValue: Number(user.credits || 0) * 0.01, // Assuming 1 credit = $0.01
      yieldData: {
        amount: 0.05, // 5% APR
        latency: 150, // ms
      },
    };
  }
}

export const analyticsService = new AnalyticsService();
