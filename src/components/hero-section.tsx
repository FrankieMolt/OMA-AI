'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Database, Zap, Users } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Minimal SSR placeholder - prevents layout shift
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#12121f]">
        <h1 className="sr-only">OMA-AI Premier MCP Marketplace</h1>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1e3f] via-[#12121f] to-[#0a0a14] opacity-90" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <div className="h-96 animate-pulse bg-zinc-800/20 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#12121f]">
      
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
            <span className="text-sm font-medium text-violet-200/80">OpenMarketAccess v1.0</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight text-white animate-fade-in animation-delay-100">
          <span className="block text-zinc-100">OpenMarketAccess</span>
          <span className="block mt-2">
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
              The Premier MCP Marketplace
            </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          Deploy production-ready AI agents instantly. Access 19+ MCP servers with gasless x402 payments - no API keys, no subscriptions, just compute.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in animation-delay-300">
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12121f]"
          >
            Explore MCP Marketplace
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 glass-card text-violet-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-violet-500/10 transition-all border border-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#12121f]"
          >
            View Pricing
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Database, title: 'MCP Integrations', desc: 'Connect agents to any service via Model Context Protocol' },
            { icon: Zap, title: 'x402 Payments', desc: 'Gasless microtransactions for autonomous agent commerce' },
            { icon: Users, title: 'Agent Economy', desc: 'Trade compute, intelligence, and labor in real-time' }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card border border-violet-500/10 rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">{feature.title}</h2>
                </div>
                <p className="text-zinc-400 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
