import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'mint' | 'burn';
  amount: number;
  currency: string;
  from: string;
  to: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
}

interface EnhancedWalletProps {
  balances: {
    usdc: number;
    eth: number;
    sol: number;
  };
  transactions: Transaction[];
}

export default function EnhancedWallet({ balances, transactions }: EnhancedWalletProps) {
  const [filter, setFilter] = useState<'all' | 'send' | 'receive'>('all');
  const [view, setView] = useState<'overview' | 'transactions'>('overview');

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  const totalBalance = balances.usdc + (balances.eth * 3000) + (balances.sol * 150);

  const typeIcons = {
    send: '💸',
    receive: '💰',
    mint: '🪙',
    burn: '🔥'
  };

  const typeColors = {
    send: 'text-red-400',
    receive: 'text-green-400',
    mint: 'text-blue-400',
    burn: 'text-orange-400'
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 bg-gradient-to-br from-purple-600 to-blue-600"
      >
        <div className="text-purple-200 text-sm mb-2">Total Balance</div>
        <div className="text-5xl font-mono font-bold mb-4">
          ${totalBalance.toFixed(2)}
        </div>
        <div className="text-purple-200 text-sm">≈ ${totalBalance.toFixed(2)} USD</div>

        {/* Individual Balances */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-purple-200 text-xs mb-1">USDC</div>
            <div className="text-xl font-mono font-bold">{balances.usdc.toFixed(2)}</div>
            <div className="text-purple-300 text-xs">≈ ${balances.usdc.toFixed(2)}</div>
          </div>

          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-purple-200 text-xs mb-1">ETH</div>
            <div className="text-xl font-mono font-bold">{balances.eth.toFixed(4)}</div>
            <div className="text-purple-300 text-xs">≈ ${(balances.eth * 3000).toFixed(2)}</div>
          </div>

          <div className="bg-black/30 rounded-lg p-3">
            <div className="text-purple-200 text-xs mb-1">SOL</div>
            <div className="text-xl font-mono font-bold">{balances.sol.toFixed(4)}</div>
            <div className="text-purple-300 text-xs">≈ ${(balances.sol * 150).toFixed(2)}</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '📤', label: 'Send', action: 'send' },
          { icon: '📥', label: 'Receive', action: 'receive' },
          { icon: '🔄', label: 'Swap', action: 'swap' }
        ].map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 text-center hover:bg-white/10 transition-colors"
            onClick={() => console.log(item.action)}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <div className="font-bold">{item.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Transaction History</h3>
          <div className="flex gap-2">
            {(['all', 'send', 'receive'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded text-sm capitalize ${
                  filter === type
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <span className="text-4xl mb-2 block">📭</span>
                <p>No transactions</p>
              </div>
            ) : (
              filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{typeIcons[transaction.type]}</span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${typeColors[transaction.type]}`}>
                          {transaction.type === 'send' ? '-' : '+'}${transaction.amount.toFixed(2)}
                        </span>
                        <span className="text-gray-500">{transaction.currency}</span>
                      </div>

                      <div className="text-sm text-gray-400">
                        {transaction.description ||
                          `${transaction.type === 'send' ? 'To' : 'From'}: ${transaction.type === 'send' ? transaction.to : transaction.from}`}
                      </div>

                      <div className="text-xs text-gray-500">
                        {transaction.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      transaction.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.status}
                    </span>

                    <button className="text-gray-400 hover:text-white">
                      ⋮
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {filteredTransactions.length > 0 && (
          <button className="w-full mt-4 text-sm text-purple-400 hover:text-purple-300">
            Load more transactions →
          </button>
        )}
      </motion.div>

      {/* Spending Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-xl font-bold mb-4">This Month</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Received</div>
            <div className="text-2xl font-mono font-bold text-green-400">
              +${transactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Sent</div>
            <div className="text-2xl font-mono font-bold text-red-400">
              -${transactions.filter(t => t.type === 'send').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-black/30 rounded-lg p-4">
          <div className="text-gray-400 text-sm mb-1">Net Change</div>
          <div className={`text-2xl font-mono font-bold ${
            transactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0) >
            transactions.filter(t => t.type === 'send').reduce((sum, t) => sum + t.amount, 0)
              ? 'text-green-400'
              : 'text-red-400'
          }`}>
            {transactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0) >
            transactions.filter(t => t.type === 'send').reduce((sum, t) => sum + t.amount, 0)
              ? '+'
              : ''}${
              transactions.filter(t => t.type === 'receive').reduce((sum, t) => sum + t.amount, 0) -
              transactions.filter(t => t.type === 'send').reduce((sum, t) => sum + t.amount, 0)
            ).toFixed(2)}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
