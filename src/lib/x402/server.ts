/**
 * OMA-AI x402 Payment Server
 * Full implementation for Base and Solana USDC payments
 * No Stripe - 100% decentralized crypto
 */

import { createPublicClient, http, formatUnits, type Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

// =====================================================
// NETWORK CONFIGURATIONS
// =====================================================

export const NETWORKS = {
  base: {
    id: 'eip155:8453',
    chainId: 8453,
    name: 'Base',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
    symbol: 'ETH',
    // Facilitator endpoints
    facilitatorUrl: 'https://api.cdp.coinbase.com/platform/v2/x402',
    testnetFacilitator: 'https://x402.org/facilitator',
  },
  'base-sepolia': {
    id: 'eip155:84532',
    chainId: 84532,
    name: 'Base Sepolia',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org',
    symbol: 'ETH',
    facilitatorUrl: 'https://api.cdp.coinbase.com/platform/v2/x402',
    testnetFacilitator: 'https://x402.org/facilitator',
  },
  solana: {
    id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    chainId: 'solana',
    name: 'Solana',
    usdcAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io',
    symbol: 'SOL',
    facilitatorUrl: 'https://api.cdp.coinbase.com/platform/v2/x402',
    testnetFacilitator: 'https://x402.org/facilitator',
  },
  'solana-devnet': {
    id: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    chainId: 'solana-devnet',
    name: 'Solana Devnet',
    usdcAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // Same USDC on devnet from faucet
    rpcUrl: process.env.SOLANA_DEVNET_RPC_URL || 'https://api.devnet.solana.com',
    explorer: 'https://solscan.io/?cluster=devnet',
    symbol: 'SOL',
    facilitatorUrl: 'https://x402.org/facilitator',
    testnetFacilitator: 'https://x402.org/facilitator',
  },
} as const;

export type NetworkName = keyof typeof NETWORKS;

// =====================================================
// PAYMENT CONFIGURATION
// =====================================================

export interface X402PaymentConfig {
  recipientAddress: string;
  network: NetworkName;
  price: string; // e.g., "$0.01"
  description?: string;
  expiresInMinutes?: number;
}

export interface PaymentRequirement {
  scheme: 'exact';
  network: string;
  amount: string;
  asset: string;
  recipient: string;
  description?: string;
  expiresAt?: string;
}

// =====================================================
// PRICE CONVERSION
// =====================================================

/**
 * Convert dollar price to micro-units (1 micro-unit = $0.000001)
 * Example: $0.01 = 10000 micro-units
 */
export function dollarsToMicroUnits(dollars: string | number): number {
  const dollarsNum = typeof dollars === 'string' ? parseFloat(dollars) : dollars;
  if (isNaN(dollarsNum)) throw new Error(`Invalid price: ${dollars}`);
  return Math.round(dollarsNum * 1_000_000);
}

/**
 * Convert micro-units back to dollars
 */
export function microUnitsToDollars(microUnits: number | string): string {
  const microUnitsNum = typeof microUnits === 'string' ? parseInt(microUnits) : microUnits;
  if (isNaN(microUnitsNum)) throw new Error(`Invalid micro-units: ${microUnits}`);
  return `$${(microUnitsNum / 1_000_000).toFixed(6)}`;
}

// =====================================================
// PAYMENT REQUIREMENT CREATION
// =====================================================

/**
 * Create a payment requirement for a specific endpoint
 */
export function createPaymentRequirement(config: X402PaymentConfig): PaymentRequirement {
  const network = NETWORKS[config.network];
  const amount = dollarsToMicroUnits(config.price);
  
  const paymentReq: PaymentRequirement = {
    scheme: 'exact',
    network: network.id,
    amount: amount.toString(),
    asset: network.usdcAddress,
    recipient: config.recipientAddress,
    description: config.description || `Payment for ${config.price}`,
  };
  
  if (config.expiresInMinutes) {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + config.expiresInMinutes);
    paymentReq.expiresAt = expiresAt.toISOString();
  }
  
  return paymentReq;
}

/**
 * Encode payment requirement to base64 for HTTP header
 */
export function encodePaymentRequirement(req: PaymentRequirement): string {
  return Buffer.from(JSON.stringify(req)).toString('base64url');
}

/**
 * Decode payment requirement from base64
 */
export function decodePaymentRequirement(encoded: string): PaymentRequirement {
  // Handle both base64 and base64url
  const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(Buffer.from(normalized, 'base64').toString());
}

// =====================================================
// 402 RESPONSE GENERATION
// =====================================================

/**
 * Generate HTTP 402 Payment Required response
 */
