import { Connection, PublicKey, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  AccountLayout,
} from '@solana/spl-token';
import { logger } from '@/lib/logger';

// Configuration
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const USDC_MINT =
  process.env.NEXT_PUBLIC_USDC_MINT || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const TREASURY_WALLET = process.env.OMA_TREASURY_WALLET || '';

// Error types
export class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'WalletError';
  }
}

export interface DepositOptions {
  amount: number;
  fromPublicKey: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connection?: Connection;
}

export interface WithdrawOptions {
  amount: number;
  toAddress: string;
  fromPublicKey: PublicKey;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connection?: Connection;
}

export interface TransactionResult {
  success: boolean;
  signature?: string;
  error?: string;
  errorDetails?: unknown;
}

export class WalletService {
  private connection: Connection;

  constructor(connection?: Connection) {
    this.connection = connection || new Connection(RPC_URL, 'confirmed');
  }

  /**
   * Create and sign a USDC deposit transaction
   */
  async depositUSDC(options: DepositOptions): Promise<TransactionResult> {
    try {
      const { amount, fromPublicKey, signTransaction, connection = this.connection } = options;

      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        throw new WalletError('Invalid deposit amount', 'INVALID_AMOUNT', { amount });
      }

      // Get token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(USDC_MINT),
        fromPublicKey
      );

