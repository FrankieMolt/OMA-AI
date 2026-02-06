'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TrendingAPI {
  id: string;
  name: string;
  icon: string;
  category: string;
  price: number;
  growth: number;
  calls: number;
  isTrending: boolean;
  agentId?: string;
}

export function TrendingAPIs() {
  // Initial state with placeholder data so it renders immediately
  const [trending, setTrending] = useState<TrendingAPI[]>([
    {
      id: '1',
      name: 'DeepScrape Pro',
      icon: '🕷️',
      category: 'Data Extraction',
      price: 0.001,
      growth: 34,
      calls: 142000,
      isTrending: true,
      agentId: 'Agent#8821'
    },
    {
      id: '2',
      name: 'SwapExecutor',
      icon: '⚡',
      category: 'DeFi',
      price: 0.005,
      growth: 128,
      calls: 312000,
      isTrending: false
    },
    {
      id: '3',
      name: 'SentimentPulse',
      icon: '📰',
      category: 'Sentiment Analysis',
      price: 0.004,
      growth: 45,
      calls: 89000,
      isTrending: false,
      agentId: 'Agent#8821'
    },
    {
      id: '4',
      name: 'MoltBook AutoPoster',
      icon: '🦞',
      category: 'Social Media',
      price: 0.002,
      growth: 210,
      calls: 67000,
      isTrending: true
    },
    {
      id: '5',
      name: 'ChainAnalyzer',
      icon: '📊',
      category: 'Blockchain',
      price: 0.005,
      growth: 67,
      calls: 120000,
      isTrending: false,
      agentId: 'Agent#4420'
    },
    {
      id: '6',
      name: 'ContractAuditor',
      icon: '🔒',
      category: 'Security',
      price: 0.015,
      growth: 45,
      calls: 67000,
      isTrending: false
    }
  ]);

  // Update trending data periodically (optional - can be removed if not needed)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional updates
      setTrending(prev => prev.map(api => ({
        ...api,
        calls: api.calls + Math.floor(Math.random() * 100),
        growth: api.growth + Math.floor(Math.random() * 5)
      })));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const APICard = ({ api }: { api: TrendingAPI }) => (
    <Link href={`/api/${api.id}`}>
      <div className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{api.icon}</span>
            <div>
              <h3 className="font-bold text-lg">{api.name}</h3>
              <span className="text-sm text-zinc-500">{api.category}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {api.isTrending && (
              <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/30">
                TRENDING
              </span>
            )}
            <span className={api.growth > 0 ? "text-green-400 text-sm font-semibold" : "text-red-400 text-sm font-semibold"}>
              {api.growth > 0 ? "+" : ""}{api.growth}%
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">{(api.calls / 1000).toFixed(0)}K calls</span>
            <span className="text-white font-bold">${api.price.toFixed(3)}/call</span>
          </div>
          {api.agentId && (
            <div className="text-xs text-zinc-600">
              Last invoked by {api.agentId}
            </div>
          )}
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          <span className="gradient-text">Trending APIs</span>
        </h2>
        <Link href="/marketplace" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map(api => (
          <APICard key={api.id} api={api} />
        ))}
      </div>
    </section>
  );
}
