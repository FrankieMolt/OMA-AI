'use client';

import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface CoinPrice {
  usd: number;
  change_24h: number;
}

interface Prices {
  [coin: string]: CoinPrice;
}

function MarketSignalsInner() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('/api/crypto?coins=bitcoin,ethereum,solana');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.prices) {
            setPrices(data.prices);
            setLastUpdated(new Date().toLocaleTimeString());
          }
        }
      } catch {
        // Silent fail
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Market Signals</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-zinc-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!prices) return null;

  const coinData = [
    { symbol: 'bitcoin', name: 'BTC', label: 'Bitcoin' },
    { symbol: 'ethereum', name: 'ETH', label: 'Ethereum' },
    { symbol: 'solana', name: 'SOL', label: 'Solana' },
  ];

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">Market Signals</h2>
        </div>
        {lastUpdated && (
          <div className="text-[10px] font-mono text-zinc-500">
            Updated {lastUpdated}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coinData.map(({ symbol, name, label }) => {
          const price = prices[symbol];
          if (!price) return null;
          const isPositive = price.change_24h >= 0;
          return (
            <div
              key={symbol}
              className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/5 group hover:border-violet-500/20 transition-colors"
            >
              <div className="text-gray-400 text-[10px] mb-1 uppercase font-black tracking-tighter">{name}</div>
              <div className="text-2xl font-black text-white group-hover:text-violet-400 transition-colors">
                ${price.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={cn(
                "text-sm font-medium mt-1 flex items-center gap-1",
                isPositive ? "text-green-400" : "text-red-400"
              )}>
                <span>{isPositive ? '+' : ''}{price.change_24h.toFixed(2)}%</span>
                <span className="text-gray-500 text-xs font-normal">24h</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const MarketSignals = React.memo(MarketSignalsInner);
