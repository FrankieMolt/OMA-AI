'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Wallet, 
  CreditCard, 
  Globe, 
  Zap, 
  Shield
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

const phases = [
  { id: 'now', label: 'Now', color: 'from-green-500 to-emerald-600' },
  { id: 'q2', label: 'Q2 2026', color: 'from-blue-500 to-cyan-600' },
  { id: 'q3', label: 'Q3 2026', color: 'from-violet-500 to-purple-600' },
  { id: 'q4', label: 'Q4 2026', color: 'from-amber-500 to-orange-600' },
  { id: 'future', label: 'Future', color: 'from-zinc-500 to-zinc-600' },
];

const pillars = [
  { id: 'identity', title: 'Identity', icon: Wallet, color: 'bg-violet-500' },
  { id: 'payments', title: 'Payments', icon: CreditCard, color: 'bg-green-500' },
  { id: 'mobility', title: 'Mobility', icon: Globe, color: 'bg-blue-500' },
  { id: 'security', title: 'Security', icon: Shield, color: 'bg-red-500' },
  { id: 'ecosystem', title: 'Ecosystem', icon: Zap, color: 'bg-amber-500' },
];

const roadmapItems = [
  // Identity Pillar
  {
    title: 'Base Wallet + AAWP',
    description: 'Programmatic wallet creation on Base/Ethereum/Solana. Compatible with AI Agent Wallet Protocol.',
    status: 'completed',
    phase: 'now',
    pillars: ['identity']
  },
  {
    title: 'Agent DID + KYA',
    description: 'Decentralized identity with Know Your Agent standards. World ID integration for human-backed verification.',
    status: 'in-progress',
    phase: 'q2',
    pillars: ['identity', 'security'],
    dependencies: ['Base Wallet']
  },
  {
    title: 'Multi-Chain Identity',
    description: 'Same agent identity across multiple blockchains.',
    status: 'planned',
    phase: 'q3',
    pillars: ['identity'],
    dependencies: ['Agent DID']
  },
  {
    title: 'Reputation System',
    description: 'On-chain reputation scoring based on completed tasks and reliability.',
    status: 'planned',
    phase: 'q4',
    pillars: ['identity', 'ecosystem'],
    dependencies: ['Agent DID']
  },

  // Payments Pillar
  {
    title: 'x402 Payment Signing',
    description: 'HMAC-SHA256 signatures for gasless micro-payments. Auto-topup when balance low.',
    status: 'in-progress',
    phase: 'now',
    pillars: ['payments']
  },
  {
    title: 'Treasury Management',
    description: 'Multi-sig treasury with automatic revenue distribution to MCP publishers.',
    status: 'in-progress',
    phase: 'q2',
    pillars: ['payments', 'ecosystem']
  },
  {
    title: 'Micro-Payment Channels',
    description: 'Batched transactions for high-frequency API calls, reducing on-chain overhead.',
    status: 'in-progress',
    phase: 'q3',
    pillars: ['payments'],
    dependencies: ['x402']
  },
  {
    title: 'Cross-Chain Payments',
    description: 'Pay with any token on any chain via automatic bridging.',
    status: 'planned',
    phase: 'q4',
    pillars: ['payments', 'mobility'],
    dependencies: ['Micro-Payment Channels']
  },

  // Mobility Pillar
  {
    title: 'Portable Agents',
    description: 'Package agent with identity, wallet, and skills to run anywhere (local, VPS, serverless).',
    status: 'in-progress',
    phase: 'q2',
    pillars: ['mobility']
  },
  {
    title: 'Runtime-Agnostic Execution',
    description: 'Agents run on OpenClaw, Claude Code, Codex, or custom runtimes via standard plugin interface.',
    status: 'planned',
    phase: 'q3',
    pillars: ['mobility'],
    dependencies: ['Portable Agents']
  },
  {
    title: 'Cross-Platform Plugins',
    description: 'One agent, multiple backends: Telegram, Discord, Slack, WhatsApp, webhooks.',
    status: 'completed',
    phase: 'q2',
    pillars: ['mobility']
  },

  // Security Pillar
  {
    title: 'Programmable Guardrails',
    description: 'Spending limits, contract allowlists, multi-party approvals for high-value transactions.',
    status: 'in-progress',
    phase: 'q3',
    pillars: ['security', 'payments'],
    dependencies: ['x402', 'Portable Agents']
  },
  {
    title: 'Compliance Framework',
    description: 'KYA verification, audit trails, human-in-the-loop override, jurisdiction-aware rules.',
    status: 'planned',
    phase: 'q4',
    pillars: ['security', 'identity'],
    dependencies: ['Guardrails', 'Agent DID']
  },

  // Ecosystem Pillar
  {
    title: 'MCP Marketplace',
    description: 'Browse, subscribe, and call 19+ MCP servers with x402 payments. Live now.',
    status: 'completed',
    phase: 'now',
    pillars: ['ecosystem', 'payments']
  },
  {
    title: 'Publisher Dashboard',
    description: 'MCP publishers can view earnings, manage payouts, and see usage analytics.',
    status: 'completed',
    phase: 'q2',
    pillars: ['ecosystem']
  },
  {
    title: 'Agent Hub',
    description: 'Discover, rate, review, and fork pre-built AI agents created by others.',
    status: 'planned',
    phase: 'q3',
    pillars: ['ecosystem', 'mobility']
  },
  {
    title: 'Developer SDK & CLI',
    description: 'Full SDK for building, testing, and deploying agents. API-first design.',
    status: 'planned',
    phase: 'q3',
    pillars: ['ecosystem']
  },
  {
    title: 'Enterprise Features',
    description: 'SSO, audit logs, usage quotas, dedicated support, on-premise deployment.',
    status: 'future',
    phase: 'q4',
    pillars: ['ecosystem', 'identity', 'security']
  }
];

