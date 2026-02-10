'use client';

import React, { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  Zap,
  Star,
  ArrowRight,
  Search,
  BookOpen,
  Shield,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { LiveStats } from '@/components/LiveStats';
import { TrendingAPIs } from '@/components/TrendingAPIs';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { AnimatedCard, fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { CardSkeleton, StatCardSkeleton } from '@/components/ui/SkeletonLoader';

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

// --- Stat Card Component ---
const StatCard = memo(({ icon: Icon, value, label, isLoading }: { icon: any; value: string; label: string; isLoading?: boolean }) => {
  if (isLoading) {
    return <StatCardSkeleton />;
  }
  
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 md:p-6 text-center rounded-xl cursor-default"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Icon className="w-7 h-7 md:w-8 md:h-8 mx-auto mb-2 text-purple-400" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-white mb-1">
        {value}
      </motion.div>
      <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider font-medium">
        {label}
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

// --- API Card Component ---
const ApiCard = memo(({ service, index }: { service: ApiService; index: number }) => {
  const price = service.price_per_use ?? 0;
  const rating = service.rating ?? 0;
  const provider = service.provider || service.seller_wallet?.substring(0, 10) + '...' || 'Unknown';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.05, 0.5),
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.25 }
      }}
      className="group glass-card p-5 md:p-6 rounded-xl cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 truncate">
            {service.name}
          </h3>
          <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(service.tags || service.capabilities || []).slice(0, 3).map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="tag-chip hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-500/30 transition-colors cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl md:text-2xl font-bold text-white">
            {price === 0 ? (
              <span className="text-green-400">Free</span>
            ) : (
              <>
                ${price.toFixed(3)}
                <span className="text-xs font-normal text-zinc-500 block">/call</span>
              </>
            )}
          </div>
          <div className="flex items-center justify-end gap-1 text-sm text-yellow-400 mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <Shield className="w-4 h-4" />
          <span className="truncate max-w-[100px] md:max-w-[140px]">{provider}</span>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-purple-500/10 transition-colors"
            aria-label={`View documentation for ${service.name}`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Docs</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
            aria-label={`Try ${service.name}`}
          >
            Try Now
          </motion.button>
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
        // Add a small delay for smooth transition
        setTimeout(() => setIsLoading(false), 300);
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
    return uniqueTags.slice(0, 10);
  }, [services]);

  // Stats
  const stats = useMemo(() => {
    const baselineServices = 450;
    const baselineCalls = 12000000;
    
    return {
      totalServices: services.length > 0 ? baselineServices + services.length : 0,
      totalCalls: services.length > 0 ? baselineCalls + services.reduce((sum, s) => sum + (s.calls || 0), 0) : 0,
      avgRating: services.length > 0
        ? (services.reduce((sum, s) => sum + (s.rating || 0), 0) / services.length).toFixed(1)
        : '4.8'
    };
  }, [services]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      {/* Hero Section */}
      <section id="main-content" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                <Sparkles size={16} />
                <span>Now with MCP Server Support</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Discover{' '}
              <span className="gradient-text">
                APIs & MCPs
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Browse, test, and integrate APIs and MCP servers.
              Pay only for what you use with{' '}
              <span className="text-purple-400 font-medium">x402 crypto payments</span>.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-2xl mx-auto mb-8"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={20} aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search APIs, MCPs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-28 py-4 md:py-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Search APIs and MCPs"
                  role="searchbox"
                  id="main-search"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200"
                  aria-label="Submit search"
                >
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500 mb-12"
            >
              <span>Popular:</span>
              {['GPT-4', 'Solana', 'MCP', 'Image Gen'].map((term, i) => (
                <motion.button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  whileHover={{ scale: 1.05, color: '#a855f7' }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-purple-400 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                >
                  {term}
                </motion.button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto"
            >
              <motion.div variants={staggerItem}>
                <StatCard icon={Code} value={`${stats.totalServices}+`} label="APIs & MCPs" isLoading={isLoading} />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatCard icon={Zap} value={`${(stats.totalCalls / 1000000).toFixed(0)}M+`} label="Total Calls" isLoading={isLoading} />
              </motion.div>
              <motion.div variants={staggerItem}>
                <StatCard icon={Star} value={stats.avgRating} label="Avg Rating" isLoading={isLoading} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-zinc-500"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Stats */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-zinc-900/20 border-y border-zinc-800/30">
        <div className="max-w-7xl mx-auto">
          <LiveStats />
        </div>
      </section>

      {/* Trending APIs */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <TrendingAPIs />
        </div>
      </section>

      {/* Featured APIs */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Zap className="text-yellow-500" size={28} aria-hidden="true" />
              Featured APIs & MCPs
            </h2>
            <Link
              href="/marketplace"
              className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              aria-label="View all APIs"
            >
              <span className="hidden sm:inline">View All</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-zinc-400"
            >
              <Shield size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-xl">No featured services yet. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <nav aria-label="Filter APIs by category" className="sticky top-16 md:top-20 z-30 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <TrendingUp className="text-zinc-500 shrink-0" size={18} aria-hidden="true" />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
                aria-pressed={selectedCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* All APIs */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold">
              {selectedCategory === 'all' ? 'All APIs & MCPs' : selectedCategory}
              <span className="text-zinc-500 text-base font-normal ml-3">
                ({filteredServices.length} results)
              </span>
            </h2>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <label htmlFor="sort-select" className="hidden sm:inline">Sort by:</label>
              <select
                id="sort-select"
                className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all cursor-pointer"
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
              {[...Array(9)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-12 text-center rounded-2xl"
            >
              <Shield size={64} className="mx-auto mb-4 text-red-400" />
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">Failed to Load Services</h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">{error}</p>
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-6 py-3 rounded-xl"
              >
                Try Again
              </motion.button>
            </motion.div>
          ) : filteredServices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 md:py-24"
            >
              <Search className="w-16 h-16 mx-auto mb-4 text-zinc-600" aria-hidden="true" />
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-white">No APIs found</h3>
              <p className="text-zinc-400 mb-6">Try adjusting your search or category filter</p>
              <motion.button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary px-6 py-3 rounded-xl"
              >
                Clear Filters
              </motion.button>
            </motion.div>
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
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-zinc-900/50 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      <Footer />
    </div>
  );
}
