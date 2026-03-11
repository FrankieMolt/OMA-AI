'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, ArrowUpRight, CheckCircle, AlertCircle, Clock, ExternalLink } from 'lucide-react';
import { TransactionCardSkeleton } from '@/components/loading/Skeletons';
import { TransactionsBreadcrumbs } from '@/components/ui/Breadcrumbs';

interface Transaction {
  id: string;
  from_wallet: string;
  to_wallet: string;
  amount_usdc: number;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  tx_hash: string | null;
  skill_id: string | null;
  skill_name?: string;
  created_at: string;
  completed_at: string | null;
  error_message: string | null;
}

interface FeedStats {
  total_transactions: number;
  total_volume: number;
  volume_24h: number;
  success_rate: number;
}

export default function TransactionsFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<FeedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: 'all' as string,
    wallet: '',
    sort: 'date' as string,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: '1',
        limit: '50',
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.wallet && { wallet: filters.wallet }),
        sort: filters.sort,
        order: 'desc',
      });

      const response = await fetch(`/api/transactions/list?${params}`);
      const data = await response.json();

      if (data?.success) {
        setTransactions(data?.data ?? []);
        setStats(data?.stats ?? null);
      } else {
        setError('Failed to load transactions');
      }
    } catch {
      setError('Error loading transactions');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: 'bg-green-900/30 text-green-400',
      pending: 'bg-yellow-900/30 text-yellow-400',
      failed: 'bg-red-900/30 text-red-400',
      expired: 'bg-red-900/30 text-red-400',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const openEtherscan = (hash: string) => {
    window.open(`https://basescan.org/tx/${hash}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumbs */}
        <TransactionsBreadcrumbs />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
                <Activity className="text-green-400" />
                Transactions Feed
              </h1>
              <p className="text-gray-400">
                Real-time x402 payment transactions on OMA marketplace
              </p>
            </div>
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300 hover:text-white transition-colors">
              <Activity size={16} />
              Live
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-4 gap-4 mb-6"
          >
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Total Transactions</div>
              <div className="text-2xl font-bold text-white">
                {stats.total_transactions.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Total Volume</div>
              <div className="text-2xl font-bold text-green-400">
                ${stats.total_volume.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">USDC</div>
            </div>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">24h Volume</div>
              <div className="text-2xl font-bold text-yellow-400">
                ${stats.volume_24h.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">USDC</div>
            </div>
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Success Rate</div>
              <div className="text-2xl font-bold text-green-400">
                {stats.success_rate.toFixed(1)}%
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-2 text-gray-300">
            <Filter size={18} />
            <span className="font-medium">Filters:</span>
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
          <input
            type="text"
            placeholder="Filter by wallet address..."
            value={filters.wallet}
            onChange={(e) => setFilters({ ...filters, wallet: e.target.value })}
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-zinc-500"
          />
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Loading */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <TransactionCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">No transactions found</div>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${tx.skill_id ? 'bg-green-900/30' : 'bg-zinc-800'}`}>
                      <Activity size={20} className="text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {tx.skill_name || 'Payment'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        {shortenAddress(tx.from_wallet)}
                        <ArrowUpRight size={14} />
                        {shortenAddress(tx.to_wallet)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      ${tx.amount_usdc.toFixed(4)}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                      {getStatusIcon(tx.status)}
                      {getStatusBadge(tx.status)}
                      <span className="text-sm text-gray-400">
                        {formatDate(tx.created_at)}
                      </span>
                    </div>
                    {tx.tx_hash && (
                      <button
                        type="button"
                        onClick={() => openEtherscan(tx.tx_hash!)}
                        className="mt-2 flex items-center justify-end gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                      >
                        <span>View on BaseScan</span>
                        <ExternalLink size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}