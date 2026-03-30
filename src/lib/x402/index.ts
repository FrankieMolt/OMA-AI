/**
 * OMA-AI x402 Payment Integration
 * Supports Base and Solana networks for USDC payments
 */

import { createPublicClient, http, formatUnits } from 'viem';
import { base, baseSepolia } from 'viem/chains';

// Network configurations
export const NETWORKS = {
  base: {
    id: 'eip155:8453',
    chainId: 8453,
    name: 'Base',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
  },
  'base-sepolia': {
    id: 'eip155:84532',
    chainId: 84532,
    name: 'Base Sepolia',
    usdcAddress: '0x036CbD538642dc2B78d73D717E2A12D53cD3dD3',
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org',
  },
  solana: {
    id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    chainId: 'solana',
    name: 'Solana',
    usdcAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io',
  },
} as const;

export type NetworkName = keyof typeof NETWORKS;

export interface PaymentRequirement {
  scheme: 'exact';
  network: string;
  amount: string;
  asset: string;
  recipient: string;
  description?: string;
}

export interface X402Config {
  recipientAddress: string;
  network: NetworkName;
  facilitatorUrl?: string;
  price: string; // e.g., "$0.001"
}

// USDC ABI — only what we need for log parsing
const USDC_ABI = [
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
  },
] as const;

/**
 * Parse price string to micro-units
 * price: "$0.05" => 50000 (micro-units where 1 unit = $0.000001)
 */
export function parsePrice(price: string): number {
  const match = price.match(/\$?([\d.]+)/);
  if (!match) throw new Error(`Invalid price format: ${price}`);
  const dollars = parseFloat(match[1]);
  return Math.round(dollars * 1_000_000);
}

/**
 * Format micro-units back to dollar string
 */
export function formatPrice(microUnits: number): string {
  return `$${(microUnits / 1_000_000).toFixed(6)}`;
}

/**
 * Create payment requirement for an endpoint
 */
export function createPaymentRequirement(config: X402Config): PaymentRequirement {
  const network = NETWORKS[config.network];
  const amount = parsePrice(config.price);

  return {
    scheme: 'exact',
    network: network.id,
    amount: amount.toString(),
    asset: network.usdcAddress,
    recipient: config.recipientAddress,
    description: `Payment for ${config.price} access`,
  };
}

/**
 * Encode payment requirement to base64 header
 */
export function encodePaymentRequirement(req: PaymentRequirement): string {
  return Buffer.from(JSON.stringify(req)).toString('base64');
}

/**
 * Decode payment requirement from base64 header
 */
export function decodePaymentRequirement(encoded: string): PaymentRequirement {
  return JSON.parse(Buffer.from(encoded, 'base64').toString());
}

/**
 * Verify x402 payment on Base (EVM)
 * Parses transaction logs to verify USDC Transfer
 */
export async function verifyBasePayment(
  txHash: string,
  expectedAmount: number,
  recipientAddress: string,
  network: NetworkName = 'base'
): Promise<boolean> {
  const net = NETWORKS[network];

  if (network === 'solana') {
    console.warn('[x402] Solana payment verification not yet implemented');
    return false;
  }

  const chain = network === 'base-sepolia' ? baseSepolia : base;
  const client = createPublicClient({
    chain,
    transport: http(net.rpcUrl),
  });

  try {
    const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });

    if (receipt.status !== 'success') return false;

    const recipientLower = recipientAddress.toLowerCase();
    const usdcLower = net.usdcAddress.toLowerCase();

    for (const log of receipt.logs) {
      if (log.address.toLowerCase() !== usdcLower) continue;

      try {
        if (
          log.topics[0] ===
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df35b9d9' // Transfer event signature
        ) {
          const toTopic = log.topics[2]; // topics[2] = indexed "to" param
          if (!toTopic) continue;
          const valueHex = log.data;
          const value = BigInt(valueHex);
          const decimals = 6; // USDC has 6 decimals
          const amountUsdc = Number(formatUnits(value, decimals));

          const toAddress = '0x' + toTopic.slice(2).padStart(40, '0').slice(-40);
          if (
            toAddress.toLowerCase() === recipientLower &&
            amountUsdc >= expectedAmount
          ) {
            return true;
          }
        }
      } catch {
        continue; // Skip unparseable logs
      }
    }

    console.warn('[x402] No matching USDC transfer found in transaction logs');
    return false;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
}

/**
 * Get OMA-AI's payment wallet address
 */
export function getOmAIPaymentAddress(): string {
  return process.env.OMA_AI_PAYMENT_WALLET || '0x0000000000000000000000000000000000000000';
}

/**
 * Check if we're in production or testnet
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
