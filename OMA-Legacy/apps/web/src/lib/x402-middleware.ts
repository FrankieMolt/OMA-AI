import { NextRequest, NextResponse } from 'next/server';
import { solanaService } from '@/lib/solana';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { db, users, transactions } from '@/lib/db';
import { eq } from 'drizzle-orm';

// Enhanced payment signature schema with stricter validation
const paymentSignatureSchema = z.object({
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,6})?$/, 'Amount must be a valid number with max 6 decimals'),
  recipient: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, 'Invalid Solana address format'),
  nonce: z.string().min(16).max(128),
  timestamp: z
    .number()
    .int()
    .min(Date.now() - 300000)
    .max(Date.now() + 60000), // ±5min tolerance
  signature: z.string().min(64).max(128),
  publicKey: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/, 'Invalid public key format'),
});

// Rate limiting cache to prevent replay attacks
const paymentCache = new Map<string, { timestamp: number; amount: number }>();
const CACHE_TTL = 300000; // 5 minutes
const MAX_CACHE_SIZE = 10000;

// Cleanup cache periodically
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, data] of paymentCache.entries()) {
    if (now - data.timestamp > CACHE_TTL) {
      paymentCache.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    logger.info(`Cleaned ${cleaned} expired payment cache entries`);
  }
}, 60000);

function generateRequestId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIp || 'unknown';
}

