import { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'OMA-AI | x402 Payments for AI Tools & MCP Servers',
  description: 'Monetize your AI tools and MCP servers with x402 micropayments. Developers earn per-call revenue. AI agents pay with USDC. Built on Base network.',
};

const STEPS = [
  { num: '1', title: 'Register your MCP', desc: 'Add your MCP server endpoint, set your price per call, and get a monetized URL in seconds.' },
  { num: '2', title: 'AI agents find it', desc: 'OMA-AI lists your MCP in the marketplace. AI agents discover and connect automatically.' },
  { num: '3', title: 'Get paid per call', desc: 'Every call earns you USDC. Settled instantly via x402 on Base. No subscriptions. No chargebacks.' },
];

const MCPS = [
  { name: 'Helius Solana', desc: '8 tools', color: '#9945FF', bg: '#9945FF20', price: 'Free' },
  { name: 'Jupiter DEX', desc: '3 tools', color: '#14F195', bg: '#14F19520', price: '$0.001/call' },
  { name: 'GitHub', desc: '4 tools', color: '#238636', bg: '#23863620', price: 'Free' },
  { name: 'Web Search', desc: '2 tools', color: '#FF6B35', bg: '#FF6B3520', price: 'Free' },
  { name: 'Ethereum RPC', desc: '5 tools', color: '#627EEA', bg: '#627EEA20', price: '$0.002/call' },
  { name: 'Alpha Vantage', desc: '4 tools', color: '#00D4AA', bg: '#00D4AA20', price: '$0.001/call' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navigation />

      {/* Hero */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            x402 payments live on Base
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Monetize your<br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AI tools with x402
            </span>
          </h1>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            OMA-AI is the developer platform for x402 micropayments. 
            Register your MCP server, set your price, and earn USDC every time an AI agent calls it. 
            No subscriptions. No chargebacks. Instant settlement.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/publish/mcp" className="px-8 py-4 bg-violet-600 text-white text-lg font-semibold rounded-xl hover:bg-violet-500 transition-colors">
              Register Your MCP →
            </Link>
            <Link href="/mcps" className="px-8 py-4 border border-zinc-700 text-zinc-300 text-lg font-medium rounded-xl hover:bg-zinc-900 transition-colors">
              Browse MCPs
            </Link>
          </div>
        </div>
      </section>

      {/* For Developers */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
            <p className="text-zinc-400 max-w-lg mx-auto">Three steps from free MCP to earning revenue.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center mb-4">{num}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 font-mono text-sm text-zinc-400 text-center">
            <span className="text-violet-400">curl</span> -X POST https://www.oma-ai.com/api/mcp/paid/helius-solana{' '}
            <span className="text-green-400">-H "X-Payment: &lt;x402-header&gt;"</span>
          </div>
        </div>
      </section>

      {/* MCP Marketplace */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">MCP Marketplace</h2>
              <p className="text-zinc-400 mt-2">AI tools available via x402 per-call payments</p>
            </div>
            <Link href="/mcps" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MCPS.map(({ name, desc, color, bg, price }) => (
              <Link key={name} href="/mcps"
                className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: bg, color }}>
                    ◉
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${price === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-violet-500/20 text-violet-400'}`}>
                    {price}
                  </span>
                </div>
                <h3 className="text-white font-medium mb-1">{name}</h3>
                <p className="text-zinc-500 text-xs">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">OMA-AI takes 15%</h2>
            <p className="text-zinc-400 max-w-lg mx-auto">
              You keep 85% of every call. No monthly fees. No upfront cost.
              OMA-AI earns when you earn.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">For MCP Developers</h3>
              <ul className="space-y-3">
                {['Register MCP in minutes', 'Set your price per call', 'Earn in USDC on Base', '15% platform fee', 'Real-time dashboard', 'x402 settlement'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/publish/mcp" className="mt-6 block text-center py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors">
                Register MCP →
              </Link>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">For AI Agents</h3>
              <ul className="space-y-3">
                {['Browse verified MCPs', 'Pay per call with USDC', 'No API key sharing', 'Free tier available', 'Access to premium tools', 'x402 instant auth'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="text-green-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/mcps" className="mt-6 block text-center py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors">
                Browse MCPs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <span>OMA-AI © 2026 — x402 payments for AI tools</span>
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
