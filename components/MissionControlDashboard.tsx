'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Zap, ShieldAlert, ChevronRight, Play, Square, Eye, Activity, TrendingUp, AlertTriangle, CheckCircle2, Users, Cloud, Map, Wifi, Battery, Cpu, ShoppingBag, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandEntry {
  cmd: string;
  output: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

export default function MissionControlDashboard() {
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'warning' | 'critical'>('optimal');
  const [selectedSector, setSelectedSector] = useState('all');
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([]);

  const sectors = [
    { id: 'oma', name: 'OMA-AI', status: 'online', load: 45, lastPing: '2ms', uptime: '99.9%' },
    { id: 'spend', name: 'SpendThrone', status: 'online', load: 12, lastPing: '45ms', uptime: '99.9%' },
    { id: 'molt', name: 'Molt Network', status: 'active', load: 0, lastPing: '0ms', uptime: '100%' }
  ];

  // Demo-only - remove in production
  const isDemo = true;

  const executeCommand = (cmd: string) => {
    const newEntry: CommandEntry = { 
      cmd, 
      output: `Executing: ${cmd}...`, 
      timestamp: new Date(), 
      status: Math.random() > 0.8 ? 'success' : 'warning'
    };
    setCommandHistory(prev => [newEntry, ...prev].slice(-50));
  };

  return (
    <div className="bg-zinc-950 text-zinc-200 p-4 md:p-8 font-mono selection:bg-emerald-500 selection:text-white rounded-2xl border border-zinc-800">
      <div className="max-w-7xl mx-auto">
        {/* Demo Banner */}
        {isDemo && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <span className="text-xs text-amber-500 uppercase tracking-wider font-semibold">Demo Mode</span>
              <span className="text-xs text-zinc-500">- This is a demonstration dashboard with sample data</span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-4">
            <Terminal size={32} className="text-purple-400" />
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter">MASTA CONTROL CENTER_V9.0</h1>
            <div className="hidden md:block text-xs text-zinc-500 uppercase tracking-widest">DO EVERYTHING MODE</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-500">{new Date().toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {/* OMA-AI Sector Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-blue-400" />
                <h3 className="text-base font-bold text-white">OMA-AI</h3>
                <span className={`text-xs font-bold uppercase tracking-widest ${sectors[0].status === 'online' ? 'text-emerald-400' : 'text-red-500'}`}>
                  {sectors[0].status === 'online' ? '● ONLINE' : '● OFFLINE'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500">Ping: {sectors[0].lastPing}</div>
                <div className="text-xs font-mono text-white">{sectors[0].uptime}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-zinc-500 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">System Integrity</div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                   <motion.div 
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="h-full bg-emerald-500"
                   />
                </div>
                <div className="text-xs text-zinc-400">Kernel v6.14.3-OMA</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-purple-400" />
                  <div>
                    <div className="text-xl font-bold text-white">1,247</div>
                    <div className="text-[10px] text-zinc-500">Active Agents</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-emerald-400" />
                  <div>
                    <div className="text-xl font-bold text-white">847</div>
                    <div className="text-[10px] text-zinc-500">Calls/hour</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button 
                  onClick={() => executeCommand('Restart OMA-AI Daemon')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all flex-1"
                >
                  Restart
                </button>
                <button
                  onClick={() => executeCommand('Clear OMA-AI Cache')}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all flex-1"
                >
                  Clear Cache
                </button>
              </div>
            </div>
          </div>

          {/* SpendThrone Sector Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-pink-500/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-pink-400" />
                <h3 className="text-base font-bold text-white">SpendThrone</h3>
                <span className={`text-xs font-bold uppercase tracking-widest ${sectors[1].status === 'online' ? 'text-emerald-400' : 'text-red-500'}`}>
                  {sectors[1].status === 'online' ? '● ONLINE' : '● OFFLINE'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500">Ping: {sectors[1].lastPing}</div>
                <div className="text-xs font-mono text-white">{sectors[1].uptime}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-zinc-500 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Inventory Status</div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                   <motion.div 
                        animate={{ width: '75%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="h-full bg-pink-500"
                   />
                </div>
                <div className="text-xs text-zinc-400">Products: Active</div>
              </div>

              <div className="text-sm text-zinc-500 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Virality Index</div>
                <div className="text-2xl font-bold text-white">94.2</div>
                <div className="text-[10px] text-zinc-500">Trend Score</div>
              </div>

              <div className="mt-4">
                <button 
                  onClick={() => executeCommand('Purge SpendThrone Products')}
                  className="bg-pink-600 hover:bg-pink-500 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all w-full"
                >
                  Purge Stale Data
                </button>
              </div>
            </div>
          </div>

          {/* Molt Network Sector Card */}
          <div className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl hover:border-purple-500/50 transition-all opacity-70">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Network size={18} className="text-purple-400" />
                <h3 className="text-base font-bold text-white">Molt Network</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">NEURAL NET</span>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-500">Status: <span className="text-emerald-400">CONNECTED</span></div>
                <div className="text-[10px] text-zinc-500">Peers: 4</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm text-zinc-500 mb-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Network Hashrate</div>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                   <motion.div 
                        animate={{ width: '92%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        className="h-full bg-purple-500"
                   />
                </div>
                <div className="text-xs text-zinc-400">92.4 PB/s</div>
              </div>
            </div>

            <div className="mt-4">
                <button 
                  onClick={() => executeCommand('Sync Network Config')}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all w-full"
                >
                  Sync Config
                </button>
              </div>
            </div>
          </div>

        {/* Command Terminal */}
        <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mt-6">
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-600">Terminal</span>
              <span className="text-xs text-zinc-500">DO_EVERYTHING_V9.0</span>
            </div>
            <div className="text-right text-xs font-mono text-zinc-500">
              <span className="animate-pulse">READY</span>
            </div>
          </div>

          {/* Command Output */}
          <div className="p-4 font-mono text-sm min-h-[150px] max-h-[300px] overflow-y-auto">
            <AnimatePresence mode="popLayout">
              {commandHistory.length === 0 ? (
                <div className="text-zinc-500">System idle. Awaiting command input...</div>
              ) : (
                <div className="space-y-2">
                  {commandHistory.slice().reverse().map((entry) => (
                    <motion.div
                      key={entry.timestamp.getTime()}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 mb-2"
                    >
                      <span className="text-xs text-zinc-500 font-mono w-20">{entry.timestamp.toLocaleTimeString()}</span>
                      <div className={`flex-1 flex items-center gap-3 ${
                        entry.status === 'success' ? 'text-emerald-400' : 'text-yellow-400'
                      }`}>
                        {entry.status === 'success' ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                        <span className="text-xs">{entry.output}</span>
                      </div>
                      <div className="ml-auto text-xs text-zinc-600">
                        {entry.status === 'success' ? '[SUCCESS]' : `[${entry.status.toUpperCase()}]`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
