/**
 * OMA-AI x402 Payment Middleware
 *
 * Handles HTTP 402 Payment Required responses and x402 payment verification
 */

import { NextRequest, NextResponse } from "next/server";
import { getFacilitatorClient } from "./x402-facilitator";

/**
 * x402 Payment Required Response Headers
 */
export interface X402PaymentRequired {
  scheme: "exact";
  network: string;
  price: string;
  payTo: string;
  maxTimeoutSeconds?: number;
  description?: string;
  asset?: {
    name: string;
    version: string;
  };
}

/**
 * Create HTTP 402 Payment Required Response
 */
export function create402Response(
  paymentConfig: X402PaymentRequired,
): NextResponse {
  const response = NextResponse.json(
    {
      error: "Payment Required",
      paymentRequired: paymentConfig,
    },
    { status: 402 },
  );

  // Set x402 headers
  response.headers.set("PAYMENT-REQUIRED", JSON.stringify(paymentConfig));
  response.headers.set("Access-Control-Expose-Headers", "PAYMENT-REQUIRED");

  return response;
}

/**
 * Check if request includes valid x402 payment
 */
export function checkX402Payment(request: NextRequest): {
  valid: boolean;
  payment?: any;
  error?: string;
} {
  const paymentHeader = request.headers.get("X-PAYMENT");

  if (!paymentHeader) {
    return { valid: false, error: "No payment header" };
  }

  try {
    const payment = JSON.parse(paymentHeader);

    // Basic validation
    if (!payment.signature || !payment.scheme) {
      return { valid: false, error: "Invalid payment format" };
    }

    return { valid: true, payment };
  } catch (error) {
    return { valid: false, error: "Invalid payment JSON" };
  }
}

/**
 * x402 Payment Middleware Factory
 * Creates middleware for a specific route
 */
export interface X402RouteConfig {
  price: number; // Price in USDC
  network: "base" | "solana";
  route?: string;
  description?: string;
}

export function createX402Middleware(config: X402RouteConfig) {
  return async (
    request: NextRequest,
    response: NextResponse,
    next: Function,
  ) => {
    const client = getFacilitatorClient();

    if (!client) {
      return NextResponse.json(
        { error: "Facilitator not configured" },
        { status: 503 },
      );
    }

    // Check if payment already provided
    const paymentCheck = checkX402Payment(request);

    if (paymentCheck.valid) {
      // Payment provided - forward to facilitator for verification
      // In production, this would verify via x402 facilitator
      // For now, we'll validate signature format
      return next();
    }

    // No payment - send 402 with payment details
    const paymentConfig = {
      scheme: "exact" as const,
      network:
        config.network === "base"
          ? "eip155:84532"
          : "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
      price: `$${config.price.toFixed(3)}`,
      payTo:
        config.network === "base"
          ? process.env.NEXT_PUBLIC_TREASURY_WALLET_BASE ||
            "0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784"
          : process.env.NEXT_PUBLIC_TREASURY_WALLET_SOLANA ||
            "YourSolanaAddress",
      maxTimeoutSeconds: 60,
      description:
        config.description ||
        `Access to ${config.route || "protected resource"}`,
    };

    return create402Response(paymentConfig);
  };
}

/**
 * Verify x402 payment with facilitator (future implementation)
 */
export async function verifyX402Payment(
  paymentHeader: string,
): Promise<{ valid: boolean; txHash?: string; error?: string }> {
  try {
    const payment = JSON.parse(paymentHeader);
    const client = getFacilitatorClient();

    if (!client) {
      return { valid: false, error: "Facilitator not configured" };
    }

    // TODO: Implement actual x402 verification
    // This would call the facilitator to verify the payment
    // For now, we'll do basic validation

    // Example verification call (commented out for now):
    /*
    const result = await client.verifyPayment({
      payment: payment,
    });
    */

    return {
      valid: true,
      txHash: payment.txHash || `SIMULATED-${Date.now()}`,
    };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}
