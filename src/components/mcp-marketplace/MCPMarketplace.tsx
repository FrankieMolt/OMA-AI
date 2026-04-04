'use client';

import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { CardSkeleton, InlineLoader } from '@/components/ui/Loading';
import { Search, AlertCircle, Download } from 'lucide-react';
import { useMCPMarketplace } from '@/hooks/useMCPMarketplace';
import { MarketplaceFilters } from './MarketplaceFilters';
import { MCPSkillCard } from './MCPSkillCard';

const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

export default function MCPMarketplace() {
  const {
    skills, loading, error, search, setSearch,
    category, setCategory, verified, setVerified,
    sortBy, setSortBy, page, setPage, totalPages, categories, stats,
  } = useMCPMarketplace({ skillsPerPage: 12 });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoize stats display values
  const statsDisplay = useMemo(() => ({
    total: stats.total.toLocaleString(),
    x402Enabled: stats.x402Enabled.toLocaleString(),
    avgPrice: `$${stats.avgPrice.toFixed(4)}`,
    avgRating: `${stats.avgRating.toFixed(1)}★`,
  }), [stats]);

  // Memoize pagination range
  const paginationRange = useMemo(() => {
    const range: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">MCP Marketplace</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            Discover and integrate <strong className="text-white">MCP (Model Context Protocol)</strong> tools for AI agents.
          </p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard value={statsDisplay.total} label="Total Skills" />
          <StatCard value={statsDisplay.x402Enabled} label="x402 Enabled" valueClass="text-green-400" />
          <StatCard value={statsDisplay.avgPrice} label="Avg Price / call" valueClass="text-yellow-400" />
          <StatCard value={statsDisplay.avgRating} label="Avg Rating" valueClass="text-yellow-400" />
        </MotionDiv>

        <MarketplaceFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory}
          verified={verified} setVerified={setVerified} sortBy={sortBy} setSortBy={setSortBy} categories={categories} />

        <div className="flex items-center justify-between mb-6">
          <p className="text-white font-medium">Showing <strong>{skills.length}</strong> of <strong>{stats.total}</strong> skills</p>
          {loading && <InlineLoader text="Updating..." />}
        </div>

        {error && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <GlassCard className="p-6 bg-red-900/20 border-red-700/50">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div className="text-red-100"><p className="font-semibold mb-1">Error Loading Skills</p><p className="text-sm">{error}</p></div>
              </div>
            </GlassCard>
          </MotionDiv>
        )}

        {!loading && skills.length === 0 && !error && (
          <GlassCard className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4"><Search className="w-8 h-8 text-gray-500" /></div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">No Skills Found</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">{search ? `No results for "${search}"` : 'No skills match your filters.'}</p>
            <button onClick={() => { setSearch(''); setCategory('all'); setVerified('all'); }}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors min-h-[44px]">Clear Filters</button>
          </GlassCard>
        )}

        {loading && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (<CardSkeleton key={i} />))}
          </MotionDiv>
        )}

        {!loading && skills.length > 0 && (
          <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (<MCPSkillCard key={skill.id} skill={skill} />))}
          </MotionDiv>
        )}

        {!loading && totalPages > 1 && (
          <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[100px]">Previous</button>
            {paginationRange[0] > 1 && (<><button onClick={() => handlePageChange(1)} className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white">1</button>
              {paginationRange[0] > 2 && <span className="text-zinc-500 px-2">...</span>}</>)}
            {paginationRange.map((pageNum) => (
              <button key={pageNum} onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-lg font-medium transition-colors ${page === pageNum ? 'bg-purple-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}`}>{pageNum}</button>
            ))}
            {paginationRange[paginationRange.length - 1] < totalPages && (
              <>{paginationRange[paginationRange.length - 1] < totalPages - 1 && <span className="text-zinc-500 px-2">...</span>}
                <button onClick={() => handlePageChange(totalPages)} className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white">{totalPages}</button></>)}
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[100px]">Next</button>
          </MotionDiv>
        )}

        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16">
          <GlassCard className="p-8 md:p-12 text-center bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 border-purple-700/50">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to Publish Your MCP?</h2>
            <p className="text-lg md:text-xl text-purple-100 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">Join thousands of developers monetizing their AI tools on OMA-AI. Keep 95% of your earnings with x402 gasless payments.</p>
            <Link href="/publish" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 bg-white hover:bg-gray-100 text-purple-600 font-bold rounded-lg transition-colors min-h-[44px]">
              <Download size={20} />Publish Your MCP
            </Link>
          </GlassCard>
        </MotionDiv>
      </div>
    </div>
  );
}

function StatCard({ value, label, valueClass = 'text-white' }: { value: string; label: string; valueClass?: string }) {
  return (<GlassCard className="p-4 md:p-6 text-center hover:border-zinc-700 transition-colors">
    <div className={`text-2xl md:text-3xl font-bold mb-1 ${valueClass}`}>{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </GlassCard>);
}
