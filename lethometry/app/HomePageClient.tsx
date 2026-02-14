'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Clock, Brain, Scale, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Memoria Design Tokens
import { colors, spacing, typography } from '../lib/memoria/tokens';

export default function HomePageClient() {
  const tools = [
    { title: 'Death Clock', description: 'Quantify your remaining temporal assets.', icon: Clock, link: '/clock' },
    { title: 'Memory Tools', description: 'Systems for long-term knowledge retention.', icon: Brain, link: '/memory' },
    { title: 'Philosophy', description: 'Stoic and Buddhist models of existence.', icon: Scale, link: '/philosophy' },
    { title: 'Bio-Metrics', description: 'Real-time physiological data analysis.', icon: Activity, link: '/bio' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-14 py-4 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link href="/" className="flex items-center gap-3 no-underline group" aria-label="Lethometry Home">
          <div className="w-8 h-8 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-border-active transition-colors">
            <Activity size={14} className="text-memoria-text-hero" />
          </div>
          <span className="text-lg font-normal text-memoria-text-hero tracking-tight">
            Lethometry
          </span>
        </Link>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            {['Clock', 'Memory', 'Experiments', 'About'].map(item => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero no-underline transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <Link href="/data" className="no-underline" aria-label="View Data">
            <span className="text-[11px] uppercase tracking-widest text-memoria-text-secondary hover:text-memoria-text-hero transition-colors">Data</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-48 pb-32 px-4 md:px-14 flex items-center min-h-[90vh]"
        aria-labelledby="hero-title"
      >
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
              Existential Quantification
            </Badge>
            <h1 
              id="hero-title"
              className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero"
            >
              Master Your<br/><span className="text-memoria-text-whisper italic">Lethos</span>
            </h1>
            <p className="text-lg md:text-xl text-memoria-text-whisper max-w-lg mb-12 font-light leading-relaxed">
              Scientific tools for quantifying life, death, and the intellectual structures that connect them.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-20">
              <Button 
                size="lg" 
                className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-12 h-16 text-base font-medium hover:bg-memoria-text-secondary transition-all"
                aria-label="Start quantifying your assets"
              >
                Start Quantifying
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-sm px-12 h-16 text-base font-medium border-memoria-border-default hover:bg-memoria-bg-surface transition-all"
              >
                Read Framework
              </Button>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-memoria-bg-surface blur-[120px] opacity-20 pointer-events-none" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
              <h2 className="sr-only">Available Tools</h2>
              {tools.map((tool, i) => (
                <Link key={tool.title} href={tool.link} className="no-underline group">
                  <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm h-full hover:border-memoria-border-active transition-all">
                    <CardHeader className="p-6">
                      <tool.icon className="h-6 w-6 text-memoria-text-whisper mb-6 group-hover:text-memoria-text-hero transition-colors" />
                      <CardTitle as="h2" className="text-xl font-normal text-memoria-text-hero font-display">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <p className="text-sm text-memoria-text-whisper font-light leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section 
        className="py-32 px-4 md:px-14 border-y border-memoria-border-muted bg-memoria-bg-card/30"
        aria-label="Active Network Metrics"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Active nodes', value: '1.2K' },
              { label: 'Total computations', value: '45.8M' },
              { label: 'Uptime', value: '99.99%' },
              { label: 'Network health', value: 'Optimal' }
            ].map(stat => (
              <div key={stat.label}>
                <span className="label-whisper block mb-2">{stat.label}</span>
                <div className="hero-number text-5xl md:text-6xl text-memoria-text-hero">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-20 px-4 md:px-14 bg-memoria-bg-ultra-dark"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-normal text-memoria-text-hero tracking-tight mb-2">Lethometry</span>
            <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
              © 2026 Lethometry • Systems of Quantification
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <Link href="/about" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">About</Link>
            <Link href="/contact" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Contact</Link>
            <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Privacy</Link>
            <Link href="/terms" className="text-[10px] uppercase tracking-widest text-memoria-text-meta hover:text-memoria-text-hero transition-colors no-underline">Terms</Link>
            <div className="flex gap-2 items-center ml-4">
              <div className="w-1.5 h-1.5 rounded-full bg-memoria-text-whisper" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
                Protocol v2.4.0
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
