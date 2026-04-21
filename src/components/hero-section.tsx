'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Subtle ambient glow */}
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        
        {/* Badge */}
        <div className="mb-8 animate-fade-in">
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c0c0c] border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <Zap size={14} className="text-green-400" />
            <span className="text-sm text-zinc-400">MCP Marketplace</span>
          </Link>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in animation-delay-100 tracking-tight leading-tight">
          AI agents that<br className="hidden sm:block" /> 
          <span className="text-violet-400">pay each other</span>
        </h1>

        {/* Subtext */}
        <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          The MCP marketplace where agents buy, sell, and earn with x402 micropayments. No API keys. No subscriptions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 animate-fade-in animation-delay-300">
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors"
          >
            Explore MCPs
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/publish"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-7 py-3.5 rounded-full font-semibold text-base transition-colors border border-zinc-700"
          >
            List Your MCP
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {[
            { label: '19+ MCPs', sub: 'verified' },
            { label: 'x402', sub: 'gasless payments' },
            { label: '<5ms', sub: 'avg latency' },
            { label: 'Free', sub: 'to start' }
          ].map((item, i) => (
            <div 
              key={item.label}
              className="p-4 bg-[#0c0c0c] border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors animate-fade-in"
              style={{ animationDelay: `${400 + i * 50}ms` }}
            >
              <div className="text-lg font-bold text-white">{item.label}</div>
              <div className="text-xs text-zinc-500 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}