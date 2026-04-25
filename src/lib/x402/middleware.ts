/**
 * x402 Payment Middleware for MCP Routes
 * 
 * This module provides payment enforcement for MCP endpoints.
 * It checks if an MCP requires payment and returns a 402 response
 * if payment is missing.
 * 
 * FLOW:
 * ------
 * 1. Client calls /mcp/[slug] with tools/call
 * 2. Middleware checks if this MCP (by slug) has x402_enabled = true
 *    and pricing_usdc > 0
 * 3. If payment required:
 *    a. Check for `X-Payment-Required` header (indicates client knows about payment)
 *    b. Check for `x402-payment` header with payment proof (tx hash or facilitation ID)
 *    c. If neither present → return 402 with PaymentRequired response
 * 4. If payment proof provided → verify with facilitator or on-chain
 * 5. If verified → allow request to proceed
 * 6. If not verified → return 402 with error
 * 
 * PAYMENT TYPES:
 * --------------
 * - Per-call: Each tools/call costs X USDC
 * - Monthly subscription: Unlimited calls for monthly fee
 * - Freemium: Free tier with limited calls, paid tier unlocks more
 * 
 * NETWORKS:
 * ---------
 * - Base (eip155:8453) — primary, via Coinbase x402 facilitator
 * - Base Sepolia (eip155:84532) — testnet
 * - Solana (solana:...) — future support planned
 * 
 * HEADERS:
 * --------
 * - X-Payment-Required: Included in 402 responses; value is base64url-encoded PaymentRequirement
 * - x402-payment: Client sends this after receiving 402; value is payment proof (JSON)
 * 
 * IMPLEMENTATION STATUS: STUB
 * ---------------------------
 * Full implementation requires:
 * - Database: mcp_servers table must have x402_enabled and pricing_usdc columns
 * - Wallet: OMA-AI's receiving wallet address (configured via env)
 * - Facilitator: Coinbase CDP x402 facilitator integration
 * - Webhook: (optional) For on-chain payment confirmation
 */

import { getMCPBySlug, MARKETPLACE_MCPS } from '@/lib/mcp-data';
import { create402Response, createPaymentRequirement, encodePaymentRequirement } from './server';

export interface MCPaymentRequirement {
  scheme: 'exact';
  network: string;       // e.g. "eip155:8453"
  amount: string;       // micro-units (1 USDC = 1,000,000 micro-units)
  asset: string;        // USDC contract address on the network
  recipient: string;    // OMA-AI's wallet address
  description: string;  // Human-readable description
  expiresAt?: string;   // ISO timestamp
}

export interface PaymentProof {
  type: 'facilitator' | 'onchain';
  txHash?: string;       // For on-chain payments
  paymentId?: string;   // For facilitator payments
  network?: string;
}

export interface PaymentCheckResult {
  required: boolean;
  reason?: string;
  paymentReq?: MCPaymentRequirement;
}

// OMA-AI's receiving wallet address — configure via env in production
const PAYMENT_WALLET = process.env.X402_PAYMENT_WALLET || '0xYourWalletAddressHere';
const PAYMENT_NETWORK = (process.env.X402_PAYMENT_NETWORK || 'base') as 'base' | 'base-sepolia';

/**
 * Check if an MCP requires payment for a tools/call request
 */
export function checkPaymentRequired(slug: string): PaymentCheckResult {
  const mcp = getMCPBySlug(slug);
  
  if (!mcp) {
    return { required: false };
  }

  const m2 = mcp as Record<string, string | number | boolean>;
  const x402Enabled = Boolean(m2.x402_enabled);
  const pricingUsdc = typeof m2.pricing_usdc === 'number' ? m2.pricing_usdc : parseFloat(String(m2.pricing_usdc)) || 0;

  if (!x402Enabled || pricingUsdc <= 0) {
    return { required: false };
  }

  const priceDollars = pricingUsdc.toFixed(4);
  const mcpName = String(m2.name || slug);

  return {
    required: true,
    reason: `This MCP (${mcpName}) requires payment of ${priceDollars} USDC per call`,
    paymentReq: {
      scheme: 'exact',
      network: PAYMENT_NETWORK === 'base' ? 'eip155:8453' : 'eip155:84532',
      amount: Math.round(pricingUsdc * 1_000_000).toString(), // Convert to micro-units
      asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
      recipient: PAYMENT_WALLET,
      description: `Payment for ${mcpName} MCP call`,
    },
  };
}

