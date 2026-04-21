'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';
import { getMcpFaviconUrl } from '@/lib/mcp-icons';
import { CheckCircle2, ExternalLink, Zap, ChevronRight, GitCompare } from 'lucide-react';
import type { MCPSkill } from '@/hooks/useMCPMarketplace';
import { useCompare } from '@/stores/compare-store';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPSkillCardProps {
  skill: MCPSkill & { tier?: 'free' | 'premium'; color?: string };
}

export function MCPSkillCard({ skill }: MCPSkillCardProps) {
  const { add, remove, isSelected } = useCompare();
  const isCompareSelected = isSelected(skill.id);
  const cat = skill.category?.[0] || 'Utilities';
  const colors = getCategoryColors(cat);
  const faviconUrl = getMcpFaviconUrl(skill.name);
  const CategoryIcon = useMemo(() => getCategoryIcon(cat), [cat]);
  return (
    <MotionDiv
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <GlassCard
        className={`p-6 h-full flex flex-col ${skill.x402_enabled ? 'border-green-500/30 shadow-lg shadow-green-500/10' : ''}`}
      >
        {/* Category Icon + Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} border ${colors.border}`}>
              {CategoryIcon && <CategoryIcon size={22} />}
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
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {skill.tier === 'premium' ? (
                  <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full font-semibold">
                    Premium
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 border border-green-500/40 rounded-full font-semibold">
                    Free
                  </span>
                )}
                {skill.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-semibold">
                    <CheckCircle2 size={12} />
                    Verified
                  </span>
                )}
                {skill.x402_enabled && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/40 rounded text-yellow-400 text-xs font-medium">
                    <Zap size={10} className="fill-yellow-500/40" />
                    x402
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">by @{skill.author}</p>
            </div>
          </div>
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
            className="flex-1 px-4 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white text-center font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            View Details <ChevronRight size={14} />
          </Link>
          {skill.repository_url && (
            <Link
              href={skill.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <ExternalLink size={14} />
            </Link>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isCompareSelected) {
                remove(skill.id);
              } else {
                add(skill);
              }
            }}
            className={`px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium ${
              isCompareSelected
                ? 'bg-violet-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white'
            }`}
            title={isCompareSelected ? 'Remove from compare' : 'Add to compare'}
          >
            <GitCompare size={14} />
          </button>
        </div>
      </GlassCard>
    </MotionDiv>
  );
}
