import { Metadata } from 'next';
import { Cpu, Sparkles, DollarSign, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Models | OMA-AI',
  description: 'Access and resell language models with x402 micropayments on OMA-AI.',
};

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-violet-300/80">Model Marketplace</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AI Models</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Access premium language models through x402 micropayments. Pay only for what you use — no subscriptions, no API keys to manage.
          </p>
        </div>

        <div className="text-center py-20">
          <div className="inline-flex p-6 bg-cyan-500/10 rounded-3xl mb-6">
            <Sparkles className="w-16 h-16 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            Resell and access LLMs through our marketplace with per-token pricing and x402 settlement.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all">
            View Pricing <DollarSign className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: Zap, title: 'Pay Per Token', desc: 'Only pay for the tokens your agent actually uses, not flat monthly fees' },
            { icon: Cpu, title: '50+ Models', desc: 'Access models from OpenAI, Anthropic, Google, Meta, Mistral, and more' },
            { icon: DollarSign, title: 'Resell & Earn', desc: 'List your fine-tuned models and earn USDC from every inference call' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
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