/**
 * Verify a payment proof
 * 
 * For facilitator payments (x402.org / Coinbase CDP):
 *   - POST to facilitator with payment_req + user_wallet
 *   - Get back payment_id + facilitator_url
 *   - Poll facilitator for confirmation
 * 
 * For on-chain payments:
 *   - Wait for tx confirmation (1 block for finality)
 *   - Verify tx.to = USDC contract
 *   - Verify tx.value = expected amount
 *   - Verify tx.data = transfer(recipient, amount)
 * 
 * STUB: Full verification not yet implemented
 */
export async function verifyPayment(
  proof: PaymentProof,
  expectedAmount?: number
): Promise<{ valid: boolean; error?: string }> {
  if (proof.type === 'facilitator' && proof.paymentId) {
    // TODO: Poll facilitator for payment confirmation
    // const result = await verifyFacilitatorPayment(proof.paymentId);
    // return { valid: result.confirmed };
    return { valid: false, error: 'Facilitator verification not yet implemented' };
  }

  if (proof.type === 'onchain' && proof.txHash) {
    // TODO: On-chain verification via viem
    // const result = await verifyBasePayment(proof.txHash, expectedAmount, PAYMENT_WALLET);
    // return { valid: result.valid };
    return { valid: false, error: 'On-chain verification not yet implemented' };
  }

  return { valid: false, error: 'Invalid payment proof type' };
}

/**
 * Express-style middleware for Next.js route handlers
 * 
 * Usage:
 * ```ts
 * export async function POST(request: NextRequest, { params }) {
 *   const paymentCheck = await x402Middleware(request, params.slug);
 *   if (paymentCheck.response) return paymentCheck.response;
 *   // proceed with normal handling
 * }
 * ```
 */
export async function x402Middleware(
  request: Request,
  slug: string
): Promise<{ allowed: boolean; response?: Response; paymentReq?: MCPaymentRequirement }> {
  // Only check payment on tools/call methods
  // tools/list and initialize are always free
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return { allowed: true };
    }

    let method = 'unknown';
    try {
      const body = await request.clone().json();
      method = body?.method || 'unknown';
    } catch {
      return { allowed: true };
    }

    // tools/list, initialize, ping, prompts/list, resources/list are free
    const freeMethods = ['tools/list', 'initialize', 'ping', 'resources/list', 'prompts/list'];
    if (freeMethods.includes(method)) {
      return { allowed: true };
    }

    // For tools/call, check if payment is required
    if (method === 'tools/call') {
      const check = checkPaymentRequired(slug);
      
      if (!check.required) {
        return { allowed: true };
      }

      // Check for payment proof in headers
      const paymentHeader = request.headers.get('x402-payment');
      
      if (!paymentHeader) {
        // No payment proof — return 402
        const response = create402Response(check.paymentReq!);
        return { allowed: false, response, paymentReq: check.paymentReq };
      }

      // Verify payment proof
      try {
        const proof: PaymentProof = JSON.parse(paymentHeader);
        const result = await verifyPayment(proof, parseInt(check.paymentReq!.amount));
        
        if (!result.valid) {
          return {
            allowed: false,
            response: new Response(JSON.stringify({ error: 'Payment verification failed', details: result.error }), {
              status: 402,
              headers: { 'Content-Type': 'application/json' },
            }),
            paymentReq: check.paymentReq,
          };
        }
      } catch {
        return {
          allowed: false,
          response: new Response(JSON.stringify({ error: 'Invalid x402-payment header' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }),
          paymentReq: check.paymentReq,
        };
      }
    }

    return { allowed: true };
  } catch {
    // On error, allow the request to proceed (fail open)
    // This prevents the middleware from blocking valid requests
    return { allowed: true };
  }
}

/**
 * Create a 402 response for a given payment requirement
 */
export function createMCP402Response(paymentReq: MCPaymentRequirement): Response {
  return create402Response(paymentReq as Parameters<typeof create402Response>[0]);
}
