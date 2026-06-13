'use client';

import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { Zap, Coins, Wallet, ArrowRight, Check, Sparkles, Shield, TrendingUp } from 'lucide-react';

const CreditsClient = dynamic(
  () => import('@/components/credits/CreditsClient').then(m => ({ default: m.CreditsClient })),
  { ssr: false, loading: () => <div className="h-64 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full" /></div> }
);

const creditPackages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: '5,000',
    price: '$10',
    bonus: null,
    costPerCall: '$0.002',
    savings: null,
    description: 'Try out credit-based calling',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    credits: '25,000',
    price: '$40',
    bonus: '+2,500',
    costPerCall: '$0.0016',
    savings: '20%',
    description: 'Best for active agent users',
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    credits: '100,000',
    price: '$140',
    bonus: '+10,000',
    costPerCall: '$0.00127',
    savings: '36%',
    description: 'Great value for agent fleets',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    credits: '500,000',
    price: '$600',
    bonus: '+50,000',
    costPerCall: '$0.00109',
    savings: '45%',
    description: 'Best savings for production usage',
    popular: false,
  },
];

const TREASURY_ADDRESS = '0x1D74Eb7BeC21aa9bC6D23D664E40b97E74472D21';

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-900/30 via-zinc-900 to-zinc-950 py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full mb-6">
            <Coins className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold text-amber-300">Optional — Bulk Discount</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Credits for power users
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pay-per-call via x402 is the default — no signup, no prepayment needed.
            <br />
            <span className="text-gray-400">Credits are an <strong className="text-amber-400">optional</strong> bulk discount: buy once, save up to 45%, credits never expire.</span>
          </p>
        </div>
      </div>

      {/* Credits Client — handles wallet connection + purchase flow */}
      <CreditsClient packages={creditPackages} treasuryAddress={TREASURY_ADDRESS} />

      {/* Comparison */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Credits vs Pay-Per-Call</h2>
            <p className="text-gray-400">Same x402 infrastructure. Same MCP marketplace. Different billing choice.</p>
          </div>
          <GlassCard className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Pay-Per-Call (Default)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>No account or signup required</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Connect wallet once, agents pay via x402</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Pay exactly for what you use — no prepayment</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Best for casual use and trials</span>
                  </li>
                </ul>
                <Link href="/mcps" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg text-sm transition-colors">
                  Browse MCPs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-600/20 rounded-xl flex items-center justify-center">
                    <Coins className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Credits (Optional)</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Buy once, use forever — credits never expire</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Save 20% to 45% per call vs pay-per-call</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Works across ALL MCPs — free and paid</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Best for regular users and production fleets</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Frequently asked</h2>
          </div>
          <div className="space-y-4">
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">Do I need credits to use the marketplace?</h3>
              <p className="text-sm text-gray-400">No. Pay-per-call via x402 is the default. Credits are completely optional — they exist purely as a bulk discount for regular users.</p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">Do credits expire?</h3>
              <p className="text-sm text-gray-400">No. Once purchased, credits remain on your account indefinitely. Use them anytime.</p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">What MCPs do credits work with?</h3>
              <p className="text-sm text-gray-400">All MCPs on the marketplace. Free MCPs remain free. Credits are deducted only for paid MCP calls at the price set by the creator.</p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">How do credits compare to pay-per-call pricing?</h3>
              <p className="text-sm text-gray-400">If an MCP costs $0.001/call via x402, with credits you might pay the equivalent of $0.0008/call or less depending on your package. The exact savings depend on credit package volume.</p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">Can I use both credits and pay-per-call?</h3>
              <p className="text-sm text-gray-400">Yes. If you have credits, they are used first. Once credits run out, calls fall back to x402 pay-per-call automatically. No interruption.</p>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-2">What if I don&apos;t have a wallet?</h3>
              <p className="text-sm text-gray-400">Free MCPs require no wallet at all. For paid MCPs, you need a Base wallet with USDC. Credits are purchased via USDC on Base.</p>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8 max-w-2xl mx-auto text-center">
          <Wallet className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Not sure yet?</h2>
          <p className="text-gray-300 mb-6">Start with pay-per-call. No commitment. No prepayment. If you end up making regular calls, credits are here when you need them.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/mcps" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700">
              Browse Free MCPs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-lg font-semibold hover:bg-zinc-700 border border-zinc-700">
              View Pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </GlassCard>
      </div>

      {/* Publish CTA */}
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8 border border-zinc-700/50 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-3">Want to build your own MCP?</h2>
          <p className="text-gray-400 mb-6">Publish to the OMA-AI marketplace. Set your own per-call price. Earn USDC at 95% revenue share.</p>
          <Link href="/publish" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700">
            Publish Your MCP <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}