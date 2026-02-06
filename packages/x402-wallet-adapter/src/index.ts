/**
 * x402 Wallet Adapter for AI Agents - Production Ready (Base + Ethereum)
 * 
 * Universal wallet adapter for accepting and sending HTTP 402 payments
 * Supports Base and Ethereum networks
 * 
 * @license MIT
 * @author OMA Systems
 */

import { ethers } from 'ethers';

// --- Default RPC URLs ---

const DEFAULT_RPC_URLS = {
  base: 'https://mainnet.base.org',
  ethereum: 'https://eth.llamarpc.com'
};

const USDC_CONTRACTS = {
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02513',
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
};

// --- x402 Wallet Class ---

export class X402Wallet {
  private network: string;
  private provider: ethers.Provider;
  private signer?: ethers.Signer;
  private rpcUrl: string;
  private apiKey?: string;

  constructor(options: { 
    network?: 'base' | 'ethereum', 
    privateKey?: string, 
    rpcUrl?: string,
    apiKey?: string 
  } = {}) {
    this.network = options.network || 'base';
    this.rpcUrl = options.rpcUrl || DEFAULT_RPC_URLS[this.network as keyof typeof DEFAULT_RPC_URLS];
    this.apiKey = options.apiKey;

    // Initialize EVM (Base/Ethereum)
    const evmProvider = new ethers.JsonRpcProvider(this.rpcUrl);
    
    if (options.privateKey) {
      this.signer = new ethers.Wallet(options.privateKey, evmProvider);
    }
    
    this.provider = evmProvider;
  }

  // --- Private Helper Methods ---

  private async sendEVMPayment(options: {
    to: string; 
    amount: number; 
    currency: string;
  }): Promise<{
    txHash: string;
    status: string;
    amount: string;
  }> {
    if (!this.signer) {
      throw new Error('No signer configured for EVM payments');
    }

    const usdcContract = new ethers.Contract(
      USDC_CONTRACTS[this.network as keyof typeof USDC_CONTRACTS],
      [
        'function transfer(address to, uint256 amount) returns (bool)',
        'function balanceOf(address account) view returns (uint256)'
      ],
      this.signer as ethers.Wallet
    );

    const amountWei = ethers.parseUnits(options.amount.toString(), 6);
    const tx = await usdcContract.transfer(options.to, amountWei);
    
    return {
      txHash: tx.hash,
      status: 'pending',
      amount: options.amount.toString()
    };
  }

  // --- Public Methods ---

  async acceptPayment(options: { 
    amount: number; 
    currency: string; 
    description?: string; 
    metadata?: Record<string, any> 
  }): Promise<{
    paymentUrl: string;
    paymentId: string;
    expiresAt: number;
  }> {
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = Date.now() + 3600000; // 1 hour default

    const paymentUrl = `https://oma-ai.com/api/x402/payments/${paymentId}` +
      `?amount=${options.amount}` +
      `&currency=${options.currency}` +
      (options.description ? `&desc=${encodeURIComponent(options.description)}` : '') +
      (options.metadata ? `&meta=${encodeURIComponent(JSON.stringify(options.metadata))}` : '') +
      `&expiry=${expiresAt}`;

    return {
      paymentUrl,
      paymentId,
      expiresAt
    };
  }

  async sendPayment(options: {
    to: string; 
    amount: number; 
    currency: string;
    maxGas?: number;
  }): Promise<{
    txHash: string;
    status: string;
    amount: string;
  }> {
    try {
      return await this.sendEVMPayment(options);
    } catch (error: any) {
      console.error('Payment failed:', error);
      throw new Error(`Payment failed: ${error.message || error}`);
    }
  }

  async getBalance(currency: string = 'USDC'): Promise<{
    amount: string;
    formatted: string;
    currency: string;
  }> {
    try {
      const address = await (this.signer as ethers.Wallet).getAddress();
      
      if (currency === 'USDC') {
        const usdcContract = new ethers.Contract(
          USDC_CONTRACTS[this.network as keyof typeof USDC_CONTRACTS],
          ['function balanceOf(address account) view returns (uint256)'],
          this.provider as ethers.Provider
        );
          
        const balance = await usdcContract.balanceOf(address);
          
        return {
          amount: balance.toString(),
          formatted: ethers.formatUnits(balance, 6),
          currency: 'USDC'
        };
      } else {
        const balance = await this.provider.getBalance(address);
          
        return {
          amount: balance.toString(),
          formatted: ethers.formatEther(balance),
          currency: 'ETH'
        };
      }
    } catch (error: any) {
      console.error('Failed to get balance:', error);
      throw new Error(`Failed to get balance: ${error.message || error}`);
    }
  }

  generatePaymentLink(options: {
    amount: number; 
    currency: string; 
    description?: string; 
    redirectUrl?: string;
    webhookUrl?: string;
    metadata?: Record<string, any>;
  }): {
    url: string;
    qrCode: string;
    paymentId: string;
  } {
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl = `https://oma-ai.com/api/x402/payments/${paymentId}`;
    
    const params = new URLSearchParams({
      amount: options.amount.toString(),
      currency: options.currency,
      desc: options.description || '',
      meta: options.metadata ? JSON.stringify(options.metadata) : ''
    });

    const url = `${baseUrl}?${params.toString()}`;
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    
    return { url, qrCode, paymentId };
  }

  async verifyPayment(paymentId: string): Promise<boolean> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      
      if (this.apiKey) {
        headers['Authorization'] = `Bearer ${this.apiKey}`;
      }
      
      const response = await fetch(`https://oma-ai.com/api/x402/payments/${paymentId}/verify`, {
        headers
      });
      
      const data = await response.json();
      return data.status === 'confirmed';
    } catch (error: any) {
      console.error('Verification failed:', error);
      return false;
    }
  }
}

// --- Export ---

export default X402Wallet;
