/**
 * OMA-AI X402 Enhanced Payment Integration
 * 
 * Combines X402 micropayments with subscription system
 */

import { ethers } from 'ethers';
import { getX402Price } from './pricing';

// Networks
export const NETWORKS = {
  base: {
    chainId: '0x2105', // 8453
    chainIdDecimal: 8453,
    rpc: 'https://mainnet.base.org',
    usdc: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    explorer: 'https://basescan.org',
    name: 'Base',
    icon: '/base.svg'
  },
  solana: {
    chainId: 'solana:101',
    rpc: 'https://api.mainnet-beta.solana.com',
    usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    explorer: 'https://solscan.io',
    name: 'Solana',
    icon: '/solana.svg'
  },
  sepolia: {
    chainId: '0x14a34',
    chainIdDecimal: 84532,
    rpc: 'https://sepolia.base.org',
    usdc: '0x...',
    explorer: 'https://sepolia.basescan.org',
    name: 'Base Sepolia (Testnet)',
    icon: '/base.svg'
  }
} as const;

// USDC ABI
const USDC_ABI = [
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address from, address to, uint256 amount) returns (bool)'
];

/**
 * Create X402 payment requirement for endpoint
 */
export function createPaymentRequirement(params: {
  endpoint: string;
  network?: 'base' | 'solana';
  recipient?: string;
}) {
  const price = getX402Price(params.endpoint);
  const network = NETWORKS[params.network || 'base'];
  
  return {
    'x402-version': 1,
    'scheme': 'erc20',
    'currency': 'USDC',
    'amount': price.toString(),
    'recipient': params.recipient || process.env.TREASURY_WALLET_BASE,
    'network': params.network || 'base',
    'chainId': network.chainId,
    'description': `API call to ${params.endpoint}`,
    'expires': Date.now() + 3600000 // 1 hour
  };
}

/**
 * Verify X402 payment authorization
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
    // Decode authorization (base64 JSON)
    const payment = JSON.parse(atob(authHeader));
    
    // Verify required fields
    if (!payment.amount || !payment.recipient || !payment.network) {
      return { valid: false, error: 'Invalid payment format' };
    }
    
    // Verify with OpenX402 facilitator (production)
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
      
      const result = await response.json();
      return { valid: true, payment: result };
    }
    
    // Development mode - skip verification
    return { valid: true, payment };
    
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}

/**
 * X402 middleware for API routes
 */
export function withX402Payment(endpoint: string) {
  return async (req: any, res: any, next: Function) => {
    // Skip in development without payment required
    if (process.env.NODE_ENV === 'development' && !process.env.REQUIRE_PAYMENT) {
      return next();
    }
    
    // Check for subscription first
    const user = req.user;
    if (user?.tier && user.tier !== 'free') {
      // User has subscription, skip X402
      return next();
    }
    
    // Check for X402 payment
    const paymentHeader = req.headers['x-payment'];
    
    if (!paymentHeader) {
      // Return 402 with payment requirement
      const requirement = createPaymentRequirement({ endpoint });
      
      res.setHeader('X-Payment-Required', JSON.stringify(requirement));
      return res.status(402).json({
        error: 'Payment Required',
        code: 'X402_PAYMENT_REQUIRED',
        payment: requirement,
        message: `This endpoint requires ${requirement.amount} USDC payment via X402`,
        docs: 'https://oma-ai.com/docs/x402'
      });
    }
    
    // Verify payment
    const verification = await verifyPayment(paymentHeader);
    
    if (!verification.valid) {
      return res.status(402).json({
        error: 'Payment Invalid',
        code: 'X402_PAYMENT_INVALID',
        message: verification.error
      });
    }
    
    // Attach payment to request
    req.payment = verification.payment;
    next();
  };
}

/**
 * Get USDC balance for wallet
 */
export async function getUSDCBalance(
  walletAddress: string, 
  network: 'base' | 'solana' = 'base'
): Promise<string> {
  try {
    const net = NETWORKS[network];
    
    if (network === 'solana') {
      // Use Solana RPC
      const response = await fetch(net.rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [
            walletAddress,
            { mint: net.usdc },
            { encoding: 'jsonParsed' }
          ]
        })
      });
      
      const result = await response.json();
      const balance = result.result?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount?.amount || '0';
      return (parseInt(balance) / 1_000_000).toFixed(2);
    } else {
      // Use ethers.js for EVM chains
      const provider = new ethers.JsonRpcProvider(net.rpc);
      const usdc = new ethers.Contract(net.usdc, USDC_ABI, provider);
      const balance = await usdc.balanceOf(walletAddress);
      return ethers.formatUnits(balance, 6);
    }
  } catch (error) {
    console.error('Failed to get balance:', error);
    return '0';
  }
}

/**
 * Create payment intent for frontend
 */
export async function createPaymentIntent(params: {
  endpoint: string;
  walletAddress: string;
  network: 'base' | 'solana';
}): Promise<{
  success: boolean;
  intent?: any;
  error?: string;
}> {
  try {
    const requirement = createPaymentRequirement({
      endpoint: params.endpoint,
      network: params.network
    });
    
    // In production, create intent with OpenX402
    if (process.env.OPENX402_API_KEY) {
      const response = await fetch('https://facilitator.openx402.ai/intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENX402_API_KEY}`
        },
        body: JSON.stringify({
          ...requirement,
          payer: params.walletAddress
        })
      });
      
      const result = await response.json();
      return { success: true, intent: result };
    }
    
    // Development - return mock intent
    return {
      success: true,
      intent: {
        id: `intent_${Date.now()}`,
        ...requirement,
        payer: params.walletAddress,
        status: 'pending'
      }
    };
    
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Calculate revenue split (90/10)
 */
export function calculateRevenueSplit(amount: string | number) {
  const total = typeof amount === 'string' ? parseFloat(amount) : amount;
  const platformFee = total * 0.10;
  const publisherRevenue = total - platformFee;
  
  return {
    total: total.toFixed(6),
    platformFee: platformFee.toFixed(6),
    publisherRevenue: publisherRevenue.toFixed(6),
    split: { platform: 10, publisher: 90 }
  };
}

// Removed duplicate export of NETWORKS
