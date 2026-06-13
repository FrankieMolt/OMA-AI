import { Metadata } from 'next';
import { Check, Zap, ArrowRight, Shield, Globe, Coins } from 'lucide-react';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import Link from 'next/link';

const creditsPackages = [
  { credits: '5,000', price: '$10', bonus: null, costPerCall: '$0.002', savings: null },
  { credits: '25,000', price: '$40', bonus: '+2,500', costPerCall: '$0.0016', savings: '20%' },
  { credits: '100,000', price: '$140', bonus: '+10,000', costPerCall: '$0.00127', savings: '36%' },
  { credits: '500,000', price: '$600', bonus: '+50,000', costPerCall: '$0.00109', savings: '45%' },
];

export const metadata: Metadata = {
  title: 'Pricing | OMA-AI — Pay-Per-Call MCP Marketplace',
  description: 'Pay per MCP call. No subscription needed. BYOK key management included free.',
  keywords: ['MCP pricing', 'pay per call', 'credits', 'USDC', 'AI agent payments'],
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ========== HERO ========== */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-700/50 rounded-full mb-6">
            <Zap className="w-4 h-4 text-violet-300" />
            <span className="text-sm font-semibold text-violet-300">Pay-Per-Call</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple pricing.<br className="hidden sm:inline" /> No subscription.
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect your API keys to MCP tools and pay per call.
            <br />
            <span className="text-gray-500">No account needed. BYOK key management is included free.</span>
          </p>
        </div>

        {/* ========== HOW IT WORKS ========== */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">How it works</h2>
            <p className="text-gray-400">Three steps to start using MCP tools with your own API keys.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-400">1</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Add Your API Key</h3>
              <p className="text-sm text-gray-400">Go to Settings → API Keys and add your Helius, Alchemy, or other API keys. Keys are AES-256-GCM encrypted.</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-400">2</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Browse MCP Tools</h3>
              <p className="text-sm text-gray-400">Pick from 7 working MCPs — Solana RPC, Ethereum, GitHub, Alpha Vantage, Jupiter DEX, and more.</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="w-14 h-14 bg-violet-600/20 border border-violet-500/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-violet-400">3</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pay Per Call</h3>
              <p className="text-sm text-gray-400">Most MCPs are free. Paid ones cost from $0.001/call. Pay with USDC on Base.</p>
            </GlassCard>
          </div>
        </div>

        {/* ========== FREE VS PAID ========== */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-8"><h2 className="text-3xl font-bold text-white mb-3">Free vs Paid MCPs</h2></div>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 border-green-500/30">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-green-400" /></div><h3 className="text-xl font-bold text-white">Free MCPs</h3></div>
              <div className="text-3xl font-bold text-green-400 mb-4">$0 / call</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Free tier on all 7 working MCPs</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Bring your own API key (BYOK)</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Unlimited calls (rate limited per key)</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />AES-256-GCM encrypted key storage</li>
              </ul>
            </GlassCard>
            <GlassCard className="p-6 border-amber-500/30">
              <div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center"><Coins className="w-5 h-5 text-amber-400" /></div><h3 className="text-xl font-bold text-white">Paid MCPs</h3></div>
              <div className="text-3xl font-bold text-amber-400 mb-4">From $0.001 / call</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Ethereum RPC — $0.001/call</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />RugCheck Scanner — $0.001/call</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Overlay Protocol — $0.001/call</li>
                <li className="flex items-center gap-2 text-sm text-gray-300"><Check className="w-4 h-4 text-green-400 flex-shrink-0" />Pay with USDC on Base (coming soon)</li>
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* ========== SAVINGS TABLE ========== */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Credits = bulk savings</h2>
            <p className="text-gray-400">Optional credit packages for power users. Credits never expire.</p>
          </div>
          <GlassCard className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700 text-gray-400 text-left">
                  <th className="pb-3 pr-4 font-semibold">Credits</th>
                  <th className="pb-3 pr-4 font-semibold">Price</th>
                  <th className="pb-3 pr-4 font-semibold">Bonus</th>
                  <th className="pb-3 pr-4 font-semibold">Cost/Call</th>
                  <th className="pb-3 font-semibold text-amber-400">Savings</th>
                </tr>
              </thead>
              <tbody>
                {creditsPackages.map((pkg) => (
                  <tr key={pkg.credits} className="border-b border-zinc-800/50 text-white">
                    <td className="py-3 pr-4 font-bold">{pkg.credits}</td>
                    <td className="py-3 pr-4 font-mono">{pkg.price}</td>
                    <td className="py-3 pr-4 text-emerald-400">{pkg.bonus || '—'}</td>
                    <td className="py-3 pr-4 text-gray-400">{pkg.costPerCall}</td>
                    <td className="py-3 font-bold text-amber-400">{pkg.savings || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassCard>
          <p className="text-center text-gray-500 text-sm mt-4">
            Credits apply to paid MCPs. Buying credits is optional — free MCPs don&apos;t require any payment.
          </p>
        </div>

        {/* ========== WORKING MCPS ========== */}
        <div className="mb-24 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">Working MCPs</h2>
            <p className="text-gray-400">7 MCPs with active route handlers. Add your API key to enable each one.</p>
          </div>
          <GlassCard className="p-6">
            <div className="space-y-4">
              {[
                { name: 'Helius Solana RPC', status: 'Working', price: 'Free tier', key: 'Helius API Key' },
                { name: 'GitHub', status: 'Working', price: 'Free tier', key: 'GitHub Token' },
                { name: 'Ethereum RPC', status: 'Working', price: '$0.001/call', key: 'Alchemy API Key' },
                { name: 'Alpha Vantage', status: 'Working', price: 'Free tier', key: 'Alpha Vantage Key' },
                { name: 'SearXNG Search', status: 'Working', price: 'Free tier', key: 'Optional SearXNG key' },
                { name: 'Jupiter DEX', status: 'Working', price: 'Free tier', key: 'Optional Jupiter key' },
                { name: 'PumpFun Scanner', status: 'Working', price: 'Free tier', key: 'Helius API Key' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-white font-medium">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-400">{row.key}</span>
                    <span className="text-green-400 font-medium">{row.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <div className="text-center mt-4">
            <Link href="/settings/keys" className="text-sm text-violet-400 hover:text-violet-300">
              Add your API keys →
            </Link>
          </div>
        </div>

        {/* ========== CTA ========== */}
        <div className="text-center">
          <GlassCardPurple className="max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to start?</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">Browse the MCP marketplace. Add your API keys. Start making calls.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mcps" className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">Explore MCPs<ArrowRight className="w-5 h-5" /></Link>
              <Link href="/settings/keys" className="inline-flex items-center gap-2 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors">Add API Keys<ArrowRight className="w-5 h-5" /></Link>
            </div>
          </GlassCardPurple>
        </div>
      </div>
    </div>
  );
}
