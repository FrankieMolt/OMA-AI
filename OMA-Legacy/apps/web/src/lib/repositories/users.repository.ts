import { eq, and, or, like, desc, sql, ne, gte } from 'drizzle-orm';
import { users, type User } from '@/lib/db/schema';
import { BaseRepository, type QueryOptions } from './base.repository';

export interface FindUserByEmailOptions {
  email: string;
}

export interface FindUserByWalletOptions {
  walletAddress: string;
}

export interface FindUsersByRoleOptions extends QueryOptions {
  role: 'admin' | 'user' | 'moderator';
}

export interface FindUserOptions extends QueryOptions {
  email?: string;
  role?: string;
  search?: string;
}

export class UserRepository extends BaseRepository<typeof users> {
  constructor() {
    super(users);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: eq(users.email, email) });
  }

  async findByWalletAddress(walletAddress: string): Promise<User | null> {
    return this.findOne({
      where: eq(users.solanaWalletAddress, walletAddress),
    });
  }

  async findByRole(role: string, options?: QueryOptions): Promise<User[]> {
    return this.findMany({
      ...options,
      where: eq(users.role, role),
    });
  }

  async searchUsers(searchTerm: string, options?: QueryOptions): Promise<User[]> {
    return this.findMany({
      ...options,
      where: or(like(users.name, `%${searchTerm}%`), like(users.email, `%${searchTerm}%`)),
      orderBy: desc(users.createdAt),
    });
  }

  async findByStripeCustomerId(stripeCustomerId: string): Promise<User | null> {
    return this.findOne({
      where: eq(users.stripeCustomerId, stripeCustomerId),
    });
  }

  async updateCredits(userId: number, amount: number): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user) return null;

    const newCredits = Math.max(0, user.credits + amount);
    return this.update(userId, { credits: newCredits });
  }

  async updateUsdcBalance(userId: number, amount: number): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user) return null;

    const newBalance = Math.max(0, user.usdcBalance + amount);
    return this.update(userId, { usdcBalance: newBalance });
  }

  async updateUserProfile(userId: number, profile: Record<string, unknown>): Promise<User | null> {
    return this.update(userId, {
      profile: profile as User['profile'],
      updatedAt: new Date(),
    });
  }

  async emailExists(email: string, excludeUserId?: number): Promise<boolean> {
    const conditions = [eq(users.email, email)];

    if (excludeUserId) {
      conditions.push(ne(users.id, excludeUserId));
    }

    const result = await this.getDb()
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(and(...conditions));

    return (result[0]?.count ?? 0) > 0;
  }

  async getActiveUsersCount(): Promise<number> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await this.getDb()
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo));

    return Number(result[0]?.count ?? 0);
  }
}

export const userRepository = new UserRepository();
