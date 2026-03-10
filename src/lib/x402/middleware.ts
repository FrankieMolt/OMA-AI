/**
 * x402 Middleware for Next.js API Routes
 * HTTP 402 Payment Required protocol enforcement
 */

import type { NextRequest, NextFetchEvent, NextResponse } from 'next/server';
import {
  verifyPayment,
  extractPaymentFromHeaders,
  parsePaymentRequest,
  paymentRequiredResponse,
  type PaymentRequest,
  type VerifiedPayment,
} from './verify';

// ============================================
// CONFIGURATION
// ============================================

export interface X402MiddlewareOptions {
  requirePayment?: boolean;
  minPayment?: number;
  skipForPaths?: string[];
  paymentReceiver?: string;
}

const DEFAULT_OPTIONS: X402MiddlewareOptions = {
  requirePayment: true,
  minPayment: 0.001, // 0.001 USDC minimum
  skipForPaths: ['/api/health', '/api/mcp/list', '/api/llm/list'],
  paymentReceiver: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6', // Default receiver
};

// ============================================
// MIDDLEWARE FUNCTION
// ============================================

export async function withX402Payment(
  handler: (req: NextRequest, context?: NextFetchEvent, payment?: VerifiedPayment) => Promise<Response>,
  options: Partial<X402MiddlewareOptions> = {}
) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return async (req: NextRequest, context?: NextFetchEvent): Promise<Response> => {
    const url = new URL(req.url);
    const path = url.pathname;

    // Skip payment for whitelisted paths
    if (opts.skipForPaths?.some(p => path.startsWith(p))) {
      return await handler(req, context, undefined);
    }

    // Skip payment if not required
    if (!opts.requirePayment) {
      return await handler(req, context, undefined);
    }

    // Extract signature from headers
    const { signature, error: headerError } = extractPaymentFromHeaders(req.headers);

    if (headerError) {
      return new Response(
        JSON.stringify({ error: headerError }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse payment request from body
    let payment: PaymentRequest;
    try {
      const body = await req.json();
      const { payment: parsedPayment, error: parseError } = parsePaymentRequest(body);

      if (parseError || !parsedPayment) {
        return new Response(
          JSON.stringify({ error: parseError }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      payment = parsedPayment;
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify payment signature
    const verification = await verifyPayment(payment, signature!);

    if (!verification.valid) {
      return new Response(
        JSON.stringify({
          error: 'Payment verification failed',
          details: verification.error,
        }),
        { status: 402, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Payment verified - proceed with request
    return await handler(req, context, verification);
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Create a payment required response
 */
export function createPaymentRequiredResponse(skillId?: string): Response {
  return paymentRequiredResponse({
    minPayment: DEFAULT_OPTIONS.minPayment!,
    skillId,
  });
}

/**
 * Check if a path requires payment
 */
export function requiresPayment(
  path: string,
  options: Partial<X402MiddlewareOptions> = {}
): boolean {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return !opts.skipForPaths?.some(p => path.startsWith(p));
}

/**
 * Get payment receiver address
 */
export function getPaymentReceiver(
  options: Partial<X402MiddlewareOptions> = {}
): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  return opts.paymentReceiver || DEFAULT_OPTIONS.paymentReceiver!;
}
