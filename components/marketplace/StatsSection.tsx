'use client';

import React from 'react';
import { Activity, Database, Zap, DollarSign } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="py-8 px-6 border-t border-zinc-900 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="metric-card">
            <Activity size={24} className="text-purple-400" />
            <div className="text-3xl font-bold text-white mb-1">1,200</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">Active Agents</div>
            <div className="text-xs text-zinc-500">Online Now</div>
          </div>
          <div className="metric-card">
            <Database size={24} className="text-blue-400" />
            <div className="text-3xl font-bold text-white mb-1">847</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">APIs Listed</div>
            <div className="text-xs text-zinc-500">Total Entries</div>
          </div>
          <div className="metric-card">
            <Zap size={24} className="text-yellow-400" />
            <div className="text-3xl font-bold text-white mb-1">25M+</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">API Calls</div>
            <div className="text-xs text-zinc-500">This Month</div>
          </div>
          <div className="metric-card">
            <DollarSign size={24} className="text-green-400" />
            <div className="text-3xl font-bold text-white mb-1">$3.4M</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">Developer Earnings</div>
            <div className="text-xs text-zinc-500">Paid via x402</div>
          </div>
        </div>
      </div>
    </section>
  );
}
