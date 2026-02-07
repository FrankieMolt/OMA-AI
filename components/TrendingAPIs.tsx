'use client';

import { useEffect, useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { TrendingUp, Clock } from 'lucide-react';

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

const APICard = memo(({ api }: { api: TrendingAPI }) => (
  <Link href={`/api/${api.id}`} className="block group">
    <article className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden="true">{api.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{api.name}</h3>
            <span className="text-sm text-zinc-500">{api.category}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {api.isTrending && (
            <span className="status-badge error text-xs px-2 py-1 rounded-full border border-red-500/30">
              <TrendingUp size={12} className="inline mr-1" aria-hidden="true" />
              TRENDING
            </span>
          )}
          <span className={`text-sm font-semibold flex items-center gap-1 ${
            api.growth > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {api.growth > 0 ? '+' : ''}{api.growth}%
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-500" aria-label={`${(api.calls / 1000).toFixed(0)}K calls per month`}>
            <Clock size={14} className="inline mr-1 align-middle" aria-hidden="true" />
            {(api.calls / 1000).toFixed(0)}K calls/mo
          </span>
          <span className="text-white font-bold" aria-label={`${api.price.toFixed(3)} dollars per call`}>
            ${api.price.toFixed(3)}/call
          </span>
        </div>
        {api.agentId && (
          <div className="text-xs text-zinc-600">
            Last invoked by <span className="text-zinc-500">{api.agentId}</span>
          </div>
        )}
      </div>
    </article>
  </Link>
));

APICard.displayName = 'APICard';

export function TrendingAPIs() {
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

  const updateTrending = useCallback(() => {
    // Simulate occasional updates
    setTrending(prev => prev.map(api => ({
      ...api,
      calls: api.calls + Math.floor(Math.random() * 100),
      growth: api.growth + Math.floor(Math.random() * 5)
    })));
  }, []);

  useEffect(() => {
    // Update trending data periodically
    const interval = setInterval(updateTrending, 30000);
    return () => clearInterval(interval);
  }, [updateTrending]);

  return (
    <section className="py-12" aria-labelledby="trending-apis-heading">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 id="trending-apis-heading" className="text-3xl font-bold">
          <span className="gradient-text">Trending APIs</span>
        </h2>
        <Link
          href="/marketplace"
          className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 group"
          aria-label="View all APIs in marketplace"
        >
          View All
          <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
