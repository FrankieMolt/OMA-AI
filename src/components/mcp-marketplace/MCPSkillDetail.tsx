'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Star, CheckCircle, Clock, Zap } from 'lucide-react';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';

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
  const [installing, setInstalling] = useState(false);

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

  const handleInstall = async () => {
    try {
      setInstalling(true);

      const installCmd = `npm install oma-${skill?.slug}`;
      await navigator.clipboard.writeText(installCmd);

      alert(`Installation command copied to clipboard:\n${installCmd}\n\nPaste in your terminal to install!`);
    } catch {
      console.error('Failed to copy to clipboard:');
    } finally {
      setInstalling(false);
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
        <motion.div
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
        </motion.div>

        {/* Header */}
        <motion.div
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
                return (
                  <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border} shrink-0`}>
                    <Icon size={32} />
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
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Description */}
            <motion.div
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
            </motion.div>

            {/* Categories */}
            <motion.div
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
            </motion.div>

            {/* MCP Endpoint */}
            <motion.div
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
            </motion.div>

            {/* x402 Payment */}
            {skill.x402_enabled && (
              <motion.div
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
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Actions & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Install Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                Install
              </h3>
              <button
                type="button"
                onClick={handleInstall}
                disabled={installing}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {installing ? (
                  <>
                    <Clock size={18} className="animate-spin" />
                    Installing...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Copy Install Command
                  </>
                )}
              </button>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
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
            </motion.div>

            {/* Stats Card */}
            <motion.div
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
            </motion.div>

            {/* Links */}
            {skill.repository_url && (
              <motion.div
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
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}