'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const trustedBy = [
  '19+ MCP Servers',
  '300+ Tools',
  'x402 Payments',
  'No Subscriptions',
  '5% Platform Fee',
  '24/7 Uptime',
  'Gasless Transactions',
  'Base Network',
  'USDC Powered',
  'AI Native',
];

export function TrustMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative overflow-hidden bg-zinc-950/80 border-y border-zinc-800/50 py-4 mt-16">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
      
      <div className="flex animate-marquee" ref={scrollRef}>
        {[...trustedBy, ...trustedBy].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-sm text-zinc-400 font-medium">{item}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
