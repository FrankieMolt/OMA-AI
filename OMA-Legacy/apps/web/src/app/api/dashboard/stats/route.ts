import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { db, apiListings, users, transactions, usageRecords } from '@/lib/db';
import { eq, sql, desc } from 'drizzle-orm';

export async function GET() {
  try {
    // 1. Get the primary user (admin for demo)
    const [user] = await db.select().from(users).where(eq(users.email, 'admin@oma.com')).limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Get listings count and user listings
    const [listingsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(apiListings)
      .where(eq(apiListings.ownerId, user.id));

    const userListings = await db
      .select()
      .from(apiListings)
      .where(eq(apiListings.ownerId, user.id))
      .orderBy(desc(apiListings.createdAt))
      .limit(5);

    // 3. Get real usage data from usageRecords
    const [usageResult] = await db
      .select({
        totalCredits: sql<number>`sum(${usageRecords.creditsUsed})`,
        totalUsage: sql<number>`count(*)`,
      })
      .from(usageRecords)
      .where(eq(usageRecords.userId, user.id));

    // 4. Get real transaction data for recent activities
    const recentTransactions = await db
      .select({
        id: transactions.id,
        type: transactions.type,
        amount: transactions.amount,
        description: transactions.description,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .where(eq(transactions.userId, user.id))
      .orderBy(desc(transactions.createdAt))
      .limit(5);

    // 5. Get individual listing usage data
    const listingUsageData = await Promise.all(
      userListings.map(async (listing) => {
        const [usage] = await db
          .select({
            totalUsage: sql<number>`count(*)`,
            totalCredits: sql<number>`sum(${usageRecords.creditsUsed})`,
          })
          .from(usageRecords)
          .where(eq(usageRecords.apiId, listing.id));

        return {
          listingId: listing.id,
          totalUsage: Number(usage?.totalUsage || 0),
          totalCredits: Number(usage?.totalCredits || 0),
        };
      })
    );

    // 6. Build response with real data
    const totalCreditsUsed = Number(usageResult?.totalCredits || 0);
    const totalUsageCount = Number(usageResult?.totalUsage || 0);

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        credits: user.credits,
        usdcBalance: user.usdcBalance,
      },
      stats: {
        listingsCount: Number(listingsResult?.count || 0),
        totalUsage:
          totalUsageCount > 1000
            ? `${(totalUsageCount / 1000).toFixed(1)}k`
            : totalUsageCount.toString(),
        totalCreditsUsed: totalCreditsUsed.toFixed(2),
        totalUsdValue: Number(user.credits) * 0.01 + Number(user.usdcBalance),
      },
      listings: userListings.map((l) => {
        const usage = listingUsageData.find((u) => u.listingId === l.id);
        return {
          id: l.id,
          name: l.title,
          type: l.type,
          status: l.status,
          usage: usage?.totalUsage || 0,
          revenue: (Number(l.price) * (usage?.totalUsage || 0)).toFixed(2),
          category: l.category,
        };
      }),
      recentActivities: recentTransactions.map((tx) => ({
        id: tx.id,
        type: tx.type,
        agent: tx.description || 'System',
        cost: Number(tx.amount),
        time: new Date(tx.createdAt).toISOString(),
      })),
    });
  } catch (error) {
    console.error('Dashboard Stats API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
