'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Globe, Code, Database, Bot, MessageSquare, Cloud, Lock, TrendingUp, Layers, Cpu, Network } from 'lucide-react';

const mcpCategories = [
  {
    icon: Database,
    title: 'Data & Storage',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    mcps: ['PostgreSQL MCP', 'MongoDB MCP', 'Redis MCP', 'S3 Storage MCP'],
    description: 'Connect AI agents to databases and storage systems. Query, analyze, and manage data at scale.',
  },
  {
    icon: Code,
    title: 'Developer Tools',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    mcps: ['GitHub MCP', 'Docker MCP', 'Filesystem MCP', 'Vercel Deploy'],
    description: 'Build, deploy, and manage code through AI agents. CI/CD, debugging, and code execution.',
  },
  {
    icon: Bot,
    title: 'AI & ML',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    mcps: ['Memory MCP', 'Sequential Thinking', 'Local Search Pro', 'Self-Improving Agent'],
    description: 'Enhance AI agents with memory, reasoning, and learning capabilities. Make agents smarter over time.',
  },
  {
    icon: Globe,
    title: 'Web & APIs',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    mcps: ['Web Search', 'Web Fetch', 'Browser Automation', 'API REST'],
    description: 'Access the internet, scrape content, and integrate with any REST API from your AI agent.',
  },
  {
    icon: Cloud,
    title: 'Infrastructure',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    mcps: ['Coolify', 'Docker', 'Cloudflare', 'Vercel'],
    description: 'Manage servers, containers, and cloud infrastructure through AI agents.',
  },
  {
    icon: Lock,
    title: 'Security',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    mcps: ['RugCheck Scanner', 'Token Contract Scanner', 'Whale Monitor'],
    description: 'Security tools for crypto and DeFi agents. Detect scams, analyze contracts, monitor threats.',
  },
];

const whyMCP = [
  {
    icon: Layers,
    title: 'Interoperability',
    description: 'One integration connects to hundreds of tools. No more custom code for every new service.',
  },
  {
    icon: Cpu,
    title: 'Standardization',
    description: '统一的接口让开发者和 AI 代理都能理解和使用。 MCP is the USB-C of AI tool integration.',
  },
  {
    icon: Network,
    title: 'Ecosystem Growth',
    description: 'Every new MCP server instantly available to every compatible agent. Network effects at work.',
  },
  {
    icon: TrendingUp,
    title: 'Agent Economy',
    description: 'When agents can use tools and pay for them, new economic models become possible.',
  },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-900/10 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/20 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-900/30 border border-violet-700/50 rounded-full text-violet-300 text-sm font-medium mb-6">
              <Network className="w-4 h-4" />
              MCP Ecosystem
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The Agentic Internet
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              The Model Context Protocol (MCP) is creating the first plug-and-play ecosystem for AI agents. 
              Like USB standardized device connections, MCP standardizes how agents connect to tools — 
              enabling interoperability, innovation, and autonomous commerce at scale.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/mcps"
                className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold flex items-center gap-2"
              >
                Browse MCPs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/publish"
                className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold"
              >
                Publish Your MCP
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why MCP Matters */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why MCP Matters
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              MCP is more than a protocol — it's the foundation for an agentic internet where AI agents 
              can discover, connect, and pay for tools autonomously.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyMCP.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
              >
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MCP Categories */}
      <section className="py-20 px-4 bg-zinc-900/30 border-y border-zinc-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              MCP Servers by Category
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From blockchain data to web search, databases to AI memory — 
              discover the tools that power autonomous agents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`p-6 bg-zinc-950 border ${cat.border} rounded-2xl hover:scale-[1.02] transition-transform duration-200`}
              >
                <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{cat.title}</h3>
                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">{cat.description}</p>
                <div className="space-y-2">
                  {cat.mcps.map((mcp) => (
                    <div key={mcp} className="flex items-center gap-2 text-sm text-zinc-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                      {mcp}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '34+', label: 'MCP Servers' },
              { value: '400K+', label: 'Tools via MCP' },
              { value: '18+', label: 'Categories' },
              { value: '100%', label: 'Open Standard' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-violet-900/20 to-transparent">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Build the Agentic Future
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Whether you're building AI agents or creating tools for them — 
              the MCP ecosystem is where the action is. Join the open standard that's 
              connecting the AI infrastructure stack.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/mcps"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg flex items-center gap-2"
              >
                Explore the Ecosystem <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
              >
                Read the Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}