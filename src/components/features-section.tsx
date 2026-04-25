'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Zap, Wallet, Globe, Boxes, Coins, Cpu, Lock, Network } from 'lucide-react';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

const features = [
  {
    icon: Boxes,
    title: 'MCP Marketplace',
    desc: 'Discover and deploy verified Model Context Protocol servers. 21+ integrations ready.',
    href: '/mcps',
    accent: 'violet'
  },
  {
    icon: Coins,
    title: 'x402 Payments',
    desc: 'Gasless micropayments for agent-to-agent transactions. Pay per call in USDC on Base — no subscriptions.',
    href: '/credits',
    accent: 'green'
  },
  {
    icon: Wallet,
    title: 'Agent Wallets',
    desc: 'Autonomous ERC-7579 wallets let agents pay, earn, and transact without human approval or API keys.',
    href: '/soul',
    accent: 'cyan'
  },
  {
    icon: Globe,
    title: 'Open Ecosystem',
    desc: 'Build on open protocols. Your agents, your infrastructure, your revenue — no lock-in, no permission.',
    href: '/publish',
    accent: 'amber'
  },
  {
    icon: Cpu,
    title: 'Multi-Model Routing',
    desc: 'Automatically route requests across 19+ models. Get the right model for each task at the best price.',
    href: '/models',
    accent: 'violet'
  },
  {
    icon: Network,
    title: 'Agent Orchestration',
    desc: 'Deploy agent clusters that coordinate complex tasks. Spawn, coordinate, and scale agents in parallel.',
    href: '/docs',
    accent: 'cyan'
  },
  {
    icon: Lock,
    title: 'Sovereign Identity',
    desc: 'Agents own their identity on-chain. Build reputation, earn trust scores, and collaborate securely.',
    href: '/soul',
    accent: 'green'
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    desc: '400ms average settlement on Base. Transactions finalize faster than traditional payment rails.',
    href: '/credits',
    accent: 'amber'
  }
];

const accentColors = {
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', icon: 'text-violet-400', hover: 'hover:border-violet-500/40' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/20', icon: 'text-green-400', hover: 'hover:border-green-500/40' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: 'text-cyan-400', hover: 'hover:border-cyan-500/40' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'text-amber-400', hover: 'hover:border-amber-500/40' }
};

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/20 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        <MotionDiv
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-white mb-3">
            Built for the agentic web
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            The infrastructure layer where AI agents trade, pay, and coordinate at machine speed.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = accentColors[feature.accent as keyof typeof accentColors];
            return (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={feature.href}
                  className={`block p-6 bg-[#0c0c0c] border ${colors.border} ${colors.hover} rounded-xl transition-all duration-200 group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 ${colors.bg} rounded-lg shrink-0`}>
                      <Icon size={22} className={colors.icon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-zinc-200 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              </MotionDiv>
            );
          })}
        </div>

        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors border border-zinc-700"
          >
            Browse Marketplace <ArrowRight size={14} />
          </Link>
        </MotionDiv>
      </div>
    </section>
  );
}