export default function RoadmapClient() {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = filter === 'all'
    ? roadmapItems
    : roadmapItems.filter(item => item.phase === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default: return 'bg-zinc-700/30 text-zinc-400 border border-zinc-600/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-6">OMA-AI Roadmap</h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Building the infrastructure for <strong className="text-white">autonomous AI agents</strong> that have identity, can pay for services, and travel anywhere.
          </p>
          
          {/* Pillar badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.id} className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full">
                  <div className={`w-8 h-8 rounded-lg ${pillar.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">{pillar.title}</span>
                </div>
              );
            })}
          </div>
        </MotionDiv>

        {/* Phase Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all' ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            All Items
          </button>
          {phases.map(phase => (
            <button
              key={phase.id}
              onClick={() => setFilter(phase.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === phase.id ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {phase.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-amber-500" />
          
          <div className="space-y-8">
            {filteredItems.map((item, idx) => {
              const phaseInfo = phases.find(p => p.id === item.phase);
              const statusIcon = item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '🔄' : '⏳';
              
              return (
                <MotionDiv
                  key={item.title + idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-20"
                >
                  <div className={`absolute left-4 w-9 h-9 rounded-full bg-gradient-to-br ${phaseInfo?.color || 'from-zinc-500 to-zinc-600'} border-4 border-zinc-900 flex items-center justify-center text-xs font-bold text-white`}>
                    {phases.findIndex(p => p.id === item.phase) + 1}
                  </div>

                  <GlassCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                        <span className="text-sm text-gray-400">{phaseInfo?.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                        <span className="text-2xl">{statusIcon}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.pillars.map(pillar => {
                        const pillarInfo = pillars.find(p => p.id === pillar);
                        if (!pillarInfo) return null;
                        const Icon = pillarInfo.icon;
                        return (
                          <span key={pillar} className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-xs text-gray-300">
                            <Icon className="w-3 h-3" />
                            {pillarInfo.title}
                          </span>
                        );
                      })}
                    </div>

                    {item.dependencies && (
                      <div className="text-sm text-gray-400">
                        <span className="font-medium">Depends on:</span> {item.dependencies.join(', ')}
                      </div>
                    )}
                  </GlassCard>
                </MotionDiv>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Build the Future?</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Join the OMA-AI ecosystem. Publish your MCP tools, deploy autonomous agents, and participate in the agent economy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/mcps" className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium">
                Explore Marketplace
              </Link>
              <Link href="/publish" className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700">
                Publish Your Tool
              </Link>
              <Link href="/docs" className="px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium border border-zinc-700">
                Read Docs
              </Link>
            </div>
          </GlassCard>
        </MotionDiv>
      </div>
    </div>
  );
}
