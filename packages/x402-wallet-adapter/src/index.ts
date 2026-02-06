/**
 * x402 Wallet Adapter for AI Agents
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

// --- Types ---

export type Network = 'base' | 'ethereum' | 'solana';

export type Currency = 'USDC' | 'ETH' | 'SOL';

export type PaymentStatus = 'pending' | 'confirmed' | 'failed';

export interface PaymentOptions {
  amount: number;
  currency: Currency;
  description?: string;
  metadata?: Record<string, any>;
  expiry?: number;
}

export interface PaymentLinkOptions extends PaymentOptions {
  redirectUrl?: string;
  webhookUrl?: string;
}

export interface PaymentResult {
  paymentUrl: string;
  paymentId: string;
  expiresAt: number;
}

export interface SendPaymentResult {
  txHash: string;
  status: PaymentStatus;
  amount: string;
}

export interface Balance {
  amount: string;
  formatted: string;
  currency: string;
}

export interface X402WalletOptions {
  network: Network;
  privateKey?: string;
  rpcUrl?: string;
  apiKey?: string;
}

// --- Default RPC URLs ---

const DEFAULT_RPC_URLS: Record<Network, string> = {
  base: 'https://mainnet.base.org',
  ethereum: 'https://eth.llamarpc.com',
  solana: 'https://api.mainnet-beta.solana.com'
};

const USDC_CONTRACTS: Record<Network, string> = {
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bDA02513',
  ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  solana: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTD' // USDC on Solana
};

// --- x402 Wallet Class ---

export class X402Wallet {
  private network: Network;
  private provider: ethers.Provider | Connection;
  private signer?: ethers.Signer;
  private solanaKeypair?: Keypair;
  private apiKey?: string;
  private rpcUrl: string;

  constructor(options: X402WalletOptions) {
    this.network = options.network;
    this.rpcUrl = options.rpcUrl || DEFAULT_RPC_URLS[options.network];
    this.apiKey = options.apiKey;

    if (this.network === 'solana') {
      // Initialize Solana
      if (options.privateKey) {
        // Handle Solana private key (58-char base58)
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

  // --- Accept Payment (x402) ---

  async acceptPayment(options: PaymentOptions): Promise<PaymentResult> {
    const paymentId = this.generatePaymentId();
    const expiresAt = options.expiry || Date.now() + 3600000; // 1 hour default

    // Generate payment URL with x402 protocol
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

  // --- Send Payment ---

  async sendPayment(options: PaymentOptions & { to: string; maxGas?: number }): Promise<SendPaymentResult> {
    try {
      if (this.network === 'solana') {
        return await this.sendSolanaPayment(options as any);
      } else {
        return await this.sendEVMPayment(options as any);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      throw new Error(`Payment failed: ${error}`);
    }
  }

  private async sendEVMPayment(options: any): Promise<SendPaymentResult> {
    if (!this.signer) {
      throw new Error('No signer configured');
    }

    // Get USDC contract
    const usdcContract = new ethers.Contract(
      USDC_CONTRACTS[this.network],
      [
        'function transfer(address to, uint256 amount) returns (bool)',
        'function balanceOf(address account) view returns (uint256)'
      ],
      this.signer
    );

    // Convert amount (USDC has 6 decimals)
    const amountWei = ethers.parseUnits(options.amount.toString(), 6);

    // Execute transfer
    const tx = await usdcContract.transfer(options.to, amountWei);
    
    return {
      txHash: tx.hash,
      status: 'pending',
      amount: options.amount.toString()
    };
  }

  private async sendSolanaPayment(options: any): Promise<SendPaymentResult> {
    if (!this.solanaKeypair) {
      throw new Error('No Solana keypair configured');
    }

    const connection = this.provider as Connection;
    const fromPubkey = this.solanaKeypair.publicKey;
    const toPubkey = new PublicKey(options.to);

    // Convert amount (1 SOL = 1,000,000,000 lamports)
    const amount = options.amount * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: toPubkey,
        lamports: amount
      })
    );

    // Sign and send
    const signature = await connection.sendTransaction(transaction, this.solanaKeypair);
    
    return {
      txHash: signature,
      status: 'pending',
      amount: options.amount.toString()
    };
  }

  // --- Get Balance ---

  async getBalance(currency: Currency = 'USDC'): Promise<Balance> {
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
        // EVM networks
        const address = await (this.signer as ethers.Wallet).getAddress();
        
        if (currency === 'USDC') {
          const usdcContract = new ethers.Contract(
            USDC_CONTRACTS[this.network],
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
          // Native ETH
          const balance = await (this.provider as ethers.Provider).getBalance(address);
          
          return {
            amount: balance.toString(),
            formatted: ethers.formatEther(balance),
            currency: 'ETH'
          };
        }
      }
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  // --- Generate Payment Link ---

  generatePaymentLink(options: PaymentLinkOptions): {
    url: string;
    qrCode: string;
    paymentId: string;
  } {
    const paymentId = this.generatePaymentId();
    const baseUrl = `https://oma-ai.com/api/x402/payments/${paymentId}`;
    
    // Build URL with parameters
    const params = new URLSearchParams({
      amount: options.amount.toString(),
      currency: options.currency,
      desc: options.description || '',
      meta: options.metadata ? JSON.stringify(options.metadata) : ''
    });

    const url = `${baseUrl}?${params.toString()}`;
    
    // Generate QR code (data URI)
    const qrCode = this.generateQRCode(url);
    
    return { url, qrCode, paymentId };
  }

  // --- Helper: Generate Payment ID ---

  private generatePaymentId(): string {
    return `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // --- Helper: Generate QR Code ---

  private generateQRCode(text: string): string {
    // Simple QR code generation (placeholder - use qrcode library in production)
    const size = 200;
    const data = encodeURIComponent(text);
    
    // Using API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${data}`;
  }

  // --- Verify Payment ---

  async verifyPayment(paymentId: string): Promise<boolean> {
    // Check payment status via OMA-AI API
    try {
      const response = await fetch(`https://oma-ai.com/api/x402/payments/${paymentId}/verify`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      return data.status === 'confirmed';
    } catch (error) {
      console.error('Verification failed:', error);
      return false;
    }
  }
}

// --- Export ---

export default X402Wallet;
export type { Network, Currency, PaymentStatus, PaymentOptions, PaymentResult, SendPaymentResult, Balance };
