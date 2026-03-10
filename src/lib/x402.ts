/**
 * OMA-AI x402 Payment Middleware
 * 
 * Complete x402 implementation for Base & Solana
 * Uses OpenX402 facilitator protocol
 */

import { ethers } from 'ethers';

// Networks supported
export const NETWORKS = {
  base: {
    chainId: '0x2105', // 8453
    chainIdDecimal: 8453,
    rpc: 'https://mainnet.base.org',
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    explorer: 'https://basescan.org'
  },
  solana: {
    chainId: 'solana:101',
    rpc: 'https://api.mainnet-beta.solana.com',
    usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    explorer: 'https://solscan.io'
  },
  sepolia: {
    chainId: '0x14a34', // 8453
    chainIdDecimal: 84532,
    rpc: 'https://sepolia.base.org',
    usdc: '0x...', // Testnet USDC address
    explorer: 'https://sepolia.basescan.org'
  }
};

// USDC ABI for balance checks
const USDC_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address address, uint256 amount) returns (bool)'
];

/**
 * Create x402 payment requirement
 */
export function createPaymentRequirement(params: {
  amount: string;
  currency?: string;
  network?: string;
  recipient?: string;
  description?: string;
}) {
  return {
    'x402-version': 1,
    'scheme': 'erc20',
    'currency': params.currency || 'USDC',
    'amount': params.amount,
    'recipient': params.recipient || process.env.TREASURY_WALLET_BASE,
    'network': params.network || 'base',
    'description': params.description || 'API Access',
    'expires': Date.now() + 3600000 // 1 hour
  };
}

/**
 * Verify payment authorization
 */
export async function verifyPayment(authHeader: string): Promise<{
  valid: boolean;
  error?: string;
  payment?: any;
}> {
  if (!authHeader) {
    return { valid: false, error: 'No payment header' };
  }

  try {
    // Decode the authorization (base64 JSON)
    const payment = JSON.parse(atob(authHeader));
    
    // Verify required fields
    if (!payment.amount || !payment.recipient || !payment.network) {
      return { valid: false, error: 'Invalid payment format' };
    }
    
    // In production, verify with OpenX402 facilitator
    if (process.env.OPENX402_API_KEY) {
      const response = await fetch('https://facilitator.openx402.ai/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENX402_API_KEY}`
        },
        body: JSON.stringify({ authorization: authHeader })
      });
      
      if (!response.ok) {
        return { valid: false, error: 'Payment verification failed' };
      }
    }
    
    return { valid: true, payment };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}

/**
 * x402 middleware for API routes
 */
export function withPayment(amount: string, description: string) {
  return async (req: any, res: any, next: Function) => {
    // Skip in development without payment required
    if (process.env.NODE_ENV === 'development' && !process.env.REQUIRE_PAYMENT) {
      return next();
    }
    
    const paymentHeader = req.headers['x-payment'];
    const verification = await verifyPayment(paymentHeader);
    
    if (!verification.valid) {
      // Return 402 with payment requirement
      res.setHeader('X-Payment-Required', JSON.stringify(
        createPaymentRequirement({ amount, description })
      ));
      return res.status(402).json({
        error: 'Payment Required',
        payment: createPaymentRequirement({ amount, description })
      });
    }
    
    // Attach payment to request for logging
    req.payment = verification.payment;
    next();
  };
}

/**
 * Get USDC balance for wallet
 */
export async function getUSDCBalance(walletAddress: string, network = 'base'): Promise<string> {
  try {
    const net = NETWORKS[network as keyof typeof NETWORKS] || NETWORKS.base;
    
    // Use ethers.js to connect and check balance
    const provider = new ethers.JsonRpcProvider(net.rpc);
    const usdc = new ethers.Contract(net.usdc, USDC_ABI, provider);
    
    const balance = await usdc.balanceOf(walletAddress);
    return ethers.formatUnits(balance, 6); // USDC has 6 decimals
  } catch (error) {
    console.error('Failed to get balance:', error);
    return '0';
  }
}

/**
 * Calculate revenue split (90/10)
 */
export function calculateRevenueSplit(amount: string) {
  const total = parseFloat(amount);
  const platformFee = total * 0.10;
  const publisherRevenue = total - platformFee;
  
  return {
    total: total.toFixed(6),
    platformFee: platformFee.toFixed(6),
    publisherRevenue: publisherRevenue.toFixed(6),
    split: { platform: 10, publisher: 90 }
  };
}

/**
 * Get payment requirement for an endpoint
 */
export function getEndpointPrice(endpoint: string): string {
  const prices: Record<string, string> = {
    '/api/price': '0',
    '/api/prices': '0',
    '/api/premium-price': '0.001',
    '/api/llm': '0.01',
    '/api/weather': '0.002',
    '/api/search': '0.005'
  };
  
  return prices[endpoint] || '0.001';
}