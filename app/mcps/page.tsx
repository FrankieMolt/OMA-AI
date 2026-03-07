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
  Cloud
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mcpServers = [
  {
    id: 'github-mcp',
    name: 'GitHub Connector',
    author: 'OMA Systems',
    description: 'Grant agents access to read/write repositories and manage issues.',
    type: 'Hosted',
    price: '$0.05/hr',
    calls: 'Unlimited',
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
    id: 'cloud-orchestrator',
    name: 'AWS Manager',
    author: 'NOSYT Labs',
    description: 'Full infrastructure control for agents. Provision EC2 and Lambda.',
    type: 'Enterprise',
    price: '$0.10/call',
    calls: 'Pay-per-use',
    icon: Cloud
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
    <main className="max-w-7xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">MCP Registry</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Model Context Protocol tools for the Agentic Web. 
            Connect your agents to real-world data and actions instantly.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
          <PlusCircle className="w-5 h-5" />
          Publish Server
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          aria-label="Search MCP servers"
          type="text"
          placeholder="Search MCP servers (e.g. GitHub, Slack, Postgres)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:border-primary text-lg transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMcps.map((mcp, index) => (
          <motion.div
            key={mcp.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <mcp.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{mcp.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{mcp.author}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="bg-muted px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{mcp.type}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{mcp.price}</div>
                <div className="text-xs text-muted-foreground">{mcp.calls}</div>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 line-clamp-2">
              {mcp.description}
            </p>

            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                View Spec
              </button>
              <button className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                Install
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}