'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Brain, Heart, BookOpen, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Death Clock',
    description: 'Calculate your time remaining based on real life expectancy data from WHO and UN statistics.',
    highlight: 'Accurate & Personalized'
  },
  {
    icon: Brain,
    title: 'Memory Tools',
    description: 'Evidence-based techniques to improve memory retention and cognitive function.',
    highlight: 'Science-Backed'
  },
  {
    icon: Heart,
    title: 'Life Statistics',
    description: 'Track incredible stats: heartbeats, breaths taken, words spoken, and more.',
    highlight: 'Real-Time Counter'
  },
  {
    icon: BookOpen,
    title: 'Philosophy Section',
    description: 'Ancient wisdom on mortality awareness from Stoic and Buddhist traditions.',
    highlight: 'Mindfulness Practices'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data stays on your device. We use LocalStorage - nothing is sent to servers.',
    highlight: '100% Local'
  },
  {
    icon: Sparkles,
    title: 'Memory Visualization',
    description: 'Interactive canvas showing how memories fade across generations.',
    highlight: 'Scientifically Accurate'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Lethometry?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A mindful approach to understanding your time and preserving what matters most
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-700 hover:shadow-lg hover:shadow-slate-900/10 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                  <span className="text-emerald-400 text-xs font-medium uppercase tracking-wider">{feature.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
