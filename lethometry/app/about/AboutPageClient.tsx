'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, BookOpen, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Scientific Manifesto
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             Quantifying the<br/><span className="italic">Human Experience</span>
          </h1>
          <p className="text-xl md:text-2xl text-memoria-text-whisper max-w-3xl font-light leading-relaxed">
             Lethometry is an interdisciplinary research platform dedicated to the measurement of existential variables. 
             Through rigorous quantification, we bridge the gap between biological reality and intellectual structures.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-4 md:px-14">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <span className="label-whisper mb-6 block">Core Principles</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 font-display">
                 The Metholodogy of Lethos
              </h2>
              <div className="space-y-8">
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-memoria-bg-surface border border-memoria-border-default flex items-center justify-center shrink-0">
                       <Activity size={20} className="text-memoria-text-hero" />
                    </div>
                    <div>
                       <h3 className="text-xl font-normal text-memoria-text-hero mb-2">Empirical Rigor</h3>
                       <p className="text-memoria-text-whisper font-light leading-relaxed">
                          Every existential variable is measurable. We use high-precision tools to quantify time, memory, and cognitive decay.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-memoria-bg-surface border border-memoria-border-default flex items-center justify-center shrink-0">
                       <Shield size={20} className="text-memoria-text-hero" />
                    </div>
                    <div>
                       <h3 className="text-xl font-normal text-memoria-text-hero mb-2">Ethical Neutrality</h3>
                       <p className="text-memoria-text-whisper font-light leading-relaxed">
                          Our research is guided by scientific objectivity. We observe the structures of existence without moral imposition.
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-sm bg-memoria-bg-surface border border-memoria-border-default flex items-center justify-center shrink-0">
                       <Globe size={20} className="text-memoria-text-hero" />
                    </div>
                    <div>
                       <h3 className="text-xl font-normal text-memoria-text-hero mb-2">Open Intelligence</h3>
                       <p className="text-memoria-text-whisper font-light leading-relaxed">
                          Knowledge is a global asset. All Lethometry data is published under open-access protocols for the collective advancement of the species.
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm h-full p-12 flex flex-col justify-center text-center">
                 <span className="label-whisper mb-6 block">Current Status</span>
                 <div className="hero-number text-8xl md:text-9xl mb-4">
                    Σ 42
                 </div>
                 <p className="text-xl text-memoria-text-hero font-light mb-8">Integrated Existential Index</p>
                 <div className="w-full h-px bg-memoria-border-muted mb-8" />
                 <div className="grid grid-cols-2 gap-8 text-left">
                    <div>
                       <span className="text-[9px] uppercase tracking-widest text-memoria-text-meta block mb-1">Active Nodes</span>
                       <span className="text-2xl font-light text-memoria-text-hero">1,248</span>
                    </div>
                    <div>
                       <span className="text-[9px] uppercase tracking-widest text-memoria-text-meta block mb-1">Total Assets</span>
                       <span className="text-2xl font-light text-memoria-text-hero">4.2M</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="mx-auto max-w-3xl">
           <h2 className="text-4xl md:text-6xl font-light mb-12 font-display">
              Join the Quantification.
           </h2>
           <Link href="/experiments" className="no-underline">
              <button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-16 text-lg font-medium hover:bg-memoria-text-secondary transition-all">
                 Participate in Research
              </button>
           </Link>
        </div>
      </section>
    </div>
  );
}
