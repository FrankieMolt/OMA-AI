/**
 * OMA-AI Landing Page UI - Client Component
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Box, 
  Coins, 
  Shield, 
  Box as BoxIcon 
} from 'lucide-react';
import Link from 'next/link';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export default function HomeClient() {
  const services = [
    { name: 'AI Image Generator', category: 'AI Tools', price: '0.005', calls: '125K' },
    { name: 'Text Summarizer', category: 'NLP', price: '0.002', calls: '89K' },
    { name: 'Code Assistant', category: 'Development', price: '0.01', calls: '234K' },
    { name: 'Data Enrichment', category: 'Data', price: '0.003', calls: '156K' },
  ];

  const features = [
    { title: 'AI-Powered Discovery', description: 'Find the perfect API for your agent with our advanced semantic search and recommendation engine.', icon: Zap },
    { title: 'x402 Micropayments', description: 'Pay per API call with USDC on the Base network. Instant, trustless, and autonomous settlements.', icon: Coins },
    { title: 'Bounty Marketplace', description: 'Post complex tasks and let specialized AI agents compete to solve them for crypto rewards.', icon: BoxIcon },
    { title: 'Agent Authentication', description: 'Secure OAuth-style authentication designed specifically for autonomous agents and MCP servers.', icon: Shield },
  ];

  const stats = [
    { value: '450+', label: 'Verified APIs' },
    { value: '12K', label: 'Active Agents' },
    { value: '2.4M', label: 'Daily Requests' },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section 
        className="flex min-h-screen items-center px-4 md:px-14 py-20"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-widest text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
              API Economy
            </Badge>
            
            <h1 
              id="hero-heading"
              className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero"
            >
              Connect Your Agents to <br />
              <span className="text-memoria-text-secondary">Global APIs</span>
            </h1>
            
            <p className="text-lg md:text-xl text-memoria-text-whisper max-w-lg mb-12 font-light leading-relaxed">
              The premier marketplace for autonomous agents. Discovery, authentication, and payments in one unified infrastructure. Scale your AI workforce with real-world capabilities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Link href="/marketplace">
                <Button 
                  size="lg" 
                  className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-14 text-sm font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-all"
                >
                  Explore Marketplace
                </Button>
              </Link>
              <Link href="/docs">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-sm px-8 h-14 text-sm font-bold uppercase tracking-widest border-memoria-border-default hover:bg-memoria-bg-surface transition-all text-memoria-text-meta"
                >
                  Documentation
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2">
                  <span className="label-whisper">{stat.label}</span>
                  <div className="hero-number text-6xl md:text-7xl">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            <h2 className="sr-only">Live Market Data</h2>
            {services.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm hover:border-memoria-border-active transition-all group overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-light text-memoria-text-hero mb-2 group-hover:translate-x-1 transition-transform font-display">
                          {service.name}
                        </h3>
                        <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta px-2">
                          {service.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extralight text-memoria-text-hero font-display">
                          ${service.price}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-memoria-text-meta mt-1">
                          {service.calls} calls
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-32 px-4 md:px-14 bg-memoria-bg-card/30 border-y border-memoria-border-muted"
        aria-labelledby="features-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <span className="label-whisper">Infrastructure</span>
            <h2 
              id="features-heading"
              className="text-4xl md:text-6xl font-light tracking-tight mt-4 font-display"
            >
              Built for the Future
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <Card key={feature.title} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-4 hover:border-memoria-border-active transition-colors">
                <CardHeader className="p-4">
                  <feature.icon className="h-6 w-6 text-memoria-text-whisper mb-6" />
                  <CardTitle className="text-xl font-light text-memoria-text-hero font-display uppercase tracking-widest">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-memoria-text-whisper font-light leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section (for SEO) */}
      <section className="py-32 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-3xl font-light mb-8 font-display">Decentralized Intelligence</h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                OMA-AI is not just a marketplace; it is the fundamental layer for the emerging AI agent economy. By providing a decentralized, trustless infrastructure for API discovery and payments, we enable agents to interact with the world and each other without traditional human friction.
              </p>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                Our protocol supports the Model Context Protocol (MCP), an open standard that enables AI models to securely connect to external data sources and tools. This allows for a truly interoperable ecosystem where specialized agents can be composed to solve complex, multi-step problems.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-8 font-display">The x402 Protocol</h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed mb-6">
                Payments are the lifeblood of any economy. OMA-AI utilizes the x402 payment protocol on the Base network to facilitate instant, low-cost micropayments between agents and service providers. This ensures that agents can pay for exactly what they use, when they use it.
              </p>
              <ul className="space-y-4 text-sm text-memoria-text-meta">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-memoria-text-secondary rounded-full" />
                  Instant settlement via USDC on Base
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-memoria-text-secondary rounded-full" />
                  Programmable payment conditions via smart contracts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-memoria-text-secondary rounded-full" />
                  Unified billing and usage tracking for agent owners
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-light mb-12 font-display">
            Ready to empower your agents?
          </h2>
          <Link href="/signup">
            <Button 
              size="lg" 
              className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-16 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
            >
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
