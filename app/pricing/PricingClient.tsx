/**
 * Pricing Page UI - Client Component
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Server,
  HelpCircle,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PricingClient() {
  const plans = [
    {
      name: 'Developer',
      price: '0',
      description: 'Perfect for building and testing your first autonomous agents.',
      features: [
        'Access to 450+ APIs',
        'Standard MCP Discovery',
        'Up to 1,000 requests/day',
        'x402 Micropayments enabled',
        'Community Support'
      ]
    },
    {
      name: 'Professional',
      price: '49',
      description: 'Advanced features for scaling production-grade agent networks.',
      features: [
        'Unlimited API Requests',
        'Priority MCP Discovery',
        'Advanced Analytics Dashboard',
        'Webhook Integration',
        '24/7 Priority Support',
        'Higher Gas Optimization'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Custom infrastructure and support for large-scale deployments.',
      features: [
        'Dedicated API Gateways',
        'Private MCP Registries',
        'Custom Smart Contract Logic',
        'SLA Guarantees',
        'Dedicated Account Manager',
        'White-glove Onboarding'
      ]
    }
  ];

  const faq = [
    {
      q: 'How do x402 micropayments work?',
      a: 'x402 allows your agent to pay for individual API calls using USDC on the Base network. Instead of a monthly subscription for every single tool, you pay exactly for what the agent consumes, settled instantly on-chain.'
    },
    {
      q: 'Can I combine plans?',
      a: 'Yes. Most users have a base Professional subscription for infrastructure and use x402 micropayments to cover variable costs for specialized third-party APIs.'
    },
    {
      q: 'Is there a limit on agents?',
      a: 'The Developer plan supports up to 5 active agents. Professional and Enterprise plans have no hard limit on the number of agents you can deploy.'
    }
  ];

  return (
    <div role="main" className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Network Economics
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
             Scale Your<br/><span className="text-memoria-text-secondary">Agent Workforce</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             Transparent pricing for a machine-to-machine economy. Combine traditional subscriptions 
             with decentralized micropayments.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <Card 
              key={plan.name} 
              className={`bg-memoria-bg-card border-memoria-border-muted rounded-sm flex flex-col p-10 transition-all hover:border-memoria-border-active relative overflow-hidden ${
                plan.popular ? 'ring-1 ring-memoria-text-secondary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-memoria-text-secondary text-white rounded-full text-[8px] font-bold uppercase tracking-widest px-2">Most Popular</Badge>
                </div>
              )}
              
              <div className="mb-10">
                <span className="label-whisper mb-2 block">{plan.name}</span>
                <div className="flex items-baseline gap-1">
                  <span className="hero-number text-6xl text-memoria-text-hero">
                    {plan.price === 'Custom' ? '' : '$'}
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && <span className="text-memoria-text-meta text-sm uppercase tracking-widest font-bold">/mo</span>}
                  {plan.price === 'Custom' && <span className="hero-number text-5xl text-memoria-text-hero">Custom</span>}
                </div>
              </div>

              <p className="text-memoria-text-whisper text-sm font-light leading-relaxed mb-10 flex-grow">
                {plan.description}
              </p>

              <div className="space-y-4 mb-10">
                {plan.features.map(feature => (
                  <div key={feature} className="flex items-start gap-3 text-xs text-memoria-text-meta">
                    <Check size={14} className="text-memoria-text-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full rounded-sm h-14 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  plan.popular 
                    ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark hover:bg-memoria-text-secondary' 
                    : 'bg-transparent border border-memoria-border-muted text-memoria-text-meta hover:text-white hover:border-memoria-border-default'
                }`}
              >
                Choose {plan.name}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Pay-as-you-go Section */}
      <section className="py-32 px-4 md:px-14 bg-memoria-bg-card/30 border-y border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="label-whisper mb-6 block">Decentralized Billing</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-8 font-display">
                Hybrid Micropayments
              </h2>
              <p className="text-lg text-memoria-text-whisper font-light leading-relaxed mb-6">
                OMA-AI introduces a hybrid model. Your subscription covers the core infrastructure, while 
                x402 micropayments allow your agents to pay for third-party services on-demand.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                 <div>
                    <div className="hero-number text-4xl mb-2 text-memoria-text-hero">0%</div>
                    <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">Transaction Fees</span>
                 </div>
                 <div>
                    <div className="hero-number text-4xl mb-2 text-memoria-text-hero">100ms</div>
                    <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">Settlement Time</span>
                 </div>
              </div>
            </div>
            
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-12">
               <h3 className="text-2xl font-light mb-8 font-display uppercase tracking-widest">Sample Usage</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-memoria-border-muted">
                     <span className="text-sm text-memoria-text-whisper">GPT-4o API Call</span>
                     <span className="text-sm font-bold text-memoria-text-hero font-mono">0.005 USDC</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-memoria-border-muted">
                     <span className="text-sm text-memoria-text-whisper">Brave Search Tool</span>
                     <span className="text-sm font-bold text-memoria-text-hero font-mono">0.002 USDC</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-memoria-border-muted">
                     <span className="text-sm text-memoria-text-whisper">Custom MCP Execution</span>
                     <span className="text-sm font-bold text-memoria-text-hero font-mono">0.001 USDC</span>
                  </div>
                  <div className="pt-4 flex justify-between items-center">
                     <span className="text-base font-bold text-memoria-text-hero uppercase tracking-widest">Total Agent Cost</span>
                     <span className="text-xl font-bold text-memoria-text-secondary font-mono">0.008 USDC</span>
                  </div>
               </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 px-4 md:px-14">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="label-whisper">Assistance</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight mt-4 font-display">FAQ</h2>
          </div>
          
          <div className="space-y-12">
            {faq.map((item, i) => (
              <div key={i}>
                <h4 className="text-xl font-normal text-memoria-text-hero mb-4 font-display uppercase tracking-widest">{item.q}</h4>
                <p className="text-memoria-text-whisper font-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
