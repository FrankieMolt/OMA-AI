'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code2, MessageSquare, Users } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#12121f]">
      <div className="noise-overlay" />
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1e3f] via-[#12121f] to-[#0a0a14] opacity-90" />

        <div
          className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[15%] w-[600px] h-[600px] bg-gradient-to-r from-violet-600/15 to-fuchsia-600/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[60%] left-[60%] w-[400px] h-[400px] bg-gradient-to-r from-indigo-600/10 to-violet-600/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border border-violet-500/20 mb-10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-violet-200/80">Now with GPT-5 & Claude 4</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white"
        >
          <span className="block text-zinc-100">AI That Actually</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
              Works For You
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Build powerful AI applications without the complexity. 
          Access all major language models through one simple API—no configuration headaches, just results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/agentic-web"
            className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold text-base hover:from-violet-500 hover:to-fuchsia-500 transition-all duration-300 flex items-center gap-2.5 glow-violet hover:glow-amber"
          >
            <span>Explore Agentic Web</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/docs"
            className="px-8 py-4 glass-card text-zinc-300 border border-violet-500/20 rounded-full font-medium text-base hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
          >
            Start Building
          </Link>

          <Link
            href="/openrouter"
            className="px-6 py-4 glass-card text-zinc-300/60 border border-zinc-700/50 rounded-full font-medium text-sm hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
          >
            Models
          </Link>

          <Link
            href="/agents"
            className="px-6 py-4 glass-card text-zinc-300/60 border border-zinc-700/50 rounded-full font-medium text-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
          >
            AI Agents
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 pt-12 border-t border-white/[0.06]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, label: 'Trusted by developers at', value: '500+ companies' },
              { icon: Code2, label: 'Building with', value: '38+ AI models' },
              { icon: Users, label: 'Powered by', value: 'x402 protocol' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <stat.icon className="w-5 h-5 text-violet-400/60" />
                <div className="text-lg font-semibold text-zinc-200">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600"
      >
        <div className="w-6 h-10 rounded-full border border-zinc-700/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-zinc-500 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}