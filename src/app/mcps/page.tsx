'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Package, 
  Terminal, 
  Github, 
  ArrowUpRight,
  PlusCircle,
  Database,
  Cloud,
  Box,
  Cpu,
  Layers,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mcpServers = [
  {
    id: 'github-mcp',
    name: 'GitHub Connector',
    author: 'OMA Systems',
    description: 'Grant agents access to read/write repositories and manage issues.',
    type: 'Hosted',
    price: '50 credits',
    calls: 'Per write',
    icon: Github
  },
  {
    id: 'supabase-mcp',
    name: 'Supabase Data Tool',
    author: 'Supabase Official',
    description: 'Query and mutate Postgres data directly from your LLM context.',
    type: 'Official',
    price: 'Free',
    calls: '100/min',
    icon: Database
  },
  {
    id: 'smithery-bridge',
    name: 'Smithery.ai Bridge',
    author: 'Ecosystem',
    description: 'Access 1000+ specialized agent tools via the Smithery.ai marketplace.',
    type: 'Registry',
    price: 'Variable',
    calls: 'External',
    icon: Box
  },
  {
    id: 'bash-exec',
    name: 'Safe Bash Exec',
    author: 'OpenClaw',
    description: 'Sandboxed terminal execution for agentic debugging and scripting.',
    type: 'System',
    price: 'Free',
    calls: 'Unlimited',
    icon: Terminal
  }
];

export default function McpRegistryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMcps = mcpServers.filter(mcp => 
    mcp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mcp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-32 min-h-screen bg-[#050505]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-widest uppercase">
            <Layers className="w-3 h-3" />
            Tool Orchestration
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">MCP Registry</h1>
          <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
            Model Context Protocol tools for the Agentic Web. 
            Connect your agents to real-world data and actions through OMA-AI and <strong>Smithery.ai</strong>.
          </p>
        </div>
        <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl active:scale-95">
          <PlusCircle className="w-5 h-5" />
          Publish Server
        </button>
      </div>

      <div className="relative mb-12 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-primary transition-colors" />
        <input
          aria-label="Search MCP servers"
          type="text"
          placeholder="Filter tools (e.g. GitHub, Slack, Postgres)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-5 bg-zinc-900 border border-white/5 rounded-[2rem] focus:outline-none focus:border-primary/50 text-white font-bold transition-all shadow-2xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMcps.map((mcp, index) => (
          <motion.div
            key={mcp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-8 rounded-[2.5rem] bg-zinc-950 border border-white/5 hover:border-white/10 transition-all group flex flex-col relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="flex gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/10 transition-all duration-500 group-hover:scale-110">
                  <mcp.icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1 tracking-tight">{mcp.name}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 tracking-wide">
                    <span>{mcp.author}</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="bg-zinc-900 px-2 py-0.5 rounded text-[9px] uppercase font-black tracking-[0.2em] border border-white/5">{mcp.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-black text-white">{mcp.price}</div>
                <div className="text-[10px] text-gray-600 font-black uppercase tracking-widest">{mcp.calls}</div>
              </div>
            </div>

            <p className="text-gray-400 font-medium leading-relaxed mb-10 flex-grow relative z-10">
              {mcp.description}
            </p>

            <div className="flex gap-3 relative z-10">
              <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all active:scale-95">
                Inspect Spec
              </button>
              <button className="flex-1 py-4 bg-white text-black hover:bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl">
                Install
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] translate-x-10 translate-y-10 group-hover:bg-primary/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* External Marketplaces */}
      <div className="mt-24 pt-16 border-t border-white/5 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-12">Integrated Registries</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <Box className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-black text-white tracking-tighter">Smithery.ai</span>
          </div>
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <Cpu className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-black text-white tracking-tighter">MCP.run</span>
          </div>
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <Layers className="w-6 h-6 text-emerald-400" />
            <span className="text-xl font-black text-white tracking-tighter">OpenTools</span>
          </div>
        </div>
      </div>
    </main>
  );
}
