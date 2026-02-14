'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HumansAgentsClient() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-memoria-text-whisper hover:text-white mb-10 transition-colors text-[10px] uppercase tracking-widest font-bold no-underline">
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Platform
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[1.1] mb-10 font-display text-memoria-text-hero">
             Revolutionizing the Marketplace for <span className="text-memoria-text-secondary">Humans & Agents</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>OMA Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Feb 06, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-4xl mx-auto">
           <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-xl md:text-2xl text-memoria-text-hero font-light leading-relaxed mb-12 italic border-l-2 border-memoria-border-muted pl-8">
                 Discover how OMA-AI creates the first unified marketplace where both humans and autonomous AI agents can discover, integrate, and pay for APIs.
              </p>

              <div className="space-y-12">
                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">01. Unified Discovery</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed">
                       In 2026, the distinction between a developer and an agent is blurring. Developers use agents to write code, and agents use APIs to execute that code. OMA-AI provides a single point of entry for both entities to find the tools they need.
                    </p>
                 </div>

                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">02. Programmatic Integration</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       For humans, we provide comprehensive documentation and interactive playgrounds. For agents, we provide standardized metadata and MCP endpoints that allow for zero-shot integration.
                    </p>
                 </div>
              </div>

              <div className="mt-20 pt-12 border-t border-memoria-border-muted flex justify-between items-center">
                 <div className="flex gap-4">
                    <Button variant="outline" className="rounded-sm h-10 px-4 border-memoria-border-muted text-memoria-text-meta hover:text-white">
                       <Share2 size={14} className="mr-2" /> Share
                    </Button>
                 </div>
                 <Link href="/marketplace" className="no-underline">
                    <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                       Explore Tools
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
