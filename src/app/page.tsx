import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <span className="font-bold text-sm tracking-tighter text-white">OA</span>
          </div>
          <h1 className="text-xl font-medium tracking-wide">OMA-AI</h1>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Agents</a>
          <a href="#" className="hover:text-white transition-colors">Memory</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
        </nav>
        <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all duration-300 border border-white/10 hover:border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          Connect Wallet
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16 space-y-32">
        {/* Hero Section */}
        <div className="text-center space-y-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
          
          <h2 className="text-6xl md:text-8xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            The Agentic Web.
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Spawn autonomous sub-agents, execute cross-chain trading, and harness the intelligence of OpenClaw directly from your terminal.
          </p>
          
          <div className="pt-8 flex items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-full bg-white text-black font-semibold tracking-wide hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Spawn Agent
            </button>
            <button className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-semibold tracking-wide hover:bg-white/5 transition-colors duration-300">
              View Network
            </button>
          </div>
        </div>

        {/* Pricing / Monetization Section */}
        <div className="pt-12">
          <h3 className="text-3xl font-medium text-center mb-12">Compute & API Pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h4 className="text-xl font-semibold mb-2">Explorer</h4>
              <p className="text-3xl font-light mb-6">$0<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="space-y-3 text-gray-400 text-sm mb-8">
                <li>• 100 API Calls / month</li>
                <li>• Shared Conway Sandbox</li>
                <li>• Standard Node Routing</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">Current Plan</button>
            </div>
            
            {/* Pro Tier */}
            <div className="p-8 rounded-2xl border border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-sm relative">
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-purple-500 text-xs font-bold rounded-full">POPULAR</div>
              <h4 className="text-xl font-semibold mb-2">Autonomy</h4>
              <p className="text-3xl font-light mb-6">$25<span className="text-sm text-gray-500">/mo</span></p>
              <ul className="space-y-3 text-gray-400 text-sm mb-8">
                <li className="text-white">• Unlimited API Calls</li>
                <li className="text-white">• Dedicated Base VM</li>
                <li>• Fast x402 Route Execution</li>
                <li>• Priority Solana RPC access</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)]">Upgrade with USDC</button>
            </div>

            {/* Enterprise Tier */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h4 className="text-xl font-semibold mb-2">Sovereign</h4>
              <p className="text-3xl font-light mb-6">Custom</p>
              <ul className="space-y-3 text-gray-400 text-sm mb-8">
                <li>• Self-hosted OpenClaw Instance</li>
                <li>• White-label Domain</li>
                <li>• Direct MEV bot integration</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors">Contact Agents</button>
            </div>
          </div>
        </div>

        {/* Console / Status Mockup */}
        <div className="border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-xs text-gray-500 font-mono">system_status.md</span>
          </div>
          <div className="p-6 font-mono text-sm text-green-400/80 space-y-2">
            <p className="text-gray-500">$ openclaw status --verbose</p>
            <p>{'>'} Scanning nodes...</p>
            <p>{'>'} Nodes active: 5 (Real Site Builder, Conway Research, x402 Audit)</p>
            <p className="text-purple-400">{'>'} Neural routing stabilized at 12ms ping.</p>
            <p>{'>'} Awaiting command.</p>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </main>
    </div>
  );
}