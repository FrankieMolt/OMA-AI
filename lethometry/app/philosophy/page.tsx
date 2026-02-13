'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Quote, BookOpen, ScrollText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PhilosophyPage() {
  const principles = [
    {
      title: 'Temporal Finitude',
      description: 'The recognition that time is a non-renewable asset. Every moment used is an irreversible transaction in the market of existence.',
      source: 'Stoic Model'
    },
    {
      title: 'Cognitive Stewardship',
      description: 'The duty to manage one\'s mental architecture with the same rigor as financial or technical infrastructure.',
      source: 'Rationalist Model'
    },
    {
      title: 'Existential Neutrality',
      description: 'Observations without judgment. The ability to see biological and digital decay as natural state transitions.',
      source: 'Buddhist Model'
    }
  ];

  const quotes = [
    { text: "It is not that we have a short time to live, but that we waste a lot of it.", author: "Seneca" },
    { text: "Your days are numbered. Use them to throw open the windows of your soul to the sun.", author: "Marcus Aurelius" },
    { text: "Knowledge is the only asset that scales without physical limits.", author: "Anonymous" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Intellectual Structures
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             Wisdom<br/><span className="italic">Frameworks</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             A library of ancient and modern models for navigating existence. 
             Scientific Stoicism and Buddhist rationalism applied to the agentic era.
          </p>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-32 px-4 md:px-14">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
           {principles.map((p, i) => (
              <Card key={i} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 group hover:border-white transition-all">
                 <ScrollText size={32} className="text-memoria-text-meta mb-8 group-hover:text-white transition-colors" />
                 <span className="label-whisper mb-3 block">{p.source}</span>
                 <h2 className="text-3xl font-light tracking-tight mb-6 font-display text-white">{p.title}</h2>
                 <p className="text-memoria-text-whisper font-light leading-relaxed">{p.description}</p>
              </Card>
           ))}
        </div>
      </section>

      {/* Quotes Section */}
      <section className="py-32 px-4 md:px-14 bg-memoria-bg-card/30">
        <div className="mx-auto max-w-4xl">
           <span className="label-whisper mb-16 text-center block">Existential Echoes</span>
           <div className="space-y-24">
              {quotes.map((q, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                 >
                    <Quote size={40} className="mx-auto mb-10 text-memoria-text-meta opacity-20" />
                    <blockquote className="text-3xl md:text-5xl font-light tracking-tight leading-[1.2] font-display text-white mb-8 italic">
                       "{q.text}"
                    </blockquote>
                    <cite className="text-[10px] uppercase tracking-[0.3em] text-memoria-text-meta">— {q.author}</cite>
                 </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Recommended Reading */}
      <section className="py-32 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
           <div className="flex justify-between items-end mb-16">
              <div>
                 <span className="label-whisper mb-4 block">Research Repository</span>
                 <h2 className="text-4xl font-light font-display text-white">Recommended Reading</h2>
              </div>
              <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white">
                 View Full Library
              </Button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Meditations', author: 'Marcus Aurelius', year: '180 AD' },
                { title: 'Letters from a Stoic', author: 'Seneca', year: '65 AD' },
                { title: 'The Antidote', author: 'Oliver Burkeman', year: '2012' },
                { title: 'The Daily Stoic', author: 'Ryan Holiday', year: '2016' }
              ].map((book, i) => (
                 <Card key={i} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6 group hover:border-[#3a3a3a] transition-all cursor-pointer">
                    <BookOpen size={20} className="text-memoria-text-meta mb-4 group-hover:text-white transition-colors" />
                    <h3 className="text-lg font-light text-white mb-1">{book.title}</h3>
                    <p className="text-xs text-memoria-text-meta">{book.author} • {book.year}</p>
                 </Card>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
