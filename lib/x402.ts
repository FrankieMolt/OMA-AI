/**
 * OMA-AI x402 Payment Integration
 * 
 * Real x402 payments on Base network
 * Uses OpenX402 facilitator protocol
 */

import { ethers } from 'ethers';

// x402 Protocol Configuration
export const X402_CONFIG = {
  version: 1,
  scheme: 'erc20',
  currency: 'USDC',
  network: 'base',
  // Our treasury wallet from KEYS.md
  recipient: process.env.TREASURY_WALLET_BASE || '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  // USDC on Base
  token: process.env.NEXT_PUBLIC_USDC_ADDRESS || '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  // OpenX402 Facilitator
  facilitator: 'https://facilitator.openx402.ai'
};

// Platform fee (10%)
export const PLATFORM_FEE = 0.10;

/**
 * Create a payment requirement for an API endpoint
 */
export function createPaymentRequirement(amount: string, description: string) {
  return {
    'x402-version': X402_CONFIG.version,
    scheme: X402_CONFIG.scheme,
    currency: X402_CONFIG.currency,
    amount,
    recipient: X402_CONFIG.recipient,
    network: X402_CONFIG.network,
    description,
    expires: Date.now() + 3600000 // 1 hour
  };
}

/**
 * Verify payment from client
 */
export async function verifyPayment(authHeader: string): Promise<boolean> {
  if (!authHeader) return false;
  
  try {
    const response = await fetch(`${X402_CONFIG.facilitator}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENX402_API_KEY || ''}`
      },
      body: JSON.stringify({
        authorization: authHeader,
        network: X402_CONFIG.network
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
}

/**
 * Calculate revenue split (90% publisher, 10% platform)
 */
export function calculateSplit(totalAmount: string) {
  const total = parseFloat(totalAmount);
  const platformAmount = total * PLATFORM_FEE;
  const publisherAmount = total - platformAmount;
  
  return {
    total,
    platform: platformAmount.toFixed(6),
    publisher: publisherAmount.toFixed(6),
    breakdown: {
      platform_fee_percent: PLATFORM_FEE * 100,
      publisher_percent: (1 - PLATFORM_FEE) * 100
    }
  };
}

/**
 * Middleware to protect API routes with x402 payments
 */
export function requirePayment(amount: string, description: string) {
  return async (req: any, res: any, next: Function) => {
    // Skip payment in development
    if (process.env.NODE_ENV === 'development') {
      return next();
    }

    const paymentHeader = req.headers['x-payment'];
    const verified = await verifyPayment(paymentHeader);

    if (!verified) {
      res.setHeader('X-Payment-Required', JSON.stringify(
        createPaymentRequirement(amount, description)
      ));
      return res.status(402).json({
        error: 'Payment Required',
        payment: createPaymentRequirement(amount, description)
      });
    }

    next();
  };
}

/**
 * Get wallet info (read-only)
 */
export function getWalletInfo() {
  return {
    address: X402_CONFIG.recipient,
    network: X402_CONFIG.network,
    currency: X402_CONFIG.currency,
    fee_percent: PLATFORM_FEE * 100
  };
}