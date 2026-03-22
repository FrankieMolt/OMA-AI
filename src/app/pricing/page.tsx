import { Metadata } from 'next';
import { PricingSection } from '@/components/pricing-section';
import { Check, X, Zap, Shield, Star, ArrowRight } from 'lucide-react';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Pricing | OMA-AI - Premier MCP Marketplace',
  description: 'Simple, transparent pricing for OMA-AI. Pay per call, no subscriptions. x402-powered payments on Base and Solana.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">x402 Gasless Payments</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pay per call. No subscriptions. No hidden fees. Our x402-powered treasury ensures you only pay for exactly what you use.
          </p>
        </div>

        {/* Pricing Section */}
        <PricingSection />

        {/* Feature Comparison */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Choose OMA-AI?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center hover">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Gasless Payments
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Zero gas fees with our x402 protocol. Sign once, pay nothing in gas.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                5% Platform Fee
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Lowest in the industry. Keep 95% of your earnings (vs 70-90% elsewhere).
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover">
              <div className="w-14 h-14 bg-amber-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Real MCPs
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Only production-ready, deployable MCPs. No fake or placeholder tools.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Platform Comparison
          </h2>
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-6 py-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center px-6 py-4">
                      <div className="inline-flex items-center gap-2">
                        <span className="text-purple-300 font-bold">OMA-AI</span>
                      </div>
                    </th>
                    <th className="text-center px-6 py-4 text-gray-400">RapidAPI</th>
                    <th className="text-center px-6 py-4 text-gray-400">Smithery.ai</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr>
                    <td className="px-6 py-4 text-white">Platform Fee</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-green-300 font-bold">5%</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">20-30%</td>
                    <td className="px-6 py-4 text-center text-gray-400">30%</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white">Gasless Payments</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white">Multi-Chain</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white">MCP Protocol</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 text-red-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-white">Monthly Cost</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-green-300 font-bold">$0</span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">$9-49</td>
                    <td className="px-6 py-4 text-center text-gray-400">$29+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">How does x402 gasless payments work?</h3>
              <p className="text-gray-300 leading-relaxed">
                x402 uses ERC-3009 on Base for gasless payments. You sign a transaction off-chain, and we relay it on-chain. You pay 0 gas fees.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">What's the payout threshold?</h3>
              <p className="text-gray-300 leading-relaxed">
                $10 USDC minimum. Payouts are processed monthly on the 1st of each month to your connected wallet.
              </p>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Can I change my pricing?</h3>
              <p className="text-gray-300 leading-relaxed">
                Yes! You can update your MCP pricing anytime from your dashboard. Changes apply to new calls immediately.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <GlassCardPurple className="max-w-4xl mx-auto p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers building the future of AI agents with OMA-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/mcps"
                className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
              >
                Browse MCPs
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/publish"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
              >
                Publish Your MCP
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </GlassCardPurple>
        </div>
      </div>
    </div>
  );
}
