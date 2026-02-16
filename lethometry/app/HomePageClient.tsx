'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Brain, Scale, ArrowRight, Sparkles, Timer, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function HomePageClient() {
  const tools = [
    { 
      title: 'Death Clock', 
      description: 'Calculate your remaining temporal assets based on actuarial data.', 
      icon: Timer, 
      link: '/clock',
      color: 'from-teal-400 to-cyan-500'
    },
    { 
      title: 'Memory Lab', 
      description: 'Scientific systems for long-term knowledge retention.', 
      icon: Brain, 
      link: '/memory',
      color: 'from-amber-400 to-orange-500'
    },
    { 
      title: 'Philosophy', 
      description: 'Stoic, Buddhist, and existential models of being.', 
      icon: Scale, 
      link: '/philosophy',
      color: 'from-purple-400 to-pink-500'
    },
    { 
      title: 'Experiments', 
      description: 'Cognitive and moral reasoning experiments.', 
      icon: Activity, 
      link: '/experiments',
      color: 'from-blue-400 to-indigo-500'
    },
  ];

  const stats = [
    { label: 'Years Quantified', value: '∞' },
    { label: 'Experiments', value: '5' },
    { label: 'Data Points', value: '1.2M' },
  ];

  return (
    <div className="min-h-screen">
      {/* Ambient Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-slate-900" />
            </div>
            <span className="text-xl font-semibold text-slate-100 tracking-tight">
              Lethometry
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {['Clock', 'Memory', 'Experiments', 'Philosophy'].map(item => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="nav-link"
              >
                {item}
              </Link>
            ))}
          </div>
          
          <Link href="/data" className="btn-secondary text-sm">
            View Data
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-300 font-medium">Existential Quantification</span>
            </div>
            
            {/* Main Title */}
            <h1 className="hero-title mb-6">
              Measure Your
              <br />
              <span className="letho-gradient-text">Existence</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Scientific tools for quantifying life, death, and the intellectual structures that connect them.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/clock" className="btn-primary flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Start Death Clock
              </Link>
              <Link href="/experiments" className="btn-secondary flex items-center gap-2">
                Explore Experiments
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold letho-gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-center text-slate-200 mb-4">
              Tools for the Examined Life
            </h2>
            <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
              Quantified approaches to mortality, memory, and meaning.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, i) => (
                <Link key={i} href={tool.link} className="tool-card group">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0`}>
                      <tool.icon className="w-6 h-6 text-slate-900" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-teal-300 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-teal-900/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-slate-900" />
            </div>
            <span className="text-sm text-slate-500">© 2026 Lethometry • Quantify Your Existence</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-slate-500 hover:text-teal-400 uppercase tracking-wider transition-colors">About</Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-teal-400 uppercase tracking-wider transition-colors">Contact</Link>
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-teal-400 uppercase tracking-wider transition-colors">Privacy</Link>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs text-slate-500 uppercase tracking-wider">All Systems Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
