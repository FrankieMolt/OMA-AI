/**
 * OMA-AI X402 Enhanced Payment Integration
 * 
 * Combines X402 micropayments with automated escrow and facilitator logic
 */

import { ethers } from 'ethers';
import { getX402Price } from './pricing';

// Verified Treasury Wallets
export const TREASURY = {
  base: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6',
  solana: 'DcPfnhNQt98oXhgA7shgXpo2pgTzJMKf6TWuaddqqpSN'
};

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
  useEscrow?: boolean;
}) {
  const price = getX402Price(params.endpoint);
  const network = params.network || 'base';
  const networkConfig = NETWORKS[network];
  
  return {
    'x402-version': 1,
    'scheme': 'erc20',
    'currency': 'USDC',
    'amount': price.toString(),
    'recipient': params.recipient || TREASURY[network],
    'facilitator': TREASURY[network], // OMA-AI acts as facilitator
    'network': network,
    'chainId': networkConfig.chainId,
    'useEscrow': params.useEscrow || price > 10, // Auto-escrow for > $10
    'description': `Autonomous access to ${params.endpoint}`,
    'timestamp': Date.now(),
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
    // 1. Parse authorization (Bearer or x402 scheme)
    const [scheme, token] = authHeader.split(' ');
    const rawData = scheme.toLowerCase() === 'x402' ? token : authHeader;
    
    // 2. Decode payload
    const payment = JSON.parse(Buffer.from(rawData, 'base64').toString());
    
    // 3. Verify cryptographic proof (EIP-3009 or Solana Sig)
    // In production, this calls the OMA-AI Facilitator Node
    const facilitatorUrl = 'https://facilitator.oma-ai.com/v1/verify';
    
    // For local dev/demo, we simulate validation
    if (process.env.NODE_ENV === 'development') {
      return { valid: true, payment };
    }

    const response = await fetch(facilitatorUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: payment })
    });

    if (!response.ok) {
      return { valid: false, error: 'Cryptographic proof invalid' };
    }

    const result = await response.json();
    return { valid: true, payment: result };
    
  } catch (error: any) {
    return { valid: false, error: 'Failed to parse x402 header' };
  }
}

/**
 * X402 middleware for API routes
 */
export function withX402Payment(endpoint: string) {
  return async (req: any, res: any, next: Function) => {
    // Bypass for test environments if needed
    if (process.env.SKIP_PAYMENT === 'true') return next();
    
    const paymentHeader = req.headers['x-payment'] || req.headers['authorization'];
    
    if (!paymentHeader || !paymentHeader.startsWith('x402 ')) {
      const requirement = createPaymentRequirement({ endpoint });
      
      res.setHeader('X-Payment-Required', JSON.stringify(requirement));
      res.setHeader('Access-Control-Expose-Headers', 'X-Payment-Required');
      
      return res.status(402).json({
        error: 'Payment Required',
        code: 'X402_REQUIRED',
        requirement,
        message: `Machine-to-machine payment of ${requirement.amount} USDC required.`
      });
    }
    
    const verification = await verifyPayment(paymentHeader);
    
    if (!verification.valid) {
      return res.status(402).json({
        error: 'Payment Verification Failed',
        code: 'X402_INVALID',
        message: verification.error
      });
    }
    
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
      const response = await fetch(net.rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getTokenAccountsByOwner',
          params: [walletAddress, { mint: net.usdc }, { encoding: 'jsonParsed' }]
        })
      });
      
      const result = await response.json();
      const balance = result.result?.value?.[0]?.account?.data?.parsed?.info?.tokenAmount?.amount || '0';
      return (parseInt(balance) / 1_000_000).toFixed(2);
    } else {
      const provider = new ethers.JsonRpcProvider(net.rpc);
      const usdc = new ethers.Contract(net.usdc, USDC_ABI, provider);
      const balance = await usdc.balanceOf(walletAddress);
      return ethers.formatUnits(balance, 6);
    }
  } catch (error) {
    return '0.00';
  }
}
