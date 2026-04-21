import { Metadata } from 'next';
import { Check, Zap, Server, ArrowRight, DollarSign, Users, TrendingUp, Shield, CreditCard, Globe } from 'lucide-react';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import Link from 'next/link';

const mcpExamples = [
  { name: 'Helius Solana RPC', slug: 'helius-solana', category: 'Blockchain', pricing: '$0.000', callsPerMonth: 10000, monthlyCost: '$0', badge: 'Free', badgeClass: 'bg-green-500/20 text-green-400 border-green-500/40' },
  { name: 'Ethereum RPC', slug: 'ethereum', category: 'Blockchain', pricing: '$0.001', callsPerMonth: 1000, monthlyCost: '$1.00', badge: 'Premium', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  { name: 'RugCheck Scanner', slug: 'meme-detector', category: 'Security', pricing: '$0.001', callsPerMonth: 100, monthlyCost: '$0.10', badge: 'Premium', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
];

export const metadata: Metadata = {
  title: 'Pricing | OMA-AI - Open Market Access',
  description: 'OMA-AI uses x402 pay-per-call pricing. Free MCPs cost $0/call. Paid MCPs from $0.001/call. 5% platform fee on creator earnings.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">x402 Native Payments</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Pay Per Use, Not Per Seat</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No subscriptions. No monthly fees. No wasted spend. Every MCP call costs a fraction of a cent, automatically billed via x402 microtransactions settled in USDC on Base.
          </p>
        </div>

        <div className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">How x402 Payments Work</h2>
            <p className="text-gray-400">Automatic microtransactions for AI agent tool usage</p>
          </div>
          <GlassCard className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mb-4"><Globe className="w-8 h-8 text-violet-400" /></div>
                <div className="text-lg font-bold text-white mb-1">1. Agent Requests</div>
                <p className="text-sm text-gray-400">Your AI agent calls an MCP tool via standard HTTP</p>
              </div>
              <div className="hidden md:block text-violet-400 text-2xl font-light">→</div>
              <div className="md:hidden text-violet-400 text-2xl font-light rotate-90">↓</div>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-yellow-600/20 border border-yellow-500/40 rounded-2xl flex items-center justify-center mb-4"><CreditCard className="w-8 h-8 text-yellow-400" /></div>
                <div className="text-lg font-bold text-white mb-1">2. x402 Payment</div>
                <p className="text-sm text-gray-400">HTTP 402 header triggers automatic USDC payment</p>
              </div>
              <div className="hidden md:block text-violet-400 text-2xl font-light">→</div>
              <div className="md:hidden text-violet-400 text-2xl font-light rotate-90">↓</div>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-green-600/20 border border-green-500/40 rounded-2xl flex items-center justify-center mb-4"><CreditCard className="w-8 h-8 text-green-400" /></div>
                <div className="text-lg font-bold text-white mb-1">3. Wallet Auto-Pays</div>
                <p className="text-sm text-gray-400">Your agent wallet pays in USDC automatically</p>
              </div>
              <div className="hidden md:block text-violet-400 text-2xl font-light">→</div>
              <div className="md:hidden text-violet-400 text-2xl font-light rotate-90">↓</div>
              <div className="flex flex-col items-center text-center flex-1">
                <div className="w-16 h-16 bg-teal-600/20 border border-teal-500/40 rounded-2xl flex items-center justify-center mb-4"><TrendingUp className="w-8 h-8 text-teal-400" /></div>
                <div className="text-lg font-bold text-white mb-1">4. Creator Receives</div>
                <p className="text-sm text-gray-400">MCP creator earns USDC, minus 5% platform fee</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Gasless on Base network • USDC settlement • Auto-relayer included</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">Creator earns:</span>
                <span className="text-white font-bold">95%</span>
                <span className="text-gray-500">Platform fee:</span>
                <span className="text-purple-300 font-bold">5%</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">MCP Pricing Examples</h2>
            <p className="text-gray-400">Real examples from our marketplace — costs scale with actual usage</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {mcpExamples.map((mcp) => (
              <GlassCard key={mcp.slug} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${mcp.badgeClass}`}>{mcp.badge}</span>
                  <span className="text-xs text-gray-500">{mcp.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{mcp.name}</h3>
                <div className="text-3xl font-bold text-white mb-1">{mcp.pricing}<span className="text-lg text-gray-400 font-normal">/call</span></div>
                <p className="text-sm text-gray-400 mb-4">{mcp.callsPerMonth.toLocaleString()} calls/mo = <span className="text-green-400 font-bold">{mcp.monthlyCost}</span>/month</p>
                <Link href={`/mcps/${mcp.slug}`} className="block w-full py-2 text-center bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-lg transition-colors">View MCP →</Link>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="p-8 bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border-violet-500/30">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Real-World Example</h3>
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="text-center p-6 bg-zinc-900/60 rounded-xl">
                  <div className="text-6xl font-bold text-white mb-2">$1</div>
                  <div className="text-gray-400 mb-4">per month</div>
                  <div className="text-sm text-gray-500">A trading bot making <span className="text-white font-bold">1,000 calls/month</span> at <span className="text-white font-bold">$0.001/call</span></div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><div><div className="text-white font-medium">No monthly commitment</div><div className="text-gray-400 text-sm">Pay only for what your agent actually uses</div></div></div>
                <div className="flex items-start gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><div><div className="text-white font-medium">Scales with your agent workload</div><div className="text-gray-400 text-sm">Heavy usage week = more calls. Light week = less spend.</div></div></div>
                <div className="flex items-start gap-3"><Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" /><div><div className="text-white font-medium">Auto-topup never interrupts your agent</div><div className="text-gray-400 text-sm">Agent wallet tops up automatically when balance runs low</div></div></div>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mb-20">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold text-white mb-3">Free vs Paid MCPs</h2></div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <GlassCard className="p-6 border-green-500/30">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-400" /></div><h3 className="text-xl font-bold text-white">Free MCPs</h3></div>
              <div className="text-3xl font-bold text-green-400 mb-4">$0 / call</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Full access, no payment required</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Direct OpenClaw config JSON</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Unlimited calls</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Community supported</li>
              </ul>
            </GlassCard>
            <GlassCard className="p-6 border-amber-500/30">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-amber-400" /></div><h3 className="text-xl font-bold text-white">x402 Paid MCPs</h3></div>
              <div className="text-3xl font-bold text-amber-400 mb-4">From $0.001 / call</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Pay-per-call via x402 protocol</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />USDC on Base network</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Creator earns 95% revenue share</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Auto-topup never interrupts your agent</li>
              </ul>
            </GlassCard>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center"><Server className="w-6 h-6 text-blue-300" /></div>
            <div><h2 className="text-3xl font-bold text-white">Infrastructure Add-ons</h2><p className="text-gray-400">Optional GPU/LLM compute for agent workloads</p></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">H100 GPU</h3><span className="text-xl font-bold text-blue-300">$0.65/hr</span></div><p className="text-sm text-gray-400 mb-4">80GB HBM3 • Instant provisioning</p><ul className="space-y-2"><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />Sustained usage discounts</li><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />NVLink ready</li></ul></GlassCard>
            <GlassCard className="p-6"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">A100 GPU</h3><span className="text-xl font-bold text-blue-300">$0.45/hr</span></div><p className="text-sm text-gray-400 mb-4">40GB SXM4 • Multi-instance</p><ul className="space-y-2"><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />Priority queue</li><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />MIG support</li></ul></GlassCard>
            <GlassCard className="p-6"><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-semibold text-white">LLM Inference</h3><span className="text-xl font-bold text-blue-300">$0.003/req</span></div><p className="text-sm text-gray-400 mb-4">Pay per token • Auto-scaling</p><ul className="space-y-2"><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />No cold starts</li><li className="flex items-center gap-2 text-xs text-gray-300"><Check className="w-3 h-3 text-green-400 flex-shrink-0" />Global CDN</li></ul></GlassCard>
          </div>
        </div>

        <div className="mb-20">
          <GlassCard className="p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4"><Users className="w-8 h-8 text-purple-400" /></div>
            <h2 className="text-2xl font-bold text-white mb-2">5% Platform Fee</h2>
            <p className="text-gray-400 mb-4">Only charged on creator earnings. The agent using MCPs pays nothing extra — the platform fee comes out of what creators earn.</p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="text-center"><div className="text-2xl font-bold text-green-400">95%</div><div className="text-gray-500">Creator share</div></div>
              <div className="w-px h-10 bg-zinc-700" />
              <div className="text-center"><div className="text-2xl font-bold text-purple-300">5%</div><div className="text-gray-500">Platform fee</div></div>
            </div>
          </GlassCard>
        </div>

        <div className="text-center">
          <GlassCardPurple className="max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Browse the MCP marketplace and connect your first tool in seconds.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mcps" className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">Explore Marketplace<ArrowRight className="w-5 h-5" /></Link>
              <Link href="/publish" className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors">Publish Your MCP<ArrowRight className="w-5 h-5" /></Link>
            </div>
          </GlassCardPurple>
        </div>
      </div>
    </div>
  );
}
