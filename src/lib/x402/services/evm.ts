import { ethers } from 'ethers';
import { buildDomainSeparator } from './signature';
import { signTransferAuthorization } from './signature';

// Chain IDs for supported networks
export const CHAIN_IDS: Record<string, number> = {
  base: 8453,
  base_sepolia: 84532,
  ethereum: 1,
  sepolia: 11155111,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
};

// USDC contract addresses
export const USDC_CONTRACTS: Record<string, string> = {
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  base_sepolia: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
};

/**
 * Get asset contract address for token
 */
export function getAssetContract(token: string, network: string): string | null {
  if (token.toUpperCase() === 'USDC') {
    return USDC_CONTRACTS[network] || USDC_CONTRACTS.base;
  }
  return null;
}

/**
 * Decode private key from base64 or raw hex
 */
export function decodePrivateKey(keyBase64: string): string {
  try {
    const decoded = Buffer.from(keyBase64, 'base64').toString('utf-8');
    if (decoded.match(/^0x[a-fA-F0-9]{64}$/)) return decoded;
    if (decoded.match(/^[a-fA-F0-9]{64}$/)) return '0x' + decoded;
  } catch { /* fall through */ }

  if (keyBase64.match(/^0x[a-fA-F0-9]{64}$/)) return keyBase64;
  if (keyBase64.match(/^[a-fA-F0-9]{64}$/)) return '0x' + keyBase64;

  throw new Error('Invalid private key format');
}

/**
 * Sign EIP-3009 payment for EVM chains
 */
export async function signEVMPayment(params: {
  wallet: ethers.Wallet;
  fromAddress: string;
  payTo: string;
  amountBigInt: bigint;
  validAfter: number;
  validBefore: number;
  nonce: string;
  chainId: number;
  assetContract: string;
}): Promise<string> {
  const { wallet, fromAddress, payTo, amountBigInt, validAfter, validBefore, nonce, chainId, assetContract } = params;

  const domain = buildDomainSeparator('USDC', '2', chainId, assetContract);
  const message = {
    from: fromAddress,
    to: payTo.toLowerCase(),
    value: amountBigInt.toString(),
    validAfter,
    validBefore,
    nonce,
  };

  return signTransferAuthorization(wallet, domain, message);
}
