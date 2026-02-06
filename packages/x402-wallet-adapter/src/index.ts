/**
 * x402 Wallet Adapter for AI Agents - Production Ready
 * 
 * Universal wallet adapter for accepting and sending HTTP 402 payments
 * Supports Base, Ethereum, and Solana networks
 * 
 * @license MIT
 * @author OMA Systems
 */

import { ethers } from 'ethers';
import { 
  Connection, 
  Keypair, 
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';

// --- Default RPC URLs ---

const DEFAULT_RPC_URLS = {
  base: 'https://mainnet.base.org',
  ethereum: 'https://eth.llamarpc.com',
  solana: 'https://api.mainnet-beta.solana.com'
};

const USDC_CONTRACTS = {
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02513',
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  solana: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTD'
};

// --- x402 Wallet Class ---

export class X402Wallet {
  private network: string;
  private provider: ethers.Provider | Connection;
  private signer?: ethers.Signer;
  private solanaKeypair?: Keypair;
  private rpcUrl: string;
  private apiKey?: string;

  constructor(options: { 
    network?: 'base' | 'ethereum' | 'solana', 
    privateKey?: string, 
    rpcUrl?: string,
    apiKey?: string 
  } = {}) {
    this.network = options.network || 'base';
    this.rpcUrl = options.rpcUrl || DEFAULT_RPC_URLS[this.network as keyof typeof DEFAULT_RPC_URLS];
    this.apiKey = options.apiKey;

    if (this.network === 'solana') {
      // Initialize Solana
      if (options.privateKey) {
        this.solanaKeypair = Keypair.fromSecretKey(
          Buffer.from(options.privateKey, 'base64')
        );
      }
      this.provider = new Connection(this.rpcUrl);
    } else {
      // Initialize EVM (Base/Ethereum)
      const evmProvider = new ethers.JsonRpcProvider(this.rpcUrl);
      
      if (options.privateKey) {
        this.signer = new ethers.Wallet(options.privateKey, evmProvider);
      }
      
      this.provider = evmProvider;
    }
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

  private async sendSolanaPayment(options: {
    to: string; 
    amount: number; 
  }): Promise<{
    txHash: string;
    status: string;
    amount: string;
  }> {
    if (!this.solanaKeypair) {
      throw new Error('No Solana keypair configured');
    }

    const connection = this.provider as Connection;
    const fromPubkey = this.solanaKeypair.publicKey;
    const toPubkey = new PublicKey(options.to);
    const amount = options.amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: toPubkey,
        lamports: amount
      })
    );

    const signature = await connection.sendTransaction(transaction, [this.solanaKeypair]);
    
    return {
      txHash: signature,
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
      if (this.network === 'solana') {
        return await this.sendSolanaPayment(options);
      } else {
        return await this.sendEVMPayment(options);
      }
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
      if (this.network === 'solana') {
        const balance = await (this.provider as Connection).getBalance(
          this.solanaKeypair!.publicKey
        );
        
        return {
          amount: balance.toString(),
          formatted: (balance / LAMPORTS_PER_SOL).toFixed(9),
          currency: 'SOL'
        };
      } else {
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
          const balance = await (this.provider as ethers.Provider).getBalance(address);
          
          return {
            amount: balance.toString(),
            formatted: ethers.formatEther(balance),
            currency: 'ETH'
          };
        }
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
