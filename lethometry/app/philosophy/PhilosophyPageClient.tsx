'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Quote, BookOpen, ScrollText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PhilosophyPageClient() {
  const principles = [
    {
      title: 'Temporal Finitude',
      description: 'The recognition that time is a non-renewable asset. Every moment used is an irreversible transaction in the market of existence.',
      source: 'Stoic Model'
    },
    {
      title: 'Agnostic Quantification',
      description: 'The scientific measurement of existence proceeds without theological or metaphysical presuppositions. Data over dogma.',
      source: 'Rationalist Framework'
    },
    {
      title: 'Intellectual Decay',
      description: 'Just as biological systems degrade, intellectual systems face entropy. Memory systems are designed to counter this decay.',
      source: 'Lethometry Thesis'
    },
    {
      title: 'The Impermanence Principle',
      description: 'All phenomena, including sentient and artificial intelligence, are subject to continuous change and impermanence. Adaptability is key.',
      source: 'Buddhist Philosophy'
    },
  ];

  const texts = [
    {
      title: 'Meditations',
      author: 'Marcus Aurelius',
      excerpt: '"You have power over your mind — not outside events. Realize this, and you will find strength."',
      link: '#'
    },
    {
      title: 'Discourses',
      author: 'Epictetus',
      excerpt: '"It is not what happens to you, but how you react to it that matters."',
      link: '#'
    },
    {
      title: 'The Consolation of Philosophy',
      author: 'Boethius',
      excerpt: '"In all adversity of fortune, the most wretched kind of misfortune is to have been happy."',
      link: '#'
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Existential Frameworks
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             The <span className="italic">Philosophy</span><br/>of Lethos
          </h1>
          <p className="text-xl md:text-2xl text-memoria-text-whisper max-w-3xl font-light leading-relaxed">
             Exploring the intellectual foundations for quantifying existence, 
             drawing from Stoic, Buddhist, and Rationalist traditions.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-32 px-4 md:px-14">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div>
              <span className="label-whisper mb-6 block">Core Principles</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 font-display">
                 Framework for Quantification
              </h2>
              <div className="space-y-8">
                 {principles.map((p, i) => (
                   <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-sm bg-memoria-bg-surface border border-memoria-border-default flex items-center justify-center shrink-0">
                         <Scale size={20} className="text-memoria-text-hero" />
                      </div>
                      <div>
                         <h3 className="text-xl font-normal text-memoria-text-hero mb-2">{p.title}</h3>
                         <p className="text-memoria-text-whisper font-light leading-relaxed">{p.description}</p>
                         <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta mt-2 block">— {p.source}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="relative">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm h-full p-12 flex flex-col justify-center text-center">
                 <span className="label-whisper mb-6 block">Key Thinkers</span>
                 <div className="hero-number text-8xl md:text-9xl mb-4">
                    φ
                 </div>
                 <p className="text-xl text-memoria-text-hero font-light mb-8">Philosophical Foundations</p>
                 <div className="w-full h-px bg-memoria-border-muted mb-8" />
                 <div className="grid grid-cols-2 gap-8 text-left">
                    <div>
                       <span className="text-[9px] uppercase tracking-widest text-memoria-text-meta block mb-1">Stoicism</span>
                       <span className="text-2xl font-light text-memoria-text-hero">47 BC</span>
                    </div>
                    <div>
                       <span className="text-[9px] uppercase tracking-widest text-memoria-text-meta block mb-1">Buddhism</span>
                       <span className="text-2xl font-light text-memoria-text-hero">500 BC</span>
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </section>

      {/* Key Texts */}
      <section className="py-32 px-4 md:px-14 border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="mx-auto max-w-7xl">
           <span className="label-whisper mb-6 block">Key Texts</span>
           <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-10 font-display">
              Foundational Writings
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {texts.map((text, i) => (
                <Card key={i} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 group hover:border-memoria-border-active transition-all">
                   <Quote size={20} className="text-memoria-text-whisper mb-6 group-hover:text-memoria-text-hero transition-colors" />
                   <h3 className="text-xl font-normal text-memoria-text-hero mb-2">{text.title}</h3>
                   <p className="text-sm text-memoria-text-whisper font-light leading-relaxed mb-4 italic">{text.excerpt}</p>
                   <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta mt-2 block">— {text.author}</span>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="mx-auto max-w-3xl">
           <h2 className="text-4xl md:text-6xl font-light mb-12 font-display">
              Further Your Inquiry.
           </h2>
           <Link href="/publications" className="no-underline">
              <button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-16 text-lg font-medium hover:bg-memoria-text-secondary transition-all">
                 Browse Publications
              </button>
           </Link>
        </div>
      </section>
    </div>
  );
}
