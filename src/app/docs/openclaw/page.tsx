import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import {  Terminal, Box, Zap, Code, BookOpen, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'OpenClaw Integration Guide - OMA-AI Docs',
  description: 'Connect OMA-AI MCPs to OpenClaw for autonomous agent commerce.',
  keywords: ['OpenClaw', 'MCP', 'OMA-AI', 'integration', 'x402'],
};

const config = `{
  "mcp": {
    "servers": {
      "oma-ai": {
        "transport": "streamable-http",
        "url": "https://oma-ai.com/mcp/search",
        "headers": {
          "Authorization": "Bearer YOUR_API_KEY"
        }
      }
    }
  }
}`;

export default function OpenClawDocsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-8 h-8 text-orange-400" />
            <span className="text-orange-400 font-semibold">OpenClaw Integration</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect OpenClaw to OMA-AI
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Access OMA-AI MCPs directly in OpenClaw with x402 payments.
          </p>
        </div>

        <GlassCard className="p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Prerequisites
          </h2>
          <ul className="space-y-2 text-gray-300">
            <li>• OpenClaw installed</li>
            <li>• OMA-AI API key at <Link href="/profile" className="text-purple-400 hover:underline">/profile</Link></li>
            <li>• Wallet with USDC on Base or Solana</li>
          </ul>
        </GlassCard>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Configuration</h2>
          <p className="text-gray-400 mb-4">
            Add to <code className="text-orange-400">~/.openclaw/openclaw.json</code>:
          </p>
          <pre className="bg-zinc-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-300 font-mono">
            {config}
          </pre>
        </section>

        <GlassCard className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">x402 Payments</h2>
          </div>
          <p className="text-gray-400 mb-4">
            OMA-AI MCPs use x402 for automatic micropayments. Get USDC on Base, add wallet via <code className="text-orange-400">openclaw wallet add</code>, and your agent pays automatically.
          </p>
        </GlassCard>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Available MCPs</h2>
          <div className="grid gap-4">
            {[
              { name: 'oma-ai-search', desc: 'Web search', price: '$0.0001/call' },
              { name: 'oma-ai-solana', desc: 'Solana RPC', price: 'Free tier' },
              { name: 'oma-ai-github', desc: 'GitHub API', price: 'Free tier' },
            ].map((mcp) => (
              <div key={mcp.name} className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                <div>
                  <div className="font-semibold text-white">{mcp.name}</div>
                  <div className="text-sm text-gray-400">{mcp.desc}</div>
                </div>
                <div className="text-green-400 font-medium">{mcp.price}</div>
              </div>
            ))}
          </div>
          <Link href="/mcps" className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300">
            View all MCPs <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <Link href="/publish" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
          <BookOpen className="w-5 h-5" />
          Publish Your MCP
        </Link>
      </div>
    </div>
  );
}
