'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, AlertCircle } from 'lucide-react';

interface CreditBalance {
  credits: number;
  bonusCredits: number;
  totalCredits: number;
  usedThisMonth: number;
  estimatedCost: string;
}

export function CreditDashboard() {
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/credits/balance', {
        headers: { 'X-API-Key': 'oma-demo' }
      });
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="animate-pulse">Loading credits...</div>
      </div>
    );
  }

  if (!balance) {
    return (
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-3 text-muted-foreground">
          <AlertCircle className="w-5 h-5" />
          <span>Unable to load credit balance</span>
        </div>
      </div>
    );
  }

  const percentage = (balance.totalCredits - balance.usedThisMonth) / balance.totalCredits * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Coins className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Credit Balance</h3>
            <p className="text-sm text-muted-foreground">Pay-as-you-go</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-500">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-background/50">
          <div className="text-sm text-muted-foreground mb-1">Available</div>
          <div className="text-3xl font-bold">{(balance.totalCredits - balance.usedThisMonth).toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">credits</div>
        </div>
        <div className="p-4 rounded-lg bg-background/50">
          <div className="text-sm text-muted-foreground mb-1">Used This Month</div>
          <div className="text-3xl font-bold">{balance.usedThisMonth.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">credits</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Usage</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          Buy Credits
        </button>
        <button className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all">
          View Usage
        </button>
      </div>
    </motion.div>
  );
}
