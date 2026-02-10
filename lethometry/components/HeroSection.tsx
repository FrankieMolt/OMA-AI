'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Brain, Heart, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-8"
        >
          <Sparkles size={16} />
          <span className="font-medium">A Tool for Mindful Living</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight"
        >
          Know Your{' '}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Time
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Calculate your life expectancy, track your precious moments, 
          and discover tools to preserve what matters most.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Clock size={24} className="text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">Death Clock</div>
              <div className="text-sm">Time remaining</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Heart size={24} className="text-rose-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">Life Stats</div>
              <div className="text-sm">Moments lived</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Brain size={24} className="text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold">Memory Tools</div>
              <div className="text-sm">Preserve experiences</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
