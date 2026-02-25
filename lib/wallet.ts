/**
 * OMA-AI Wallet Connection
 * 
 * Handles Base network wallet connections
 * Supports injected wallets (MetaMask, Coinbase Wallet)
 */

// Base Network Configuration
const BASE_CHAIN_ID = '0x2105'; // 8453 in hex
const BASE_RPC = 'https://mainnet.base.org';
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export interface WalletState {
  connected: boolean;
  address: string | null;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface WalletInfo {
  address: string;
  chainId: number;
  network: string;
}

/**
 * Check if a wallet is installed
 */
export function hasWallet(): boolean {
  if (typeof window === 'undefined') return false;
  return !!(window as any).ethereum;
}

/**
 * Request wallet connection
 */
export async function connectWallet(): Promise<WalletInfo> {
  if (typeof window === 'undefined') {
    throw new Error('Window not available');
  }

  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error('No wallet found. Please install MetaMask or Coinbase Wallet.');
  }

  try {
    // Request account access
    const accounts = await ethereum.request({ 
      method: 'eth_requestAccounts' 
    });

    // Get chain ID
    const chainIdHex = await ethereum.request({ 
      method: 'eth_chainId' 
    });
    const chainId = parseInt(chainIdHex, 16);

    // Switch to Base if needed
    if (chainId !== 8453) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: BASE_CHAIN_ID }]
        });
      } catch (switchError: any) {
        // Chain not added, prompt to add
        if (switchError.code === 4902) {
          await addBaseNetwork(ethereum);
        }
      }
    }

    return {
      address: accounts[0],
      chainId,
      network: chainId === 8453 ? 'base' : 'unknown'
    };
  } catch (error: any) {
    throw new Error(`Failed to connect: ${error.message}`);
  }
}

/**
 * Add Base network to wallet
 */
async function addBaseNetwork(ethereum: any) {
  await ethereum.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: BASE_CHAIN_ID,
      chainName: 'Base Mainnet',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: [BASE_RPC],
      blockExplorerUrls: ['https://basescan.org']
    }]
  });
}

/**
 * Get USDC balance
 */
export async function getUSDCBalance(address: string): Promise<string> {
  if (typeof window === 'undefined') return '0';
  
  const ethereum = (window as any).ethereum;
  if (!ethereum) return '0';

  try {
    // USDC ABI (balanceOf)
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const usdc = new ethers.Contract(USDC_ADDRESS, abi, new ethers.BrowserProvider(ethereum));
    
    const balance = await usdc.balanceOf(address);
    return ethers.formatUnits(balance, 6); // USDC has 6 decimals
  } catch (error) {
    console.error('Failed to get USDC balance:', error);
    return '0';
  }
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

// Simple ethers import for balance check
import { ethers as ethersLib } from 'ethers';