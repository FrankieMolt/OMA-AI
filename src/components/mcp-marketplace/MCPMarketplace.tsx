'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SkillCardSkeleton } from '@/components/loading/Skeletons';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    category: 'all' as string,
    verified: 'all' as string,
    search: '' as string,
    sort: 'rating' as string,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSkills();
  }, [page, filters]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.verified !== 'all' && { verified: filters.verified }),
        ...(filters.search && { search: filters.search }),
        sort: filters.sort,
      });

      const response = await fetch(`/api/mcp/list?${params}`);
      const data = await response.json();

      if (data.success) {
        setSkills(data.data);
      } else {
        setError('Failed to fetch MCP skills');
      }
    } catch (err) {
      setError('Error fetching MCP skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'all',
    'search',
    'storage',
    'memory',
    'ai',
    'learning',
    'dev',
    'blockchain',
    'security',
    'weather',
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= Math.round(rating)
                ? 'text-yellow-400'
                : 'text-gray-600'
            }
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-24 pb-12">
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
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover and integrate MCP (Model Context Protocol) tools for AI agents.
            Monetize your tools with x402 payments.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl"
        >
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search MCP skills..."
                aria-label="Search MCP skills"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-green-500"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                value={filters.verified}
                onChange={(e) => setFilters({ ...filters, verified: e.target.value })}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-green-500"
                aria-label="Filter by verification status"
              >
                <option value="all">All Skills</option>
                <option value="true">Verified Only</option>
                <option value="false">Unverified Only</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sort By
            </label>
            <div className="flex gap-2">
              {['rating', 'calls', 'price', 'newest'].map((sort) => (
                <button
                  key={sort}
                  onClick={() => setFilters({ ...filters, sort })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    filters.sort === sort
                      ? 'bg-zinc-700 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                  aria-label={`Sort by ${sort}`}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-sm text-gray-400">Total Skills</div>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-2xl font-bold text-green-400">4</div>
            <div className="text-sm text-gray-400">Verified</div>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">$0.002</div>
            <div className="text-sm text-gray-400">Avg Price</div>
          </div>
          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-2xl font-bold text-yellow-400">4.2</div>
            <div className="text-sm text-gray-400">Avg Rating</div>
          </div>
        </motion.div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Loading */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkillCardSkeleton key={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {skill.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {skill.verified && (
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full">
                          ✓ Verified
                        </span>
                      )}
                      <span className="text-gray-400 text-sm">
                        @{skill.author}
                      </span>
                    </div>
                  </div>
                  {renderStars(skill.rating)}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {skill.description}
                </p>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {skill.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Pricing & Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div>
                    <div className="text-lg font-bold text-white">
                      ${skill.pricing_usdc.toFixed(4)}
                    </div>
                    <div className="text-xs text-gray-400">per call</div>
                  </div>
                  <div className="text-right text-sm text-gray-400">
                    <div>{skill.total_calls.toLocaleString()} calls</div>
                    <div>{skill.success_rate.toFixed(1)}% success</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors font-medium">
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Install
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
