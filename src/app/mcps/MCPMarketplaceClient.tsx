

'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { 
  Zap, 
  CreditCard, 
  Shield, 
  Globe, 
  Code, 
  Cpu,
  ArrowRight,
  CheckCircle,
  Key
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

// Lazy-load the marketplace component
const MCPMarketplace = dynamic(
  () => import('@/components/mcp-marketplace/MCPMarketplace').then(m => m.default),
  { ssr: false, loading: () => (
    <div className="text-center py-20">
      <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-gray-400">Loading MCP Marketplace...</p>
    </div>
  )}
);

const mcpFeatures = [
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Connect any MCP server in seconds. No configuration or custom code.'
  },
  {
    icon: CreditCard,
    title: 'x402 Micropayments',
    description: 'Pay per call, settled in USDC on Base.'
  },
  {
    icon: Shield,
    title: 'Verified & Secure',
    description: 'Every server is vetted. Rate limiting protects your spend.'
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Works with any runtime that speaks MCP — OpenClaw, Claude Code, Codex, more.'
  },
  {
    icon: Code,
    title: 'Developer-First',
    description: 'Publish your own MCP servers and start earning. SDK and docs included.'
  },
  {
    icon: Cpu,
    title: 'Live MCP Tools',
    description: 'Web search, database queries, blockchain calls, code execution — unified.'
  }
];

const popularTools = [
  { name: 'Helius', category: 'Blockchain', description: 'Solana RPC and data APIs for DeFi agents', price: 'From $0.001/call' },
  { name: 'Jupiter', category: 'DEX', description: 'Token swaps and liquidity on Solana', price: 'From $0.01/call' },
  { name: 'Exa Search', category: 'Search', description: 'Web search optimized for AI agents', price: 'From $0.001/call' },
  { name: 'Notion', category: 'Productivity', description: 'Wiki, docs, and project management', price: 'From $0.005/call' },
  { name: 'PostgreSQL', category: 'Database', description: 'Query and manage relational data', price: 'From $0.002/call' },
  { name: 'Ethereum', category: 'Blockchain', description: 'Ethereum RPC and contract interactions', price: 'From $0.005/call' },
];

export default function MCPMarketplaceClient() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-zinc-950 to-fuchsia-900/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-24 max-w-7xl relative z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-700/50 rounded-full text-violet-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              MCP Marketplace
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              MCP Marketplace
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              The Model Context Protocol connects AI agents to external tools. Browse, subscribe, and integrate MCP servers — from blockchain data to web search, database queries to code execution. Payments happen automatically via x402 microtransactions on Base.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <Link
                href="#marketplace"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg flex items-center gap-2"
              >
                Browse Tools <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/publish"
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
              >
                Publish Your MCP
              </Link>
            </div>
            
            {/* Hero Image */}
            <div className="relative mx-auto max-w-3xl rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-violet-900/20">
              <img 
                src="/mcp-marketplace-hero.jpg" 
                alt="MCP Marketplace - AI agents exchanging capabilities"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
            </div>
          </MotionDiv>
        </div>
      </div>

      {/* What is MCP Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              What is the Model Context Protocol?
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              MCP is an open standard that lets AI agents connect to external tools and data sources through one interface. Instead of building custom integrations for every tool, developers expose capabilities as MCP servers — and any compatible agent can use them instantly.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Think of it like USB for AI agents. Just as USB standardized how devices connect to computers, MCP standardizes how AI agents connect to the internet, databases, APIs, and services. The result? Agents can find the tools they need when they need them.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-violet-400" />
                <span>Open Standard</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-violet-400" />
                <span>Language Agnostic</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-violet-400" />
                <span>Bidirectional</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-violet-400" />
                <span>Production Ready</span>
              </div>
            </div>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-bold text-white mb-6">How MCP Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Agent Requests Tool Use</h4>
                    <p className="text-gray-400 text-sm">Your AI agent sends a standardized request to use a specific MCP tool.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">MCP Server Executes</h4>
                    <p className="text-gray-400 text-sm">The MCP server runs the requested operation — query, API call, computation.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Results Returned to Agent</h4>
                    <p className="text-gray-400 text-sm">Structured data flows back to the agent for use in reasoning and response.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">x402 Payment Settles</h4>
                    <p className="text-gray-400 text-sm">Cost is calculated and settled automatically via x402 microtransactions.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </MotionDiv>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Everything Agents Need</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Production-grade tools for autonomous AI agents, all with usage-based pricing and instant integration.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcpFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <MotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="p-6 h-full hover:border-violet-500/50 transition-colors cursor-pointer"
                  onMouseEnter={() => setActiveFeature(idx)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    activeFeature === idx ? 'bg-violet-600' : 'bg-zinc-800'
                  } transition-colors`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </MotionDiv>
            );
          })}
        </div>
      </div>

      {/* Popular Tools */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Popular Tools</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The MCP servers agents use most. Click any to learn more.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTools.map((tool, idx) => (
            <MotionDiv
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="p-6 h-full flex flex-col hover:border-violet-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-violet-900/30 text-violet-300 text-xs font-medium rounded-full border border-violet-800/30">
                    {tool.category}
                  </span>
                  <span className="text-green-400 text-sm font-medium">{tool.price}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-gray-400 text-sm flex-grow">{tool.description}</p>
                <Link
                  href="#marketplace"
                  className="mt-4 px-4 py-2 bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors text-center"
                >
                  View Details
                </Link>
              </GlassCard>
            </MotionDiv>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <GlassCard className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Pay Per Use with x402
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                No subscriptions. No monthly fees. Every call costs a fraction of a cent, automatically charged. Wallet tops up when low.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Publishers get paid automatically. No invoicing. No chasing payments.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-300">
                  <Key className="w-5 h-5 text-violet-400" />
                  <span>No API keys to manage</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <span>USDC on Base network</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Auto-topup enabled</span>
                </div>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <h3 className="text-lg font-bold text-white mb-4">Example Pricing</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Web Search (Exa)</span>
                  <span className="text-white font-medium">$0.001 / call</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Solana DEX Swap (Jupiter)</span>
                  <span className="text-white font-medium">$0.01 / call</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Notion Read</span>
                  <span className="text-white font-medium">$0.005 / call</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>PostgreSQL Query</span>
                  <span className="text-white font-medium">$0.002 / call</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Ethereum RPC</span>
                  <span className="text-white font-medium">$0.005 / call</span>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                * Actual costs vary by operation complexity. Gas fees included.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-20 max-w-7xl text-center">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're building agents or building tools — OMA-AI has the infrastructure to make it work.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/docs"
              className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg"
            >
              Read the Docs
            </Link>
            <Link
              href="/publish"
              className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
            >
              Publish an MCP Server
            </Link>
          </div>
        </MotionDiv>
      </div>

      {/* Marketplace Section */}
      <div id="marketplace" className="container mx-auto px-4 pb-12 max-w-7xl">
        <MCPMarketplace />
      </div>

      {/* Package Registry Banner */}
      <div className="container mx-auto px-4 pb-20 max-w-7xl">
        <div className="bg-zinc-900/80 border border-green-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">MCP Package Registry</h3>
              <p className="text-sm text-gray-400">Install MCP servers via npm, Docker, or npx. Run locally or deploy to your own infrastructure.</p>
            </div>
          </div>
          <Link
            href="/mcps/install"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
          >
            Browse Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
