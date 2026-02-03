import { db, users, transactions } from '@/lib/db';
import { eq, sql, desc, and } from 'drizzle-orm';

export class CreditsService {
  async getUserBalance(userId: number) {
    const [user] = await db
      .select({ credits: users.credits })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return Number(user?.credits || '0');
  }

  async getTransactionHistory(userId: number, limit: number = 20, offset: number = 0) {
    const txList = await db
      .select({
        id: transactions.id,
        type: transactions.type,
        amount: transactions.amount,
        description: transactions.description,
        status: transactions.status,
        solanaTxId: transactions.solanaTxId,
        x402Signature: transactions.x402Signature,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);

    return txList.map((t) => ({
      ...t,
      amount: Number(t.amount),
    }));
  }

  async addCredits(
    userId: number,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ) {
    // Get current balance
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    const currentBalance = Number(user.credits);
    const newBalance = currentBalance + amount;

    // Update user balance
    await db.update(users).set({ credits: newBalance }).where(eq(users.id, userId));

    // Record transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        userId,
        type: 'deposit',
        amount,
        description,
        status: 'completed',
        metadata,
      })
      .returning();

    return {
      userId,
      previousBalance: currentBalance,
      newBalance,
      amount,
      transaction,
    };
  }

  async deductCredits(
    userId: number,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ) {
    // Get current balance
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    const currentBalance = Number(user.credits);

    if (currentBalance < amount) {
      throw new Error('Insufficient credits');
    }

    const newBalance = currentBalance - amount;

    // Update user balance
    await db.update(users).set({ credits: newBalance }).where(eq(users.id, userId));

    // Record transaction
    const [transaction] = await db
      .insert(transactions)
      .values({
        userId,
        type: 'usage',
        amount: -amount,
        description,
        status: 'completed',
        metadata,
      })
      .returning();

    return {
      userId,
      previousBalance: currentBalance,
      newBalance,
      amount,
      transaction,
    };
  }

  async refundCredits(
    userId: number,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ) {
    return await this.addCredits(userId, amount, description, {
      ...metadata,
      refund: true,
    });
  }

  async getCreditsSummary(userId: number, period: { startDate: Date; endDate: Date }) {
    const summary = await db
      .select({
        totalDeposits: sql<number>`COALESCE(SUM(CASE WHEN type = 'deposit' THEN ABS(amount) ELSE 0 END), 0)`,
        totalUsage: sql<number>`COALESCE(SUM(CASE WHEN type = 'usage' THEN ABS(amount) ELSE 0 END), 0)`,
        totalRefunds: sql<number>`COALESCE(SUM(CASE WHEN type = 'refund' THEN ABS(amount) ELSE 0 END), 0)`,
        transactionCount: sql<number>`count(*)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          eq(transactions.status, 'completed'),
          sql`${transactions.createdAt} >= ${period.startDate}`,
          sql`${transactions.createdAt} <= ${period.endDate}`
        )
      );

    return {
      totalDeposits: Number(summary[0]?.totalDeposits || 0),
      totalUsage: Number(summary[0]?.totalUsage || 0),
      totalRefunds: Number(summary[0]?.totalRefunds || 0),
      transactionCount: Number(summary[0]?.transactionCount || 0),
      netChange:
        Number(summary[0]?.totalDeposits || 0) +
        Number(summary[0]?.totalRefunds || 0) -
        Number(summary[0]?.totalUsage || 0),
    };
  }
}

export const creditsService = new CreditsService();
