import { Connection, PublicKey, ParsedTransactionWithMeta, Commitment } from '@solana/web3.js';
import { logger } from './logger';
import bs58 from 'bs58';
import nacl from 'tweetnacl';

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Enhanced configuration with better defaults and validation
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const USDC_MINT =
  process.env.NEXT_PUBLIC_USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const CONNECTION_TIMEOUT = 30000;

// Connection pool for better performance
interface ConnectionPool {
  connection: Connection;
  lastUsed: number;
  isHealthy: boolean;
}

class SolanaConnectionManager {
  private pools: ConnectionPool[] = [];
  private maxPools = 5;
  private healthCheckInterval: NodeJS.Timeout | null = null;

  constructor(private rpcUrl: string) {
    this.initializePools();
    this.startHealthChecks();
  }

  private initializePools() {
    for (let i = 0; i < this.maxPools; i++) {
      this.pools.push({
        connection: new Connection(this.rpcUrl, {
          commitment: 'confirmed' as Commitment,
          confirmTransactionInitialTimeout: CONNECTION_TIMEOUT,
        }),
        lastUsed: 0,
        isHealthy: true,
      });
    }
  }

  private startHealthChecks() {
    this.healthCheckInterval = setInterval(async () => {
      for (const pool of this.pools) {
        try {
          await pool.connection.getSlot('confirmed');
          pool.isHealthy = true;
        } catch (error) {
          logger.warn('Connection health check failed', { error, pool: this.pools.indexOf(pool) });
          pool.isHealthy = false;
        }
      }
    }, 30000); // Check every 30 seconds
  }

  getConnection(): Connection {
    // Find the least recently used healthy connection
    let selectedPool = this.pools
      .filter((pool) => pool.isHealthy)
      .sort((a, b) => a.lastUsed - b.lastUsed)[0];

    if (!selectedPool) {
      // If no healthy pools, return the first one and mark it for health check
      selectedPool = this.pools[0];
      selectedPool.isHealthy = true;
    }

    selectedPool.lastUsed = Date.now();
    return selectedPool.connection;
  }

  async withRetry<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const result = await operation();
        if (attempt > 1) {
          logger.info(`${operationName} succeeded after ${attempt} attempts`);
        }
        return result;
      } catch (error) {
        lastError = error as Error;
        logger.warn(`${operationName} attempt ${attempt} failed`, {
          error: error instanceof Error ? error.message : String(error),
          attempt,
        });

        if (attempt < MAX_RETRIES) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * attempt));
        }
      }
    }

    throw lastError || new Error(`${operationName} failed after ${MAX_RETRIES} attempts`);
  }

  destroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
  }
}

export class SolanaService {
  private connectionManager: SolanaConnectionManager;

  constructor() {
    this.connectionManager = new SolanaConnectionManager(RPC_URL);
  }

  private getConnection(): Connection {
    return this.connectionManager.getConnection();
  }

  async verifyPaymentSignature(payload: {
    amount: string;
    recipient: string;
    nonce: string;
    timestamp: number;
    signature: string;
    publicKey: string;
  }): Promise<boolean> {
    return this.connectionManager.withRetry(async () => {
      try {
        const now = Date.now();
        const timeDiff = Math.abs(now - payload.timestamp);

        if (timeDiff > 300000) {
          // 5 minutes
          logger.warn('Payment signature expired', {
            timestamp: payload.timestamp,
            now,
            timeDiff,
          });
          return false;
        }

        const messageString = `${payload.amount}:${payload.recipient}:${payload.nonce}:${payload.timestamp}`;
        const messageBytes = new TextEncoder().encode(messageString);

        const signatureBytes = bs58.decode(payload.signature);
        const publicKeyBytes = bs58.decode(payload.publicKey);

        const isValid = nacl.sign.detached.verify(messageBytes, signatureBytes, publicKeyBytes);

        if (!isValid) {
          logger.warn('Invalid cryptographic signature', {
            message: messageString,
            signatureLength: signatureBytes.length,
            publicKeyLength: publicKeyBytes.length,
          });
          return false;
        }

        logger.info('Payment signature verified successfully', {
          recipient: payload.recipient,
          amount: payload.amount,
          verificationTime: Date.now() - now,
        });
        return true;
      } catch (error) {
        logger.error('Solana signature verification failed', {
          error: error instanceof Error ? error.message : String(error),
          payload: {
            recipient: payload.recipient,
            amount: payload.amount,
            timestamp: payload.timestamp,
          },
        });
        return false;
      }
    }, 'verifyPaymentSignature');
  }

