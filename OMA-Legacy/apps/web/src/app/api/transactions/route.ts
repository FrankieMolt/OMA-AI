import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, transactions, apiListings, skills } from '@/lib/db';
import { eq, sql, desc, and, type SQL } from 'drizzle-orm';
import { paginationSchema } from '@/lib/validators';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 60 })(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    // Get internal user ID
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);
    if (!user) {
      return errorResponse('User profile not found', 404, 'NOT_FOUND', undefined, requestId);
    }

    // Validate query parameters
    const queryParams = {
      page: request.nextUrl.searchParams.get('page') || '1',
      limit: request.nextUrl.searchParams.get('limit') || '20',
      type: request.nextUrl.searchParams.get('type') || undefined,
      status: request.nextUrl.searchParams.get('status') || undefined,
      startDate: request.nextUrl.searchParams.get('startDate') || undefined,
      endDate: request.nextUrl.searchParams.get('endDate') || undefined,
      minAmount: request.nextUrl.searchParams.get('minAmount') || undefined,
      maxAmount: request.nextUrl.searchParams.get('maxAmount') || undefined,
    };

    const validatedQuery = paginationSchema.safeParse(queryParams);
    if (!validatedQuery.success) {
      return validationErrorResponse(
        'Invalid query parameters',
        { errors: validatedQuery.error.errors },
        requestId
      );
    }

    const { page, limit } = validatedQuery.data;
    const { type, status, startDate, endDate, minAmount, maxAmount } = queryParams;
    const offset = (page - 1) * limit;

    // Build conditions
    const conditions: SQL[] = [eq(transactions.userId, user.id)];

    if (type) {
      conditions.push(eq(transactions.type, type));
    }

    if (status) {
      conditions.push(eq(transactions.status, status));
    }

    if (startDate) {
      conditions.push(sql`${transactions.createdAt} >= ${new Date(startDate)}`);
    }

    if (endDate) {
      conditions.push(sql`${transactions.createdAt} <= ${new Date(endDate)}`);
    }

    if (minAmount !== undefined) {
      conditions.push(sql`ABS(${transactions.amount}) >= ${minAmount}`);
    }

    if (maxAmount !== undefined) {
      conditions.push(sql`ABS(${transactions.amount}) <= ${maxAmount}`);
    }

    // Fetch transactions with related information
    const transactionList = await db
      .select({
        id: transactions.id,
        type: transactions.type,
        amount: transactions.amount,
        description: transactions.description,
        status: transactions.status,
        solanaTxId: transactions.solanaTxId,
        x402Signature: transactions.x402Signature,
        createdAt: transactions.createdAt,
        apiId: transactions.apiId,
        skillId: transactions.skillId,
        // Related listing info
        listingName: apiListings.title,
        listingSlug: apiListings.slug,
        // Related skill info
        skillName: skills.name,
        skillSlug: skills.slug,
      })
      .from(transactions)
      .leftJoin(apiListings, eq(transactions.apiId, apiListings.id))
      .leftJoin(skills, eq(transactions.skillId, skills.id))
      .where(and(...conditions))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const totalRes = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(and(...conditions));
    const total = totalRes[0]?.count || 0;

    // Calculate summary statistics
    const summary = await db
      .select({
        totalTransactions: sql<number>`count(*)`,
        totalDeposits: sql<number>`COALESCE(SUM(CASE WHEN type = 'deposit' THEN ABS(amount) ELSE 0 END), 0)`,
        totalWithdrawals: sql<number>`COALESCE(SUM(CASE WHEN type = 'withdrawal' THEN ABS(amount) ELSE 0 END), 0)`,
        totalUsage: sql<number>`COALESCE(SUM(CASE WHEN type = 'usage' THEN ABS(amount) ELSE 0 END), 0)`,
        totalRefunds: sql<number>`COALESCE(SUM(CASE WHEN type = 'refund' THEN ABS(amount) ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(and(...conditions));

    return successResponse({
      transactions: transactionList.map((t) => ({
        ...t,
        amount: Number(t.amount),
      })),
      meta: {
        page,
        limit,
        total,
      },
      summary: {
        totalTransactions: Number(summary[0]?.totalTransactions || 0),
        totalDeposits: Number(summary[0]?.totalDeposits || 0),
        totalWithdrawals: Number(summary[0]?.totalWithdrawals || 0),
        totalUsage: Number(summary[0]?.totalUsage || 0),
        totalRefunds: Number(summary[0]?.totalRefunds || 0),
        netBalance:
          Number(summary[0]?.totalDeposits || 0) -
          Number(summary[0]?.totalWithdrawals || 0) -
          Number(summary[0]?.totalUsage || 0) +
          Number(summary[0]?.totalRefunds || 0),
      },
    });
  } catch (error) {
    logger.error('Error fetching transactions', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
