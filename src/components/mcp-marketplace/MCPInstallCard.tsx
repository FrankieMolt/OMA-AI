'use client';

import dynamic from 'next/dynamic';
import { ExternalLink, ArrowUpRight, Copy, CheckCircle } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPInstallCardProps {
  slug: string;
  mcp_endpoint: string;
  pricing_usdc: number;
  total_calls: number;
  success_rate: number;
  rating: number;
  documentation_url?: string | null;
  repository_url?: string | null;
}

export function MCPInstallCard({
  slug,
  mcp_endpoint,
  pricing_usdc,
  total_calls,
  success_rate,
  rating,
  documentation_url,
  repository_url,
}: MCPInstallCardProps) {
  const { copiedId, copyToClipboard } = useCopyToClipboard();

  const openclawConfig = JSON.stringify({
    mcp: {
      servers: {
        [slug]: {
          transport: 'streamable-http',
          url: mcp_endpoint,
        },
      },
    },
  }, null, 2);

  const claudeConfig = JSON.stringify({
    mcpServers: {
      [slug]: {
        command: 'npx',
        args: ['-y', '@oma-ai/mcp-cli', slug],
      },
    },
  }, null, 2);

  return (
    <MotionDiv
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Install Card */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Connect to OpenClaw</h3>
        <p className="text-sm text-gray-400 mb-4">
          Add this MCP server to your OpenClaw or Claude Desktop config.
        </p>

        {/* OpenClaw config */}
        <div className="bg-zinc-950 p-3 rounded-lg mb-3">
          <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all">
            {openclawConfig}
          </pre>
        </div>
        <button
          onClick={() => copyToClipboard(openclawConfig, 'openclaw')}
          className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mb-2"
        >
          {copiedId === 'openclaw' ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy OpenClaw Config</>}
        </button>

        {/* Claude Desktop config */}
        <div className="bg-zinc-950 p-3 rounded-lg mb-3">
          <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all">
            {claudeConfig}
          </pre>
        </div>
        <button
          onClick={() => copyToClipboard(claudeConfig, 'claude')}
          className="w-full px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
        >
          {copiedId === 'claude' ? <><CheckCircle size={16} /> Copied!</> : <><Copy size={16} /> Copy Claude Desktop Config</>}
        </button>

        {documentation_url && (
          <a href={documentation_url} target="_blank" rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={14} />
            Full Documentation
          </a>
        )}
      </MotionDiv>

      {/* Pricing Card */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Pricing</h3>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-gray-400">Price</span>
            <span className="text-3xl font-bold text-white">${pricing_usdc.toFixed(4)}</span>
          </div>
          <div className="text-sm text-gray-400">USDC per call</div>
        </div>
      </MotionDiv>

      {/* Stats Card */}
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
        <div className="space-y-3">
          <StatRow label="Total Calls" value={total_calls.toLocaleString()} />
          <StatRow label="Success Rate" value={`${success_rate.toFixed(1)}%`} valueClass="text-green-400" />
          <StatRow label="Rating" value={`${rating.toFixed(1)} ★`} valueClass="text-yellow-400" />
        </div>
      </MotionDiv>

      {/* Links */}
      {repository_url && (
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="space-y-2">
          <a href={repository_url} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <span>Source Code</span><ArrowUpRight size={16} />
          </a>
          {documentation_url && (
            <a href={documentation_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>Documentation</span><ArrowUpRight size={16} />
            </a>
          )}
        </MotionDiv>
      )}
    </MotionDiv>
  );
}

function StatRow({ label, value, valueClass = 'text-white' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-400">{label}</span>
      <span className={`text-xl font-bold ${valueClass}`}>{value}</span>
    </div>
  );
}
