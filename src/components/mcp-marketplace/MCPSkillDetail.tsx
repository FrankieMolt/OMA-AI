'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight, Star, CheckCircle, Copy, Terminal, BookOpen, ExternalLink, Zap } from 'lucide-react';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';
import { getMcpFaviconUrl } from '@/lib/mcp-icons';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPSkill {
  id: string;
  name: string;
  slug: string;
  category: string[];
  description: string;
  author: string;
  repository_url: string | null;
  documentation_url: string | null;
  mcp_endpoint: string;
  pricing_usdc: number;
  x402_enabled: boolean;
  verified: boolean;
  rating: number;
  total_calls: number;
  success_rate: number;
  created_at: string;
}

export default function MCPSkillDetail({ slug }: { slug: string }) {
  const [skill, setSkill] = useState<MCPSkill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchSkill = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/mcp/skill/${slug}`);
      const data = await response.json();

      if (data.success) {
        setSkill(data.data);
      } else {
        setError('Skill not found');
      }
    } catch {
      setError('Error fetching skill details');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchSkill();
  }, [fetchSkill]);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-600'
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-24">
            <div className="text-xl text-gray-400">Loading skill details...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !skill) {
    return (
      <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 bg-red-900/20 border border-red-800 rounded-2xl text-red-400">
            {error || 'Skill not found'}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Marketplace
          </Link>
        </MotionDiv>

        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4 flex-1">
              {(() => {
                const cat = skill.category?.[0] || 'Utilities';
                const Icon = getCategoryIcon(cat);
                const colors = getCategoryColors(cat);
                const faviconUrl = getMcpFaviconUrl(skill.name);
                return (
                  <div className="relative shrink-0">
                    <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border}`}>
                      <Icon size={32} />
                    </div>
                    {faviconUrl && (
                      <img
                        src={faviconUrl}
                        alt=""
                        className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </div>
                );
              })()}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-4xl font-bold text-white">
                    {skill.name}
                  </h1>
                  {skill.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full">
                      <CheckCircle size={14} />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-400">
                  @{skill.author}
                </p>
              </div>
            </div>
            {renderStars(skill.rating)}
          </div>
        </MotionDiv>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <MotionDiv
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                About
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {skill.description}
              </p>
            </MotionDiv>

            {/* Categories */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {skill.category.map((cat) => {
                  const colors = getCategoryColors(cat);
                  return (
                    <span
                      key={cat}
                      className={`px-3 py-1 ${colors.bg} ${colors.text} border ${colors.border} rounded-full text-sm`}
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>
            </MotionDiv>

            {/* MCP Endpoint */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h2 className="text-lg font-semibold text-white mb-3">
                MCP Endpoint
              </h2>
              <div className="bg-zinc-950 p-3 rounded-lg font-mono text-sm text-gray-400 break-all">
                {skill.mcp_endpoint}
              </div>
            </MotionDiv>

            {/* x402 Payment */}
            {skill.x402_enabled && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-yellow-400" />
                  <h2 className="text-lg font-semibold text-white">
                    x402 Payments
                  </h2>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  This skill uses the x402 (HTTP 402) payment protocol for automatic payments in USDC.
                </p>
                <div className="bg-green-900/20 border border-green-800 p-3 rounded-lg">
                  <div className="text-sm text-green-400">
                    <div className="font-semibold mb-1">Payment Details:</div>
                    <div>• Token: USDC on Base</div>
                    <div>• Cost: ${skill.pricing_usdc.toFixed(6)} USDC per call</div>
                    <div>• Automatic payment on each call</div>
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* How to Use */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={18} className="text-purple-400" />
                <h2 className="text-lg font-semibold text-white">
                  How to Use
                </h2>
              </div>
              
              {/* MCP Endpoint */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Terminal size={14} />
                  MCP Endpoint
                </h3>
                <div className="bg-zinc-950 p-3 rounded-lg flex items-center justify-between gap-2">
                  <code className="text-sm text-green-400 break-all flex-1">
                    {skill.mcp_endpoint}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(skill.mcp_endpoint)}
                    className="p-1.5 hover:bg-zinc-800 rounded transition-colors shrink-0"
                    title="Copy endpoint"
                  >
                    <Copy size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* OpenClaw Configuration */}
              <div className="mb-5">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  OpenClaw Configuration
                </h3>
                <div className="bg-zinc-950 p-3 rounded-lg">
                  <pre className="text-xs text-gray-400 overflow-x-auto">{`{
  "mcp": {
    "servers": {
      "${skill.slug}": {
        "transport": "streamable-http",
        "url": "${skill.mcp_endpoint}",
        "headers": {
          "Authorization": "Bearer YOUR_API_KEY"
        }
      }
    }
  }
}`}</pre>
                </div>
              </div>

              {/* Claude Desktop Configuration */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Claude Desktop Configuration
                </h3>
                <div className="bg-zinc-950 p-3 rounded-lg">
                  <pre className="text-xs text-gray-400 overflow-x-auto">{`{
  "mcpServers": {
    "${skill.slug}": {
      "command": "npx",
      "args": ["-y", "@oma-ai/mcp-cli", "${skill.slug}"],
      "env": {
        "MCP_ENDPOINT": "${skill.mcp_endpoint}",
        "MCP_API_KEY": "your-api-key"
      }
    }
  }
}`}</pre>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>

          {/* Right Column - Actions & Stats */}
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Connect to OpenClaw
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Add this MCP server to your OpenClaw or Claude Desktop config.
              </p>

              {/* OpenClaw config block */}
              <div className="bg-zinc-950 p-3 rounded-lg mb-3">
                <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all">{`{
  "mcp": {
    "servers": {
      "${skill.slug}": {
        "transport": "streamable-http",
        "url": "${skill.mcp_endpoint}"
      }
    }
  }
}`}</pre>
              </div>
              <button
                onClick={() => copyToClipboard(`{
  "mcp": {
    "servers": {
      "${skill.slug}": {
        "transport": "streamable-http",
        "url": "${skill.mcp_endpoint}"
      }
    }
  }
}`, 'openclaw')}
                className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 mb-2"
              >
                {copiedId === 'openclaw' ? (
                  <><CheckCircle size={16} /> Copied!</>
                ) : (
                  <><Copy size={16} /> Copy OpenClaw Config</>
                )}
              </button>

              {/* Claude Desktop config block */}
              <div className="bg-zinc-950 p-3 rounded-lg mb-3">
                <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap break-all">{`{
  "mcpServers": {
    "${skill.slug}": {
      "command": "npx",
      "args": ["-y", "@oma-ai/mcp-cli", "${skill.slug}"]
    }
  }
}`}</pre>
              </div>
              <button
                onClick={() => copyToClipboard(`{
  "mcpServers": {
    "${skill.slug}": {
      "command": "npx",
      "args": ["-y", "@oma-ai/mcp-cli", "${skill.slug}"]
    }
  }
}`, 'claude')}
                className="w-full px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
              >
                {copiedId === 'claude' ? (
                  <><CheckCircle size={16} /> Copied!</>
                ) : (
                  <><Copy size={16} /> Copy Claude Desktop Config</>
                )}
              </button>

              {skill.documentation_url && (
                <a
                  href={skill.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
                >
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
              <h3 className="text-lg font-semibold text-white mb-4">
                Pricing
              </h3>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="text-3xl font-bold text-white">
                    ${skill.pricing_usdc.toFixed(4)}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  USDC per call
                </div>
              </div>
            </MotionDiv>

            {/* Stats Card */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Calls</span>
                  <span className="text-xl font-bold text-white">
                    {skill.total_calls.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-xl font-bold text-green-400">
                    {skill.success_rate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating</span>
                  <span className="text-xl font-bold text-yellow-400">
                    {skill.rating.toFixed(1)} ★
                  </span>
                </div>
              </div>
            </MotionDiv>

            {/* Links */}
            {skill.repository_url && (
              <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="space-y-2"
              >
                <a
                  href={skill.repository_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <span>Source Code</span>
                  <ArrowUpRight size={16} />
                </a>
                {skill.documentation_url && (
                  <a
                    href={skill.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <span>Documentation</span>
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </MotionDiv>
            )}
          </MotionDiv>
        </div>
      </div>
    </main>
  );
}