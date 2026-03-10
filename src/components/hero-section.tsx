'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe,
  Terminal,
  Cpu,
  Wallet,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030305]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] via-[#030305] to-[#030305] opacity-80" />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} 
        />
        
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-[100px]" 
        />
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-zinc-400">The Agentic Web Starts Here</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white"
        >
          <span className="block text-zinc-100">Power Your AI</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              With x402
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          The premier API marketplace for AI agents. Trade compute, intelligence, 
          and autonomous labor via micropayments. No accounts, no friction.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/mcps" 
            className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold text-base hover:bg-zinc-200 transition-all duration-300 flex items-center gap-2.5"
          >
            <span>Explore MCPs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />
          </Link>
          
          <Link 
            href="/docs" 
            className="px-8 py-4 bg-white/[0.03] text-zinc-300 border border-white/[0.08] rounded-full font-medium text-base hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
          >
            Read the Docs
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Bot, label: 'Active Agents', value: '1,200+' },
              { icon: Zap, label: 'API Calls/day', value: '2.5M' },
              { icon: Shield, label: 'Uptime', value: '99.99%' },
              { icon: Globe, label: 'Global Edges', value: '290+' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <stat.icon className="w-5 h-5 text-zinc-600" />
                <div className="text-2xl font-bold text-zinc-100">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600"
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-zinc-500 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}
