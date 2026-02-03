import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users, transactions } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { solanaService } from '@/lib/solana';
import { logger } from '@/lib/logger';
import { z } from 'zod';

// Input validation schema
const withdrawSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,6})?$/, 'Amount must be a valid number with max 6 decimals'),
  recipientAddress: z.string().min(32, 'Invalid Solana address').max(44, 'Invalid Solana address'),
  signature: z.string().min(64, 'Invalid signature').optional(),
});

// Configuration
const MIN_WITHDRAWAL = 0.01; // Minimum 0.01 USDC
const MAX_WITHDRAWAL = 10000; // Maximum 10000 USDC per transaction
const WITHDRAWAL_FEE_PERCENT = 0.001; // 0.1% withdrawal fee

// Rate limiting for withdrawals
const withdrawalCache = new Map<string, number>();
const WITHDRAWAL_WINDOW_MS = 300000; // 5 minutes
const MAX_WITHDRAWALS_PER_WINDOW = 3;

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      return NextResponse.json({ error: 'Unauthorized', code: 'UNAUTHORIZED' }, { status: 401 });
    }

    // Get user from database
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', code: 'USER_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if user has a connected Solana wallet
    if (!user.solanaWalletAddress) {
      return NextResponse.json(
        { error: 'Please connect your Solana wallet first', code: 'WALLET_NOT_CONNECTED' },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = withdrawSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          code: 'VALIDATION_FAILED',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { amount, recipientAddress, signature } = validation.data;
    const usdcAmount = parseFloat(amount);

    // Validate amount range
    if (isNaN(usdcAmount) || usdcAmount < MIN_WITHDRAWAL) {
      return NextResponse.json(
        {
          error: `Amount must be at least ${MIN_WITHDRAWAL} USDC`,
          code: 'INVALID_AMOUNT',
          minimum: MIN_WITHDRAWAL,
        },
        { status: 400 }
      );
    }

    if (usdcAmount > MAX_WITHDRAWAL) {
      return NextResponse.json(
        {
          error: `Amount exceeds maximum withdrawal limit of ${MAX_WITHDRAWAL} USDC`,
          code: 'AMOUNT_EXCEEDS_LIMIT',
          maximum: MAX_WITHDRAWAL,
        },
        { status: 400 }
      );
    }

    // Rate limiting check
    const userWithdrawals = withdrawalCache.get(authUser.email) || 0;
    if (userWithdrawals >= MAX_WITHDRAWALS_PER_WINDOW) {
      return NextResponse.json(
        {
          error: 'Too many withdrawal attempts. Please try again later.',
          code: 'RATE_LIMITED',
          retryAfter: Math.ceil(WITHDRAWAL_WINDOW_MS / 1000),
        },
        { status: 429 }
      );
    }
    withdrawalCache.set(authUser.email, userWithdrawals + 1);

    // Check current USDC balance
    const currentUsdcBalance = parseFloat(user.usdcBalance?.toString() || '0');

    if (currentUsdcBalance < usdcAmount) {
      return NextResponse.json(
        {
          error: 'Insufficient USDC balance',
          code: 'INSUFFICIENT_BALANCE',
          availableBalance: currentUsdcBalance,
          requestedAmount: usdcAmount,
        },
        { status: 400 }
      );
    }

    // Calculate withdrawal fee
    const fee = usdcAmount * WITHDRAWAL_FEE_PERCENT;
    const totalDeduction = usdcAmount + fee;

    // Recheck balance with fee included
    if (currentUsdcBalance < totalDeduction) {
      return NextResponse.json(
        {
          error: 'Insufficient USDC balance including fees',
          code: 'INSUFFICIENT_BALANCE_WITH_FEE',
          availableBalance: currentUsdcBalance,
          totalDeduction,
          fee,
        },
        { status: 400 }
      );
    }

    // Verify recipient address is valid Solana address
    try {
      // Basic validation - actual address format validation
      if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(recipientAddress)) {
        return NextResponse.json(
          { error: 'Invalid recipient address format', code: 'INVALID_ADDRESS' },
          { status: 400 }
        );
      }
    } catch {  
      return NextResponse.json(
        { error: 'Invalid recipient address', code: 'INVALID_ADDRESS' },
        { status: 400 }
      );
    }

    // Calculate new balance
    const newUsdcBalance = currentUsdcBalance - totalDeduction;

    // Create pending withdrawal transaction
    // Verify the signature if provided before marking as completed
    let solanaTxId: string | null = null;
    let txStatus: 'pending' | 'completed' = 'pending';

    if (signature) {
      try {
        const verification = await solanaService.verifyPaymentTransaction(
          signature,
          recipientAddress,
          usdcAmount.toString()
        );

        if (verification.valid) {
          solanaTxId = signature;
          txStatus = 'completed';
          logger.info('Withdrawal transaction verified', {
            txHash: signature.substring(0, 16) + '...',
            userId: user.id,
            amount: usdcAmount,
          });
        } else {
          logger.warn('Withdrawal verification failed', {
            reason: verification.error,
            txHash: signature.substring(0, 16) + '...',
            userId: user.id,
          });
        }
      } catch (verifyError) {
        logger.error('Error verifying withdrawal transaction', {
          error: verifyError instanceof Error ? verifyError.message : String(verifyError),
          userId: user.id,
        });
      }
    }

    const [newTransaction] = await db
      .insert(transactions)
      .values({
        userId: user.id,
        type: 'withdrawal',
        amount: usdcAmount,
        description: `USDC Withdrawal: ${usdcAmount} USDC to ${recipientAddress.substring(0, 8)}... (Fee: ${fee.toFixed(6)} USDC)`,
        status: txStatus,
        solanaTxId: solanaTxId,
      })
      .returning();

    // Update user balance
    await db
      .update(users)
      .set({
        usdcBalance: newUsdcBalance,
      })
      .where(eq(users.id, user.id));

    logger.info('Withdrawal processed successfully', {
      userId: user.id,
      email: user.email,
      usdcAmount,
      fee,
      recipientAddress,
      transactionId: newTransaction.id,
      newUsdcBalance,
    });

    return NextResponse.json({
      success: true,
      usdcAmount,
      fee,
      totalDeduction,
      newUsdcBalance,
      transactionId: newTransaction.id,
      recipientAddress,
      recipientAddressShort: `${recipientAddress.substring(0, 8)}...${recipientAddress.substring(-4)}`,
    });
  } catch (error) {
    logger.error('Withdrawal processing error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
        message: 'Failed to process withdrawal. Please try again later.',
      },
      { status: 500 }
    );
  }
}