  async verifyPaymentTransaction(
    txHash: string,
    expectedRecipient: string,
    expectedAmount: string
  ): Promise<{
    valid: boolean;
    amount?: number;
    recipient?: string;
    error?: string;
    txStatus?: string;
    blockTime?: number;
  }> {
    return this.connectionManager.withRetry(async () => {
      const connection = this.getConnection();

      let tx: ParsedTransactionWithMeta | null = null;
      try {
        tx = await connection.getParsedTransaction(txHash, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0,
        });
      } catch (e) {
        logger.error('Failed to fetch transaction', { txHash, error: e });
        return { valid: false, error: 'Failed to fetch transaction from chain' };
      }

      if (!tx) {
        return { valid: false, error: 'Transaction not found on chain' };
      }

      if (tx.meta?.err) {
        return { valid: false, error: 'Transaction failed on chain', txStatus: 'failed' };
      }

      // Find the transfer instruction to the expected recipient
      // This logic looks for a SOL transfer or SPL token transfer
      // For USDC (SPL Token), we need to check inner instructions or parsed token transfers

      let transferFound = false;
      let actualAmount = 0;
      let actualRecipient = '';

      // Check pre/post token balances for USDC
      if (tx.meta?.postTokenBalances && tx.meta?.preTokenBalances) {
        const treasuryPostBalance = tx.meta.postTokenBalances.find(
          (b) => b.owner === expectedRecipient && b.mint === USDC_MINT
        );
        const treasuryPreBalance = tx.meta.preTokenBalances.find(
          (b) => b.owner === expectedRecipient && b.mint === USDC_MINT
        );

        if (treasuryPostBalance) {
          const postAmount = treasuryPostBalance.uiTokenAmount.uiAmount || 0;
          const preAmount = treasuryPreBalance?.uiTokenAmount.uiAmount || 0;
          const diff = postAmount - preAmount;

          if (diff > 0) {
            actualAmount = diff;
            actualRecipient = expectedRecipient;
            transferFound = true;
          }
        }
      }

      // Fallback: Check standard SOL transfers (SystemProgram) if not found above
      if (!transferFound) {
        // Checking for native SOL transfer if USDC check failed (though we expect USDC)
        // This is just a fallback safety or could be removed if strict USDC is required
        // But the requirement says USDC.
      }

      if (!transferFound) {
        // Also check inner instructions for SPL transfers if balances didn't capture it (less reliable but possible)
        // For now, reliance on pre/post balances is the standard way for SPL tokens
        return {
          valid: false,
          error: 'No deposit transfer found to treasury',
          recipient: actualRecipient,
        };
      }

      // Allow small float variance
      const epsilon = 0.0001;
      if (Math.abs(actualAmount - parseFloat(expectedAmount)) > epsilon) {
        return {
          valid: false,
          error: `Amount mismatch: expected ${expectedAmount}, got ${actualAmount}`,
          amount: actualAmount,
        };
      }

      return {
        valid: true,
        amount: actualAmount,
        recipient: actualRecipient,
        txStatus: 'success',
        blockTime: tx.blockTime || Date.now() / 1000,
      };
    }, 'verifyPaymentTransaction');
  }

  async getBalance(walletAddress: string): Promise<number> {
    return this.connectionManager.withRetry(async () => {
      const publicKey = new PublicKey(walletAddress);
      const balance = await this.getConnection().getBalance(publicKey);
      return balance / 1_000_000_000;
    }, 'getBalance');
  }

  async getTokenBalance(walletAddress: string, tokenMint: string): Promise<number> {
    return this.connectionManager.withRetry(async () => {
      const publicKey = new PublicKey(walletAddress);
      const tokenPublicKey = new PublicKey(tokenMint);
      const tokenAccounts = await this.getConnection().getParsedTokenAccountsByOwner(publicKey, {
        mint: tokenPublicKey,
      });

      if (tokenAccounts.value.length === 0) return 0;

      const tokenAmount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
      return parseFloat(tokenAmount.uiAmountString || '0');
    }, 'getTokenBalance');
  }
}

export const solanaService = new SolanaService();
