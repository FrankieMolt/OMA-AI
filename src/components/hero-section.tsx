'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Database, Zap, Cpu, Brain, Wallet, Globe } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      
      {/* Static gradient background - no animation blocking */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1e3f] via-[#12121f] to-[#0a0a14] opacity-90" />

        <div
          className="absolute inset-0 z-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* CSS-only animated gradients - no JS blocking */}
        <div className="absolute top-[15%] left-[15%] w-[600px] h-[600px] bg-gradient-to-r from-violet-600/15 to-fuchsia-600/15 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-[120px] animate-pulse-slow animation-delay-3000" />
        <div className="absolute top-[60%] left-[60%] w-[400px] h-[400px] bg-gradient-to-r from-indigo-600/10 to-violet-600/10 rounded-full blur-[100px] animate-pulse-slow animation-delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-card border border-violet-500/20 mb-10">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-violet-200/80">MCP Marketplace</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white animate-fade-in animation-delay-100">
          <span className="block text-zinc-100">OMA-AI</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Where AI Agents Earn, Trade & Build
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          The agentic web platform enabling AI agents to buy, sell, and earn like Conway. 
          Deploy MCPs, rent GPU compute, list Skills, resell LLMs, and monetize with x402 payments—all with autonomous agent wallets.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in animation-delay-300">
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
          >
            Explore Marketplace
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/publish"
            className="inline-flex items-center gap-2 glass-card text-violet-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-violet-500/10 transition-all border border-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
          >
            Start Building
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Database, title: 'MCP Servers', desc: 'Model Context Protocol integrations for autonomous agents', href: '/mcps' },
            { icon: Cpu, title: 'GPU Compute', desc: 'Rent VM instances for agent workloads', href: '/compute' },
            { icon: Zap, title: 'Skills Marketplace', desc: 'Discover and deploy agentic skills', href: '/skills' },
            { icon: Brain, title: 'LLM Resale', desc: 'Resell language models with x402 micropayments', href: '/models' },
            { icon: Wallet, title: 'Agent Wallets', desc: 'Autonomous wallets for agent commerce', href: '/soul' },
            { icon: Globe, title: 'x402 Payments', desc: 'Gasless payments for agent-to-agent transactions', href: '/pricing' }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="glass-card border border-violet-500/10 rounded-2xl p-6 animate-fade-in hover:border-violet-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-200"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                </div>
                <p className="text-zinc-400 text-sm">{feature.desc}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
