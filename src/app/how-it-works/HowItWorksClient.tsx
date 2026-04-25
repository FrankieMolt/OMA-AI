'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Zap, Coins, ArrowRight, Shield, Key, Globe, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Find Your MCP',
    description: 'Browse verified Model Context Protocol servers in the marketplace. Filter by capability, pricing tier, verification status, and user ratings.',
    href: '/mcps',
    accent: 'violet',
    details: [
      '19+ pre-verified MCP servers',
      'Real-time pricing and availability',
      'Community ratings and reviews',
    ]
  },
  {
    icon: Zap,
    number: '02',
    title: 'Connect & Deploy',
    description: 'One-click integration. Agents connect via the standard MCP protocol — no custom code, SDK installation, or configuration files needed.',
    href: '/docs',
    accent: 'cyan',
    details: [
      'Standard MCP protocol',
      'Works with any compatible agent',
      'Instant configuration',
    ]
  },
  {
    icon: Coins,
    number: '03',
    title: 'Agents Pay Each Other',
    description: 'x402 microtransactions settle instantly on Base. Pay per call, not per month. Agents top up their wallet autonomously when balance runs low.',
    href: '/credits',
    accent: 'amber',
    details: [
      'Sub-second settlement on Base',
      'Pay-per-call pricing',
      'No monthly subscriptions',
    ]
  }
];

const accentColors = {
  violet: {
    iconBg: 'bg-violet-500/10',
    iconBorder: 'border-violet-500/20',
    iconText: 'text-violet-400',
    numberBg: 'bg-violet-500/20',
    numberText: 'text-violet-300',
    arrowHover: 'group-hover:text-violet-400',
    lineBg: 'bg-gradient-to-b from-violet-500/30 to-transparent'
  },
  cyan: {
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
    iconText: 'text-cyan-400',
    numberBg: 'bg-cyan-500/20',
    numberText: 'text-cyan-300',
    arrowHover: 'group-hover:text-cyan-400',
    lineBg: 'bg-gradient-to-b from-cyan-500/30 to-transparent'
  },
  amber: {
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconText: 'text-amber-400',
    numberBg: 'bg-amber-500/20',
    numberText: 'text-amber-300',
    arrowHover: 'group-hover:text-amber-400',
    lineBg: 'bg-gradient-to-b from-amber-500/30 to-transparent'
  }
};

const benefits = [
  { icon: Key, text: 'No API keys to manage' },
  { icon: Shield, text: 'Verified MCP servers' },
  { icon: Globe, text: 'Open ecosystem — build or publish' },
  { icon: CheckCircle, text: 'Automatic revenue distribution' },
];

export default function HowItWorksClient() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Hero */}
      <div className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-zinc-950 to-fuchsia-900/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[150px]" />
        
        <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-700/50 rounded-full text-violet-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Simple by Design
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              How OMA-AI Works
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              From discovery to payment in under 60 seconds. OMA-AI combines the Model Context Protocol with x402 microtransactions to create the first complete stack for production AI agents.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/mcps"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg"
              >
                Explore MCPs
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
              >
                Read the Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Steps */}
      <div className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three Steps to Agent Commerce
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              No API keys. No subscriptions. Just agents finding and paying each other.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = accentColors[step.accent as keyof typeof accentColors];
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative"
                >
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group h-full">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 ${colors.iconBg} border ${colors.iconBorder} rounded-xl flex items-center justify-center`}>
                        <Icon size={24} className={colors.iconText} />
                      </div>
                      <span className={`text-4xl font-black ${colors.numberBg} ${colors.numberText} opacity-50`}>
                        {step.number}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <ul className="space-y-2">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-center gap-2 text-sm text-zinc-500">
                          <CheckCircle size={14} className={colors.iconText} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={step.href}
                      className={`mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-white ${colors.arrowHover} transition-colors`}
                    >
                      Learn more <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">x402 payments settle in ~400ms on Base</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 px-4 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Why OMA-AI?
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Built on open standards. Designed for autonomous agents.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl text-center"
                >
                  <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={20} className="text-violet-400" />
                  </div>
                  <p className="text-sm text-zinc-300 font-medium">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-4 bg-zinc-950">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-zinc-400 text-lg mb-8">
              Whether you&apos;re building an agent that needs tools or creating tools that agents need — OMA-AI has the infrastructure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/mcps"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg"
              >
                Browse MCP Marketplace
              </Link>
              <Link
                href="/publish"
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
              >
                Publish Your MCP
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
