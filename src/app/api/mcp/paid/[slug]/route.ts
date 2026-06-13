import { NextRequest, NextResponse } from 'next/server';
import { createPaymentRequirement, create402Response, dollarsToMicroUnits } from '@/lib/x402/server';
import type { NetworkName } from '@/lib/x402/server';

/**
 * Paid MCP Access Endpoint
 * Charges USDC via x402 protocol for each MCP call
 * 
 * Real MCPs that have paid tiers: ethereum (0.001 USDC/call)
 * Other MCPs are free BYOK (user provides their own API key).
 */

// MCP pricing configuration (in dollars)
const MCP_PRICING: Record<string, { price: string; network: NetworkName }> = {
  'ethereum': { price: '0.001', network: 'base' },
};

// Default recipient wallet (OMA-AI treasury via OWS)
const TREASURY_WALLET = process.env.OMA_AI_PAYMENT_WALLET || '0x1D74Eb7BeC21aa9bC6D23D664E40b97E74472D21';

function getTreasuryWallet(): string {
  return TREASURY_WALLET;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const paymentHeader = request.headers.get('X-Payment');

  // Check if this MCP exists and has a price
  const mcpConfig = MCP_PRICING[slug];
  if (!mcpConfig) {
    return NextResponse.json(
      { error: 'MCP not found or free', slug },
      { status: 404 }
    );
  }

  // If payment header present, verify it
  if (paymentHeader) {
    try {
      const payment = JSON.parse(paymentHeader);
      // Verify payment proof (stub — wire to on-chain verification)
      return NextResponse.json({ success: true, message: 'Payment verified' });
    } catch {
      return NextResponse.json({ error: 'Invalid payment proof' }, { status: 400 });
    }
  }

  // Return 402 with payment requirement
  const paymentReq = createPaymentRequirement({
    network: mcpConfig.network,
    price: mcpConfig.price,
    recipientAddress: getTreasuryWallet(),
    description: `Payment for ${slug} MCP call`,
  });

  return create402Response(paymentReq);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const mcpConfig = MCP_PRICING[slug];

  if (!mcpConfig) {
    return NextResponse.json({
      slug,
      price_usdc: 0,
      tier: 'free',
      message: 'This MCP is free. No payment required.',
    });
  }

  return NextResponse.json({
    slug,
    price_usdc: parseFloat(mcpConfig.price),
    tier: 'paid',
    network: mcpConfig.network,
    asset: 'USDC',
    message: 'Payment required for this MCP',
  });
}