export async function x402Middleware(
  req: NextRequest,
  price: number,
  walletAddress: string,
  options?: {
    allowAmountVariance?: number;
    maxProcessingTime?: number;
    enableRateLimiting?: boolean;
  }
) {
  const startTime = Date.now();
  const requestId = generateRequestId();
  const path = req.nextUrl.pathname;
  const clientIp = getClientIp(req);

  const config = {
    allowAmountVariance: options?.allowAmountVariance ?? 0.000001,
    maxProcessingTime: options?.maxProcessingTime ?? 10000,
    enableRateLimiting: options?.enableRateLimiting ?? true,
  };

  logger.info(`[${requestId}] x402 middleware processing`, {
    path,
    price,
    walletAddress,
    clientIp,
    userAgent: req.headers.get('user-agent'),
    timestamp: startTime,
  });

  try {
    const paymentHeader = req.headers.get('PAYMENT-SIGNATURE') || req.headers.get('Authorization');

    if (!paymentHeader) {
      logger.info(`[${requestId}] Payment required`, { path });

      const nonce = generateRequestId();
      const requirements = {
        network: 'solana',
        chainId: '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
        token: 'USDC',
        amount: price.toString(),
        recipient: walletAddress,
        description: `Payment for ${path}`,
        nonce,
        expiration: Date.now() + 300000, // 5 minutes
        instructions:
          'Send USDC to the recipient address with the specified amount. Include the transaction signature in the PAYMENT-SIGNATURE header.',
        requestId,
      };

      return NextResponse.json(requirements, {
        status: 402, // Payment Required standard
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Payment-Required': 'true', // OMA specific signal
          // Standard HTTP 402 header draft
          'WWW-Authenticate': `x402 realm="OpenMarketAccess", token="${requirements.token}", amount="${requirements.amount}", recipient="${requirements.recipient}", nonce="${nonce}"`,
          'X-Request-ID': requestId,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-RateLimit-Remaining': '100', // Mock rate limit headers
          'X-RateLimit-Reset': Math.floor(Date.now() / 1000 + 3600).toString(),
        },
      });
    }

    // Rate limiting check
    if (config.enableRateLimiting) {
      const now = Date.now();

      // Clean up old entries
      if (paymentCache.size > MAX_CACHE_SIZE) {
        const entries = Array.from(paymentCache.entries());
        entries.sort(([, a], [, b]) => a.timestamp - b.timestamp);
        const toRemove = entries.slice(0, Math.floor(MAX_CACHE_SIZE * 0.1));
        toRemove.forEach(([key]) => paymentCache.delete(key));
      }

      // Check for replay attack
      const cacheKey = `${paymentHeader}:${path}:${clientIp}`;
      const cached = paymentCache.get(cacheKey);
      if (cached && now - cached.timestamp < CACHE_TTL) {
        logger.warn(`[${requestId}] Replay attack detected`, { path, clientIp });
        return NextResponse.json(
          { error: 'Payment already processed', requestId, code: 'REPLAY_DETECTED' },
          {
            status: 403,
            headers: {
              'X-Request-ID': requestId,
              'X-RateLimit-Remaining': '0',
            },
          }
        );
      }
    }

    logger.info(`[${requestId}] Verifying payment`, { path });

    let signatureData;
    try {
      signatureData = JSON.parse(paymentHeader);
    } catch (parseError) {
      logger.warn(`[${requestId}] Invalid JSON in payment header`, { path, parseError });
      return NextResponse.json(
        { error: 'Invalid payment header format', requestId, code: 'INVALID_JSON' },
        {
          status: 403,
          headers: { 'X-Request-ID': requestId },
        }
      );
    }

    // Validate payment data
    const validation = paymentSignatureSchema.safeParse(signatureData);
    if (!validation.success) {
      logger.warn(`[${requestId}] Invalid payment signature format`, {
        path,
        errors: validation.error.issues,
      });
      return NextResponse.json(
        {
          error: 'Invalid payment signature format',
          requestId,
          code: 'VALIDATION_FAILED',
          details: validation.error.issues,
        },
        {
          status: 403,
          headers: { 'X-Request-ID': requestId },
        }
      );
    }

    // Verify amount matches expected price (with tolerance)
    const amountDiff = Math.abs(parseFloat(signatureData.amount) - price);
    if (amountDiff > config.allowAmountVariance) {
      logger.warn(`[${requestId}] Payment amount mismatch`, {
        path,
        expected: price,
        received: signatureData.amount,
        difference: amountDiff,
      });
      return NextResponse.json(
        {
          error: 'Payment amount does not match expected price',
          requestId,
          code: 'AMOUNT_MISMATCH',
          expected: price,
          received: signatureData.amount,
        },
        {
          status: 403,
          headers: { 'X-Request-ID': requestId },
        }
      );
    }

    // CRITICAL: Verify recipient matches usage treasury wallet
    // This prevents users from paying their own wallets to bypass the check
    if (signatureData.recipient !== walletAddress) {
      logger.warn(`[${requestId}] Payment recipient mismatch`, {
        path,
        expected: walletAddress,
        received: signatureData.recipient,
      });
      return NextResponse.json(
        {
          error: 'Payment recipient does not match treasury wallet',
          requestId,
          code: 'RECIPIENT_MISMATCH',
          expected: walletAddress, // transparently show where money should go
        },
        {
          status: 403,
          headers: { 'X-Request-ID': requestId },
        }
      );
    }

    const isValid = await solanaService.verifyPaymentSignature({
      amount: signatureData.amount,
      recipient: signatureData.recipient,
      nonce: signatureData.nonce,
      timestamp: signatureData.timestamp,
      signature: signatureData.signature,
      publicKey: signatureData.publicKey,
    });

    if (!isValid) {
      logger.warn(`[${requestId}] Payment verification failed`, { path });
      return NextResponse.json(
        { error: 'Invalid payment signature', requestId, code: 'INVALID_SIGNATURE' },
        {
          status: 403,
          headers: { 'X-Request-ID': requestId },
        }
      );
    }

    // Cache successful payment to prevent replay
    if (config.enableRateLimiting) {
      const cacheKey = `${paymentHeader}:${path}:${clientIp}`;
      paymentCache.set(cacheKey, {
        timestamp: Date.now(),
        amount: parseFloat(signatureData.amount),
      });
    }

    // Persist to database if possible
    try {
      // Try to find the user by public key
      // Note: This requires the db to have relational query support or we use standard select
      const [user] = await db.select().from(users).where(eq(users.solanaWalletAddress, signatureData.publicKey)).limit(1);

      if (user) {
        await db.insert(transactions).values({
          userId: user.id,
          type: 'x402_payment',
          amount: parseFloat(signatureData.amount),
          description: `x402 Payment for ${path}`,
          solanaTxId: signatureData.signature,
          x402Signature: paymentHeader,
          status: 'verified',
          metadata: {
            recipient: signatureData.recipient,
            nonce: signatureData.nonce,
            path,
            clientIp
          }
        });
        logger.info(`[${requestId}] Payment persisted to transactions for user ${user.id}`);
      } else {
        logger.warn(`[${requestId}] User not found for wallet ${signatureData.publicKey}, skipping persistence`);
      }
    } catch (dbError) {
      // Don't fail the request if DB persistence fails, but log it
      logger.error(`[${requestId}] Failed to persist payment to database`, { dbError });
    }

    logger.info(`[${requestId}] Payment verified successfully`, { path });
    return null;
  } catch (error) {
    logger.error(`[${requestId}] Payment verification error`, { path, error });
    return NextResponse.json(
      { error: 'Payment verification failed', requestId, code: 'INTERNAL_ERROR' },
      {
        status: 403,
        headers: { 'X-Request-ID': requestId },
      }
    );
  }
}
