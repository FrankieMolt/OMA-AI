'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Code,
  Zap,
  Shield,
  Star,
  ExternalLink,
  Play,
  Filter,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { CardSkeleton } from '@/components/ui/SkeletonLoader';
import { staggerContainer, staggerItem } from '@/lib/animations';

// --- API Marketplace Types ---
interface ApiService {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  priceType: 'per_call' | 'monthly' | 'free';
  calls: number;
  endpoint: string;
  tags: string[];
  featured: boolean;
  provider: string;
}

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch services from API on mount
  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
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
        // Use fallback data
        setServices(fallbackServices);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    
    fetchServices();
  }, []);

  // Fallback data
  const fallbackServices: ApiService[] = [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Advanced language model for complex reasoning and code generation',
      category: 'AI & ML',
      rating: 4.9,
      price: 0.01,
      priceType: 'per_call',
      calls: 1250000,
      endpoint: '/api/v1/chat/completions',
      tags: ['llm', 'chat', 'code'],
      featured: true,
      provider: 'OpenAI'
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      description: 'Anthropic\'s most capable AI assistant for analysis and writing',
      category: 'AI & ML',
      rating: 4.8,
      price: 0.015,
      priceType: 'per_call',
      calls: 850000,
      endpoint: '/api/v1/messages',
      tags: ['llm', 'analysis', 'writing'],
      featured: true,
      provider: 'Anthropic'
    },
    {
      id: 'github-mcp',
      name: 'GitHub MCP Server',
      description: 'Connect your agents to GitHub repositories, issues, and PRs via Model Context Protocol',
      category: 'MCP Servers',
      rating: 4.9,
      price: 0,
      priceType: 'free',
      calls: 500000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/github',
      tags: ['mcp', 'github', 'dev-tools'],
      featured: true,
      provider: 'Model Context Protocol'
    },
    {
      id: 'brave-search-mcp',
      name: 'Brave Search MCP',
      description: 'Enable web search capabilities for your agents using Brave Search API',
      category: 'MCP Servers',
      rating: 4.8,
      price: 0.001,
      priceType: 'per_call',
      calls: 200000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/brave-search',
      tags: ['mcp', 'search', 'web'],
      featured: false,
      provider: 'Brave Software'
    },
    {
      id: 'image-gen',
      name: 'Image Generator',
      description: 'Create stunning images from text descriptions in seconds',
      category: 'AI & ML',
      rating: 4.4,
      price: 0.02,
      priceType: 'per_call',
      calls: 600000,
      endpoint: '/api/v1/images/generate',
      tags: ['image', 'generation', 'creative'],
      featured: true,
      provider: 'OMA Network'
    },
    {
      id: 'payment-processing',
      name: 'x402 Payment Gateway',
      description: 'Accept crypto payments via x402 protocol (Base network)',
      category: 'Finance',
      rating: 4.9,
      price: 0.002,
      priceType: 'per_call',
      calls: 1800000,
      endpoint: '/api/v1/payments/x402',
      tags: ['crypto', 'payments', 'base'],
      featured: true,
      provider: 'OMA Network'
    }
  ];

  const apiServices = services.length > 0 ? services : fallbackServices;
  const categories = ['all', 'MCP Servers', 'AI & ML', 'Blockchain', 'Data', 'Communication', 'Finance'];

  const filteredServices = apiServices.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredServices = apiServices.filter(s => s.featured);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xl md:text-2xl font-bold gradient-text">
                OMA-AI
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="text-sm md:text-base text-zinc-400">API Marketplace</span>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <Link 
                href="/docs" 
                className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <BookOpen size={16} />
                Docs
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-4 py-2 rounded-xl text-sm"
              >
                Get API Key
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium"
              >
                <Sparkles size={16} />
                New MCP Servers Available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Discover{' '}
              <span className="gradient-text">Powerful APIs</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
            >
              Access the best AI, blockchain, and data APIs. Pay only for what you use with{' '}
              <span className="text-purple-400">x402 crypto payments</span>.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-2xl mx-auto mb-6"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Search APIs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500 mb-10"
            >
              <span>Popular:</span>
              {['MCP Servers', 'GPT-4', 'Solana'].map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="hover:text-purple-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto"
            >
              <StatCard icon={Code} value="8+" label="APIs" />
              <StatCard icon={Zap} value="15M+" label="Calls/mo" />
              <StatCard icon={Star} value="4.7" label="Avg Rating" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured APIs */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Zap className="text-yellow-500" size={28} />
              Featured APIs
            </h2>
            <button className="group flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <nav className="sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="text-zinc-500 shrink-0" size={18} />
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      {/* All APIs */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl font-bold">
              {selectedCategory === 'all' ? 'All APIs' : selectedCategory}
            </h2>
            <span className="text-zinc-400 text-sm">
              {filteredServices.length} API{filteredServices.length !== 1 ? 's' : ''}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredServices.map((service, index) => (
                  <ApiCard key={service.id} service={service} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredServices.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Code className="text-zinc-700 mx-auto mb-4" size={64} />
              <p className="text-zinc-500 text-lg">No APIs found matching your criteria</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 btn-secondary px-6 py-3 rounded-xl"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Build with the Best APIs
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              Start building your app today. Get your free API key and integrate in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold"
              >
                Get API Key
              </motion.button>
              <Link
                href="/docs"
                className="btn-secondary px-8 py-4 rounded-xl text-lg font-medium flex items-center gap-2"
              >
                <BookOpen size={18} />
                Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            OMA-AI - API Marketplace with x402 Crypto Payments
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            © 2026 OMA-AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- Sub-components ---

import Link from 'next/link';

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, scale: 1.02 }}
      className="text-center p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
    >
      <Icon className="text-purple-500 mx-auto mb-2" size={24} />
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-zinc-500 text-xs md:text-sm">{label}</div>
    </motion.div>
  );
}

function ApiCard({ service, index }: { service: ApiService, index: number }) {
  const isFree = service.price === 0 || service.priceType === 'free';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass-card p-6 rounded-2xl cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">{service.name}</h3>
            {service.featured && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full border border-yellow-500/30">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 line-clamp-2">{service.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(service.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-700'}
          />
        ))}
        <span className="text-sm text-zinc-400 ml-2">{service.rating}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.map((tag) => (
          <span key={tag} className="tag-chip">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div>
          <div className="flex items-baseline gap-1">
            {isFree ? (
              <span className="text-lg font-bold text-green-400">Free</span>
            ) : (
              <>
                <span className="text-lg font-bold text-white">${service.price.toFixed(4)}</span>
                <span className="text-sm text-zinc-500">
                  /{service.priceType === 'per_call' ? 'call' : 'mo'}
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-zinc-500">{service.calls.toLocaleString()} calls/mo</div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Try ${service.name} API`}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <Play size={16} />
          </motion.button>
          <motion.a
            href={service.endpoint}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Open ${service.name} API documentation`}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors"
          >
            <ExternalLink size={16} />
          </motion.a>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Shield size={12} />
          <span>by {service.provider}</span>
        </div>
      </div>
    </motion.div>
  );
}
