'use client';
import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { Copy, Check, Terminal, Box, Zap, ExternalLink, DollarSign, Coins, Package, Download } from 'lucide-react';

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
    repository_url?: string;
    tools?: { name: string; description: string }[];
    color?: string | null;
    rating: number;
    total_calls: number;
    success_rate: number;
  };
}

const NPM_PACKAGES: Record<string, string> = {
  'github': '@oma-ai/github-mcp',
  'pumpfun-sniper': '@oma-ai/pumpfun-sniper',
  'meme-detector': '@oma-ai/meme-detector',
  'solana-swaps': '@oma-ai/solana-swaps',
};

const CLIENTS = ['Claude Desktop', 'Cursor', 'OpenClaw'] as const;
type Client = typeof CLIENTS[number];

function hasNpmPackage(slug: string): boolean {
  return slug in NPM_PACKAGES;
}

function getNpmPackage(slug: string): string | null {
  return NPM_PACKAGES[slug] || null;
}

function generateClaudeDesktopConfig(slug: string, endpoint: string) {
  return JSON.stringify({
    mcpServers: {
      [slug]: {
        transport: 'streamable-http',
        url: endpoint,
        headers: { 'User-Agent': 'OMA-AI-MCP/1.0' },
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
        headers: { 'User-Agent': 'OMA-AI-MCP/1.0' },
      },
    },
  }, null, 2);
}

