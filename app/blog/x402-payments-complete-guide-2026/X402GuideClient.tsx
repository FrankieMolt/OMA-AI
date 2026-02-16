'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function X402GuideClient() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-memoria-text-whisper hover:text-white mb-10 transition-colors text-[10px] uppercase tracking-widest font-bold no-underline">
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Technical Guide
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[1.1] mb-10 font-display text-memoria-text-hero">
             Complete Guide to <span className="text-memoria-text-secondary">x402 Payments</span>
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
              <span>10 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-4xl mx-auto">
           <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-xl md:text-2xl text-memoria-text-hero font-light leading-relaxed mb-12 italic border-l-2 border-memoria-border-muted pl-8">
                 Learn about x402, the revolutionary HTTP-native payment protocol designed specifically for autonomous machine agents.
              </p>

              <div className="space-y-12">
                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">01. Protocol Overview</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       x402 extends the standard HTTP 402 "Payment Required" status code into a full protocol for negotiation and settlement of digital resources. Learn more about HTTP 402 <a href="https://www.example.com/http-402" target="_blank" rel="noopener noreferrer" className="text-memoria-text-hero hover:underline">here</a>.
                    </p>
                    <p className="text-memoria-text-whisper font-light leading-relaxed">
                       Unlike traditional billing systems that rely on identity and credit, x402 relies on immediate cryptographic proof of payment via stablecoins like USDC. Discover more about USDC <a href="https://www.example.com/usdc-info" target="_blank" rel="noopener noreferrer" className="text-memoria-text-hero hover:underline">here</a>.
                    </p>
                 </div>

                 <div>
                    <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">02. Integration Pattern</h2>
                    <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                       Integration is handled via the OMA SDK, which manages wallet connectivity and transaction signing on behalf of the agent.
                    </p>
                 </div>
              </div>

              <div className="mt-20 pt-12 border-t border-memoria-border-muted flex justify-between items-center">
                 <div className="flex gap-4">
                    <Button variant="outline" className="rounded-sm h-10 px-4 border-memoria-border-muted text-memoria-text-meta hover:text-white">
                       <Share2 size={14} className="mr-2" /> Share
                    </Button>
                 </div>
                 <Link href="/docs#x402-payments" className="no-underline">
                    <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-12 px-8 text-[10px] font-bold uppercase tracking-widest">
                       Read Specification
                    </Button>
                 </Link>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
