import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'OMA-AI | AI Agents Pay for Tools with Crypto',
  description: 'The MCP marketplace powered by x402 micropayments. AI agents discover tools, connect in one click, and pay per call using USDC — no credit cards, no subscriptions.',
};

const MCPS = [
  { name: 'Helius Solana', desc: '8 tools', color: '#9945FF', bg: '#9945FF20' },
  { name: 'Jupiter DEX', desc: '3 tools', color: '#14F195', bg: '#14F19520' },
  { name: 'GitHub', desc: '4 tools', color: '#238636', bg: '#23863620' },
  { name: 'Web Search', desc: '2 tools', color: '#FF6B35', bg: '#FF6B3520' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            x402 payments live on Base network
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            AI agents that<br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              pay for tools
            </span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            OMA-AI is the MCP marketplace where AI agents discover tools, connect in one click, 
            and pay per call using USDC via x402. No API keys. No subscriptions. No friction.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/mcps" className="px-8 py-4 bg-violet-600 text-white text-lg font-semibold rounded-xl hover:bg-violet-500 transition-colors">
              Browse MCPs →
            </Link>
            <Link href="/docs" className="px-8 py-4 border border-zinc-700 text-zinc-300 text-lg font-medium rounded-xl hover:bg-zinc-900 transition-colors">
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* What is MCP */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What is an MCP?</h2>
          <p className="text-zinc-400 text-center mb-16 max-w-xl mx-auto">
            Model Context Protocol — the open standard that lets AI agents use tools like calculators, APIs, databases, and more.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🔍', title: 'Discover', desc: 'Browse verified MCPs — Solana data, GitHub, web search, and more. All tested and live.' },
              { icon: '⚡', title: 'Connect', desc: 'One click. Copy the JSON config, paste into Claude or Cursor. Done in 30 seconds.' },
              { icon: '💸', title: 'Pay', desc: 'Pay per call with USDC. No subscription. No API keys shared. Powered by x402.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured MCPs */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured MCPs</h2>
              <p className="text-zinc-400 mt-2">Running live. Ready to connect.</p>
            </div>
            <Link href="/mcps" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MCPS.map(({ name, desc, color, bg }) => (
              <Link key={name} href="/mcps"
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-3" style={{ backgroundColor: bg, color }}>
                  ◉
                </div>
                <h3 className="text-white font-medium mb-1">{name}</h3>
                <p className="text-zinc-500 text-xs mb-3">{desc}</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Built on x402 micropayments</h2>
          <p className="text-zinc-400 mb-12 max-w-lg mx-auto">
            The first payment standard designed for AI agents. Pay per call. No subscriptions. No credit cards.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: '$0.001', label: 'Average cost per MCP call' },
              { stat: '30 sec', label: 'Time to connect an MCP' },
              { stat: '8', label: 'Live MCPs ready now' },
            ].map(({ stat, label }) => (
              <div key={stat} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-3xl font-bold text-violet-400 mb-1">{stat}</div>
                <div className="text-zinc-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start in 30 seconds</h2>
          <p className="text-zinc-400 mb-8">No account required for free MCPs. Pay as you go for premium tools.</p>
          <Link href="/mcps" className="inline-block px-8 py-4 bg-violet-600 text-white text-lg font-semibold rounded-xl hover:bg-violet-500 transition-colors">
            Explore MCP Marketplace →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <span>OMA-AI © 2026</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
            <Link href="/docs" className="hover:text-zinc-300 transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
