import { db, users } from '@/lib/db';
import { sql } from 'drizzle-orm';

export class UsersService {
  async getUserByWallet(walletAddress: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(sql`${users.solanaWalletAddress} = ${walletAddress}`)
      .limit(1);
    return user || null;
  }

  async createUser(data: {
    email: string;
    walletAddress: string;
    name: string;
    password?: string;
  }) {
    const [newUser] = await db
      .insert(users)
      .values({
        email: data.email,
        solanaWalletAddress: data.walletAddress,
        name: data.name,
        password: data.password || 'managed-by-wallet',
        credits: 0,
        usdcBalance: 0,
      })
      .returning();
    return newUser;
  }

  async updateBalance(userId: number, usdcDelta: number, creditsDelta: number) {
    const [updatedUser] = await db
      .update(users)
      .set({
        usdcBalance: sql`${users.usdcBalance} + ${usdcDelta}`,
        credits: sql`${users.credits} + ${creditsDelta}`,
        updatedAt: new Date(),
      })
      .where(sql`${users.id} = ${userId}`)
      .returning();
    return updatedUser;
  }
}

export const usersService = new UsersService();
