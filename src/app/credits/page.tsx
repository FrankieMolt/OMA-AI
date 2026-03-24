import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Wallet, Zap, CreditCard, Check, ArrowRight, Shield, DollarSign, Box, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buy Credits - OMA-AI Credits System',
  description: 'Buy credits for MCP calls and AI LLM usage. Pay with USDC via x402 or traditional methods.',
  keywords: ['Credits', 'Buy Credits', 'MCP Pricing', 'AI Credits'],
};

const packages = [
  { name: 'Starter', credits: 100, price: 10, bonus: 0, popular: false },
  { name: 'Basic', credits: 500, price: 45, bonus: 25, popular: false },
  { name: 'Pro', credits: 1000, price: 80, bonus: 100, popular: true },
  { name: 'Business', credits: 5000, price: 350, bonus: 500, popular: false },
  { name: 'Enterprise', credits: 10000, price: 650, bonus: 1500, popular: false },
];

const uses = [
  { name: 'Weather API', cost: '1 credit/call', icon: '🌤️' },
  { name: 'Crypto API', cost: '5 credits/call', icon: '💰' },
  { name: 'Search', cost: '10 credits/call', icon: '🔍' },
  { name: 'Embeddings', cost: '50 credits/call', icon: '🧠' },
  { name: 'AI Chat', cost: '100 credits/message', icon: '💬' },
  { name: 'GPU Compute', cost: '10 credits/minute', icon: '⚡' },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-green-900/50 via-zinc-900 to-zinc-950 py-20">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full mb-6">
            <CreditCard className="w-4 h-4 text-green-300" />
            <span className="text-sm font-semibold text-green-300">Credits System</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Buy Credits</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Power your AI agents with credits. Pay for MCP calls, LLM usage, and GPU compute.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {packages.map(pkg => (
            <GlassCard key={pkg.name} className={`p-6 text-center ${pkg.popular ? 'border-2 border-green-500' : ''}`}>
              {pkg.popular && (
                <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full mb-4">Most Popular</span>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-green-400 mb-1">${pkg.price}</div>
              <p className="text-gray-400 text-sm mb-4">{pkg.credits} credits {pkg.bonus > 0 && `+ ${pkg.bonus} bonus`}</p>
              <button className={`w-full py-2 rounded-lg font-medium ${pkg.popular ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'}`}>
                Buy Now
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-white text-center mb-8">How Credits Work</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <GlassCard className="p-6">
            <Box className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">1. Buy Credits</h3>
            <p className="text-gray-400">Purchase credits with USDC (x402) or traditional payment. Credits never expire.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <Zap className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">2. Use MCPs</h3>
            <p className="text-gray-400">When your AI agent calls an MCP, credits are automatically deducted.</p>
          </GlassCard>
          <GlassCard className="p-6">
            <Sparkles className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">3. AI Agents Pay</h3>
            <p className="text-gray-400">Autonomous agents can use credits without human approval. Perfect for workflows.</p>
          </GlassCard>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-8">Credit Costs</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {uses.map(use => (
            <GlassCard key={use.name} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{use.icon}</span>
                <span className="text-white font-medium">{use.name}</span>
              </div>
              <span className="text-green-400 font-medium">{use.cost}</span>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-8 border-2 border-green-500/30">
          <DollarSign className="w-12 h-12 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Pay with USDC</h2>
          <p className="text-gray-300 mb-6">Skip credit cards - pay directly with USDC on Base or Solana. AI agents can autonomously pay for calls!</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
            Connect Wallet <ArrowRight className="w-4 h-4" />
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
