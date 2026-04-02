'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CheckCircle, Zap } from 'lucide-react';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';
import { getMcpFaviconUrl } from '@/lib/mcp-icons';
import { StarRating } from '@/components/ui/StarRating';
import { useMCPSkillDetail } from '@/hooks/useMCPSkillDetail';
import { MCPHowToUse } from './MCPHowToUse';
import { MCPInstallCard } from './MCPInstallCard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

export default function MCPSkillDetail({ slug }: { slug: string }) {
  const { skill, loading, error } = useMCPSkillDetail(slug);

  // Must be called before any early returns — hook rules require consistent call order
  const cat = skill?.category?.[0] || 'Utilities';
  const CategoryIcon = useMemo(() => getCategoryIcon(cat), [cat]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center py-24">
            <div className="text-xl text-gray-400">Loading skill details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="p-8 bg-red-900/20 border border-red-800 rounded-2xl text-red-400">
            {error || 'Skill not found'}
          </div>
        </div>
      </div>
    );
  }

  const colors = getCategoryColors(cat);
  const faviconUrl = getMcpFaviconUrl(skill.name);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link href="/mcps"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            ← Back to Marketplace
          </Link>
        </MotionDiv>

        {/* Header */}
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="relative shrink-0">
                <div className={`p-3 rounded-2xl ${colors.bg} ${colors.text} border ${colors.border}`}>
                  {CategoryIcon && <CategoryIcon size={32} />}
                </div>
                {faviconUrl && (
                  <Image src={faviconUrl} alt={`${skill?.name ?? 'MCP'} favicon`}
                    width={28}
                    height={28}
                    className="absolute -bottom-1.5 -right-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    unoptimized
                  />
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <h1 className="text-4xl font-bold text-white">{skill.name}</h1>
                  {skill.tier === 'premium' ? (
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-sm rounded-full border border-amber-500/30 font-medium">
                      Premium
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30 font-medium">
                      Free
                    </span>
                  )}
                  {skill.verified && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 text-sm rounded-full">
                      <CheckCircle size={14} />Verified
                    </span>
                  )}
                </div>
                <p className="text-lg text-gray-400">by @{skill.author}</p>
              </div>
            </div>
            <StarRating rating={skill.rating} />
          </div>
        </MotionDiv>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6">

            {/* Description */}
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
              <h2 className="text-lg font-semibold text-white mb-3">About</h2>
              <p className="text-gray-300 leading-relaxed">{skill.description}</p>
              {skill.long_description && skill.long_description !== skill.description && (
                <p className="text-gray-400 mt-3 leading-relaxed">{skill.long_description}</p>
              )}
            </MotionDiv>

            {/* Categories */}
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
              <h2 className="text-lg font-semibold text-white mb-3">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {skill.category.map((c) => {
                  const catColors = getCategoryColors(c);
                  return (
                    <span key={c} className={`px-3 py-1 ${catColors.bg} ${catColors.text} border ${catColors.border} rounded-full text-sm`}>
                      {c}
                    </span>
                  );
                })}
              </div>
            </MotionDiv>

            {/* MCP Endpoint */}
            <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
              <h2 className="text-lg font-semibold text-white mb-3">MCP Endpoint</h2>
              <div className="bg-zinc-950 p-3 rounded-lg font-mono text-sm text-green-400 break-all">
                {skill.mcp_endpoint}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This endpoint uses the streamable-http MCP transport. Compatible with Claude Desktop, Cursor, and OpenClaw.
              </p>
            </MotionDiv>

            {/* x402 Payment */}
            {skill.x402_enabled && (
              <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={18} className="text-yellow-400" />
                  <h2 className="text-lg font-semibold text-white">x402 Payments</h2>
                </div>
                <p className="text-gray-400 text-sm mb-3">
                  This skill uses the x402 (HTTP 402) payment protocol for automatic payments in USDC.
                </p>
                <div className="bg-green-900/20 border border-green-800 p-3 rounded-lg">
                  <div className="text-sm text-green-400">
                    <div className="font-semibold mb-1">Payment Details:</div>
                    <div>• Token: USDC on Base</div>
                    <div>• Cost: ${skill.pricing_usdc.toFixed(6)} USDC per call</div>
                    <div>• Automatic payment on each call via x402</div>
                  </div>
                </div>
              </MotionDiv>
            )}

            {/* How to Use */}
            <MCPHowToUse slug={skill.slug} mcp_endpoint={skill.mcp_endpoint} />
          </MotionDiv>

          {/* Right Column — MCPInstallCard */}
          <div>
            <MCPInstallCard server={{
              slug: skill.slug,
              name: skill.name,
              mcp_endpoint: skill.mcp_endpoint,
              tools_count: skill.tools?.length || skill.total_calls > 0 ? 1 : 0,
              x402_enabled: skill.x402_enabled,
              tier: skill.tier,
              pricing_usdc: skill.pricing_usdc,
              documentation_url: skill.documentation_url,
              repository_url: skill.repository_url || undefined,
              tools: skill.tools,
              color: skill.color,
              rating: skill.rating,
              total_calls: skill.total_calls,
              success_rate: skill.success_rate,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
