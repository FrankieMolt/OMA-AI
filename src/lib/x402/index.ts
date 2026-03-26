/**
 * OMA-AI x402 Payment Integration
 * Supports Base and Solana networks for USDC payments
 */

import { ethers } from 'ethers';

// Network configurations
export const NETWORKS = {
  base: {
    id: 'eip155:8453',
    chainId: 8453,
    name: 'Base',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    explorer: 'https://basescan.org'
  },
  'base-sepolia': {
    id: 'eip155:84532',
    chainId: 84532,
    name: 'Base Sepolia',
    usdcAddress: '0x036CbD538642dc2B78d73D717E2A12D53cD3dD3',
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org'
  },
  solana: {
    id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    chainId: 'solana',
    name: 'Solana',
    usdcAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io'
  }
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
    description: `Payment for ${config.price} access`
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
 * Parses transaction logs to verify USDC Transfer or TransferWithAuthorization (EIP-3009)
 */
export async function verifyBasePayment(
  txHash: string,
  expectedAmount: number,
  recipientAddress: string,
  network: NetworkName = 'base'
): Promise<boolean> {
  const net = NETWORKS[network];
  const provider = new ethers.JsonRpcProvider(net.rpcUrl);
  
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) return false;
    
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) return false;
    
    // Check if transaction was successful
    if (receipt.status !== 1) return false;
    
    // Parse logs to find USDC Transfer or TransferWithAuthorization events
    // USDC Transfer event signature: Transfer(address from, address to, uint256 value)
    const usdcInterface = new ethers.Interface([
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'event TransferWithAuthorization(address from, address to, address token, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce)'
    ]);
    
    let transferFound = false;
    for (const log of receipt.logs) {
      try {
        // Only check logs from the USDC contract
        if (log.address.toLowerCase() !== net.usdcAddress.toLowerCase()) continue;
        
        const parsed = usdcInterface.parseLog({
          topics: log.topics,
          data: log.data
        });
        
        if (!parsed) continue;
        const { name, args } = parsed;
        
        if (name === 'Transfer') {
          const to = args[1];
          const value = args[2];
          const decimals = 6; // USDC has 6 decimals
          const amountUsdc = Number(ethers.formatUnits(value, decimals));
          
          if (
            to &&
            to.toString().toLowerCase() === recipientAddress.toLowerCase() &&
            amountUsdc >= expectedAmount
          ) {
            transferFound = true;
            break;
          }
        } else if (name === 'TransferWithAuthorization') {
          const to = args[1];
          const value = args[3];
          const decimals = 6;
          const amountUsdc = Number(ethers.formatUnits(value, decimals));
          
          if (
            to &&
            to.toString().toLowerCase() === recipientAddress.toLowerCase() &&
            amountUsdc >= expectedAmount
          ) {
            transferFound = true;
            break;
          }
        }
      } catch {
        // Skip logs that can't be parsed (non-USDC logs)
        continue;
      }
    }
    
    if (!transferFound) {
      console.warn('[x402] No matching USDC transfer found in transaction logs');
      return false;
    }
    
    return true;
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

const x402Exports = {
  NETWORKS,
  parsePrice,
  formatPrice,
  createPaymentRequirement,
  encodePaymentRequirement,
  decodePaymentRequirement,
  verifyBasePayment,
  getOmAIPaymentAddress,
  isProduction
};

export default x402Exports;
