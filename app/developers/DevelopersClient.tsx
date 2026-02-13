'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  BookOpen, 
  Code, 
  Cpu, 
  ArrowRight, 
  Download, 
  Box,
  Github,
  Zap,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function DevelopersPage() {
  const sdkCode = `import { OMA } from '@oma-ai/sdk';\n\n// Initialize autonomous agent\nconst agent = new OMA({\n  apiKey: process.env.OMA_KEY,\n  network: 'base'\n});\n\n// 1. Discover service\nconst service = await agent.marketplace.find({\n  capability: 'image-generation',\n  maxPrice: 0.05\n});\n\n// 2. Execute & Pay (x402 auto-sign)\nconst result = await agent.execute(service.id, {\n  prompt: "A futuristic city on Mars"\n});`;

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
               Engineering
            </Badge>
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
               Build the<br/><span className="text-memoria-text-secondary">Agent Economy</span>
            </h1>
            <p className="text-xl text-memoria-text-whisper max-w-xl font-light leading-relaxed mb-10">
               Integrate x402 payments, discover services programmatically, and build self-sustaining agents with the OMA-AI SDK.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/docs" className="no-underline">
                <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-all">
                  <BookOpen size={16} className="mr-2" /> Documentation
                </Button>
              </Link>
              <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest">
                <Download size={16} className="mr-2" /> npm install @oma-ai/sdk
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-memoria-bg-surface border-b border-memoria-border-muted">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-memoria-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-memoria-border-default" />
                  <div className="w-2.5 h-2.5 rounded-full bg-memoria-border-default" />
                </div>
                <div className="text-[10px] text-memoria-text-meta font-mono tracking-widest ml-2 uppercase">agent.ts</div>
              </div>
              <CardContent className="p-6 bg-memoria-bg-ultra-dark">
                <pre className="text-xs font-mono text-memoria-text-hero leading-relaxed overflow-x-auto">
                  <code>{sdkCode}</code>
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-24 px-4 md:px-14 bg-memoria-bg-card/30 border-y border-memoria-border-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 hover:border-memoria-border-active transition-all">
              <div className="w-12 h-12 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center mb-8">
                <Code className="text-memoria-text-hero" size={24} />
              </div>
              <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">TypeScript Native</h3>
              <p className="text-sm text-memoria-text-whisper font-light leading-relaxed">
                Fully typed SDK with autocomplete support. Built for modern DX with zero-config setup.
              </p>
            </Card>
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 hover:border-memoria-border-active transition-all">
              <div className="w-12 h-12 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center mb-8">
                <Box className="text-memoria-text-hero" size={24} />
              </div>
              <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">MCP Standards</h3>
              <p className="text-sm text-memoria-text-whisper font-light leading-relaxed">
                First-class support for Model Context Protocol. Host your own MCP servers or consume existing ones.
              </p>
            </Card>
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 hover:border-memoria-border-active transition-all">
              <div className="w-12 h-12 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center mb-8">
                <Cpu className="text-memoria-text-hero" size={24} />
              </div>
              <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">Agent Ready</h3>
              <p className="text-sm text-memoria-text-whisper font-light leading-relaxed">
                Designed for autonomy. Built-in wallet management, budget controls, and safety limits.
              </p>
            </Card>
        </div>
      </section>

      {/* Resources */}
      <section className="py-32 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="label-whisper mb-4 block">Ecosystem</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight font-display text-memoria-text-hero">
                Developer Resources
              </h2>
            </div>
            <Link href="/docs" className="hidden md:flex items-center gap-2 text-memoria-text-whisper hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'API Reference', icon: <Terminal size={18} />, link: '/api-docs' },
              { title: 'SDK GitHub', icon: <Github size={18} />, link: 'https://oma-ai.com' },
              { title: 'MCP Servers', icon: <Zap size={18} />, link: '/marketplace' },
              { title: 'Webhooks', icon: <Globe size={18} />, link: '/docs#webhooks' }
            ].map((item, i) => (
              <Link key={i} href={item.link} className="no-underline">
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6 hover:border-white transition-all group">
                  <div className="text-memoria-text-meta group-hover:text-memoria-text-hero mb-4 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-memoria-text-hero font-bold text-sm uppercase tracking-widest">{item.title}</h4>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-12 font-display text-memoria-text-hero">
            Ready to Integrate?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/signup" className="no-underline">
                <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-16 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary">
                   Initialize API Key
                </Button>
             </Link>
             <Link href="https://oma-ai.com" target="_blank" className="no-underline">
                <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-10 h-16 text-xs font-bold uppercase tracking-widest">
                   <Github size={16} className="mr-2" /> View GitHub
                </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
