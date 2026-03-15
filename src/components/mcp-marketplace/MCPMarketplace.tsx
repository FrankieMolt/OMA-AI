'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { CardSkeleton, InlineLoader } from '@/components/ui/Loading';
import { Search, Filter, SortAsc, Star, ExternalLink, Download, CheckCircle2, AlertCircle } from 'lucide-react';
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
}

export default function MCPMarketplace() {
  const [skills, setSkills] = useState<MCPSkill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<MCPSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all' as string);
  const [verified, setVerified] = useState('all' as string);
  const [sortBy, setSortBy] = useState('rating' as string);
  const [page, setPage] = useState(1);
  const [totalSkills, setTotalSkills] = useState(0);
  const skillsPerPage = 12;

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: (skillsPerPage * 3).toString(),
      });

      const response = await fetch(`/api/mcp/list?${params}`);
      const data = await response.json();

      if (data.success) {
        setSkills(data.data);
        setTotalSkills(data.total || data.data.length);
      } else {
        setError('Failed to fetch MCP skills');
      }
    } catch {
      setError('Error fetching MCP skills');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  // Filter and sort skills
  const processedSkills = useMemo(() => {
    let result = [...skills];

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(skill =>
        skill.name.toLowerCase().includes(searchLower) ||
        skill.description.toLowerCase().includes(searchLower) ||
        skill.category.some(cat => cat.toLowerCase().includes(searchLower))
      );
    }

    // Filter by category
    if (category !== 'all') {
      result = result.filter(skill => skill.category.includes(category));
    }

    // Filter by verified status
    if (verified === 'true') {
      result = result.filter(skill => skill.verified);
    } else if (verified === 'false') {
      result = result.filter(skill => !skill.verified);
    }

    // Sort skills
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'calls':
        result.sort((a, b) => b.total_calls - a.total_calls);
        break;
      case 'price':
        result.sort((a, b) => a.pricing_usdc - b.pricing_usdc);
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return result;
  }, [skills, search, category, verified, sortBy]);

  // Paginate
  const paginatedSkills = useMemo(() => {
    const startIndex = (page - 1) * skillsPerPage;
    const endIndex = startIndex + skillsPerPage;
    setFilteredSkills(processedSkills.slice(startIndex, endIndex));
    return processedSkills;
  }, [processedSkills, page, skillsPerPage]);

  const totalPages = Math.ceil(filteredSkills.length / skillsPerPage);

  const categories = [
    'all',
    'data',
    'ai-ml',
    'finance',
    'social',
    'communication',
    'utility',
    'development',
    'storage',
    'analytics',
    'security',
  ];

  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= roundedRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
          />
        ))}
        <span className="ml-2 text-sm text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = useMemo(() => ({
    total: skills.length,
    verified: skills.filter(s => s.verified).length,
    avgPrice: skills.length > 0 ? skills.reduce((sum, s) => sum + s.pricing_usdc, 0) / skills.length : 0,
    avgRating: skills.length > 0 ? skills.reduce((sum, s) => sum + s.rating, 0) / skills.length : 0,
  }), [skills]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            MCP Marketplace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Discover and integrate <strong className="text-white">MCP (Model Context Protocol)</strong> tools for AI agents.
            Monetize your tools with x402 gasless payments.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <GlassCard className="p-6 text-center hover">
            <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Skills</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <div className="text-3xl font-bold text-green-400 mb-1">{stats.verified}</div>
            <div className="text-sm text-gray-400">Verified</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              ${stats.avgPrice.toFixed(4)}
            </div>
            <div className="text-sm text-gray-400">Avg Price</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {stats.avgRating.toFixed(1)}★
            </div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </GlassCard>
        </motion.div>

        {/* Filters */}
        <GlassCard className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-300" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search MCP skills..."
                  aria-label="Search MCP skills"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Verified */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                value={verified}
                onChange={(e) => setVerified(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                aria-label="Filter by verification status"
              >
                <option value="all">All Skills</option>
                <option value="true">Verified Only</option>
                <option value="false">Unverified Only</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <div className="flex gap-2">
                {['rating', 'calls', 'price', 'newest'].map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                      sortBy === sort
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                    aria-label={`Sort by ${sort}`}
                  >
                    <SortAsc className="w-4 h-4" />
                    {sort.charAt(0).toUpperCase() + sort.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-300">
            Showing <strong className="text-white">{paginatedSkills.length}</strong> of{' '}
            <strong className="text-white">{filteredSkills.length}</strong> skills
          </p>
          {loading && <InlineLoader text="Updating..." />}
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <GlassCard className="p-6 bg-red-900/20 border-red-700/50">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div className="text-red-100">
                  <p className="font-semibold mb-1">Error Loading Skills</p>
                  <p className="text-sm">{error}</p>
                  <button
                    onClick={fetchSkills}
                    className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* No Results */}
        {!loading && paginatedSkills.length === 0 && (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Skills Found</h3>
            <p className="text-gray-300 mb-4">
              {search ? `No results for "${search}"` : 'No skills match your filters.'}
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('all');
                setVerified('all');
              }}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </GlassCard>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </motion.div>
        )}

        {/* Skills Grid */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {paginatedSkills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (skill.id.length % 6) * 0.05 }}
              >
                <GlassCard className="p-6 h-full hover flex flex-col">
                  {/* Category Icon + Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1">
                      {(() => {
                        const cat = skill.category?.[0] || 'Utilities';
                        const Icon = getCategoryIcon(cat);
                        const colors = getCategoryColors(cat);
                        return (
                          <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} border ${colors.border} shrink-0`}>
                            <Icon size={22} />
                          </div>
                        );
                      })()}
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-300 transition-colors">
                          {skill.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          {skill.verified && (
                            <Badge variant="success" className="gap-1">
                              <CheckCircle2 size={14} />
                              Verified
                            </Badge>
                          )}
                          <span className="text-gray-400 text-sm">by @{skill.author}</span>
                        </div>
                      </div>
                    </div>
                    {renderStars(skill.rating)}
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 flex-1 line-clamp-3 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skill.category.map((cat) => {
                      const colors = getCategoryColors(cat);
                      return (
                        <Badge key={cat} className={`${colors.bg} ${colors.text} ${colors.border} border`}>
                          {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Pricing & Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                      <div className="text-2xl font-bold text-white mb-1">
                        ${skill.pricing_usdc.toFixed(4)}
                      </div>
                      <div className="text-xs text-gray-400">per call</div>
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
                    <a
                      href={`/mcps/${skill.slug}`}
                      className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-center font-medium rounded-lg transition-colors"
                    >
                      View Details
                    </a>
                    {skill.repository_url && (
                      <a
                        href={skill.repository_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <ExternalLink size={16} />
                        Code
                      </a>
                    )}
                    <button className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                      <Download size={16} />
                      Install
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  page === pageNum
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16"
        >
          <GlassCard className="p-12 text-center bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 border-purple-700/50">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to Publish Your MCP?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers monetizing their AI tools on OMA-AI.
              Keep 95% of your earnings with x402 gasless payments.
            </p>
            <a
              href="/publish"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 text-purple-600 font-bold rounded-lg transition-colors"
            >
              <Download size={20} />
              Publish Your MCP
            </a>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}
