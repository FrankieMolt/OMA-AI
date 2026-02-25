/**
 * OMA-AI Wallet Auth
 * 
 * Wallet-based authentication for OMA-AI
 * Supports MetaMask, Coinbase Wallet on Base/Solana
 */

import { ethers } from 'ethers';

// ===========================================
// NETWORK CONFIGURATION
// ===========================================

const NETWORKS = {
  base: {
    chainId: '0x2105',
    chainIdDecimal: 8453,
    name: 'Base',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org'
  },
  sepolia: {
    chainId: '0x14a34', 
    chainIdDecimal: 84532,
    name: 'Base Sepolia',
    rpc: 'https://sepolia.base.org',
    explorer: 'https://sepolia.basescan.org'
  },
  solana: {
    chainId: 'solana:101',
    name: 'Solana',
    rpc: 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io'
  }
};

// ===========================================
// SIGN MESSAGE FOR AUTHENTICATION
// ===========================================

const SIGN_MESSAGE = 'Welcome to OMA-AI!\n\nSign this message to authenticate.\n\nTimestamp: {timestamp}';

/**
 * Generate sign message with timestamp
 */
function getSignMessage(): string {
  return SIGN_MESSAGE.replace('{timestamp}', Date.now().toString());
}

/**
 * Connect wallet and get signed message
 */
export async function connectWallet(): Promise<{
  address: string;
  network: string;
  signedMessage: string;
}> {
  if (typeof window === 'undefined') {
    throw new Error('Must be called from browser');
  }

  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('No wallet found. Install MetaMask or Coinbase Wallet.');
  }

  // Request account access
  const accounts = await ethereum.request({ 
    method: 'eth_requestAccounts' 
  });

  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts found');
  }

  // Get current chain
  const chainIdHex = await ethereum.request({ 
    method: 'eth_chainId' 
  });
  const chainIdDecimal = parseInt(chainIdHex, 16);

  // Determine network
  let network = 'base';
  if (chainIdDecimal === 8453) network = 'base';
  else if (chainIdDecimal === 84532) network = 'sepolia';
  else if (chainIdHex.startsWith('solana:')) network = 'solana';
  else {
    // Try to switch to Base
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: NETWORKS.base.chainId }]
      });
      network = 'base';
    } catch (e) {
      throw new Error('Please switch to Base network');
    }
  }

  // Sign message for authentication
  const message = getSignMessage();
  const signedMessage = await ethereum.request({
    method: 'personal_sign',
    params: [message, accounts[0]]
  });

  return {
    address: accounts[0],
    network,
    signedMessage
  };
}

/**
 * Verify signed message
 */
export function verifySignature(
  address: string, 
  signedMessage: string,
  message: string
): boolean {
  try {
    const recovered = ethers.verifyMessage(message, signedMessage);
    return recovered.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

/**
 * Create auth token (for session)
 */
export function createAuthToken(data: {
  address: string;
  network: string;
  expiresAt: number;
}): string {
  // Simple base64 encoding (in production, use JWT)
  return btoa(JSON.stringify(data));
}

/**
 * Parse auth token
 */
export function parseAuthToken(token: string): {
  address: string;
  network: string;
  expiresAt: number;
} | null {
  try {
    const data = JSON.parse(atob(token));
    if (data.expiresAt < Date.now()) {
      return null; // Expired
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Get wallet info
 */
export async function getWalletInfo() {
  if (typeof window === 'undefined') return null;

  const ethereum = (window as any).ethereum;
  if (!ethereum) return null;

  const accounts = await ethereum.request({ method: 'eth_accounts' });
  if (!accounts || accounts.length === 0) return null;

  const chainId = await ethereum.request({ method: 'eth_chainId' });

  return {
    address: accounts[0],
    chainId: parseInt(chainId, 16),
    isConnected: true
  };
}

/**
 * Listen for account changes
 */
export function onAccountChange(callback: (accounts: string[]) => void) {
  if (typeof window === 'undefined') return;

  const ethereum = (window as any).ethereum;
  if (ethereum) {
    ethereum.on('accountsChanged', callback);
  }
}

/**
 * Listen for chain changes
 */
export function onChainChange(callback: (chainId: string) => void) {
  if (typeof window === 'undefined') return;

  const ethereum = (window as any).ethereum;
  if (ethereum) {
    ethereum.on('chainChanged', callback);
  }
}

export { NETWORKS };