'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';
import { getMcpFaviconUrl } from '@/lib/mcp-icons';
import { CheckCircle2, ExternalLink, Download, Zap } from 'lucide-react';
import type { MCPSkill } from '@/hooks/useMCPMarketplace';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPSkillCardProps {
  skill: MCPSkill;
}

export function MCPSkillCard({ skill }: MCPSkillCardProps) {
  const cat = skill.category?.[0] || 'Utilities';
  const colors = getCategoryColors(cat);
  const faviconUrl = getMcpFaviconUrl(skill.name);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (skill.id.length % 6) * 0.05 }}
    >
      <GlassCard
        className={`p-6 h-full flex flex-col ${skill.x402_enabled ? 'border-green-500/30 shadow-lg shadow-green-500/10' : ''}`}
      >
        {/* Category Icon + Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} border ${colors.border}`}>
              {/* eslint-disable-next-line react-hooks/static-components */}
              {(() => { const Icon = getCategoryIcon(cat); return <Icon size={22} />; })()}
            </div>
            {faviconUrl && (
              <Image
                src={faviconUrl}
                alt={`${skill.name} favicon`}
                width={20}
                height={20}
                className="absolute -bottom-1 -right-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                unoptimized
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-300 transition-colors">
                {skill.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                {skill.verified && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-semibold shadow-lg shadow-green-500/20">
                    <CheckCircle2 size={14} className="fill-green-500/30" />
                    Verified
                  </span>
                )}
                <span className="text-gray-400 text-sm">by @{skill.author}</span>
              </div>
              {skill.x402_enabled && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded text-yellow-400 text-xs font-medium">
                  <Zap size={12} className="fill-yellow-500/40" />
                  x402
                </span>
              )}
            </div>
          </div>
          <StarRating rating={skill.rating} size={14} />
        </div>

        {/* Description */}
        <p className="text-gray-300 mb-4 flex-1 line-clamp-3 leading-relaxed">
          {skill.description}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(skill.category || ['Utilities']).map((c) => {
            const catColors = getCategoryColors(c);
            return (
              <Badge key={c} className={`${catColors.bg} ${catColors.text} ${catColors.border} border`}>
                {c}
              </Badge>
            );
          })}
        </div>

        {/* Pricing & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
          <div>
            {skill.pricing_usdc === 0 ? (
              <span className="inline-flex items-center px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-lg font-bold">
                FREE
              </span>
            ) : (
              <>
                <div className="text-2xl font-bold text-white mb-1">
                  ${skill.pricing_usdc.toFixed(4)}
                </div>
                <div className="text-xs text-gray-400">per call</div>
              </>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">
              {skill.total_calls.toLocaleString()} calls
            </div>
            <div className={`text-sm font-medium ${skill.success_rate >= 95 ? 'text-green-400' : skill.success_rate >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
              {skill.success_rate.toFixed(1)}% success
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <Link
            href={`/mcps/${skill.slug}`}
            className="flex-1 px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white text-center font-medium rounded-lg transition-colors"
          >
            View Details
          </Link>
          {skill.repository_url && (
            <Link
              href={skill.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Code
            </Link>
          )}
          <button className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            <Download size={16} />
            Install
          </button>
        </div>
      </GlassCard>
    </MotionDiv>
  );
}
