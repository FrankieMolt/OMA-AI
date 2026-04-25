'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/Badge';
import { getCategoryIcon, getCategoryColors } from '@/lib/category-icons';
import { getMcpFaviconUrl } from '@/lib/mcp-icons';
import { ExternalLink, Zap, ChevronRight } from 'lucide-react';
import type { MCPSkill } from '@/hooks/useMCPMarketplace';
import { useCompare } from '@/stores/compare-store';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

interface MCPSkillCardProps {
  skill: MCPSkill & { tier?: 'free' | 'premium'; color?: string };
}

// Venice-style card with icon left, name+desc center, pricing right
export function MCPSkillCard({ skill }: MCPSkillCardProps) {
  const { add, remove, isSelected } = useCompare();
  const isCompareSelected = isSelected(skill.id);
  const cat = skill.category?.[0] || 'Utilities';
  const colors = getCategoryColors(cat);
  const faviconUrl = getMcpFaviconUrl(skill.name);
  const CategoryIcon = useMemo(() => getCategoryIcon(cat), [cat]);

  // Determine card styling based on x402
  const cardClass = skill.x402_enabled
    ? 'border-green-500/20 hover:border-green-500/40 hover:shadow-[0_0_30px_rgba(20,241,149,0.06)]'
    : 'border-zinc-800 hover:border-zinc-700';

  return (
    <MotionDiv
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className={`relative p-5 bg-[#0c0c0c] rounded-xl border ${cardClass} transition-all duration-200`}
      >
        {/* x402 glow indicator */}
        {skill.x402_enabled && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
        )}

        {/* Icon + Category (left) */}
        <div className="flex items-start gap-4 mb-3">
          <div className={`p-2.5 rounded-lg ${colors.bg} ${colors.text} border ${colors.border} shrink-0`}>
            {CategoryIcon && <CategoryIcon size={20} />}
          </div>

          {/* Name + Description (center) */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white mb-1.5 truncate">
              {skill.name}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
              {skill.description}
            </p>
          </div>
        </div>

        {/* Category badge row */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge className={`${colors.bg} ${colors.text} ${colors.border} border text-[10px] py-0.5 px-2`}>
            {cat}
          </Badge>
          {skill.x402_enabled && (
            <span className="x402-badge">
              <Zap size={10} className="inline mr-1" />
              x402
            </span>
          )}
          {skill.verified && (
            <span className="price-pill">✓ Verified</span>
          )}
        </div>

        {/* Pricing (right-aligned) + Actions row */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-zinc-800/50">
          {/* Pricing */}
          <div>
            {skill.pricing_usdc === 0 ? (
              <span className="text-lg font-bold text-green-400">FREE</span>
            ) : (
              <span className="text-lg font-bold text-white">
                ${skill.pricing_usdc.toFixed(4)}
                <span className="text-xs text-zinc-500 ml-1">/call</span>
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/mcps/${skill.slug}`}
              className="flex items-center gap-1 px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View <ChevronRight size={12} />
            </Link>
            {skill.repository_url && (
              <Link
                href={skill.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg transition-colors"
              >
                <ExternalLink size={14} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}