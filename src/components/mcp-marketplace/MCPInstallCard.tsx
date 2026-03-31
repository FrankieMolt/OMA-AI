'use client';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Copy, Check, Terminal, Box, Zap, ExternalLink } from 'lucide-react';

interface MCPInstallCardProps {
  server: {
    slug: string;
    name: string;
    mcp_endpoint: string;
    tools_count: number;
    x402_enabled: boolean;
    tier: 'free' | 'premium';
    pricing_usdc: number;
    documentation_url?: string | null;
    repository?: string;
    tools?: { name: string; description: string }[];
    color?: string | null;
    rating: number;
    total_calls: number;
    success_rate: number;
  };
}

const CLIENTS = ['Claude Desktop', 'Cursor', 'OpenClaw'] as const;
type Client = typeof CLIENTS[number];

function generateClaudeDesktopConfig(slug: string, endpoint: string) {
  return JSON.stringify({
    mcpServers: {
      [slug]: {
        transport: 'streamable-http',
        url: endpoint,
        headers: {
          'User-Agent': 'OMA-AI-MCP/1.0',
        },
      },
    },
  }, null, 2);
}

function generateCursorConfig(slug: string, endpoint: string) {
  return JSON.stringify({
    mcpServers: {
      [slug]: {
        transport: 'streamable-http',
        url: endpoint,
        headers: {
          'User-Agent': 'OMA-AI-MCP/1.0',
        },
      },
    },
  }, null, 2);
}

function generateOpenClawConfig(slug: string, endpoint: string) {
  return JSON.stringify({
    mcpServers: {
      [slug]: {
        transport: 'http',
        url: endpoint,
        name: slug,
        enabled: true,
      },
    },
  }, null, 2);
}

export function MCPInstallCard({ server }: MCPInstallCardProps) {
  const [selectedClient, setSelectedClient] = useState<Client>('Claude Desktop');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'tools'>('config');

  const configs: Record<Client, string> = {
    'Claude Desktop': generateClaudeDesktopConfig(server.slug, server.mcp_endpoint),
    'Cursor': generateCursorConfig(server.slug, server.mcp_endpoint),
    'OpenClaw': generateOpenClawConfig(server.slug, server.mcp_endpoint),
  };

  const config = configs[selectedClient];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const configPathHint: Record<Client, string> = {
    'Claude Desktop': '~/.config/claude/claude_desktop_config.json',
    'Cursor': '~/.cursor/settings.json (MCP servers section)',
    'OpenClaw': '~/.openclaw/openclaw.json (mcpServers section)',
  };

  return (
    <div className="space-y-4">
      {/* Connect Card */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Box className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-semibold text-white">Connect to {server.name}</h3>
        </div>

        {/* Tier + x402 badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {server.tier === 'premium' ? (
            <span className="px-2.5 py-1 text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full font-medium">
              Premium
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-medium">
              Free
            </span>
          )}
          {server.x402_enabled && (
            <span className="px-2.5 py-1 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full font-medium flex items-center gap-1">
              <Zap size={10} className="fill-yellow-400" />
              x402 Pay-per-call
            </span>
          )}
        </div>

        {/* Client selector tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {CLIENTS.map(client => (
            <button
              key={client}
              onClick={() => setSelectedClient(client)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedClient === client
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-700 text-gray-400 hover:text-white hover:bg-zinc-600'
              }`}
            >
              {client}
            </button>
          ))}
        </div>

        {/* Config or Tools tabs */}
        <div className="flex gap-4 mb-3 border-b border-zinc-700">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2 text-xs font-medium transition-colors ${
              activeTab === 'config'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Config</span>
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`pb-2 text-xs font-medium transition-colors ${
              activeTab === 'tools'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-1"><Box className="w-3 h-3" /> Tools ({server.tools_count})</span>
          </button>
        </div>

        {activeTab === 'config' ? (
          <>
            {/* Config output */}
            <div className="bg-zinc-950 p-3 rounded-lg mb-3">
              <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all font-mono">
                {config}
              </pre>
            </div>

            {/* Where to put it */}
            <p className="text-xs text-gray-500 mb-3">
              Add to: <code className="text-gray-400 bg-zinc-800 px-1.5 py-0.5 rounded">{configPathHint[selectedClient]}</code>
            </p>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className={`w-full px-4 py-2.5 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-violet-600 hover:bg-violet-700 text-white'
              }`}
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy {selectedClient} Config</>}
            </button>
          </>
        ) : (
          /* Tools list */
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {server.tools && server.tools.length > 0 ? (
              server.tools.map((tool) => (
                <div key={tool.name} className="bg-zinc-800/50 p-2.5 rounded-lg">
                  <div className="text-xs font-mono text-violet-400 mb-0.5">{tool.name}</div>
                  <div className="text-xs text-gray-400">{tool.description}</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500">No tools documented yet.</p>
            )}
          </div>
        )}
      </GlassCard>

      {/* Stats Card */}
      <GlassCard className="p-5">
        <h4 className="text-sm font-semibold text-white mb-3">Statistics</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Total Calls</span>
            <span className="text-sm font-bold text-white">{(server.total_calls || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Success Rate</span>
            <span className="text-sm font-bold text-green-400">{(server.success_rate || 100).toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Rating</span>
            <span className="text-sm font-bold text-yellow-400">{server.rating.toFixed(1)}</span>
          </div>
        </div>
      </GlassCard>

      {/* Links */}
      <GlassCard className="p-5 space-y-2">
        {server.documentation_url && (
          <a
            href={server.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink size={12} />
            Documentation
          </a>
        )}
        {server.repository && (
          <a
            href={server.repository}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink size={12} />
            Source Code
          </a>
        )}
      </GlassCard>
    </div>
  );
}
