import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, transactions } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { solanaService } from '@/lib/solana';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedErrorResponse,
  notFoundErrorResponse,
  conflictErrorResponse,
  generateRequestId,
} from '@/lib/api-response';

// Input validation schema
const depositSchema = z.object({
  txId: z.string().min(1, 'Transaction ID is required'),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,6})?$/, 'Amount must be a valid number with max 6 decimals'),
});

const TREASURY_WALLET = process.env.OMA_TREASURY_WALLET;
const CREDITS_PER_USD = 1000;

// Rate limiting for deposits
const depositCache = new Map<string, number>();
const MAX_DEPOSITS_PER_WINDOW = 10;

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Authentication check
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      logger.warn('Unauthorized deposit attempt', { requestId });
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    // Get user from database
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);

    if (!user) {
      logger.warn('User not found for deposit', { email: authUser.email, requestId });
      return notFoundErrorResponse('User', requestId);
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = depositSchema.safeParse(body);

    if (!validation.success) {
      logger.warn('Invalid deposit request data', { errors: validation.error.errors, requestId });
      return validationErrorResponse(
        'Invalid request data',
        { errors: validation.error.errors },
        requestId
      );
    }

    const { txId, amount } = validation.data;
    const usdcAmount = parseFloat(amount);

    // Validate amount
    if (isNaN(usdcAmount) || usdcAmount < 0.01) {
      logger.warn('Invalid deposit amount', { amount, requestId });
      return errorResponse(
        'Amount must be at least 0.01 USDC',
        400,
        'VALIDATION_ERROR',
        undefined,
        requestId
      );
    }

    // Rate limiting check
    const userDeposits = depositCache.get(authUser.email) || 0;
    if (userDeposits >= MAX_DEPOSITS_PER_WINDOW) {
      logger.warn('Rate limit exceeded for deposits', { email: authUser.email, requestId });
      return errorResponse(
        'Too many deposit attempts. Please try again later.',
        429,
        'RATE_LIMIT_EXCEEDED',
        undefined,
        requestId
      );
    }
    depositCache.set(authUser.email, userDeposits + 1);

    // Clean up old cache entries periodically
    if (depositCache.size > 1000) {
      const entries = Array.from(depositCache.entries());
      entries.forEach(([key]) => depositCache.delete(key));
    }

    // Check for duplicate transaction
    const existingTx = await db
      .select()
      .from(transactions)
      .where(eq(transactions.solanaTxId, txId))
      .limit(1);

    if (existingTx.length > 0) {
      logger.warn('Duplicate deposit transaction', { txId, requestId });
      return conflictErrorResponse('Transaction already processed', requestId);
    }

    // Verify Solana transaction
    if (!TREASURY_WALLET) {
      logger.error('TREASURY_WALLET not configured', { requestId });
      return errorResponse(
        'Server configuration error',
        500,
        'INTERNAL_SERVER_ERROR',
        undefined,
        requestId
      );
    }

    const verification = await solanaService.verifyPaymentTransaction(
      txId,
      TREASURY_WALLET,
      amount
    );

    if (!verification.valid) {
      logger.warn('Deposit transaction verification failed', {
        txId,
        amount,
        error: verification.error,
        userId: user.id,
        requestId,
      });

      return errorResponse(
        verification.error || 'Invalid transaction',
        400,
        'VALIDATION_ERROR',
        { txId },
        requestId
      );
    }

    // Calculate credits earned
    const creditsEarned = Math.floor(usdcAmount * CREDITS_PER_USD);
    const currentCredits = Number(user.credits ?? 0);
    const currentUsdcBalance = Number(user.usdcBalance ?? 0);
    const newCredits = currentCredits + creditsEarned;
    const newUsdcBalance = currentUsdcBalance + usdcAmount;

    // Execute database updates atomically
    await db.transaction(async (tx) => {
      // Update user balance
      await tx
        .update(users)
        .set({
          credits: newCredits,
          usdcBalance: newUsdcBalance,
        })
        .where(eq(users.id, user.id));

      // Record transaction
      await tx.insert(transactions).values({
        userId: user.id,
        type: 'deposit',
        amount: creditsEarned,
        description: `USDC Deposit: ${usdcAmount} USDC → ${creditsEarned} credits`,
        solanaTxId: txId,
        status: 'completed',
      });
    });

    logger.info('Deposit processed successfully', {
      userId: user.id,
      email: user.email,
      usdcAmount,
      creditsEarned,
      txId,
      newCredits,
      newUsdcBalance,
      requestId,
    });

    return successResponse({
      usdcAmount,
      creditsEarned,
      newCredits,
      newUsdcBalance,
      transactionId: txId,
      conversionRate: CREDITS_PER_USD,
    });
  } catch (error) {
    logger.error('Deposit processing error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });

    return errorResponse(
      'Failed to process deposit. Please try again later.',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
