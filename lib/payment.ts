// OMA-AI TypeScript SDK - x402 Payment Handler

import { ethers } from 'ethers';
import axios, { AxiosInstance } from 'axios';

interface PaymentInfo {
  scheme: string;
  network: string;
  price: string;
  recipient: string;
  data: {
    service: string;
    model?: string;
    estimated_tokens?: number;
  };
}

export class Payment {
  private wallet: ethers.Wallet | ethers.HDNodeWallet;
  private http: AxiosInstance;

  constructor(wallet: ethers.Wallet | ethers.HDNodeWallet, http: AxiosInstance) {
    this.wallet = wallet;
    this.http = http;
  }
  
  /**
   * Pay and retry request (handles 402 automatically)
   */
  async payAndRequest(
    url: string,
    payload: any
  ): Promise<any> {
    // Initial request
    const response = await this.http.post(url, payload);
    
    // Check for 402 Payment Required
    if (response.status === 402) {
      return this.handle402(response.request.path, response.data.payment, payload);
    }
    
    return response.data;
  }
  
  /**
   * Handle 402 response and complete payment
   */
  private async handle402(
    path: string,
    payment: PaymentInfo,
    originalPayload: any
  ): Promise<any> {
    // Parse price
    const priceInUSDC = parseFloat(payment.price.split(' ')[0]);
    
    // Sign payment message
    const message = this.createPaymentMessage(payment);
    const signature = await this.wallet.signMessage(message);
    
    // Send payment
    const paymentResponse = await this.http.post('/api/x402/pay', {
      recipient: payment.recipient,
      amount: priceInUSDC,
      signature,
      service: payment.data.service,
    });
    
    if (!paymentResponse.data.success) {
      throw new Error('Payment failed: ' + paymentResponse.data.error);
    }
    
    // Retry original request with payment proof
    const retryResponse = await this.http.post(path, originalPayload, {
      headers: {
        'X-Payment-Signature': signature,
        'X-Payment-Tx': paymentResponse.data.tx_hash,
      },
    });
    
    return retryResponse.data;
  }
  
  /**
   * Create payment message for signing
   */
  private createPaymentMessage(payment: PaymentInfo): string {
    return `Pay ${payment.price} on ${payment.network} to ${payment.recipient} for ${payment.data.service}`;
  }
  
  /**
   * Direct payment to an address
   */
  async pay(
    recipient: string,
    amount: number,
    reason?: string
  ): Promise<{ tx_hash: string; success: boolean }> {
    const message = reason 
      ? `Pay ${amount} USDC to ${recipient}: ${reason}`
      : `Pay ${amount} USDC to ${recipient}`;
    
    const signature = await this.wallet.signMessage(message);
    
    const response = await this.http.post('/api/wallet/transfer', {
      to: recipient,
      amount,
      signature,
    });
    
    return response.data;
  }
  
  /**
   * Get wallet balance
   */
  async getBalance(): Promise<{ balance: number; symbol: string }> {
    const response = await this.http.get(`/api/wallet/balance/${this.wallet.address}`);
    return response.data;
  }
  
  /**
   * Get payment history
   */
  async getHistory(limit: number = 50): Promise<any[]> {
    const response = await this.http.get('/api/wallet/history', {
      params: { 
        address: this.wallet.address,
        limit 
      }
    });
    return response.data.transactions || [];
  }
}