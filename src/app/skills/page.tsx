import { Metadata } from 'next';
import { Brain, Sparkles, Code, Zap, Shield, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agent Skills | OMA-AI',
  description: 'Discover and deploy pre-built skills for AI agents on the OMA-AI marketplace.',
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-violet-500/20 mb-6">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300/80">Skills Marketplace</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Agent Skills</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Pre-built capabilities that extend AI agents with specialized functionality. Browse, install, and compose skills for your autonomous workflows.
          </p>
        </div>

        <div className="text-center py-20">
          <div className="inline-flex p-6 bg-violet-500/10 rounded-3xl mb-6">
            <Sparkles className="w-16 h-16 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Coming Soon</h2>
          <p className="text-zinc-400 max-w-md mx-auto mb-8">
            The Skills Marketplace is under active development. Publish and discover agent skills with one-click deployment and x402 payments.
          </p>
          <a href="/publish" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all">
            Publish a Skill <Zap className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { icon: Code, title: 'One-Click Install', desc: 'Add skills to any MCP-compatible agent with a single configuration line' },
            { icon: Shield, title: 'Verified & Audited', desc: 'Every skill is reviewed for security, performance, and reliability' },
            { icon: Search, title: 'Smart Discovery', desc: 'AI-powered search finds the perfect skill for your agent workflow' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-card rounded-2xl p-6">
                <div className="p-3 bg-violet-500/20 rounded-lg w-fit mb-4">
                  <Icon className="w-6 h-6 text-violet-400" />
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
