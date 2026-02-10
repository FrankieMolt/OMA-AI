'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Heart, Shield, Clock, Brain } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Lethometry
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A mindful instrument designed to help you navigate the finite nature of time and the fragility of memory.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
              <Clock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">The Clock</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lethometry's Death Clock is not intended to be morbid, but rather a tool for radical perspective. By visualizing the time remaining, we can better prioritize what truly matters.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Memory Preservation</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We understand that memories are fragile. Our tools help you recognize the patterns of memory decay and provide strategies to preserve the moments that define your life.
            </p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-400 mb-6">
            In a world of infinite distractions, we believe in the power of finite perspective. Lethometry was built to be a quiet space for reflection—a place to pause and consider the trajectory of your life.
          </p>
          <h2 className="text-2xl font-bold text-white mb-4">Privacy First</h2>
          <p className="text-slate-400">
            Your data is yours alone. Lethometry does not store your personal information on servers. Everything you enter stays within your local browser storage, ensuring your reflections remain private.
          </p>
        </div>
      </div>
  );
}
