'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Loader2, CheckCircle, AlertCircle, ExternalLink, Network, DollarSign } from 'lucide-react';
import { useAccount, useSignMessage } from 'wagmi';
import { useWallet as useSolanaWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Connection } from '@solana/web3.js';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    name: string;
    price: number;
    description?: string;
  };
  onSuccess?: (txHash: string) => void;
}

type PaymentNetwork = 'base' | 'solana';
type PaymentStatus = 'idle' | 'connecting' | 'signing' | 'processing' | 'success' | 'error';

export function EnhancedPaymentModal({ isOpen, onClose, service, onSuccess }: PaymentModalProps) {
  const [network, setNetwork] = useState<PaymentNetwork>('base');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');

      // EVM hooks
  const { address: evmAddress } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Solana hooks
  const { publicKey: solanaPublicKey, signTransaction: solanaSignTransaction } = useSolanaWallet();

  // EIP-3009 TransferWithAuthorization for Base USDC
  const executeEip3009Payment = async () => {
    setStatus('signing');
    setError('');

    try {
      if (!evmAddress) {
        throw new Error('Please connect your wallet first');
      }

      // Create EIP-3009 TransferWithAuthorization message
      const transferAuth = {
        from: evmAddress,
        to: process.env.NEXT_PUBLIC_TREASURY_WALLET_BASE || '0x590FdA238A52bBA79fD4635e73bDAC1eAe558e784',
        value: Math.floor(service.price * 1e6).toString(), // USDC has 6 decimals
        validAfter: Math.floor(Date.now() / 1000).toString(),
        validBefore: (Math.floor(Date.now() / 1000) + 3600).toString(), // 1 hour validity
        nonce: Date.now().toString(),
      };

      // Sign the authorization message
      const message = JSON.stringify(transferAuth);
      const signature = await signMessageAsync({ message });

      if (!signature) {
        throw new Error('Failed to sign authorization');
      }

      setStatus('processing');

      // Send to backend for execution
      const response = await fetch('/api/payments/eip3009', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          authorization: transferAuth,
          signature: signature,
          network: 'base',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setTxHash(data.txHash);
      setStatus('success');

      if (onSuccess) {
        onSuccess(data.txHash);
      }
    } catch (err: any) {
      console.error('EIP-3009 payment error:', err);
      setError(err.message || 'Payment failed');
      setStatus('error');
    }
  };

  // Solana SPL Token Payment
  const executeSolanaPayment = async () => {
    setStatus('signing');
    setError('');

    try {
      if (!solanaPublicKey) {
        throw new Error('Please connect your Solana wallet first');
      }

      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
      );

      // Create transfer transaction (simplified - in production use SPL token)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: solanaPublicKey,
          toPubkey: new PublicKey(
            process.env.NEXT_PUBLIC_TREASURY_WALLET_SOLANA || 'YourSolanaAddress'
          ),
          lamports: service.price * LAMPORTS_PER_SOL,
        })
      );

      // Sign transaction
      if (!solanaSignTransaction) {
        throw new Error('Wallet does not support signing transactions');
      }

      const signedTransaction = await solanaSignTransaction(transaction);

      setStatus('processing');

      // Send transaction
      const txid = await connection.sendRawTransaction(signedTransaction.serialize());

      // Wait for confirmation
      await connection.confirmTransaction(txid);

      setTxHash(txid);
      setStatus('success');

      if (onSuccess) {
        onSuccess(txid);
      }
    } catch (err: any) {
      console.error('Solana payment error:', err);
      setError(err.message || 'Payment failed');
      setStatus('error');
    }
  };

  const handlePayment = () => {
    if (network === 'base') {
      executeEip3009Payment();
    } else {
      executeSolanaPayment();
    }
  };

  const resetAndClose = () => {
    setStatus('idle');
    setError('');
    setTxHash('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={resetAndClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={resetAndClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Wallet size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-bold">Confirm Payment</h2>
            <p className="text-zinc-400 text-sm mt-1">x402 Micropayment</p>
          </div>

          {/* Network Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setNetwork('base')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                network === 'base'
                  ? 'bg-purple-600/20 border-purple-500 text-purple-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <Network size={18} />
              <span className="font-medium">Base (USDC)</span>
            </button>
            <button
              onClick={() => setNetwork('solana')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                network === 'solana'
                  ? 'bg-green-600/20 border-green-500 text-green-400'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              <DollarSign size={18} />
              <span className="font-medium">Solana</span>
            </button>
          </div>

          {/* Service Info */}
          <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{service.name}</h3>
                {service.description && (
                  <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{service.description}</p>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">${service.price}</div>
                <div className="text-xs text-zinc-500">
                  {network === 'base' ? 'USDC on Base' : 'SOL on Solana'}
                </div>
              </div>
            </div>
          </div>

          {/* Status Display */}
          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={24} />
                <div>
                  <p className="font-medium text-green-400">Payment Successful!</p>
                  {txHash && (
                    <a
                      href={
                        network === 'base'
                          ? `https://basescan.org/tx/${txHash}`
                          : `https://solscan.io/tx/${txHash}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 mt-1"
                    >
                      View on Explorer <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="text-red-400" size={24} />
                <div>
                  <p className="font-medium text-red-400">Payment Failed</p>
                  <p className="text-xs text-zinc-400 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {status === 'idle' && (
            <button
              onClick={handlePayment}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Pay with {network === 'base' ? 'Base' : 'Solana'}
            </button>
          )}

          {(status === 'connecting' || status === 'signing' || status === 'processing') && (
            <button
              disabled
              className="w-full py-4 bg-zinc-800 rounded-xl font-semibold text-zinc-400 flex items-center justify-center gap-2"
            >
              <Loader2 size={20} className="animate-spin" />
              {status === 'connecting' && 'Connecting Wallet...'}
              {status === 'signing' && 'Confirm in Wallet...'}
              {status === 'processing' && 'Processing Payment...'}
            </button>
          )}

          {(status === 'success' || status === 'error') && (
            <button
              onClick={resetAndClose}
              className="w-full py-4 bg-zinc-800 rounded-xl font-semibold hover:bg-zinc-700 transition-colors"
            >
              {status === 'success' ? 'Done' : 'Try Again'}
            </button>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-zinc-500 mt-4">
            Powered by x402 Protocol • {network === 'base' ? 'Base Network (EIP-3009)' : 'Solana Network'}
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
