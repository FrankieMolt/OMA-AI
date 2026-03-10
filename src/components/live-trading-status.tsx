'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function LiveTradingStatus() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost:3008/');
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
        }
      } catch (err) {
        console.error('Failed to fetch trading status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !status) return null;

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h3 className="text-lg font-bold text-white">Live Agent Activity</h3>
        </div>
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Node: nosyt-trader-alpha
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="text-gray-500 text-xs mb-1 uppercase font-semibold">Portfolio Balance</div>
          <div className="text-2xl font-black text-white flex items-center gap-1">
            {status.solBalance?.toFixed(4)} <span className="text-emerald-400 text-sm font-bold">SOL</span>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="text-gray-500 text-xs mb-1 uppercase font-semibold">Active Positions</div>
          <div className="text-2xl font-black text-white">
            {Object.keys(status.positions || {}).length}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
          <div className="text-gray-500 text-xs mb-1 uppercase font-semibold">Daily Trades</div>
          <div className="text-2xl font-black text-white">
            {status.dailyTrades || 0}
          </div>
        </div>
      </div>

      {Object.keys(status.signals || {}).length > 0 && (
        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="text-gray-500 text-[10px] uppercase font-bold mb-3 tracking-wider text-center">Real-time Signals</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.entries(status.signals).map(([symbol, signal]: [string, any]) => (
              <div key={symbol} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 flex items-center gap-2">
                <span className="text-xs font-bold text-gray-300">{symbol}</span>
                {signal === 'BUY' ? (
                  <span className="text-[10px] font-black text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> BUY
                  </span>
                ) : signal === 'SELL' ? (
                  <span className="text-[10px] font-black text-rose-400 flex items-center gap-0.5">
                    <TrendingDown className="w-3 h-3" /> SELL
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-gray-500">HOLD</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}