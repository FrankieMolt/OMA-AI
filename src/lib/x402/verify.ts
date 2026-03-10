/**
 * x402 Payment Middleware
 * HTTP 402 Payment Required protocol implementation for USDC/Base
 * EIP-712 typed data signing verification
 */

import { verifyTypedData, getAddress, type Address } from 'viem';

// ============================================
// CONFIGURATION
// ============================================

export const X402_CONFIG = {
  // USDC token on Base network
  USDC_TOKEN_ADDRESS: '0x833589fCD6eDb6E436a3436C41499a87E6Dd13' as Address,
  CHAIN_ID: 8453, // Base network

  // Minimum payment amounts (in USDC, 6 decimals)
  MIN_PAYMENT: 1000000n, // 1 USDC
  DEFAULT_PAYMENT: 2000000n, // 2 USDC

  // Payment verification
  MAX_PAYMENT_AGE: 300000, // 5 minutes in milliseconds
  NONCE_TTL: 600000, // 10 minutes in milliseconds

  // Retry logic
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
};

// ============================================
// EIP-712 DOMAIN & TYPES
// ============================================

const DOMAIN = {
  name: 'OpenMarketAccess',
  version: '1.0.0',
  chainId: X402_CONFIG.CHAIN_ID,
  verifyingContract: X402_CONFIG.USDC_TOKEN_ADDRESS,
};

const TYPES = {
  Payment: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'amount', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
    { name: 'skillId', type: 'bytes32' },
  ],
};

// ============================================
// PAYMENT REQUEST TYPES
// ============================================

export interface PaymentRequest {
  from: Address;
  to: Address;
  amount: bigint;
  nonce: bigint;
  deadline: bigint;
  skillId: string;
}

export interface PaymentSignature {
  r: string;
  s: string;
  v: number;
}

export interface VerifiedPayment {
  valid: boolean;
  from: Address;
  to: Address;
  amount: bigint;
  amountUsdc: number;
  nonce: bigint;
  deadline: bigint;
  skillId: string;
  error?: string;
}

// ============================================
// NONCE MANAGEMENT (In-Memory for MVP)
// ============================================

const usedNonces = new Map<string, number>();

export function isNonceUsed(nonce: bigint): boolean {
  const key = nonce.toString();
  const lastUsed = usedNonces.get(key);
  const now = Date.now();
  return lastUsed !== undefined && (now - lastUsed) < X402_CONFIG.NONCE_TTL;
}

export function markNonceUsed(nonce: bigint): void {
  const key = nonce.toString();
  usedNonces.set(key, Date.now());
}

export function cleanupExpiredNonces(): void {
  const now = Date.now();
  const toDelete: string[] = [];

  for (const [key, timestamp] of usedNonces.entries()) {
    if ((now - timestamp) > X402_CONFIG.NONCE_TTL) {
      toDelete.push(key);
    }
  }

  toDelete.forEach(key => usedNonces.delete(key));
}

// Clean up nonces every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredNonces, 300000);
}

// ============================================
// PAYMENT VERIFICATION
// ============================================

/**
 * Verify x402 payment signature
 */
export async function verifyPayment(
  request: PaymentRequest,
  signature: string
): Promise<VerifiedPayment> {
  try {
    // Parse signature
    const { r, s, v } = parseSignature(signature);

    // Verify typed data
    const recoveredAddress = await verifyTypedData({
      address: request.from,
      domain: DOMAIN,
      types: TYPES,
      primaryType: 'Payment',
      message: {
        from: request.from,
        to: request.to,
        amount: request.amount,
        nonce: request.nonce,
        deadline: request.deadline,
        skillId: request.skillId as `0x${string}`,
      },
      signature: { r, s, v } as any,
    });

    // Verify recovered address matches sender
    if (getAddress(recoveredAddress) !== getAddress(request.from)) {
      return {
        valid: false,
        from: request.from,
        to: request.to,
        amount: request.amount,
        amountUsdc: Number(request.amount) / 1_000_000,
        nonce: request.nonce,
        deadline: request.deadline,
        skillId: request.skillId,
        error: 'Invalid signature: recovered address does not match sender',
      };
    }

    // Verify deadline
    const now = Math.floor(Date.now() / 1000);
    if (request.deadline < now) {
      return {
        valid: false,
        from: request.from,
        to: request.to,
        amount: request.amount,
        amountUsdc: Number(request.amount) / 1_000_000,
        nonce: request.nonce,
        deadline: request.deadline,
        skillId: request.skillId,
        error: 'Payment deadline expired',
      };
    }

    // Verify minimum payment
    if (request.amount < X402_CONFIG.MIN_PAYMENT) {
      return {
        valid: false,
        from: request.from,
        to: request.to,
        amount: request.amount,
        amountUsdc: Number(request.amount) / 1_000_000,
        nonce: request.nonce,
        deadline: request.deadline,
        skillId: request.skillId,
        error: `Payment amount below minimum (${X402_CONFIG.MIN_PAYMENT} USDC)`,
      };
    }

    // Verify nonce hasn't been used
    if (isNonceUsed(request.nonce)) {
      return {
        valid: false,
        from: request.from,
        to: request.to,
        amount: request.amount,
        amountUsdc: Number(request.amount) / 1_000_000,
        nonce: request.nonce,
        deadline: request.deadline,
        skillId: request.skillId,
        error: 'Nonce already used (replay attack prevented)',
      };
    }

    // Mark nonce as used
    markNonceUsed(request.nonce);

    // Payment is valid
    return {
      valid: true,
      from: request.from,
      to: request.to,
      amount: request.amount,
      amountUsdc: Number(request.amount) / 1_000_000,
      nonce: request.nonce,
      deadline: request.deadline,
      skillId: request.skillId,
    };
  } catch (error) {
    return {
      valid: false,
      from: request.from,
      to: request.to,
      amount: request.amount,
      amountUsdc: Number(request.amount) / 1_000_000,
      nonce: request.nonce,
      deadline: request.deadline,
      skillId: request.skillId,
      error: error instanceof Error ? error.message : 'Unknown verification error',
    };
  }
}

