import { Metadata } from 'next';
import { Cpu, Cloud, Zap, Shield, DollarSign, Server } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GPU Compute | OMA-AI',
  description: 'Deploy AI agents on decentralized and traditional GPU compute networks via OMA-AI.',
};

export default function ComputePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 mb-6">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-violet-300/80">Compute Network</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">GPU Compute</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Deploy agent workloads on decentralized GPU networks like Akash, or traditional clouds — all paid via x402 micropayments.
          </p>
        </div>

        <div className="text-center py-20">
          <div className="inline-flex p-6 bg-emerald-500/10 rounded-3xl mb-6">
            <Server className="w-16 h-16 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            Browse and deploy GPU instances for inference, training, and agent workloads with transparent per-hour pricing.
          </p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full font-semibold hover:from-emerald-500 hover:to-green-500 transition-all">
            Get Early Access <Cloud className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: Shield, title: 'Verified Providers', desc: 'All compute providers are vetted for uptime, security, and performance' },
            { icon: DollarSign, title: 'Transparent Pricing', desc: 'Compare GPU prices across networks with no hidden fees or lock-in contracts' },
            { icon: Zap, title: 'One-Click Deploy', desc: 'Deploy containers to any supported network from the OMA-AI dashboard' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-emerald-400" />
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
