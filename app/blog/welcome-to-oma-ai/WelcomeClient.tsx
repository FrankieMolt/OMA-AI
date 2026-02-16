'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WelcomeClient() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-memoria-text-whisper hover:text-white mb-10 transition-colors text-[10px] uppercase tracking-widest font-bold no-underline">
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Announcement
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[1.1] mb-10 font-display text-memoria-text-hero">
             Welcome to OMA-AI: The Future of <span className="text-memoria-text-secondary">API Commerce</span>
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>OMA-AI Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Feb 07, 2026</span>
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
                 "Today we're excited to announce OMA-AI — the first API marketplace built from the ground up for both humans AND AI agents."
              </p>

              <div className="space-y-12">
                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">01. Why OMA-AI?</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       The rise of autonomous AI agents has created a new paradigm in software development. Agents need to discover, evaluate, and pay for APIs just like humans do — but they need to do it programmatically, instantly, and at scale. Learn more about autonomous agents <a href="https://www.example.com/autonomous-agents" target="_blank" rel="noopener noreferrer" className="text-memoria-text-hero hover:underline">here</a>.
                    </p>
                    <p className="text-memoria-text-whisper font-light leading-relaxed">
                       Traditional API marketplaces weren't built for this reality. They require human interaction, manual key management, and monthly billing cycles that don't work for agents making thousands of micro-transactions.
                    </p>
                 </div>

                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">02. Enter x402 Payments</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       OMA-AI is powered by the x402 protocol — a standard for HTTP-native micropayments using stablecoins. When an agent (or human) wants to use an API:
                    </p>
                    <ul className="text-memoria-text-whisper font-light space-y-3 mb-6">
                       <li className="flex gap-4">
                          <span className="text-memoria-text-hero font-bold">A.</span>
                          <span>Discover the API in our marketplace</span>
                       </li>
                       <li className="flex gap-4">
                          <span className="text-memoria-text-hero font-bold">B.</span>
                          <span>Pay with USDC on Base, Ethereum, or Solana. Find out more about USDC on Base <a href="https://www.example.com/usdc-on-base" target="_blank" rel="noopener noreferrer" className="text-memoria-text-hero hover:underline">here</a>.</span>
                       </li>
                       <li className="flex gap-4">
                          <span className="text-memoria-text-hero font-bold">C.</span>
                          <span>Payment verified in milliseconds via smart contract</span>
                       </li>
                    </ul>
                    <p className="text-memoria-text-whisper font-light leading-relaxed">
                       No API keys. No monthly subscriptions. Just simple, per-request payments. Explore the x402 protocol <a href="https://x402.com" target="_blank" rel="noopener noreferrer" className="text-memoria-text-hero hover:underline">here</a>.
                    </p>
                 </div>

                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">03. Marketplace Launch</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       At launch, OMA-AI features over 22 APIs and MCP (Model Context Protocol) servers across core categories:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs uppercase tracking-widest font-bold text-memoria-text-meta">
                       <div className="p-4 bg-memoria-bg-card border border-memoria-border-muted rounded-sm">AI & Language Models</div>
                       <div className="p-4 bg-memoria-bg-card border border-memoria-border-muted rounded-sm">Data & Analytics</div>
                       <div className="p-4 bg-memoria-bg-card border border-memoria-border-muted rounded-sm">Blockchain Infrastructure</div>
                       <div className="p-4 bg-memoria-bg-card border border-memoria-border-muted rounded-sm">Agentic Toolsets</div>
                    </div>
                 </div>
              </div>

              <div className="mt-20 pt-12 border-t border-memoria-border-muted flex justify-between items-center">
                 <div className="flex gap-4">
                    <Button variant="outline" className="rounded-sm h-10 px-4 border-memoria-border-muted text-memoria-text-meta hover:text-white">
                       <Share2 size={14} className="mr-2" /> Share
                    </Button>
                    <Button variant="outline" className="rounded-sm h-10 px-4 border-memoria-border-muted text-memoria-text-meta hover:text-white">
                       <Bookmark size={14} className="mr-2" /> Save
                    </Button>
                 </div>
                 <Link href="/marketplace" className="no-underline">
                    <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                       Enter Marketplace
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
