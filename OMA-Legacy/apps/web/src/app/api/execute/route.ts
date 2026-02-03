import { NextRequest } from 'next/server';
import { listingsService } from '@/lib/services/listings';
import { agentExecutor } from '@/lib/agents/executor';
import { x402Middleware } from '@/lib/x402-middleware';
import { createClient } from '@/lib/supabase/server';
import { db, users, usageRecords } from '@/lib/db';
import { eq } from 'drizzle-orm';
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundErrorResponse,
  generateRequestId,
} from '@/lib/api-response';
import { rateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

export async function POST(req: NextRequest) {
  const requestId = generateRequestId();

  try {
    // Apply rate limiting (stricter for execution)
    const rateLimitResponse = rateLimit({ windowMs: 60 * 1000, maxRequests: 30 })(req);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Authenticate user
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser || !authUser.email) {
      return errorResponse('Authentication required', 401, 'UNAUTHORIZED', undefined, requestId);
    }

    // Get internal user ID
    const [user] = await db.select().from(users).where(eq(users.email, authUser.email)).limit(1);
    if (!user) {
      return errorResponse('User profile not found', 404, 'NOT_FOUND', undefined, requestId);
    }

    // Parse and validate request body
    const body = await req.json();

    // Basic validation
    if (!body.listingId) {
      return validationErrorResponse('listingId is required', undefined, requestId);
    }

    const { listingId, endpoint, params, stream = false } = body;

    // 1. Fetch listing details to verify price and endpoint
    const listing = await listingsService.getListingById(Number(listingId));
    if (!listing) {
      return notFoundErrorResponse('Listing', requestId);
    }

    // Check if listing is active
    if (listing.status !== 'approved') {
      return errorResponse('Listing is not active', 403, 'FORBIDDEN', undefined, requestId);
    }

    // 2. Payment Check
    // Route payment to listing owner if they have a wallet connected, otherwise fallback to treasury
    // In a real implementation, this would likely split the payment (Platform Fee + Owner Share)
    const treasuryWallet =
      listing.ownerWallet || process.env.OMA_TREASURY_WALLET || 'OMA_TREASURY_ADDRESS';
    const paymentRes = await x402Middleware(req, Number(listing.price), treasuryWallet);
    if (paymentRes) {
      return paymentRes;
    }

    const targetEndpoint = endpoint || listing.endpoint || (
      process.env.NODE_ENV === 'development' 
        ? 'http://127.0.0.1:8000/v1/agent/execute' 
        : 'https://echo.oma.ai/api/agent'
    );
    const paymentId =
      req.headers.get('PAYMENT-SIGNATURE') || req.headers.get('Authorization') || undefined;

    // Check user's credit balance
    const userCredits = Number(user.credits);
    const listingPrice = Number(listing.price);

    if (userCredits < listingPrice) {
      return errorResponse(
        'Insufficient credits',
        402,
        'INSUFFICIENT_CREDITS',
        {
          required: listingPrice,
          available: userCredits,
        },
        requestId
      );
    }

    // Handle streaming execution
    if (stream) {
      try {
        const streamResult = await agentExecutor.executeStream({
          listingId: String(listingId),
          endpoint: targetEndpoint,
          params: params || {},
          paymentId,
        });

        // Return SSE stream
        return new Response(streamResult, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'X-Request-ID': requestId,
          },
        });
      } catch (streamError) {
        logger.error('Stream execution error', { error: streamError, requestId });
        return errorResponse(
          'Stream execution failed',
          500,
          'INTERNAL_SERVER_ERROR',
          undefined,
          requestId
        );
      }
    }

    // Regular execution
    const startTime = Date.now();

    try {
      const result = await agentExecutor.execute({
        listingId: String(listingId),
        endpoint: targetEndpoint,
        params: params || {},
        paymentId,
      });

      if (!result.success) {
        // Log failed execution but don't deduct credits
        logger.error('Agent execution failed', {
          listingId,
          error: result.error,
          requestId,
        });

        return errorResponse(
          result.error || 'Execution failed',
          500,
          'INTERNAL_SERVER_ERROR',
          {
            executionTime: result.executionTime,
            timestamp: result.timestamp,
          },
          requestId
        );
      }

      // Deduct credits on successful execution
      const creditDeduction = listingPrice;
      const newCredits = userCredits - creditDeduction;

      await db.update(users).set({ credits: newCredits }).where(eq(users.id, user.id));

      // Record usage
      await db.insert(usageRecords).values({
        userId: user.id,
        apiId: Number(listingId),
        creditsUsed: creditDeduction,
        metadata: {
          executionId: result.timestamp,
          executionTime: result.executionTime,
          paymentId,
        },
      });

      logger.info('Agent execution successful', {
        listingId,
        userId: user.id,
        creditsDeducted: creditDeduction,
        executionTime: result.executionTime,
        requestId,
      });

      return successResponse({
        ...result,
        creditsDeducted: creditDeduction,
        remainingCredits: newCredits,
      });
    } catch (executionError) {
      logger.error('Agent execution error', { error: executionError, requestId });
      return errorResponse(
        executionError instanceof Error ? executionError.message : 'Execution failed',
        500,
        'INTERNAL_SERVER_ERROR',
        { executionTime: Date.now() - startTime },
        requestId
      );
    }
  } catch (error) {
    logger.error('Execute API error', { error, requestId });
    return errorResponse(
      'Internal Server Error',
      500,
      'INTERNAL_SERVER_ERROR',
      undefined,
      requestId
    );
  }
}
