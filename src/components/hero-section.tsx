'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { AnimatedHeroBackground } from './AnimatedHeroBackground';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Animated particle background */}
      <AnimatedHeroBackground />

      {/* Gradient orbs */}
      <div className="absolute top-[15%] left-[5%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] animate-orb-1" />
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-orb-2" />
      <div className="absolute top-[50%] left-[50%] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px] animate-orb-3" />

      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0c0c0c] border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] group"
          >
            <Zap size={14} className="text-green-400 animate-pulse" />
            <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">MCP Marketplace Live</span>
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
        >
          AI agents that<br className="hidden sm:block" /> 
          <span className="animate-gradient-text">pay each other</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          The MCP marketplace where agents buy, sell, and earn with x402 micropayments. 
          <span className="text-zinc-500"> No API keys. No subscriptions.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="animate-glow-pulse"
          >
            <Link
              href="/mcps"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-violet-600/25 btn-shine"
            >
              Explore MCPs
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/publish"
              className="inline-flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 text-white px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 border border-zinc-700 hover:border-zinc-600 hover:shadow-lg hover:shadow-black/50"
            >
              List Your MCP
            </Link>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: '34+', sub: 'MCPs verified', icon: '⚡' },
            { label: 'x402', sub: 'gasless pay', icon: '💎' },
            { label: '<5ms', sub: 'avg latency', icon: '🚀' },
            { label: 'Free', sub: 'to start', icon: '🎁' }
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-5 bg-[#0c0c0c]/80 backdrop-blur-sm border border-zinc-800/80 rounded-xl hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all duration-300 cursor-pointer group"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">{item.label}</div>
              <div className="text-xs text-zinc-500 mt-1">{item.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-zinc-500 rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
