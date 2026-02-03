import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  X402Config,
  X402PaymentRequest,
  X402PaymentResponse,
  X402VerificationRequest,
  X402VerificationResponse,
} from './types';

export class X402Client {
  private config: X402Config;
  private connection: Connection;

  constructor(config: X402Config = {}) {
    this.config = {
      endpoint: config.endpoint || 'https://api.oma.ai',
      defaultRecipient: config.defaultRecipient || 'oma-marketplace.sol',
      wallet: config.wallet,
    };

    this.connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  }

  async pay(request: X402PaymentRequest): Promise<X402PaymentResponse> {
    const recipient = request.recipient ?? this.config.defaultRecipient ?? 'oma-marketplace.sol';
    const amount = request.amount;
    const currency = request.currency || 'USDC';

    if (!this.config.wallet) {
      throw new Error('Wallet private key is required for payments');
    }

    const keypair = Keypair.fromSecretKey(Buffer.from(this.config.wallet, 'base64'));

    const recipientPubkey = new PublicKey(recipient);
    const lamports = amount * LAMPORTS_PER_SOL * 0.000001;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: recipientPubkey,
        lamports,
      })
    );

    const signature = await this.connection.sendTransaction(transaction, [keypair]);

    const response: X402PaymentResponse = {
      transactionId: signature,
      amount,
      recipient,
      currency,
      timestamp: new Date().toISOString(),
      signature,
      nonce: this.generateNonce(),
      status: 'pending',
    };

    return response;
  }

  async verify(request: X402VerificationRequest): Promise<X402VerificationResponse> {
    try {
      const response = await fetch(`${this.config.endpoint}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        return {
          valid: false,
          error: `Verification failed: ${response.statusText}`,
        };
      }

      const data = await response.json() as { data: { valid: boolean; transactionId?: string } };
      return {
        valid: data.data.valid || false,
        transactionId: data.data.transactionId,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async waitForConfirmation(transactionId: string, timeout: number = 30000): Promise<boolean> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      const status = await this.connection.getSignatureStatus(transactionId);

      if (status && status.value) {
        return (
          status.value.confirmationStatus === 'confirmed' ||
          status.value.confirmationStatus === 'finalized'
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return false;
  }

  async getBalance(address: string): Promise<number> {
    const pubkey = new PublicKey(address);
    const balance = await this.connection.getBalance(pubkey);
    return balance / LAMPORTS_PER_SOL;
  }

  async getTransaction(transactionId: string): ReturnType<Connection['getTransaction']> {
    return this.connection.getTransaction(transactionId, {
      maxSupportedTransactionVersion: 0,
    });
  }

  private generateNonce(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  createPaymentSignature(payment: X402PaymentResponse): string {
    const message = JSON.stringify({
      transactionId: payment.transactionId,
      amount: payment.amount,
      recipient: payment.recipient,
      timestamp: payment.timestamp,
      nonce: payment.nonce,
    });

    return Buffer.from(message).toString('base64');
  }

  setDefaultRecipient(recipient: string): void {
    this.config.defaultRecipient = recipient;
  }

  setEndpoint(endpoint: string): void {
    this.config.endpoint = endpoint;
  }
}
