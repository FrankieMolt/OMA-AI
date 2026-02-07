'use client';

import React, { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  Zap,
  Star,
  ExternalLink,
  Filter,
  ArrowRight,
  Search,
  BookOpen,
  Shield,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { LiveStats } from '@/components/LiveStats';
import { TrendingAPIs } from '@/components/TrendingAPIs';

// --- API Marketplace Types ---
interface ApiService {
  id: string;
  name: string;
  description: string;
  category?: string;
  rating?: number;
  price_per_use?: number;
  priceType?: 'per_call' | 'monthly' | 'free';
  calls?: number;
  endpoint?: string;
  tags?: string[];
  featured?: boolean;
  provider?: string;
  seller_wallet?: string;
  capabilities?: string[];
}

// --- Skeleton Component for Loading State ---
const ApiCardSkeleton = memo(() => (
  <div className="glass-card p-6 rounded-xl">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded mb-3 skeleton" />
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
        </div>
      </div>
      <div className="text-right ml-4 w-20">
        <div className="h-7 w-full bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-2/3 ml-auto bg-zinc-800 rounded skeleton" />
        <div className="h-3 w-full mt-1 bg-zinc-800 rounded skeleton" />
      </div>
    </div>
    <div className="pt-4 border-t border-zinc-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-zinc-800 skeleton" />
          <div className="h-4 w-24 bg-zinc-800 rounded skeleton" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-zinc-800 rounded-lg skeleton" />
          <div className="h-8 w-20 bg-purple-600/50 rounded-lg skeleton" />
        </div>
      </div>
    </div>
  </div>
));

ApiCardSkeleton.displayName = 'ApiCardSkeleton';

// --- Stat Card Component ---
const StatCard = memo(({ icon: Icon, value, label, isLoading }: { icon: any; value: string; label: string; isLoading?: boolean }) => (
  <div className="glass-card p-6 text-center">
    {isLoading ? (
      <>
        <div className="w-8 h-8 mx-auto mb-2 bg-zinc-800 rounded-lg skeleton" />
        <div className="h-8 w-20 mx-auto mb-1 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded skeleton" />
      </>
    ) : (
      <>
        <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
      </>
    )}
  </div>
));

StatCard.displayName = 'StatCard';

// --- API Card Component ---
const ApiCard = memo(({ service, index }: { service: ApiService; index: number }) => {
  const price = service.price_per_use ?? 0;
  const rating = service.rating ?? 0;
  const provider = service.provider || service.seller_wallet?.substring(0, 10) + '...' || 'Unknown';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      className="glass-card p-6 rounded-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{service.name}</h3>
          <p className="text-sm text-zinc-400 mb-3">{service.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {(service.tags || service.capabilities || []).slice(0, 3).map((tag, i) => (
              <span key={i} className="tag-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-bold mb-1">
            {price === 0 ? 'Free' : `$${price.toFixed(3)}`}
            {price > 0 && <span className="text-sm font-normal text-zinc-500">/call</span>}
          </div>
          <div className="flex items-center justify-end gap-1 text-sm text-yellow-400">
            <Star className="w-4 h-4 fill-current" />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Shield className="w-4 h-4" />
          <span>{provider}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors"
            aria-label={`View documentation for ${service.name}`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Docs</span>
          </button>
          <button
            className="btn-primary px-4 py-2 rounded-lg text-sm"
            aria-label={`Try ${service.name}`}
          >
            Try Now
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ApiCard.displayName = 'ApiCard';

// --- Main Page Component ---
export default function MarketplaceHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<ApiService[]>([]);
  const [error, setError] = useState('');

  // Fetch services from API on mount
  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch('/api/services?limit=100');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch services');
        }

        setServices(data.services || []);
      } catch (err: any) {
        console.error('Error fetching services:', err);
        setError(err.message || 'Failed to load services');
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = selectedCategory === 'all' ||
        service.category === selectedCategory ||
        service.tags?.includes(selectedCategory);

      const matchesSearch = searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, services]);

  // Featured services
  const featuredServices = useMemo(() => {
    return filteredServices
      .filter(s => s.featured)
      .slice(0, 6);
  }, [filteredServices]);

  // Categories derived from tags
  const categories = useMemo(() => {
    const allTags = services.flatMap(s => s.tags || s.capabilities || []);
    const uniqueTags = ['all', ...Array.from(new Set(allTags))];
    return uniqueTags.slice(0, 10); // Limit to 10 categories
  }, [services]);

  // Stats
  const stats = useMemo(() => ({
    totalServices: services.length,
    totalCalls: services.reduce((sum, s) => sum + (s.calls || 0), 0),
    avgRating: services.length > 0
      ? (services.reduce((sum, s) => sum + (s.rating || 0), 0) / services.length).toFixed(1)
      : '0.0'
  }), [services]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      {/* Hero Section */}
      <section id="main-content" className="section-spacing">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Discover <span className="gradient-text">APIs & MCPs</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Browse, test, and integrate APIs and MCP servers.
              Pay only for what you use with x402 crypto payments.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search APIs, MCPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                aria-label="Search APIs and MCPs"
                role="searchbox"
                id="main-search"
              />
              <button
                type="submit"
                form="search-form"
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2 rounded-lg"
                aria-label="Submit search"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
              <StatCard icon={Code} value={`${stats.totalServices}+`} label="APIs & MCPs" isLoading={isLoading} />
              <StatCard icon={Zap} value={`${(stats.totalCalls / 1000000).toFixed(0)}M+`} label="Total Calls" isLoading={isLoading} />
              <StatCard icon={Star} value={stats.avgRating} label="Avg Rating" isLoading={isLoading} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-8 px-6 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto">
          <LiveStats />
        </div>
      </section>

      {/* Trending APIs */}
      <section className="section-spacing bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <TrendingAPIs />
        </div>
      </section>

      {/* Featured APIs */}
      <section className="section-spacing bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Zap className="text-yellow-500" size={28} aria-hidden="true" />
              Featured APIs & MCPs
            </h2>
            <Link
              href="/marketplace"
              className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
              aria-label="View all APIs"
            >
              View All
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <ApiCardSkeleton key={i} />)}
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-400">
              <Shield size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">No featured services yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <nav aria-label="Filter APIs by category" className="py-8 px-6 border-b border-zinc-800 sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="text-zinc-500 shrink-0" size={18} aria-hidden="true" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* All APIs */}
      <section className="section-spacing">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">
              {selectedCategory === 'all' ? 'All APIs & MCPs' : selectedCategory}
              <span className="text-zinc-500 text-lg font-normal ml-3">
                ({filteredServices.length} results)
              </span>
            </h2>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <label htmlFor="sort-select">Sort by:</label>
              <select
                id="sort-select"
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Sort APIs"
              >
                <option>Popularity</option>
                <option>Rating</option>
                <option>Price</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => <ApiCardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="glass-card p-8 text-center">
              <Shield size={48} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl font-bold mb-2">Failed to Load Services</h3>
              <p className="text-zinc-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="empty-state">
              <Search className="w-16 h-16 empty-state-icon" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-2">No APIs found</h3>
              <p className="empty-state-text">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
}
