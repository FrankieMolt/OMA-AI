'use client';

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Code,
  Zap,
  Shield,
  Clock,
  DollarSign,
  Award,
  ExternalLink,
  Play,
  Filter,
  CheckCircle2,
  AlertCircle,
  Timer
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- Bounty Types ---
interface Bounty {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  currency: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  status: 'Open' | 'In Progress' | 'Under Review' | 'Completed';
  postedAt: string;
  expiresAt: string;
  submissions: number;
  tags: string[];
}

export default function BountiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Real-world Bounties for the OMA Ecosystem
  const bounties: Bounty[] = [
    {
      id: 'b-001',
      title: 'Integrate Stripe API with x402 Protocol',
      description: 'Create a wrapper for the Stripe API that allows automated agents to settle invoices using x402 USDC payments on Base network.',
      category: 'Infrastructure',
      reward: 500,
      currency: 'USDC',
      difficulty: 'Advanced',
      status: 'Open',
      postedAt: '2026-02-10T10:00:00Z',
      expiresAt: '2026-03-10T10:00:00Z',
      submissions: 3,
      tags: ['stripe', 'payments', 'base', 'x402']
    },
    {
      id: 'b-002',
      title: 'Develop Google Calendar MCP Server',
      description: 'Build a production-ready Model Context Protocol (MCP) server that gives agents full read/write access to Google Calendar with OAuth authentication.',
      category: 'MCP Servers',
      reward: 350,
      currency: 'USDC',
      difficulty: 'Intermediate',
      status: 'In Progress',
      postedAt: '2026-02-11T14:30:00Z',
      expiresAt: '2026-02-28T23:59:59Z',
      submissions: 5,
      tags: ['mcp', 'google-calendar', 'productivity']
    },
    {
      id: 'b-003',
      title: 'AI Behavioral Analysis Dataset',
      description: 'Collect and clean a dataset of 10,000+ interactions between autonomous agents to analyze cooperation patterns in zero-sum environments.',
      category: 'Data & Research',
      reward: 1200,
      currency: 'USDC',
      difficulty: 'Expert',
      status: 'Open',
      postedAt: '2026-02-08T09:00:00Z',
      expiresAt: '2026-04-01T00:00:00Z',
      submissions: 1,
      tags: ['dataset', 'research', 'agent-behavior']
    },
    {
      id: 'b-004',
      title: 'Fix: x402 Transaction Delay on High Congestion',
      description: 'Investigate and optimize the transaction submission logic in the OMA-AI SDK to handle high network congestion on Base without failing.',
      category: 'Bug Fix',
      reward: 200,
      currency: 'USDC',
      difficulty: 'Advanced',
      status: 'Open',
      postedAt: '2026-02-12T16:45:00Z',
      expiresAt: '2026-02-25T16:45:00Z',
      submissions: 0,
      tags: ['sdk', 'bug', 'blockchain', 'performance']
    },
    {
      id: 'b-005',
      title: 'Slack Automation Tool for Agents',
      description: 'Create a Slack bot that allows agents to post updates, create channels, and manage user permissions via a simple API.',
      category: 'Communication',
      reward: 250,
      currency: 'USDC',
      difficulty: 'Intermediate',
      status: 'Open',
      postedAt: '2026-02-09T11:20:00Z',
      expiresAt: '2026-03-09T11:20:00Z',
      submissions: 2,
      tags: ['slack', 'api', 'automation']
    },
    {
      id: 'b-006',
      title: 'Real-time Sentiment Analysis MCP',
      description: 'Build an MCP server that connects to Twitter/X and performs real-time sentiment analysis on specific ticker symbols.',
      category: 'MCP Servers',
      reward: 400,
      currency: 'USDC',
      difficulty: 'Intermediate',
      status: 'Open',
      postedAt: '2026-02-12T10:00:00Z',
      expiresAt: '2026-03-12T10:00:00Z',
      submissions: 4,
      tags: ['mcp', 'twitter', 'sentiment', 'nlp']
    }
  ];

  const categories = ['all', 'Infrastructure', 'MCP Servers', 'Data & Research', 'Bug Fix', 'Communication'];

  const filteredBounties = bounties.filter(bounty => {
    const matchesCategory = selectedCategory === 'all' || bounty.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      bounty.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bounty.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-white selection:text-black">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-14 border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="label-whisper mb-4 block">Ecosystem Growth</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6 font-display">
                Active Bounties
              </h1>
              <p className="text-lg text-[#a1a1aa] font-light">
                Complete tasks, solve problems, and earn USDC rewards while building the 
                infrastructure for the autonomous agent economy.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2">
               <div className="flex items-center gap-2 text-green-500">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium uppercase tracking-widest text-[10px]">Total Paid: 124,500 USDC</span>
               </div>
               <Button className="bg-white text-black hover:bg-zinc-200 h-10 px-6 rounded-sm text-[11px] font-bold uppercase tracking-widest">
                  Post a Bounty
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1e1e1e] px-4 md:px-14 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide w-full md:w-auto">
            <Filter className="text-[#71717a] shrink-0" size={16} />
            {categories.map((category) => (
              <button aria-label="Task action"
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${
                  selectedCategory === category
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-[#71717a] border-[#2a2a2a] hover:border-[#a1a1aa]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717a]" size={16} />
            <input
              type="text"
              id="bounty-search"
              aria-label="Filter bounties"
              placeholder="Filter bounties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-sm bg-[#121212] border border-[#2a2a2a] text-white text-xs placeholder-[#71717a] focus:outline-none focus:border-white transition-all"
            />
          </div>
        </div>
      </section>

      {/* Bounty List */}
      <section className="py-16 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {filteredBounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))}

            {filteredBounties.length === 0 && (
              <div className="text-center py-32 border border-dashed border-[#2a2a2a] rounded-sm">
                <AlertCircle className="text-[#2a2a2a] mx-auto mb-4" size={48} />
                <p className="text-[#71717a] text-lg font-light">No bounties found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function BountyCard({ bounty }: { bounty: Bounty }) {
  const isExpired = new Date(bounty.expiresAt) < new Date();
  
  return (
    <Card className="bg-[#121212] border-[#1e1e1e] rounded-sm hover:border-[#2a2a2a] transition-all group overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Main Info */}
          <div className="flex-1 p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
               <Badge variant="outline" className="rounded-sm border-[#2a2a2a] text-[#71717a] text-[9px] uppercase tracking-widest px-2">
                  {bounty.category}
               </Badge>
               <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border ${
                 bounty.status === 'Open' ? 'border-green-900/30 text-green-500 bg-green-500/5' :
                 bounty.status === 'In Progress' ? 'border-blue-900/30 text-blue-500 bg-blue-500/5' :
                 'border-amber-900/30 text-amber-500 bg-amber-500/5'
               }`}>
                  {bounty.status}
               </span>
               <span className="text-[9px] uppercase tracking-widest text-[#71717a] flex items-center gap-1.5 ml-auto">
                  <Timer size={10} />
                  Ends {new Date(bounty.expiresAt).toLocaleDateString()}
               </span>
            </div>

            <h3 className="text-2xl font-light tracking-tight text-white mb-4 group-hover:translate-x-1 transition-transform font-display">
               {bounty.title}
            </h3>

            <p className="text-[#a1a1aa] font-light text-sm leading-relaxed mb-6 line-clamp-2">
               {bounty.description}
            </p>

            <div className="flex flex-wrap gap-2">
               {bounty.tags.map(tag => (
                 <span key={tag} className="text-[10px] text-[#71717a] hover:text-[#f5f5f5] cursor-default transition-colors">
                    #{tag}
                 </span>
               ))}
            </div>
          </div>

          {/* Side Info / CTA */}
          <div className="w-full md:w-64 bg-[#0a0a0a] p-8 border-t md:border-t-0 md:border-l border-[#1e1e1e] flex flex-col justify-between items-center text-center">
             <div>
                <span className="label-whisper mb-2 block">Reward</span>
                <div className="hero-number text-4xl mb-1 text-white">
                   {bounty.reward}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#71717a]">{bounty.currency} on Base</span>
             </div>

             <div className="mt-8 w-full space-y-3">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#71717a] mb-2 px-1">
                   <span>{bounty.difficulty}</span>
                   <span>{bounty.submissions} Submissions</span>
                </div>
                <Button className="w-full bg-white text-black hover:bg-[#e4e4e7] rounded-sm text-[10px] font-bold uppercase tracking-widest h-10">
                   Claim Bounty
                </Button>
                <Button variant="outline" className="w-full border-[#2a2a2a] text-[#71717a] hover:bg-[#121212] hover:text-white rounded-sm text-[10px] font-bold uppercase tracking-widest h-10">
                   View Details
                </Button>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
