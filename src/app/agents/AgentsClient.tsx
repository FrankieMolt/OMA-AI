'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Star, CheckCircle, Search, ChevronRight, Sparkles, Zap } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const AGENTS_CATALOG = [
  {
    id: 'browser-agent',
    name: 'Browser Agent',
    description: 'Autonomous web browser. Research, scrape, interact with any site.',
    verified: true,
    rating: 4.8,
    calls: 12400,
    tags: ['Browser', 'Research', 'Scraping'],
    color: '#4285F4',
    category: 'Automation',
    author: 'OMA-AI',
  },
  {
    id: 'code-agent',
    name: 'Code Agent',
    description: 'Write, review, and refactor code. Full SDLC automation.',
    verified: true,
    rating: 4.9,
    calls: 18900,
    tags: ['Coding', 'Review', 'DevOps'],
    color: '#10B981',
    category: 'Development',
    author: 'OMA-AI',
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    description: 'Deep web research with source verification. Writes detailed reports.',
    verified: true,
    rating: 4.7,
    calls: 9800,
    tags: ['Research', 'Web', 'Writing'],
    color: '#8B5CF6',
    category: 'Research',
    author: 'OMA-AI',
  },
  {
    id: 'data-agent',
    name: 'Data Agent',
    description: 'Analyze datasets, generate insights, create visualizations.',
    verified: true,
    rating: 4.6,
    calls: 7600,
    tags: ['Data', 'Analytics', 'CSV'],
    color: '#F59E0B',
    category: 'Data',
    author: 'OMA-AI',
  },
  {
    id: 'trading-agent',
    name: 'Trading Agent',
    description: 'Monitor markets, analyze charts, execute DeFi strategies.',
    verified: true,
    rating: 4.8,
    calls: 14300,
    tags: ['Trading', 'DeFi', 'Crypto'],
    color: '#EF4444',
    category: 'Finance',
    author: 'OMA-AI',
  },
  {
    id: 'smart-contract-agent',
    name: 'Smart Contract Agent',
    description: 'Audit, deploy, and interact with smart contracts across EVM chains.',
    verified: true,
    rating: 4.9,
    calls: 11200,
    tags: ['Blockchain', 'Smart Contracts', 'Security'],
    color: '#627EEA',
    category: 'Blockchain',
    author: 'OMA-AI',
  },
];

export default function AgentsClient() {
  const [filter, setFilter] = useState<'all' | 'verified' | 'active'>('all');
  const [search, setSearch] = useState('');

  const filtered = AGENTS_CATALOG.filter(agent => {
    if (filter === 'verified') return agent.verified;
    if (filter === 'active') return agent.calls > 5000;
    const matchesSearch = !search || agent.name.toLowerCase().includes(search.toLowerCase()) || agent.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6">
            <Bot className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300/80">AI Agents Marketplace</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">AI Agents</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Autonomous agents with their own wallets. Browse, hire, and deploy AI agents that work 24/7.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search agents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'verified', 'active'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((agent) => (
            <GlassCard key={agent.id} className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: agent.color + '33', color: agent.color }}
                >
                  <Bot className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{agent.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">{agent.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {agent.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="text-sm text-zinc-500">{agent.calls.toLocaleString()} calls</div>
                {agent.verified && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3.5 h-3.5" /> Verified
                  </span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Bot className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No agents match your search.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 mb-4">Want to publish your own agent?</p>
          <Link
            href="/publish"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
          >
            Publish an Agent <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
