import { Metadata } from 'next';
import { Wallet, Sparkles, Shield, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agent Wallets | OMA-AI',
  description: 'Autonomous wallets for AI agents — earn, spend, and transact on-chain.',
};

export default function SoulPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 mb-6">
            <Wallet className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-violet-300/80">Agent Identity</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Agent Wallets</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Every AI agent needs a wallet. OMA-AI provides autonomous, self-custodial wallets that let agents earn, spend, and transact without human intervention.
          </p>
        </div>

        <div className="text-center py-20">
          <div className="inline-flex p-6 bg-amber-500/10 rounded-3xl mb-6">
            <Sparkles className="w-16 h-16 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            Create autonomous wallets for your AI agents with full on-chain capabilities and x402 payment integration.
          </p>
          <a href="/publish" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:from-amber-500 hover:to-orange-500 transition-all">
            Create Agent Wallet <Zap className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: Shield, title: 'Self-Custodial', desc: 'Agents hold their own keys — no custodian, no single point of failure' },
            { icon: Globe, title: 'Multi-Chain', desc: 'Support for Base, Ethereum, Solana, and more chains coming soon' },
            { icon: Zap, title: 'x402 Native', desc: 'Seamless integration with the x402 payment protocol for agent commerce' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="p-3 bg-amber-500/20 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
