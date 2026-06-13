'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Activity, Filter, ArrowUpRight, ExternalLink } from 'lucide-react';
import { TransactionCardSkeleton } from '@/components/loading/Skeletons';
import { TransactionsBreadcrumbs } from '@/components/ui/Breadcrumbs';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useAddressShortener } from '@/hooks/useAddressShortener';
import { useDateFormatter } from '@/hooks/useDateFormatter';

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

const ITEMS_PER_PAGE = 20;

export default function TransactionsFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<FeedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all' as string,
    wallet: '',
    sort: 'date' as string,
  });

  const fetchTransactions = useCallback(async (pageNum: number, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);
      setError(null);
      const params = new URLSearchParams({
        page: String(pageNum),
        limit: String(ITEMS_PER_PAGE),
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.wallet && { wallet: filters.wallet }),
        sort: filters.sort,
        order: 'desc',
      });
      const response = await fetch(`/api/transactions/list?${params}`);
      const data = await response.json();
      if (data?.success) {
        if (append) setTransactions(prev => [...prev, ...(data?.data ?? [])]);
        else setTransactions(data?.data ?? []);
        setStats(data?.stats ?? null);
        setHasMore(data?.pagination?.hasMore ?? false);
      } else {
        setError('Failed to load transactions');
      }
    } catch {
      setError('Error loading transactions');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters]);

  useEffect(() => { setPage(1); fetchTransactions(1); }, [fetchTransactions]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage, true);
  };

  const openEtherscan = (hash: string) => {
    window.open(`https://basescan.org/tx/${hash}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <TransactionsBreadcrumbs />
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2"><Activity className="text-green-400" />Transactions Feed</h1>
              <p className="text-gray-400">Real-time x402 payment transactions on OMA marketplace</p>
            </div>
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300 hover:text-white transition-colors min-h-[44px]"><Activity size={16} />Live<span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /></button>
          </div>
        </motion.div>
        {stats && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <StatCard label="Total Transactions" value={stats.total_transactions.toLocaleString()} />
            <StatCard label="Total Volume" value={`$${stats.total_volume.toFixed(2)}`} valueClass="text-green-400" subValue="USDC" />
            <StatCard label="24h Volume" value={`$${stats.volume_24h.toFixed(2)}`} valueClass="text-yellow-400" subValue="USDC" />
            <StatCard label="Success Rate" value={`${stats.success_rate.toFixed(1)}%`} valueClass="text-green-400" />
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col lg:flex-row gap-4">
          <div className="flex items-center gap-2 text-gray-300"><Filter size={18} /><span className="font-medium">Filters:</span></div>
          <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 min-h-[44px]"><option value="all">All Status</option><option value="completed">Completed</option><option value="pending">Pending</option><option value="failed">Failed</option><option value="expired">Expired</option></select>
          <select value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 min-h-[44px]"><option value="date">Sort by Date</option><option value="amount">Sort by Amount</option></select>
          <input type="text" placeholder="Filter by wallet address..." value={filters.wallet} onChange={(e) => setFilters({ ...filters, wallet: e.target.value })} className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-zinc-500 min-h-[44px]" />
        </motion.div>
        {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400">{error}</motion.div>}
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (<TransactionCardSkeleton key={i} />))}</motion.div>
        ) : transactions.length === 0 ? (
          <div className="flex items-center justify-center py-12"><div className="text-gray-400">No transactions found</div></div>
        ) : (
          <>
            <div className="space-y-3">{transactions.map((tx) => (<TransactionRow key={tx.id} tx={tx} onViewTx={openEtherscan} />))}</div>
            {hasMore && <div className="mt-8 flex justify-center"><button onClick={loadMore} disabled={loadingMore} className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 min-h-[44px]">{loadingMore ? 'Loading...' : 'Load More'}</button></div>}
            {!hasMore && transactions.length > 0 && <p className="mt-8 text-center text-gray-500 text-sm">No more transactions to load</p>}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, valueClass = 'text-white', subValue }: { label: string; value: string; valueClass?: string; subValue?: string }) {
  return (<div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl"><div className="text-sm text-gray-400 mb-1">{label}</div><div className={`text-xl md:text-2xl font-bold ${valueClass}`}>{value}</div>{subValue && <div className="text-xs text-gray-500">{subValue}</div>}</div>);
}

function TransactionRow({ tx, onViewTx }: { tx: Transaction; onViewTx: (hash: string) => void }) {
  const shortenAddress = useAddressShortener(tx.from_wallet);
  const shortenToAddress = useAddressShortener(tx.to_wallet);
  const formatDate = useDateFormatter(tx.created_at, 'relative');
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`p-2 rounded-lg ${tx.skill_id ? 'bg-green-900/30' : 'bg-zinc-800'}`}><Activity size={20} className="text-green-400" /></div>
          <div><div className="font-medium text-white">{tx.skill_name || 'Payment'}</div><div className="flex items-center gap-2 text-sm text-gray-400 font-mono">{shortenAddress}<ArrowUpRight size={14} />{shortenToAddress}</div></div>
        </div>
        <div className="text-left md:text-right">
          <div className="text-xl md:text-2xl font-bold text-white">${tx.amount_usdc.toFixed(4)}</div>
          <div className="flex items-center gap-2 mt-1"><StatusBadge status={tx.status} size="sm" /><span className="text-sm text-gray-400">{formatDate}</span></div>
          {tx.tx_hash && <button type="button" onClick={() => onViewTx(tx.tx_hash!)} className="mt-2 flex items-center justify-end gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"><span>View on BaseScan</span><ExternalLink size={14} /></button>}
        </div>
      </div>
    </motion.div>
  );
}
