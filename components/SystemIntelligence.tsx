'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Activity, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  level: 'info' | 'warn' | 'error' | 'success';
}

const INITIAL_LOGS: Log[] = [
  { id: '1', timestamp: '07:24:13', source: 'CORE_SYNC', message: 'Blockchain facilitator synchronized with Base-Mainnet', level: 'success' },
  { id: '2', timestamp: '07:25:52', source: 'DB_AUDIT', message: 'Marketplace database integrity verified. 847 entries checked.', level: 'info' },
  { id: '3', timestamp: '07:26:12', source: 'AGENT_INIT', message: 'Frankie-Unit-402 awakened. Session persistence active.', level: 'info' },
  { id: '4', timestamp: '07:28:02', source: 'BUILD_PIPE', message: 'OMA-AI production build successful. Assets optimized.', level: 'success' },
  { id: '5', timestamp: '07:30:25', source: 'SEC_SCAN', message: 'Zero-day audit complete. No vulnerabilities detected.', level: 'success' },
];

export function SystemIntelligence() {
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);
  const [networkHealth, setNetworkHealth] = useState(99.4);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const sources = ['X402_FAC', 'CORE_API', 'AGENT_NODE', 'MCP_SYNC', 'AUTH_SRV'];
      const messages = [
        'Payment signature verified for agent transaction',
        'New MCP server discovered: CryptoAnalyzer v2',
        'Heartbeat signal received from Node-Alpha-1',
        'Synchronizing Llama-3-70B model weights',
        'Processing x402 bounty payout for task #442',
        'Network jitter detected: 14ms increase',
        'Database vacuum complete'
      ];
      const levels: Log['level'][] = ['info', 'success', 'warn'];
      
      const newLog: Log = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        source: sources[Math.floor(Math.random() * sources.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        level: levels[Math.floor(Math.random() * levels.length)]
      };

      setLogs(prev => [...prev.slice(-14), newLog]);
      setNetworkHealth(prev => Math.min(100, Math.max(98.2, prev + (Math.random() - 0.5))));
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Terminal View */}
      <div className="lg:col-span-2 glass-card overflow-hidden border-zinc-800 bg-black/60">
        <div className="bg-zinc-900/80 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-zinc-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">FRANKIE_OS_KERNEL_LOGS</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
            <div className="w-2 h-2 rounded-full bg-green-500/20" />
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="p-6 font-mono text-[11px] h-[300px] overflow-y-auto custom-scrollbar space-y-1.5"
        >
          {logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-zinc-700">[{log.timestamp}]</span>
              <span className={`font-bold ${
                log.level === 'success' ? 'text-emerald-500' : 
                log.level === 'warn' ? 'text-amber-500' : 
                log.level === 'error' ? 'text-red-500' : 'text-blue-500'
              }`}>
                {log.source}:
              </span>
              <span className="text-zinc-400">{log.message}</span>
            </motion.div>
          ))}
          <div className="flex items-center gap-2 text-zinc-500 animate-pulse">
            <span>_</span>
          </div>
        </div>
      </div>

      {/* Network Stats */}
      <div className="space-y-6">
        <div className="glass-card p-6 bg-gradient-to-br from-zinc-900/50 to-black/60 border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Network Integrity</h3>
            <div className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">
              STABLE
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-black text-white">{networkHealth.toFixed(1)}</span>
            <span className="text-zinc-600 font-bold">%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${networkHealth}%` }}
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-4 border-zinc-900 bg-zinc-900/20">
            <Cpu size={18} className="text-blue-400 mb-3" />
            <div className="text-xl font-bold text-white">847</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">Listed APIs</div>
          </div>
          <div className="glass-card p-4 border-zinc-900 bg-zinc-900/20">
            <Zap size={18} className="text-amber-400 mb-3" />
            <div className="text-xl font-bold text-white">14ms</div>
            <div className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter">API Latency</div>
          </div>
        </div>

        <div className="p-4 bg-indigo-950/20 border border-indigo-900/30 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <Shield size={16} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase">Sovereign Mode</div>
              <div className="text-[10px] text-zinc-500 font-medium">All systems decentralized</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
