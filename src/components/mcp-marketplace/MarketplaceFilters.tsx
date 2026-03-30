'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Filter, SortAsc } from 'lucide-react';

interface MarketplaceFiltersProps {
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  verified: string;
  setVerified: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  categories: string[];
}

export function MarketplaceFilters({
  search,
  setSearch,
  category,
  setCategory,
  verified,
  setVerified,
  sortBy,
  setSortBy,
  categories,
}: MarketplaceFiltersProps) {
  return (
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
              placeholder="Search by name, category, or description..."
              aria-label="Search MCP skills"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            aria-label="Filter by category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
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
            className="w-full px-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
            {(['rating', 'calls', 'price', 'newest'] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/20 ${
                  sortBy === sort
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700 hover:text-white'
                }`}
                aria-label={`Sort by ${sort}`}
              >
                <SortAsc className="w-4 h-4 mx-auto mb-1" />
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
