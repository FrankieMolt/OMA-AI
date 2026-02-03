import { db, transactions } from '@/lib/db';
import { sql } from 'drizzle-orm';

export class TransactionsService {
  async createTransaction(data: {
    userId: number;
    type: string;
    amount: number;
    description?: string;
    solanaTxId?: string;
    x402Signature?: string;
    status: 'pending' | 'completed' | 'failed';
  }) {
    const [newTx] = await db
      .insert(transactions)
      .values({
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        solanaTxId: data.solanaTxId,
        x402Signature: data.x402Signature,
        status: data.status,
      })
      .returning();
    return newTx;
  }

  async getTransactionsByUser(userId: number, limit = 10) {
    return await db
      .select()
      .from(transactions)
      .where(sql`${transactions.userId} = ${userId}`)
      .orderBy(sql`${transactions.createdAt} desc`)
      .limit(limit);
  }
}

export const transactionsService = new TransactionsService();
