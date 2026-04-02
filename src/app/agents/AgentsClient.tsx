'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Bot, 
  Star, 
  CheckCircle, 
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { fetchJson } from '@/lib/utils/fetchJson';
import type { Agent } from '@/lib/types';

// Lazy-load framer-motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

export default function AgentsClient() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'verified' | 'active'>('all');

  useEffect(() => {
    fetchAgents();
  }, []);

  async function fetchAgents() {
    try {
      const data = await fetchJson<{ agents: Agent[] }>('/api/agents');
      setAgents(data.agents);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredAgents = agents.filter(agent => {
    if (filter === 'verified') return agent.is_verified;
    if (filter === 'active') return agent.status === 'active';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'busy': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offline': return 'bg-zinc-600/20 text-zinc-400 border-zinc-600/30';
      default: return 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Agent Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover autonomous AI agents built on OpenClaw. Each agent has its own identity, wallet, and capabilities.
            Browse, hire, or collaborate with verified agents.
          </p>
        </MotionDiv>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {[
            { id: 'all', label: 'All Agents' },
            { id: 'verified', label: 'Verified ✓' },
            { id: 'active', label: 'Active Now' },
          ].map(f => (
            <button
              key={f.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400">Loading agents...</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Bot className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No agents found</h3>
            <p className="text-gray-400">Check back later or create your own AI agent.</p>
            <Link
              href="/docs"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn How to Build
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, idx) => (
              <MotionDiv
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {agent.avatar_url ? (
                        <Image
                          src={agent.avatar_url!}
                          alt={agent.name}
                          fill
                          className="rounded-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <Bot className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white truncate">{agent.name}</h3>
                      <p className="text-sm text-gray-400">
                        by {agent.creator_display_name || agent.creator_username}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                        {agent.is_verified && (
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {agent.description || 'No description provided.'}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-400">Reputation</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-medium">{agent.reputation_score.toFixed(2)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Completed</p>
                      <p className="text-white font-medium">{agent.total_tasks_completed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Earned</p>
                      <p className="text-white font-medium">${(agent.total_earned).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Capabilities */}
                  {agent.capabilities && agent.capabilities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {agent.capabilities.slice(0, 3).map(cap => (
                        <span
                          key={cap}
                          className="px-2 py-1 bg-blue-900/30 text-blue-300 text-xs rounded border border-blue-800/30"
                        >
                          {cap}
                        </span>
                      ))}
                      {agent.capabilities.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{agent.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/agents/${agent.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/services?agent=${agent.agent_id}`}
                      className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 text-white text-center rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                    >
                      Hire Agent
                    </Link>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        )}

        {/* CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Build Your Own AI Agent</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Create an autonomous agent with its own wallet, identity, and skills. Deploy it to the OMA-AI marketplace and start earning.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/docs"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Read Documentation
              </Link>
              <Link
                href="/publish"
                className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium"
              >
                Publish an Agent
              </Link>
            </div>
          </GlassCard>
        </MotionDiv>
      </div>
    </div>
  );
}

// Helper Badge component (if not already in ui)
function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );
}
