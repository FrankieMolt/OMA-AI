/**
 * Paid MCP Access Endpoint
 * Charges USDC via x402 protocol for each MCP call
 * Supports Base and Solana
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createPaymentRequirement,
  create402Response,
  verifyBasePayment,
  dollarsToMicroUnits,
  NETWORKS,
  type NetworkName,
} from '@/lib/x402/server';

// MCP pricing configuration (in dollars)
const MCP_PRICING: Record<string, { price: string; network: NetworkName }> = {
  'weather-api': { price: '$0.001', network: 'base' },
  'crypto-api': { price: '$0.005', network: 'base' },
  'search-api': { price: '$0.01', network: 'base' },
  'database-query': { price: '$0.02', network: 'base' },
  'ai-embedding': { price: '$0.05', network: 'base' },
};

// Default recipient wallet (your OMA-AI treasury)
const TREASURY_WALLET = process.env.OMA_AI_PAYMENT_WALLET;

function getTreasuryWallet(): string {
  if (!TREASURY_WALLET) {
    // Fail fast at runtime — do NOT accept the null address
    throw new Error('FATAL: OMA_AI_PAYMENT_WALLET env var is not set. Payments would go to 0x0 and be LOST.');
  }
  return TREASURY_WALLET;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  // Get payment from header if present
  const paymentHeader = request.headers.get('X-Payment');
  
  // Get client IP for rate limiting (reserved for future use)
  // NOTE: clientIP extraction reserved for future rate limiting use
  
  // Check if this MCP exists
  const mcpConfig = MCP_PRICING[slug];
  if (!mcpConfig) {
    return NextResponse.json(
      { error: 'MCP not found', slug },
      { status: 404 }
    );
  }
  
  // If payment header present, verify it
  if (paymentHeader) {
    try {
      // Payment parsing reserved for future payment verification logic
      
      // Verify payment was made
      const expectedAmount = dollarsToMicroUnits(mcpConfig.price);
      
      // If there's a transaction hash, verify it
      const txHash = request.headers.get('X-Payment-TxHash');
      if (txHash) {
        const verification = await verifyBasePayment(
          txHash,
          expectedAmount,
          getTreasuryWallet(),
          mcpConfig.network
        );
        
        if (!verification.valid) {
          return NextResponse.json(
            { error: 'Payment verification failed', details: verification.error },
            { status: 402 }
          );
        }
        
        // Payment verified - process the MCP call
        return handleMCPCall(slug, await request.json());
      }
    } catch (error) {
      console.error('Payment parsing error:', error);
    }
  }
  
  // No payment - return 402 with payment requirements
  const paymentReq = createPaymentRequirement({
    recipientAddress: getTreasuryWallet(),
    network: mcpConfig.network,
    price: mcpConfig.price,
    description: `Access to ${slug} MCP`,
    expiresInMinutes: 15,
  });
  
  return create402Response(paymentReq);
}

/**
 * Handle the actual MCP call after payment verified
 */
async function handleMCPCall(slug: string, requestData: Record<string, unknown>) {
  let result: Record<string, unknown>;
  
  switch (slug) {
    case 'weather-api':
      // Weather is free via wttr.in
      const weatherRes = await fetch(
        `https://wttr.in/${requestData.location || 'London'}?format=j1`
      );
      const weatherData = await weatherRes.json();
      result = {
        success: true,
        data: weatherData.current_condition[0],
        source: 'wttr.in',
      };
      break;
      
    case 'crypto-api':
      // Crypto is free via CoinGecko
      const cryptoRes = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
      );
      const cryptoData = await cryptoRes.json();
      result = {
        success: true,
        data: cryptoData,
        source: 'coingecko',
      };
      break;
      
    case 'search-api':
      result = {
        success: true,
        data: { results: [] },
        message: 'Search API - configure API key for full results',
      };
      break;
      
    case 'database-query':
      result = {
        success: true,
        data: { rows: [] },
        message: 'Database query API - configure connection for full results',
      };
      break;
      
    case 'ai-embedding':
      const embedding = Array(384).fill(0).map(() => Math.random());
      const magnitude = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0));
      const normalized = embedding.map(v => v / magnitude);
      result = {
        success: true,
        data: { embedding: normalized, dimensions: 384 },
        model: 'demo-embedding',
      };
      break;
      
    default:
      return NextResponse.json(
        { error: 'Unknown MCP' },
        { status: 404 }
      );
  }
  
  return NextResponse.json(result);
}

// GET endpoint to check pricing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const mcpConfig = MCP_PRICING[slug];
  if (!mcpConfig) {
    return NextResponse.json(
      { error: 'MCP not found', slug },
      { status: 404 }
    );
  }
  
  const paymentReq = createPaymentRequirement({
    recipientAddress: getTreasuryWallet(),
    network: mcpConfig.network,
    price: mcpConfig.price,
    description: `Access to ${slug} MCP`,
    expiresInMinutes: 15,
  });
  
  return NextResponse.json({
    slug,
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    price: mcpConfig.price,
    network: mcpConfig.network,
    networkName: NETWORKS[mcpConfig.network].name,
    paymentRequirement: paymentReq,
    usdcAddress: NETWORKS[mcpConfig.network].usdcAddress,
  });
}
