import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { Zap, Wallet, ArrowRight, Globe, Box, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credits - OMA-AI Pay Per Call',
  description: 'Pay per call with x402. No subscriptions. Free MCPs available.',
  keywords: ['Credits', 'x402', 'MCP Pricing', 'Pay Per Call', 'USDC'],
};

const freeMCPs = [
  { name: 'Helius Solana RPC', description: 'Solana blockchain data, wallet balances, transactions' },
  { name: 'GitHub', description: 'Search repos, issues, PRs, file contents' },
  { name: 'SearXNG Search', description: 'Private, bias-free web search' },
  { name: 'Web Fetch', description: 'HTML, Markdown, JSON, YouTube transcripts' },
  { name: 'Filesystem', description: 'Read, write, and manage files' },
  { name: 'Docker', description: 'Manage containers, images, volumes' },
  { name: 'Memory MCP', description: 'Persistent memory for AI agents' },
  { name: 'Sequential Thinking', description: 'Multi-step structured reasoning' },
  { name: 'Alpha Vantage', description: 'Stocks, FX, crypto market data' },
];

const paidMCPs = [
  { name: 'Ethereum RPC', description: 'Ethereum mainnet via Alchemy', price: '$0.001/call' },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-900/50 via-zinc-900 to-zinc-950 py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-green-300" />
            <span className="text-sm font-semibold text-green-300">x402 Enabled</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Pay per call.<br />No subscriptions.</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">MCPs charge per API call, settled automatically in USDC via x402. Connect your wallet once and AI agents pay for what they use.</p>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-4">MCP Pricing</h2>
        <p className="text-gray-400 text-center mb-12">Most MCPs on OMA-AI are free. Paid MCPs charge only what you use.</p>

        {/* Free MCPs */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-green-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Free MCPs — $0 USDC per call
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {freeMCPs.map(mcp => (
              <GlassCard key={mcp.name} className="p-4">
                <h4 className="text-white font-semibold mb-1">{mcp.name}</h4>
                <p className="text-gray-400 text-sm">{mcp.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Paid MCPs */}
        <div>
          <h3 className="text-xl font-semibold text-amber-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            Paid MCPs — per-call pricing
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {paidMCPs.map(mcp => (
              <GlassCard key={mcp.name} className="p-4 border border-amber-500/20">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-white font-semibold">{mcp.name}</h4>
                  <span className="text-amber-400 font-bold text-sm">{mcp.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{mcp.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* How x402 Works */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">How x402 Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <Wallet className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">1. Connect Wallet</h3>
            <p className="text-gray-400">Link your self-sovereign wallet once. AI agents act on your behalf with your approval.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <Box className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">2. AI Agents Pay</h3>
            <p className="text-gray-400">When an agent calls an MCP, x402 automatically settles payment in USDC on Base — no human approval needed.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <CreditCard className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">3. Per-Call Billing</h3>
            <p className="text-gray-400">No credits to buy upfront, no monthly fees. Pay exactly what MCPs charge per call.</p>
          </GlassCard>
        </div>
      </div>

      {/* Wallet CTA */}
      <div className="container mx-auto px-4 pb-16">
        <GlassCard className="p-8 border-2 border-green-500/30 max-w-2xl mx-auto">
          <Globe className="w-12 h-12 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-6">Connect your wallet to access free MCPs or top up USDC for paid calls.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
            <Link href="/mcps" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 border border-zinc-700">
              Browse MCPs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Publish CTA */}
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8 border border-zinc-700/50 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-3">Want to build your own MCP?</h2>
          <p className="text-gray-400 mb-6">Publish your MCP to the OMA-AI marketplace. Set your own per-call price and get paid in USDC via x402.</p>
          <Link href="/publish" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700">
            Publish Your MCP <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