function generateOpenClawConfig(slug: string, endpoint: string) {
  if (endpoint === 'SKILL' || hasNpmPackage(slug)) {
    const pkg = getNpmPackage(slug) || `@oma-ai/${slug}`;
    return JSON.stringify({
      mcpServers: {
        [slug]: {
          transport: 'stdio',
          command: 'npx',
          args: [pkg],
          enabled: true,
        },
      },
    }, null, 2);
  }
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

function formatPricingPrice(usdc: number): string {
  if (usdc === 0) return 'Free';
  if (usdc >= 0.01) return `$${usdc.toFixed(3)}`;
  if (usdc >= 0.001) return `$${usdc.toFixed(4)}`;
  if (usdc >= 0.0001) return `$${usdc.toFixed(5)}`;
  return `$${usdc.toFixed(6)}`;
}

export function MCPInstallCard({ server }: MCPInstallCardProps) {
  const [selectedClient, setSelectedClient] = useState<Client>('Claude Desktop');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'install' | 'tools'>('config');

  const configs: Record<Client, string> = {
    'Claude Desktop': generateClaudeDesktopConfig(server.slug, server.mcp_endpoint),
    'Cursor': generateCursorConfig(server.slug, server.mcp_endpoint),
    'OpenClaw': generateOpenClawConfig(server.slug, server.mcp_endpoint),
  };

  const config = configs[selectedClient];
  const npmPkg = getNpmPackage(server.slug);
  const isLocalSkill = server.mcp_endpoint === 'SKILL' || hasNpmPackage(server.slug);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
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
      {/* ========== PRICING CARD ========== */}
      <GlassCard className={`p-5 ${server.tier === 'premium' ? 'border-amber-500/30' : 'border-green-500/30'}`}>
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className={`w-5 h-5 ${server.tier === 'premium' ? 'text-amber-400' : 'text-green-400'}`} />
          <h3 className="text-base font-semibold text-white">Per-Call Pricing</h3>
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          {server.pricing_usdc === 0 ? (
            <span className="text-3xl font-bold text-green-400">FREE</span>
          ) : (
            <>
              <span className="text-3xl font-bold text-white">{formatPricingPrice(server.pricing_usdc)}</span>
              <span className="text-gray-400 text-sm">USDC / call</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {server.tier === 'premium' ? (
            <span className="px-2.5 py-1 text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full font-medium">Premium</span>
          ) : (
            <span className="px-2.5 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-full font-medium">Free</span>
          )}
          {server.x402_enabled && (
            <span className="px-2.5 py-1 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full font-medium flex items-center gap-1">
              <Zap size={10} className="fill-yellow-400" /> x402 Pay-per-call
            </span>
          )}
        </div>
        {server.pricing_usdc > 0 && (
          <div className="mt-4 space-y-1 text-xs text-gray-500">
            <div className="flex justify-between"><span>100 calls</span><span className="text-white font-mono">${(server.pricing_usdc * 100).toFixed(4)} USDC</span></div>
            <div className="flex justify-between"><span>1,000 calls</span><span className="text-white font-mono">${(server.pricing_usdc * 1000).toFixed(3)} USDC</span></div>
            <div className="flex justify-between"><span>10,000 calls</span><span className="text-white font-mono">${(server.pricing_usdc * 10000).toFixed(2)} USDC</span></div>
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-zinc-800 text-xs text-gray-500">
          <span className="text-gray-400">Creator earns 95%</span>
          <span className="mx-2">•</span>
          <span className="text-gray-400">Platform fee 5%</span>
        </div>
      </GlassCard>

      {/* ========== CONNECT / INSTALL CARD ========== */}
      <GlassCard className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <Box className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-semibold text-white">Connect to {server.name}</h3>
        </div>

        {/* Tabs: Config / Install / Tools */}
        <div className="flex gap-1 mb-4 border-b border-zinc-700">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 pb-2 text-xs font-medium transition-colors ${
              activeTab === 'config' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> Config</span>
          </button>
          {isLocalSkill && (
            <button
              onClick={() => setActiveTab('install')}
              className={`px-3 pb-2 text-xs font-medium transition-colors ${
                activeTab === 'install' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="flex items-center gap-1"><Download className="w-3 h-3" /> Install</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-3 pb-2 text-xs font-medium transition-colors ${
              activeTab === 'tools' ? 'text-violet-400 border-b-2 border-violet-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="flex items-center gap-1"><Box className="w-3 h-3" /> Tools ({server.tools?.length ?? server.tools_count})</span>
          </button>
        </div>

        {/* CONFIG TAB */}
        {activeTab === 'config' && (
          <>
            {/* Client selector */}
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
            <div className="bg-zinc-950 p-3 rounded-lg mb-3">
              <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all font-mono">
                {config}
              </pre>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Add to: <code className="text-gray-400 bg-zinc-800 px-1.5 py-0.5 rounded">{configPathHint[selectedClient]}</code>
            </p>
            <button
              onClick={() => copyToClipboard(config)}
              className={`w-full px-4 py-2.5 rounded-lg transition-all font-medium flex items-center justify-center gap-2 text-sm ${
                copied ? 'bg-green-600 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'
              }`}
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy {selectedClient} Config</>}
            </button>
          </>
        )}

        {/* INSTALL TAB — npm / npx / Docker */}
        {activeTab === 'install' && isLocalSkill && npmPkg && (
          <div className="space-y-4">
            {/* npm install */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-green-400" />
                <span className="text-xs font-semibold text-white">npm install</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
                <code className="text-xs text-green-400 font-mono">npm install -g {npmPkg}</code>
                <button
                  onClick={() => copyToClipboard(`npm install -g ${npmPkg}`)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* npx */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-semibold text-white">npx (no install)</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
                <code className="text-xs text-green-400 font-mono">npx {npmPkg}</code>
                <button
                  onClick={() => copyToClipboard(`npx ${npmPkg}`)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Docker */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Box className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-white">Docker</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
                <code className="text-xs text-green-400 font-mono">docker run -i --rm oma-ai/{server.slug}</code>
                <button
                  onClick={() => copyToClipboard(`docker run -i --rm oma-ai/${server.slug}`)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* OpenClaw skill install */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold text-white">OpenClaw Skill</span>
              </div>
              <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
                <code className="text-xs text-green-400 font-mono">openclaw skills install {npmPkg}</code>
                <button
                  onClick={() => copyToClipboard(`openclaw skills install ${npmPkg}`)}
                  className="text-gray-400 hover:text-white transition-colors shrink-0"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Source link */}
            <div className="pt-2 border-t border-zinc-800">
              <Link
                href={`/mcps/install#${server.slug}`}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                <ExternalLink size={10} />
                View in Package Registry →
              </Link>
            </div>
          </div>
        )}

        {/* TOOLS TAB */}
        {activeTab === 'tools' && (
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
        <a href="https://docs.openclaw.ai/mcp/servers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium">
          <ExternalLink size={12} /> Deploy to OpenClaw →
        </a>
        {server.documentation_url && (
          <a href={server.documentation_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={12} /> Documentation
          </a>
        )}
        {server.repository_url && (
          <a href={server.repository_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={12} /> Source Code
          </a>
        )}
      </GlassCard>
    </div>
  );
}