// ============================================
// SIGNATURE PARSING
// ============================================

function parseSignature(signature: string): PaymentSignature {
  // Remove 0x prefix if present
  const hex = signature.startsWith('0x') ? signature.slice(2) : signature;

  // Check for compact signature (65 bytes)
  if (hex.length === 130) {
    const r = `0x${hex.slice(0, 64)}`;
    const s = `0x${hex.slice(64, 128)}`;
    const v = parseInt(hex.slice(128, 130), 16);

    return { r, s, v };
  }

  // Check for full signature (132 bytes with chainId)
  if (hex.length === 132) {
    const r = `0x${hex.slice(0, 64)}`;
    const s = `0x${hex.slice(64, 128)}`;
    const v = parseInt(hex.slice(128, 130), 16);

    return { r, s, v };
  }

  throw new Error(`Invalid signature length: ${hex.length} (expected 130 or 132 characters)`);
}

// ============================================
// PAYMENT GENERATION (For Testing)
// ============================================

/**
 * Generate a new payment request for signing
 */
export function generatePaymentRequest(params: {
  from: Address;
  to: Address;
  amount: number; // In USDC
  skillId: string;
}): PaymentRequest {
  return {
    from: params.from,
    to: params.to,
    amount: BigInt(Math.floor(params.amount * 1_000_000)), // Convert to USDC (6 decimals)
    nonce: BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
    deadline: BigInt(Math.floor(Date.now() / 1000) + 300), // 5 minutes from now
    skillId: params.skillId,
  };
}

/**
 * Convert payment request to EIP-712 message for signing
 */
export function paymentRequestToMessage(request: PaymentRequest): any {
  return {
    from: request.from,
    to: request.to,
    amount: request.amount,
    nonce: request.nonce,
    deadline: request.deadline,
    skillId: request.skillId as `0x${string}`,
  };
}

// ============================================
// MIDDLEWARE HELPERS
// ============================================

/**
 * Extract x402 payment from request headers
 */
export function extractPaymentFromHeaders(
  headers: Headers | Record<string, string | undefined>
): { payment?: PaymentRequest; signature?: string; error?: string } {
  const authHeader = headers instanceof Headers
    ? headers.get('authorization')
    : headers.authorization;

  if (!authHeader) {
    return { error: 'Missing Authorization header' };
  }

  if (!authHeader.startsWith('x402 ')) {
    return { error: 'Invalid authorization format (expected "x402 <signature>")' };
  }

  const signature = authHeader.slice(5); // Remove 'x402 ' prefix

  if (signature.length === 0) {
    return { error: 'Empty signature' };
  }

  // In a real implementation, we'd extract the payment request from headers or body
  // For MVP, we expect the full request in the body
  return { signature };
}

/**
 * Parse payment request from body
 */
export function parsePaymentRequest(body: any): { payment?: PaymentRequest; error?: string } {
  try {
    const { from, to, amount, nonce, deadline, skillId } = body;

    if (!from || !to || !amount || !nonce || !deadline || !skillId) {
      return { error: 'Missing required payment fields: from, to, amount, nonce, deadline, skillId' };
    }

    return {
      payment: {
        from: getAddress(from as string),
        to: getAddress(to as string),
        amount: BigInt(amount),
        nonce: BigInt(nonce),
        deadline: BigInt(deadline),
        skillId: skillId as string,
      },
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Invalid payment request format',
    };
  }
}

// ============================================
// ERROR RESPONSES
// ============================================

export class PaymentRequiredError extends Error {
  constructor(
    public readonly details: {
      minPayment: number;
      usdcAddress: string;
      chainId: number;
    }
  ) {
    super('Payment Required (HTTP 402)');
    this.name = 'PaymentRequiredError';
  }
}

export function paymentRequiredResponse(details: {
  minPayment: number;
  skillId?: string;
}): Response {
  return new Response(
    JSON.stringify({
      error: 'Payment Required (HTTP 402)',
      code: 'PAYMENT_REQUIRED',
      details: {
        protocol: 'x402',
        network: 'Base',
        token: 'USDC',
        tokenAddress: X402_CONFIG.USDC_TOKEN_ADDRESS,
        chainId: X402_CONFIG.CHAIN_ID,
        minPayment: details.minPayment,
        ...(details.skillId && { skillId: details.skillId }),
      },
    }),
    {
      status: 402,
      headers: {
        'Content-Type': 'application/json',
        'X-402-Payment-Protocol': 'x402',
      },
    }
  );
}

// ============================================
// EXPORTS
// ============================================

export { DOMAIN, TYPES };
export type { PaymentRequest, PaymentSignature, VerifiedPayment };
