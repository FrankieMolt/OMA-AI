import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { creditsService } from '@/lib/services/credits';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { depositSchema, paginationSchema } from '@/lib/validators';
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
    const offset = (page - 1) * limit;

    // Get current balance
    const balance = await creditsService.getUserBalance(user.id);

    // Get transaction history
    const transactions = await creditsService.getTransactionHistory(user.id, limit, offset);

    return successResponse({
      balance,
      transactions,
      meta: {
        page,
        limit,
      },
    });
  } catch (error) {
    logger.error('Error fetching credits', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}

export async function POST(request: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting (stricter for deposits)
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 10 })(request);
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

    // Validate request body
    const body = await request.json();
    const validatedBody = depositSchema.safeParse(body);

    if (!validatedBody.success) {
      return validationErrorResponse(
        'Invalid request body',
        { errors: validatedBody.error.errors },
        requestId
      );
    }

    const { txHash, amount, currency } = validatedBody.data;

    // In production, verify the transaction on the blockchain
    // For now, we'll just record it
    const result = await creditsService.addCredits(
      user.id,
      amount,
      `Deposit via ${currency} - TX: ${txHash}`,
      {
        txHash,
        currency,
      }
    );

    logger.info('Credits deposited successfully', {
      userId: user.id,
      amount,
      txHash,
      requestId,
    });

    return successResponse({
      previousBalance: result.previousBalance,
      newBalance: result.newBalance,
      amount: result.amount,
      transaction: result.transaction,
    });
  } catch (error) {
    logger.error('Error processing deposit', { error, requestId });

    if (error instanceof Error) {
      if (error.message === 'User not found') {
        return errorResponse('User not found', 404, 'NOT_FOUND', undefined, requestId);
      }
    }

    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
