'use client';

import dynamic from 'next/dynamic';
import { Terminal, BookOpen, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPHowToUseProps {
  slug: string;
  mcp_endpoint: string;
}

export function MCPHowToUse({ slug, mcp_endpoint }: MCPHowToUseProps) {
  const { copiedId, copyToClipboard } = useCopyToClipboard();

  const openclawConfig = JSON.stringify({
    mcp: {
      servers: {
        [slug]: {
          transport: 'streamable-http',
          url: mcp_endpoint,
          headers: { Authorization: 'Bearer YOUR_API_KEY' },
        },
      },
    },
  }, null, 2);

  const claudeConfig = JSON.stringify({
    mcpServers: {
      [slug]: {
        command: 'npx',
        args: ['-y', '@oma-ai/mcp-cli', slug],
        env: { MCP_ENDPOINT: mcp_endpoint, MCP_API_KEY: 'your-api-key' },
      },
    },
  }, null, 2);

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-purple-400" />
        <h2 className="text-lg font-semibold text-white">How to Use</h2>
      </div>

      {/* MCP Endpoint */}
      <div className="mb-5">
        <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
          <Terminal size={14} />
          MCP Endpoint
        </h3>
        <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
          <code className="text-sm text-green-400 break-all flex-1">{mcp_endpoint}</code>
          <button
            onClick={() => copyToClipboard(mcp_endpoint, 'endpoint')}
            className="p-1.5 hover:bg-zinc-800 rounded transition-colors shrink-0"
            title="Copy endpoint"
          >
            <Copy size={14} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* OpenClaw */}
      <div className="mb-5">
        <h3 className="text-sm font-medium text-gray-300 mb-2">OpenClaw Configuration</h3>
        <div className="bg-zinc-950 p-3 rounded-lg">
          <pre className="text-xs text-gray-400 overflow-x-auto">{openclawConfig}</pre>
        </div>
      </div>

      {/* Claude Desktop */}
      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Claude Desktop Configuration</h3>
        <div className="bg-zinc-950 p-3 rounded-lg">
          <pre className="text-xs text-gray-400 overflow-x-auto">{claudeConfig}</pre>
        </div>
      </div>
    </MotionDiv>
  );
}