export function create402Response(paymentReq: PaymentRequirement): Response {
  const body = JSON.stringify({
    error: 'Payment Required',
    message: 'This endpoint requires payment via x402 protocol',
    payment: paymentReq,
    instructions: {
      step1: 'Install x402 client: npm install x402',
      step2: 'Configure wallet with USDC balance',
      step3: 'Retry request - client will automatically handle payment',
    },
  });
  
  return new Response(body, {
    status: 402,
    headers: {
      'Content-Type': 'application/json',
      'X-Payment-Required': encodePaymentRequirement(paymentReq),
      'Access-Control-Allow-Origin': '*',
    },
  });
}

// =====================================================
// PAYMENT VERIFICATION - BASE (EVM)
// =====================================================

/**
 * Verify payment on Base network
 */
export async function verifyBasePayment(
  txHash: string,
  expectedAmount: number,
  recipientAddress: string,
  network: NetworkName = 'base'
): Promise<{ valid: boolean; tx?: unknown; error?: string }> {
  const net = NETWORKS[network];

  // Solana not yet supported via viem
  if (network.startsWith('solana')) {
    return { valid: false, error: 'Solana verification not yet supported via viem' };
  }

  const client = createPublicClient({
    chain: network === 'base-sepolia' ? baseSepolia : base,
    transport: http(net.rpcUrl),
  });

  try {
    const receipt = await client.waitForTransactionReceipt({
      hash: txHash as `0x${string}`,
      confirmations: 1,
      timeout: 30_000,
    });

    if (receipt.status !== 'success') {
      return { valid: false, error: 'Transaction failed' };
    }

    return { valid: true, tx: receipt };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { valid: false, error: message };
  }
}

// =====================================================
// FACILITATOR INTEGRATION
// =====================================================

export interface FacilitatorPaymentRequest {
  payment: PaymentRequirement;
  user_wallet: string;
  user_network: string;
}

export interface FacilitatorPaymentResponse {
  facilitator_url: string;
  payment_id: string;
  quote_id: string;
  expires_at: string;
  instructions?: {
    action: string;
    description: string;
  }[];
}

/**
 * Request payment through x402 facilitator
 */
export async function requestFacilitatorPayment(
  paymentReq: PaymentRequirement,
  userWallet: string,
  userNetwork: string
): Promise<FacilitatorPaymentResponse | null> {
  const isProduction = process.env.NODE_ENV === 'production';
  const facilitatorUrl = isProduction 
    ? 'https://api.cdp.coinbase.com/platform/v2/x402'
    : 'https://x402.org/facilitator';
  
  try {
    const response = await fetch(`${facilitatorUrl}/v1/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment: paymentReq,
        user_wallet: userWallet,
        user_network: userNetwork,
      }),
    });
    
    if (!response.ok) {
      console.error('Facilitator error:', await response.text());
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Facilitator request failed:', error);
    return null;
  }
}

/**
 * Verify payment through facilitator
 */
export async function verifyFacilitatorPayment(
  paymentId: string
): Promise<{ confirmed: boolean; txHash?: string }> {
  const isProduction = process.env.NODE_ENV === 'production';
  const facilitatorUrl = isProduction 
    ? 'https://api.cdp.coinbase.com/platform/v2/x402'
    : 'https://x402.org/facilitator';
  
  try {
    const response = await fetch(`${facilitatorUrl}/v1/payment/${paymentId}/status`);
    
    if (!response.ok) {
      return { confirmed: false };
    }
    
    const data = await response.json();
    return {
      confirmed: data.status === 'confirmed',
      txHash: data.tx_hash,
    };
  } catch {
    return { confirmed: false };
  }
}

// =====================================================
// USDC TOKEN CONTRACTS
// =====================================================

export const USDC_ABI = [
  'function transfer(address to, uint256 amount) returns (bool)',
  'function balanceOf(address account) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

/**
 * Get USDC balance for an address
 */
export async function getUSDCBalance(
  address: string,
  network: NetworkName = 'base'
): Promise<string> {
  const net = NETWORKS[network];

  if (network.startsWith('solana')) {
    return '0'; // Solana not yet supported via viem
  }

  const client = createPublicClient({
    chain: network === 'base-sepolia' ? baseSepolia : base,
    transport: http(net.rpcUrl),
  });

  const balance = await client.readContract({
    address: net.usdcAddress as Address,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [address as Address],
  });

  return formatUnits(balance as bigint, 6); // USDC has 6 decimals
}

// =====================================================
// DEFAULT EXPORTS
// =====================================================

const x402ServerExports = {
  NETWORKS,
  dollarsToMicroUnits,
  microUnitsToDollars,
  createPaymentRequirement,
  create402Response,
  encodePaymentRequirement,
  decodePaymentRequirement,
  verifyBasePayment,
  requestFacilitatorPayment,
  verifyFacilitatorPayment,
  getUSDCBalance,
  USDC_ABI,
};

export default x402ServerExports;
