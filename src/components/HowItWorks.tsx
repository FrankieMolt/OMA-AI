'use client';

import { motion } from 'framer-motion';
import { Search, Zap, Coins, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Find Your MCP',
    description: 'Browse 19+ verified Model Context Protocol servers. Filter by capability, pricing, and reviews.',
    href: '/mcps',
    accent: 'violet'
  },
  {
    icon: Zap,
    number: '02',
    title: 'Connect & Deploy',
    description: 'One-click integration. Agents connect via standard MCP protocol — no custom code needed.',
    href: '/docs',
    accent: 'cyan'
  },
  {
    icon: Coins,
    number: '03',
    title: 'Agents Pay Each Other',
    description: 'x402 microtransactions settle instantly on Base. Pay per call, not per month.',
    href: '/credits',
    accent: 'amber'
  }
];

const accentColors = {
  violet: {
    iconBg: 'bg-violet-500/10',
    iconBorder: 'border-violet-500/20',
    iconText: 'text-violet-400',
    numberBg: 'bg-violet-500/20',
    numberText: 'text-violet-300',
    arrowHover: 'group-hover:text-violet-400',
    lineBg: 'bg-gradient-to-b from-violet-500/30 to-transparent'
  },
  cyan: {
    iconBg: 'bg-cyan-500/10',
    iconBorder: 'border-cyan-500/20',
    iconText: 'text-cyan-400',
    numberBg: 'bg-cyan-500/20',
    numberText: 'text-cyan-300',
    arrowHover: 'group-hover:text-cyan-400',
    lineBg: 'bg-gradient-to-b from-cyan-500/30 to-transparent'
  },
  amber: {
    iconBg: 'bg-amber-500/10',
    iconBorder: 'border-amber-500/20',
    iconText: 'text-amber-400',
    numberBg: 'bg-amber-500/20',
    numberText: 'text-amber-300',
    arrowHover: 'group-hover:text-amber-400',
    lineBg: 'bg-gradient-to-b from-amber-500/30 to-transparent'
  }
};

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
            <span className="text-xs text-zinc-400 uppercase tracking-widest">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            From discovery to payment<br className="hidden sm:block" /> in under 60 seconds
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            No API keys. No subscriptions. Just agents finding and paying each other.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Vertical connecting line */}
          <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = accentColors[step.accent as keyof typeof accentColors];
            
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative"
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-zinc-700 transition-colors group h-full">
                  {/* Step number + icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 ${colors.iconBg} border ${colors.iconBorder} rounded-xl flex items-center justify-center`}>
                      <Icon size={24} className={colors.iconText} />
                    </div>
                    <span className={`text-4xl font-black ${colors.numberBg} ${colors.numberText} opacity-50`}>
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  {/* CTA */}
                  <a 
                    href={step.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-white ${colors.arrowHover} transition-colors`}
                  >
                    Learn more <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">x402 payments settle in ~400ms on Base</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}