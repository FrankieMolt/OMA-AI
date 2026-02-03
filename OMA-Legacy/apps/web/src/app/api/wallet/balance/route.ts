import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { solanaService } from '@/lib/solana';
import {
  successResponse,
  errorResponse,
  unauthorizedErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { logger } from '@/lib/logger';

// USDC mint address
const USDC_MINT =
  process.env.NEXT_PUBLIC_USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
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
      logger.warn('Unauthorized balance fetch attempt', { requestId });
      return unauthorizedErrorResponse('Authentication required', requestId);
    }

    // Get user from database
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);

    if (!user) {
      logger.warn('User not found for balance fetch', { email: authUser.email, requestId });
      return notFoundErrorResponse('User', requestId);
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const includeOnchain = searchParams.get('includeOnchain') === 'true';

    // Get balances from database
    const credits = parseInt(user.credits?.toString() || '0');
    const usdcBalance = parseFloat(user.usdcBalance?.toString() || '0');
    const totalUsdValue = credits / CREDITS_PER_USD + usdcBalance;

    let solBalance = 0;
    let usdcOnchainBalance = 0;

    // Fetch on-chain balances if requested and wallet is connected
    if (includeOnchain && user.solanaWalletAddress) {
      try {
        solBalance = await solanaService.getBalance(user.solanaWalletAddress);
        usdcOnchainBalance = await solanaService.getTokenBalance(
          user.solanaWalletAddress,
          USDC_MINT
        );
        logger.info('On-chain balances fetched successfully', {
          walletAddress: user.solanaWalletAddress,
          solBalance,
          usdcOnchainBalance,
          requestId,
        });
      } catch (error) {
        logger.warn('Failed to fetch on-chain balances', {
          walletAddress: user.solanaWalletAddress,
          error: error instanceof Error ? error.message : String(error),
          requestId,
        });
        // Continue with database balances even if on-chain fetch fails
      }
    }

    return successResponse({
      balances: {
        credits: {
          amount: credits,
          formatted: credits.toLocaleString(),
          usdValue: credits / CREDITS_PER_USD,
          usdValueFormatted: `$${(credits / CREDITS_PER_USD).toFixed(2)}`,
        },
        usdc: {
          amount: usdcBalance,
          formatted: usdcBalance.toFixed(6),
          usdValue: usdcBalance,
          usdValueFormatted: `$${usdcBalance.toFixed(2)}`,
        },
        sol: {
          amount: solBalance,
          formatted: solBalance.toFixed(6),
          usdValue: solBalance * 150, // Approximate SOL price (should use real price oracle)
          usdValueFormatted: `$${(solBalance * 150).toFixed(2)}`,
        },
        usdcOnchain: {
          amount: usdcOnchainBalance,
          formatted: usdcOnchainBalance.toFixed(6),
          usdValue: usdcOnchainBalance,
          usdValueFormatted: `$${usdcOnchainBalance.toFixed(2)}`,
        },
        total: {
          usdValue: totalUsdValue,
          formatted: `$${totalUsdValue.toFixed(2)}`,
        },
      },
      wallet: {
        connected: !!user.solanaWalletAddress,
        address: user.solanaWalletAddress,
        addressShort: user.solanaWalletAddress
          ? `${user.solanaWalletAddress.substring(0, 4)}...${user.solanaWalletAddress.slice(-4)}`
          : null,
      },
      conversionRate: {
        creditsPerUsd: CREDITS_PER_USD,
        formatted: `${CREDITS_PER_USD.toLocaleString()} credits = $1.00 USD`,
      },
      metadata: {
        lastUpdated: new Date().toISOString(),
        includeOnchain,
      },
    });
  } catch (error) {
    logger.error('Balance fetch error', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      requestId,
    });
    return errorResponse(
      'Failed to fetch balance',
      500,
      'INTERNAL_SERVER_ERROR',
      { message: 'Please try again later' },
      requestId
    );
  }
}
