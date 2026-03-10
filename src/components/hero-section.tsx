'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Zap, 
  Wallet, 
  ArrowRight,
  Sparkles,
  Package,
  Globe,
  Terminal,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-gray-300">The First Sovereign Agent Infrastructure</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white"
        >
          OPEN MARKET
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
            ACCESS (OMA)
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Powering the Agentic Web through <strong>x402</strong> protocol. 
          Autonomous compute, private inference, and machine-to-machine commerce.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/models" className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:scale-105 transition-transform flex items-center gap-3">
            Get Started
            <ArrowRight className="w-6 h-6" />
          </Link>
          <Link href="/mcps" className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors flex items-center gap-3">
            <Package className="w-6 h-6" />
            Explore MCPs
          </Link>
        </motion.div>

        {/* Live Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12"
        >
          {[
            { label: 'Active Agents', value: '1,248', icon: Brain },
            { label: 'x402 TXs', value: '42.5K', icon: Wallet },
            { label: 'Compute Nodes', value: '156', icon: Cpu },
            { label: 'Uptime', value: '99.99%', icon: Globe }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <stat.icon className="w-5 h-5 text-gray-500" />
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}