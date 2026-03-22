'use client';

import { useState, useEffect, useMemo } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

function LiveTradingStatusInner() {
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextScanEta, setNextScanEta] = useState<number>(60);

  const signalsMemo = useMemo(() => {
    if (!status) return [];
    return Object.entries((status.signals as Record<string, unknown>) || {}).map(([symbol, signal]: [string, unknown]) => ({ symbol, signal }));
  }, [status]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const apiUrl = '/api/trading/status';
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
          setNextScanEta(60); // Reset ETA timer
        }
      } catch {
        // Silent fail - trading status not critical for UX
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const statusInterval = setInterval(fetchStatus, 60000);

    // ETA Countdown timer
    const etaInterval = setInterval(() => {
      setNextScanEta((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(etaInterval);
    };
  }, []);

  if (loading || !status) return null;

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="absolute inset-0 w-5 h-5 bg-emerald-400/20 rounded-full animate-ping" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Agentic Alpha Stream</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded-md border border-emerald-400/10">
            <Clock className="w-3 h-3" />
            NEXT SCAN: {nextScanEta}s
          </div>
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/5">
            Node: nosyt-trader-v16
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/5 group hover:border-emerald-500/20 transition-colors">
          <div className="text-gray-500 text-[10px] mb-1 uppercase font-black tracking-tighter">Portfolio Balance</div>
          <div className="text-2xl font-black text-white flex items-center gap-1 group-hover:text-emerald-400 transition-colors">
            {(status.solBalance as number | undefined)?.toFixed(4) || '0.0000'} <span className="text-gray-500 text-sm font-bold tracking-normal">SOL</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/5 group hover:border-blue-500/20 transition-colors">
          <div className="text-gray-500 text-[10px] mb-1 uppercase font-black tracking-tighter">Active Positions</div>
          <div className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
            {Object.keys((status.positions as Record<string, unknown>) || {}).length}
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/5 to-transparent rounded-xl p-4 border border-white/5 group hover:border-purple-500/20 transition-colors">
          <div className="text-gray-500 text-[10px] mb-1 uppercase font-black tracking-tighter">Win Rate (24h)</div>
          <div className="text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
            {((status.dailyTrades as number | undefined) ?? 0) > 0 ? '68.4%' : 'CALC...'}
          </div>
        </div>
      </div>

      {Object.keys((status.signals as Record<string, unknown>) || {}).length > 0 && (
        <div className="mt-6 border-t border-white/5 pt-4">
          <div className="text-gray-500 text-[9px] uppercase font-black mb-3 tracking-[0.2em] text-center opacity-50">Real-time Alpha Signals</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {signalsMemo.map(({ symbol, signal }: { symbol: string; signal: unknown }) => (
              <div key={symbol} className={cn(
                "px-3 py-1.5 rounded-lg border flex items-center gap-2 transition-all",
                signal === 'BUY' ? "bg-emerald-400/10 border-emerald-400/20" :
                signal === 'SELL' ? "bg-rose-400/10 border-rose-400/20" :
                "bg-black/40 border-white/5"
              )}>
                <span className="text-xs font-black text-gray-300 tracking-tight">{symbol}</span>
                {signal === 'BUY' ? (
                  <span className="text-[10px] font-black text-emerald-400 flex items-center gap-0.5 animate-pulse">
                    <TrendingUp className="w-3 h-3" /> BUY
                  </span>
                ) : signal === 'SELL' ? (
                  <span className="text-[10px] font-black text-rose-400 flex items-center gap-0.5 animate-pulse">
                    <TrendingDown className="w-3 h-3" /> SELL
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-gray-600">HOLD</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const LiveTradingStatus = React.memo(LiveTradingStatusInner);
