'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface SearchFilters {
  category: string;
  priceRange: [number, number];
  tags: string[];
  sortBy: 'relevance' | 'newest' | 'rating' | 'price_low' | 'price_high';
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    priceRange: [0, 100],
    tags: [],
    sortBy: 'relevance'
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock categories/tags for filter UI
  const categories = ['AI & ML', 'Blockchain', 'Data', 'Infrastructure', 'Security'];
  const popularTags = ['gpt', 'image', 'analytics', 'solana', 'base', 'mcp'];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (filters.category !== 'all') params.append('category', filters.category);
      params.append('sort', filters.sortBy);
      
      // Call API
      const res = await fetch(`/api/services?${params.toString()}`);
      const data = await res.json();
      setResults(data.services || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Filters</h2>
              <button 
                onClick={() => setFilters({ category: 'all', priceRange: [0, 100], tags: [], sortBy: 'relevance' })}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Reset
              </button>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-400">Category</h3>
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-sm focus:border-purple-500 outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-zinc-400">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all ${
                      filters.tags.includes(tag)
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for APIs, models, or agents..."
                className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:border-purple-500 outline-none text-lg transition-all"
              />
            </div>

            {/* Sort & Count */}
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span>{results.length} results found</span>
              <div className="flex items-center gap-2">
                <span>Sort by:</span>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                  className="bg-transparent border-none text-white font-medium focus:ring-0 cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Top Rated</option>
                  <option value="price_low">Price: Low to High</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.map((service) => (
                  <Card key={service.id} hoverable className="flex flex-col h-full">
                    <CardHeader>
                      <CardTitle>{service.name}</CardTitle>
                      <div className="text-xs text-purple-400 font-mono mt-1">{service.category}</div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-zinc-400 line-clamp-2">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.tags?.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-zinc-800 rounded text-xs text-zinc-500">#{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                    <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                      <span className="font-bold">${service.price_per_use || service.price} <span className="text-xs text-zinc-500 font-normal">/ call</span></span>
                      <button className="text-sm text-white bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors">
                        View Details
                      </button>
                    </div>
                  </Card>
                ))}
                
                {results.length === 0 && !loading && (
                  <div className="col-span-full text-center py-20 bg-zinc-900/30 rounded-xl border border-zinc-800 border-dashed">
                    <p className="text-zinc-500">No results found matching your criteria.</p>
                    <button 
                      onClick={() => { setQuery(''); setFilters({ category: 'all', priceRange: [0, 100], tags: [], sortBy: 'relevance' }); }}
                      className="mt-4 text-purple-400 hover:underline"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
