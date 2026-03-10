'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Transaction {
  id: string;
  from_wallet: string;
  to_wallet: string;
  amount_usdc: number;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  tx_hash: string | null;
  skill_id: string | null;
  created_at: string;
  completed_at: string | null;
  error_message: string | null;
}

interface WalletBalance {
  wallet_address: string;
  balance_usdc: number;
  total_earned: number;
  total_spent: number;
  transaction_count: number;
}

export default function WalletManagement() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Check for wallet in localStorage
    const savedWallet = localStorage.getItem('wallet_address');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      fetchWalletData(savedWallet);
    }
  }, []);

  const fetchWalletData = async (address: string) => {
    try {
      setLoading(true);
      setError(null);

      // Fetch balance
      const balanceRes = await fetch(`/api/wallet/${address}/balance`);
      const balanceData = await balanceRes.json();

      if (balanceData.success) {
        setBalance(balanceData.data);
      }

      // Fetch transactions
      const txRes = await fetch(`/api/transactions/list?wallet=${address}&limit=20`);
      const txData = await txRes.json();

      if (txData.success) {
        setTransactions(txData.data);
      }
    } catch (err) {
      setError('Failed to load wallet data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWallet = async () => {
    try {
      // In production, use MetaMask or WalletConnect
      // For now, use a demo address
      const demoAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bE';
      setWalletAddress(demoAddress);
      localStorage.setItem('wallet_address', demoAddress);
      await fetchWalletData(demoAddress);
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress('');
    setBalance(null);
    setTransactions([]);
    localStorage.removeItem('wallet_address');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'failed':
      case 'expired':
        return <AlertCircle size={16} className="text-red-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Agent Wallet
          </h1>
          <p className="text-gray-400">
            Manage your agent wallet and view transaction history
          </p>
        </motion.div>

        {/* Wallet Connection */}
        {!walletAddress ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md mx-auto text-center"
          >
            <Wallet size={48} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your wallet to manage x402 payments and view transaction history
            </p>
            <button
              onClick={handleConnectWallet}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Wallet size={20} />
              Connect Wallet
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Supports MetaMask, WalletConnect, and Coinbase Wallet
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-900/30 rounded-lg">
                    <Wallet size={24} className="text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Wallet Balance
                    </h2>
                    <p className="text-sm text-gray-400 font-mono">
                      {shortenAddress(walletAddress)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-zinc-800 text-gray-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                >
                  Disconnect
                </button>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">Loading balance...</div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-red-400">{error}</div>
                </div>
              ) : balance ? (
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Balance</div>
                    <div className="text-3xl font-bold text-white">
                      ${balance.balance_usdc.toFixed(4)}
                    </div>
                    <div className="text-sm text-gray-500">USDC</div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Total Earned</div>
                    <div className="text-2xl font-bold text-green-400">
                      ${balance.total_earned.toFixed(4)}
                    </div>
                    <div className="text-sm text-gray-500">USDC</div>
                  </div>
                  <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="text-sm text-gray-400 mb-1">Total Spent</div>
                    <div className="text-2xl font-bold text-yellow-400">
                      ${balance.total_spent.toFixed(4)}
                    </div>
                    <div className="text-sm text-gray-500">USDC</div>
                  </div>
                </div>
              ) : null}
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Transaction History
              </h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">Loading transactions...</div>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400">No transactions yet</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          tx.to_wallet === walletAddress
                            ? 'bg-green-900/30'
                            : 'bg-zinc-800'
                        }`}>
                          {tx.to_wallet === walletAddress ? (
                            <ArrowDownRight size={20} className="text-green-400" />
                          ) : (
                            <ArrowUpRight size={20} className="text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {tx.to_wallet === walletAddress ? 'Received' : 'Sent'}
                          </div>
                          <div className="text-sm text-gray-400 font-mono">
                            {shortenAddress(
                              tx.to_wallet === walletAddress
                                ? tx.from_wallet
                                : tx.to_wallet
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          tx.to_wallet === walletAddress
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}>
                          {tx.to_wallet === walletAddress ? '+' : '-'}
                          ${tx.amount_usdc.toFixed(4)}
                        </div>
                        <div className="flex items-center justify-end gap-1 text-sm text-gray-400">
                          {getStatusIcon(tx.status)}
                          <span className="capitalize">{tx.status}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(tx.created_at)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
