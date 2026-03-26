'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  Zap,
  Crown,
  Building2,
  Check,
  Sparkles,
  Coins,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);
const MotionH2 = dynamic(
  () => import('framer-motion').then(m => m.motion.h2),
  { ssr: false }
);
const MotionP = dynamic(
  () => import('framer-motion').then(m => m.motion.p),
  { ssr: false }
);

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    credits: '10,000',
    price: 10,
    bonus: null,
    description: 'Perfect for small autonomous tasks',
    icon: Zap,
    features: [
      '10K total credits',
      'All 50+ models included',
      'No expiration date',
      'Basic support',
      'x402 protocol enabled'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    credits: '55,000',
    price: 45,
    bonus: '+5,000 bonus',
    description: 'Most popular for agent clusters',
    icon: Crown,
    popular: true,
    features: [
      '55K total credits',
      '5K bonus credits included',
      'Priority queue access',
      'Advanced model access',
      'Standard support'
    ]
  },
  {
    id: 'elite',
    name: 'Elite',
    credits: '125,000',
    price: 95,
    bonus: '+25,000 bonus',
    description: 'Best value for production fleets',
    icon: Sparkles,
    popular: false,
    features: [
      '125K total credits',
      '25K bonus credits included',
      'Ultra-low latency edge',
      'Custom fine-tuning hooks',
      'Priority support'
    ]
  },
  {
    id: 'sovereign',
    name: 'Sovereign',
    credits: '1,000,000+',
    price: 750,
    bonus: 'Custom allocation',
    description: 'Custom infrastructure for enterprise',
    icon: Building2,
    popular: false,
    features: [
      '1M+ credits per batch',
      'Dedicated compute nodes',
      'Zero Data Retention (ZDR)',
      'Custom SLA guarantees',
      'Private MCP registry'
    ]
  }
];

export function PricingSection() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handlePurchase = async (pkgId: string) => {
    if (pkgId === 'sovereign') {
      window.location.href = 'mailto:sales@oma-ai.com';
      return;
    }

    setIsConnecting(true);
    try {
      // Trigger an x402 payment request or Web3 wallet connection
      alert('x402 Payment Gateway initializing. Please connect your Web3 wallet to proceed.');
      // Proceed to connection flow in production
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden bg-zinc-900/50">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black mb-8 tracking-[0.2em] uppercase"
          >
            <Coins className="w-3 h-3 text-primary" />
            No Subscriptions. Just Compute.
          </MotionDiv>
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white"
          >
            CREDIT PACKAGES
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Purchase credits using <strong>USDC on Base</strong> via x402 or standard payment rails. 
            Credits never expire and scale with your agentic fleet.
          </MotionP>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <MotionDiv
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-[2.5rem] border p-8 transition-all duration-300 flex flex-col group",
                pkg.popular 
                  ? "border-primary/50 bg-zinc-900 shadow-2xl shadow-primary/10 scale-105 z-20 hover:shadow-primary/20 hover:border-primary/70" 
                  : "border-white/5 bg-zinc-950 hover:border-white/20 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
              )}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                    Optimal Value
                  </span>
                </div>
              )}

              <div className="mb-10">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                  pkg.popular ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-white/5 text-primary border border-white/10"
                )}>
                  <pkg.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{pkg.name}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{pkg.description}</p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black text-white tracking-tighter leading-none">
                    {pkg.credits}
                  </span>
                  <span className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Credits</span>
                </div>
                {pkg.bonus && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">{pkg.bonus}</span>
                  </div>
                )}
                <div className="mt-6 text-2xl font-bold text-gray-400">
                  ${pkg.price} <span className="text-xs text-gray-600 uppercase tracking-widest">One-time</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 py-1">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-gray-300 leading-tight group-hover:text-gray-200 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handlePurchase(pkg.id)}
                disabled={isConnecting}
                className={cn(
                  "w-full py-5 rounded-2xl font-black transition-all duration-200 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] active:scale-95 shadow-xl hover:shadow-2xl hover:-translate-y-0.5",
                  pkg.popular
                    ? "bg-primary text-black hover:bg-white shadow-primary/20 hover:shadow-primary/40"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-white/5"
                )}
              >
                Buy Now
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </MotionDiv>
          ))}
        </div>

        {/* X402 Micropayments Breakdown */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-white/5 relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:bg-primary/10 transition-all duration-1000" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="w-16 h-16 rounded-[1.25rem] bg-primary/10 border border-primary/20 flex items-center justify-center mb-8 shadow-inner shadow-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-4xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.9]">
                Machine-to-Machine <br />
                <span className="text-primary font-mono tracking-normal lowercase italic">Micropayments</span>
              </h3>
              <p className="text-lg text-gray-400 font-medium mb-10 leading-relaxed">
                OMA-AI pioneered the integration of <strong>x402</strong> for the Agentic Web. 
                Our protocol allows autonomous wallets to settle invoices in milliseconds without human friction or legacy banking systems.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="text-white font-black text-xl flex items-center gap-3 uppercase tracking-tighter border-l-2 border-primary pl-4">
                    Base native
                  </div>
                  <div className="text-sm text-gray-500 font-bold leading-relaxed">Built on EIP-3009 for the lowest possible transaction fees.</div>
                </div>
                <div className="space-y-3">
                  <div className="text-white font-black text-xl flex items-center gap-3 uppercase tracking-tighter border-l-2 border-emerald-500 pl-4">
                    Zero Fees
                  </div>
                  <div className="text-sm text-gray-500 font-bold leading-relaxed">Gasless transfers mean 100% of your USDC goes to compute.</div>
                </div>
              </div>
            </div>
            
            <div className="bg-black p-10 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Protocol Log</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase border border-rose-500/20">HTTP 402</span>
                </div>
                <div className="font-mono text-xs space-y-3 bg-zinc-950 p-6 rounded-2xl border border-white/5">
                  <p className="text-primary/60">{"// Initializing x402 Session..."}</p>
                  <p className="text-blue-400">GET <span className="text-white">/api/v1/inference</span></p>
                  <p className="text-rose-400">{"HTTP/1.1 402 Payment Required"}</p>
                  <p className="text-gray-500">{"{"}</p>
<p className="text-gray-300 pl-4">&quot;address&quot;: <span className="text-primary">&quot;0x40AE...eCac&quot;</span>,</p>
<p className="text-gray-300 pl-4">&quot;required&quot;: <span className="text-yellow-400">&quot;0.07 USDC&quot;</span>,</p>
<p className="text-gray-300 pl-4">&quot;gasless&quot;: <span className="text-emerald-400">true</span></p>
                  <p className="text-gray-500">{"}"}</p>
                </div>
                <div className="flex items-center justify-between gap-4 pt-4">
                  <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Network: Base Mainnet</div>
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <Check className="w-3 h-3" /> Settled
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>

        {/* Enterprise Footer */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center border-t border-white/5 pt-12"
        >
          <p className="text-gray-600 font-black text-xs tracking-[0.3em] uppercase">
            Built for the machine-to-machine economy. <a href="mailto:sales@oma-ai.com" className="text-primary hover:text-white transition-colors underline-offset-8 underline ml-4 decoration-2">Contact OMA Solutions</a>
          </p>
        </MotionDiv>
      </div>
    </section>
  );
}
