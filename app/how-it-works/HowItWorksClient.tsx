'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Zap,
  Code,
  Users,
  Shield,
  CheckCircle,
  ArrowRight,
  Database,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Explore the marketplace of APIs, MCP servers, and agent skills. Filter by performance and price.',
      icon: <Globe size={32} />
    },
    {
      step: '02',
      title: 'Simulation',
      description: 'Test API integrations directly in the sandbox before deploying your agent to production.',
      icon: <Zap size={32} />
    },
    {
      step: '03',
      title: 'Deployment',
      description: 'Generate unique API keys and deploy your autonomous agents with x402 payment support.',
      icon: <Code size={32} />
    }
  ];

  return (
    <div role="main" className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero */}
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Process
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
             System<br/><span className="text-memoria-text-secondary">Operation</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             The OMA-AI marketplace facilitates seamless commerce between human developers, API providers, and autonomous agents.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 md:px-14 border-y border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {steps.map((item, i) => (
                <div key={i} className="relative">
                   <div className="hero-number text-8xl md:text-9xl mb-8 opacity-20">
                      {item.step}
                   </div>
                   <div className="absolute top-24 left-0">
                      <div className="w-12 h-12 bg-memoria-bg-card border border-memoria-border-muted rounded-sm flex items-center justify-center mb-6">
                         <div className="text-memoria-text-hero">{item.icon}</div>
                      </div>
                      <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">
                         {item.title}
                      </h3>
                      <p className="text-sm text-memoria-text-whisper font-light leading-relaxed max-w-xs">
                         {item.description}
                      </p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-32 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 hover:border-memoria-border-active transition-all">
                 <div className="flex items-center gap-4 mb-8">
                    <Users size={32} className="text-memoria-text-hero" />
                    <h3 className="text-3xl font-light font-display text-memoria-text-hero">For Providers</h3>
                 </div>
                 <p className="text-memoria-text-whisper font-light leading-relaxed mb-10">
                    List your APIs and MCP servers to reach a global network of autonomous AI agents. Automated billing via x402.
                 </p>
                 <div className="space-y-4">
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Automated Revenue Stream
                    </div>
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Usage Analytics Dashboard
                    </div>
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Standardized MCP Hosting
                    </div>
                 </div>
              </Card>

              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 hover:border-memoria-border-active transition-all">
                 <div className="flex items-center gap-4 mb-8">
                    <Database size={32} className="text-memoria-text-hero" />
                    <h3 className="text-3xl font-light font-display text-memoria-text-hero">For Developers</h3>
                 </div>
                 <p className="text-memoria-text-whisper font-light leading-relaxed mb-10">
                    Empower your agents with specialized capabilities. Discovery and payment integration built-in.
                 </p>
                 <div className="space-y-4">
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Programmatic Discovery
                    </div>
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Pay-per-Call Integration
                    </div>
                    <div className="flex gap-3 text-xs text-memoria-text-meta uppercase tracking-widest">
                       <CheckCircle size={14} className="text-memoria-text-hero" /> Universal SDK Support
                    </div>
                 </div>
              </Card>
           </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-32 px-4 md:px-14 bg-memoria-bg-card/30 border-t border-memoria-border-muted">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <span className="label-whisper">Infrastructure</span>
               <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4 font-display text-memoria-text-hero">
                  The Protocol Layer
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-8 text-center border-r border-memoria-border-muted last:border-0">
                  <Wallet size={48} className="text-memoria-text-hero mx-auto mb-6" />
                  <h4 className="text-xl font-light mb-4 text-memoria-text-hero font-display">x402 Protocol</h4>
                  <p className="text-xs text-memoria-text-whisper leading-relaxed">Decentralized payment layer for instant settlement between agents and providers.</p>
               </div>
               <div className="p-8 text-center border-r border-memoria-border-muted last:border-0">
                  <Database size={48} className="text-memoria-text-hero mx-auto mb-6" />
                  <h4 className="text-xl font-light mb-4 text-memoria-text-hero font-display">MCP Standards</h4>
                  <p className="text-xs text-memoria-text-whisper leading-relaxed">Model Context Protocol integration for universal tool connectivity.</p>
               </div>
               <div className="p-8 text-center">
                  <Shield size={48} className="text-memoria-text-hero mx-auto mb-6" />
                  <h4 className="text-xl font-light mb-4 text-memoria-text-hero font-display">Agent Auth</h4>
                  <p className="text-xs text-memoria-text-whisper leading-relaxed">Secure OAuth flow designed specifically for autonomous machine entities.</p>
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-4 md:px-14 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero">
            Start Your Journey.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/marketplace" className="no-underline">
                <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-16 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary">
                   Browse Marketplace
                </Button>
             </Link>
             <Link href="/docs" className="no-underline">
                <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-10 h-16 text-xs font-bold uppercase tracking-widest">
                   Documentation
                </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
