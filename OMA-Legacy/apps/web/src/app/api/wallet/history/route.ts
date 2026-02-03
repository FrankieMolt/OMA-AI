import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, transactions } from '@/lib/db';
import { eq, desc, and, sql, type SQL } from 'drizzle-orm';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';

// Query parameters schema
const historyQuerySchema = z.object({
  type: z.enum(['deposit', 'withdrawal', 'payment', 'all']).default('all'),
  status: z.enum(['pending', 'completed', 'failed', 'all']).default('all'),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const CREDITS_PER_USD = 1000;

export async function GET(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Authentication check
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      logger.warn('Unauthorized transaction history fetch', { requestId });
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    // Get user from database
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);

    if (!user) {
      logger.warn('User not found for transaction history', { email: authUser.email, requestId });
      return notFoundErrorResponse('User', requestId);
    }

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validation = historyQuerySchema.safeParse(queryParams);

    if (!validation.success) {
      logger.warn('Invalid transaction history query parameters', {
        errors: validation.error.errors,
        requestId,
      });
      return validationErrorResponse(
        'Invalid query parameters',
        { errors: validation.error.errors },
        requestId
      );
    }

    const { type, status, limit, offset, startDate, endDate } = validation.data;

    // Build query conditions
    const conditions: SQL[] = [eq(transactions.userId, user.id)];

    // Filter by type
    if (type !== 'all') {
      conditions.push(eq(transactions.type, type));
    }

    // Filter by status
    if (status !== 'all') {
      conditions.push(eq(transactions.status, status));
    }

    // Filter by date range
    if (startDate || endDate) {
      const dateConditions: SQL[] = [];
      if (startDate) {
        const start = new Date(startDate);
        if (!isNaN(start.getTime())) {
          dateConditions.push(sql`${transactions.createdAt} >= ${start}`);
        }
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of day
        if (!isNaN(end.getTime())) {
          dateConditions.push(sql`${transactions.createdAt} <= ${end}`);
        }
      }
      if (dateConditions.length > 0) {
        conditions.push(and(...dateConditions) as SQL);
      }
    }

    // Fetch transactions with filtering
    const txs = await db
      .select()
      .from(transactions)
      .where(and(...conditions))
      .orderBy(desc(transactions.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCountResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(transactions)
      .where(and(...conditions));

    const totalCount = totalCountResult[0]?.count || 0;

    // Calculate summary statistics
    let totalDeposits = 0;
    let totalWithdrawals = 0;
    let totalPayments = 0;

    txs.forEach((tx) => {
      const amount = tx.amount;
      if (tx.type === 'deposit') {
        totalDeposits += amount;
      } else if (tx.type === 'withdrawal') {
        totalWithdrawals += amount;
      } else if (tx.type === 'payment') {
        totalPayments += amount;
      }
    });

    // Format transactions for response
    const formattedTransactions = txs.map((tx) => ({
      id: tx.id,
      type: tx.type,
      amount: tx.amount,
      amountFormatted:
        tx.type === 'deposit'
          ? `+${tx.amount.toLocaleString()} credits`
          : `-${tx.amount.toLocaleString()} credits`,
      amountUsd: tx.amount / CREDITS_PER_USD,
      amountUsdFormatted: `$${(tx.amount / CREDITS_PER_USD).toFixed(2)}`,
      description: tx.description,
      status: tx.status,
      solanaTxId: tx.solanaTxId,
      solanaTxIdShort: tx.solanaTxId
        ? `${tx.solanaTxId.substring(0, 8)}...${tx.solanaTxId.slice(-4)}`
        : null,
      createdAt: tx.createdAt,
      createdAtFormatted: tx.createdAt
        ? new Date(tx.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : 'N/A',
    }));

    logger.info('Transaction history fetched successfully', {
      userId: user.id,
      count: txs.length,
      requestId,
    });
    return successResponse({
      transactions: formattedTransactions,
      pagination: {
        limit,
        offset,
        total: totalCount,
        hasMore: offset + limit < totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: Math.floor(offset / limit) + 1,
      },
      summary: {
        totalDeposits,
        totalDepositsFormatted: totalDeposits.toLocaleString(),
        totalDepositsUsd: totalDeposits / CREDITS_PER_USD,
        totalDepositsUsdFormatted: `$${(totalDeposits / CREDITS_PER_USD).toFixed(2)}`,
        totalWithdrawals,
        totalWithdrawalsFormatted: totalWithdrawals.toLocaleString(),
        totalWithdrawalsUsd: totalWithdrawals / CREDITS_PER_USD,
        totalWithdrawalsUsdFormatted: `$${(totalWithdrawals / CREDITS_PER_USD).toFixed(2)}`,
        totalPayments,
        totalPaymentsFormatted: totalPayments.toLocaleString(),
        totalPaymentsUsd: totalPayments / CREDITS_PER_USD,
        totalPaymentsUsdFormatted: `$${(totalPayments / CREDITS_PER_USD).toFixed(2)}`,
        netFlow: totalDeposits - totalWithdrawals - totalPayments,
        netFlowFormatted: (totalDeposits - totalWithdrawals - totalPayments).toLocaleString(),
        netFlowUsd: (totalDeposits - totalWithdrawals - totalPayments) / CREDITS_PER_USD,
        netFlowUsdFormatted: `$${((totalDeposits - totalWithdrawals - totalPayments) / CREDITS_PER_USD).toFixed(2)}`,
      },
      filters: {
        type,
        status,
        startDate,
        endDate,
      },
      conversionRate: CREDITS_PER_USD,
    });
  } catch (error) {
    logger.error('Transaction history fetch error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return errorResponse(
      'Failed to fetch transaction history. Please try again later.',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