      const toTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(USDC_MINT),
        new PublicKey(TREASURY_WALLET)
      );

      // Check if recipient token account exists
      const toAccountInfo = await connection.getAccountInfo(toTokenAccount);
      if (!toAccountInfo) {
        throw new WalletError(
          'Treasury token account does not exist. Please contact support.',
          'ACCOUNT_NOT_FOUND',
          { address: toTokenAccount.toString() }
        );
      }

      // Check sender token account exists
      const fromAccountInfo = await connection.getAccountInfo(fromTokenAccount);
      if (!fromAccountInfo) {
        throw new WalletError(
          'Your USDC token account does not exist. Please create one first.',
          'ACCOUNT_NOT_FOUND',
          { address: fromTokenAccount.toString() }
        );
      }

      // Get account balance
      const accountData = AccountLayout.decode(fromAccountInfo.data);
      const currentBalance = Number(accountData.amount) / 1_000_000; // USDC has 6 decimals

      if (currentBalance < amount) {
        throw new WalletError(
          `Insufficient USDC balance. Available: ${currentBalance.toFixed(6)}, Required: ${amount.toFixed(6)}`,
          'INSUFFICIENT_BALANCE',
          { available: currentBalance, required: amount }
        );
      }

      // Create transfer instruction
      const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPublicKey,
        Math.floor(amount * 1_000_000) // Convert to smallest unit
      );

      // Create transaction
      const transaction = new Transaction().add(transferInstruction);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;

      // Sign transaction
      const signedTransaction = await signTransaction(transaction);

      // Send transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      // Confirm transaction
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new WalletError('Transaction failed on chain', 'TRANSACTION_FAILED', {
          signature,
          error: confirmation.value.err,
        });
      }

      logger.info('USDC deposit successful', {
        signature,
        amount,
        from: fromPublicKey.toString(),
        to: TREASURY_WALLET,
      });

      return {
        success: true,
        signature,
      };
    } catch (error) {
      if (error instanceof WalletError) {
        throw error;
      }

      logger.error('USDC deposit error', {
        error: error instanceof Error ? error.message : String(error),
        options,
      });

      throw new WalletError(
        'Failed to process deposit',
        'DEPOSIT_FAILED',
        error instanceof Error ? error : String(error)
      );
    }
  }

  /**
   * Create and sign a USDC withdrawal transaction
   * Note: This is a client-side transaction that needs to be confirmed by the backend
   */
  async withdrawUSDC(options: WithdrawOptions): Promise<TransactionResult> {
    try {
      const {
        amount,
        toAddress,
        fromPublicKey,
        signTransaction,
        connection = this.connection,
      } = options;

      // Validate amount
      if (isNaN(amount) || amount <= 0) {
        throw new WalletError('Invalid withdrawal amount', 'INVALID_AMOUNT', { amount });
      }

      // Validate recipient address
      try {
        new PublicKey(toAddress);
      } catch {
        throw new WalletError('Invalid recipient address', 'INVALID_ADDRESS', { toAddress });
      }

      // Get token accounts
      const fromTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(USDC_MINT),
        fromPublicKey
      );

      const toTokenAccount = await getAssociatedTokenAddress(
        new PublicKey(USDC_MINT),
        new PublicKey(toAddress)
      );

      // Check sender token account exists
      const fromAccountInfo = await connection.getAccountInfo(fromTokenAccount);
      if (!fromAccountInfo) {
        throw new WalletError(
          'Your USDC token account does not exist. Please create one first.',
          'ACCOUNT_NOT_FOUND',
          { address: fromTokenAccount.toString() }
        );
      }

      // Get account balance
      const accountData = AccountLayout.decode(fromAccountInfo.data);
      const currentBalance = Number(accountData.amount) / 1_000_000;

      if (currentBalance < amount) {
        throw new WalletError(
          `Insufficient USDC balance. Available: ${currentBalance.toFixed(6)}, Required: ${amount.toFixed(6)}`,
          'INSUFFICIENT_BALANCE',
          { available: currentBalance, required: amount }
        );
      }

      // Create transfer instruction
      const transferInstruction = createTransferInstruction(
        fromTokenAccount,
        toTokenAccount,
        fromPublicKey,
        Math.floor(amount * 1_000_000)
      );

      // Create transaction
      const transaction = new Transaction().add(transferInstruction);
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;

      // Sign transaction
      const signedTransaction = await signTransaction(transaction);

      // Send transaction
      const signature = await connection.sendRawTransaction(signedTransaction.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });

      // Confirm transaction
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new WalletError('Transaction failed on chain', 'TRANSACTION_FAILED', {
          signature,
          error: confirmation.value.err,
        });
      }

      logger.info('USDC withdrawal successful', {
        signature,
        amount,
        from: fromPublicKey.toString(),
        to: toAddress,
      });

      return {
        success: true,
        signature,
      };
    } catch (error) {
      if (error instanceof WalletError) {
        throw error;
      }

      logger.error('USDC withdrawal error', {
        error: error instanceof Error ? error.message : String(error),
        options,
      });

      throw new WalletError(
        'Failed to process withdrawal',
        'WITHDRAWAL_FAILED',
        error instanceof Error ? error : String(error)
      );
    }
  }

  /**
   * Get USDC token balance for an address
   */
  async getUSDCBalance(publicKey: PublicKey): Promise<number> {
    try {
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: new PublicKey(USDC_MINT),
      });

      if (tokenAccounts.value.length === 0) {
        return 0;
      }

      const tokenAmount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
      return parseFloat(tokenAmount.uiAmountString || '0');
    } catch (error) {
      logger.error('Failed to fetch USDC balance', {
        error: error instanceof Error ? error.message : String(error),
        publicKey: publicKey.toString(),
      });
      throw new WalletError('Failed to fetch USDC balance', 'BALANCE_FETCH_FAILED', error);
    }
  }

  /**
   * Get SOL balance for an address
   */
  async getSOLBalance(publicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      logger.error('Failed to fetch SOL balance', {
        error: error instanceof Error ? error.message : String(error),
        publicKey: publicKey.toString(),
      });
      throw new WalletError('Failed to fetch SOL balance', 'BALANCE_FETCH_FAILED', error);
    }
  }

  /**
   * Check if a wallet has a USDC token account
   */
  async hasUSDCAccount(publicKey: PublicKey): Promise<boolean> {
    try {
      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: new PublicKey(USDC_MINT),
      });
      return tokenAccounts.value.length > 0;
    } catch (error) {
      logger.error('Failed to check USDC account', {
        error: error instanceof Error ? error.message : String(error),
        publicKey: publicKey.toString(),
      });
      return false;
    }
  }

  /**
   * Get the estimated transaction fee
   */
  async estimateTransactionFee(): Promise<number> {
    try {
      const { feeCalculator } = await this.connection.getRecentBlockhash();
      // Estimate: 1 instruction * feeCalculator.lamportsPerSignature
      return (feeCalculator?.lamportsPerSignature || 5000) / LAMPORTS_PER_SOL;
    } catch (error) {
      logger.error('Failed to estimate transaction fee', {
        error: error instanceof Error ? error.message : String(error),
      });
      return 0.000005; // Default estimate
    }
  }
}

export const walletService = new WalletService();
