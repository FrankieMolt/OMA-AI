'use client';

import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  Zap,
  Star,
  ExternalLink,
  Play,
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
const ApiCard = memo(({ service, index }: { service: ApiService; index: number }) => (
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
          {service.tags.map(tag => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right ml-4">
        <div className="text-2xl font-bold mb-1">
          {service.priceType === 'free' ? 'Free' : `$${service.price.toFixed(3)}`}
          {service.priceType !== 'free' && service.priceType === 'per_call' && (
            <span className="text-sm font-normal text-zinc-500">/call</span>
          )}
          {service.priceType === 'monthly' && (
            <span className="text-sm font-normal text-zinc-500">/mo</span>
          )}
        </div>
        <div className="flex items-center justify-end gap-1 text-sm text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          {service.rating}
        </div>
        <div className="text-xs text-zinc-500 mt-1">
          {(service.calls / 1000).toFixed(0)}K calls/mo
        </div>
      </div>
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Shield className="w-4 h-4" />
        <span>{service.provider}</span>
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
));

ApiCard.displayName = 'ApiCard';

// --- Main Page Component ---
export default function MarketplaceHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock API Services - Like Smithery.ai + RapidAPI
  const apiServices: ApiService[] = useMemo(() => [
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
      id: 'ethereum-mainnet',
      name: 'Ethereum Mainnet RPC',
      description: 'Reliable blockchain node access for dApp development',
      category: 'Blockchain',
      rating: 4.7,
      price: 0.001,
      priceType: 'per_call',
      calls: 5000000,
      endpoint: '/eth/v1/mainnet',
      tags: ['ethereum', 'web3', 'rpc'],
      featured: false,
      provider: 'QuickNode'
    },
    {
      id: 'solana-rpc',
      name: 'Solana RPC',
      description: 'High-performance Solana blockchain node with sub-second latency',
      category: 'Blockchain',
      rating: 4.6,
      price: 0.0005,
      priceType: 'per_call',
      calls: 3000000,
      endpoint: '/sol/v1/mainnet-beta',
      tags: ['solana', 'web3', 'rpc'],
      featured: false,
      provider: 'Alchemy'
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
      id: 'filesystem-mcp',
      name: 'Filesystem MCP',
      description: 'Secure local file system access for autonomous agents',
      category: 'MCP Servers',
      rating: 4.7,
      price: 0,
      priceType: 'free',
      calls: 100000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/filesystem',
      tags: ['mcp', 'system', 'files'],
      featured: false,
      provider: 'Community'
    },
    {
      id: 'postgres-mcp',
      name: 'PostgreSQL MCP',
      description: 'Direct database access for agents - query, insert, update PostgreSQL databases',
      category: 'MCP Servers',
      rating: 4.6,
      price: 0,
      priceType: 'free',
      calls: 80000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/postgres',
      tags: ['mcp', 'database', 'sql'],
      featured: true,
      provider: 'Community'
    },
    {
      id: 'data-scraping',
      name: 'Web Scraper Pro',
      description: 'Extract data from any website with anti-bot protection bypass',
      category: 'Data',
      rating: 4.5,
      price: 0.005,
      priceType: 'per_call',
      calls: 2500000,
      endpoint: '/api/v1/scrape',
      tags: ['scraping', 'data', 'extraction'],
      featured: false,
      provider: 'OMA Network'
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
      id: 'email-sender',
      name: 'Transactional Email',
      description: 'Send reliable emails at scale with delivery tracking',
      category: 'Communication',
      rating: 4.7,
      price: 0.001,
      priceType: 'per_call',
      calls: 4000000,
      endpoint: '/api/v1/email/send',
      tags: ['email', 'communication', 'marketing'],
      featured: false,
      provider: 'SendGrid'
    },
    {
      id: 'weather-api',
      name: 'Weather Data',
      description: 'Real-time weather forecasts and historical data worldwide',
      category: 'Data',
      rating: 4.6,
      price: 0.0005,
      priceType: 'per_call',
      calls: 1500000,
      endpoint: '/api/v1/weather',
      tags: ['weather', 'data', 'forecasts'],
      featured: false,
      provider: 'OpenWeather'
    },
    {
      id: 'geocoding',
      name: 'Geocoding API',
      description: 'Convert addresses to coordinates and vice versa',
      category: 'Data',
      rating: 4.8,
      price: 0.001,
      priceType: 'per_call',
      calls: 800000,
      endpoint: '/api/v1/geocode',
      tags: ['location', 'maps', 'coordinates'],
      featured: false,
      provider: 'MapBox'
    },
    {
      id: 'storage',
      name: 'Cloud Storage',
      description: 'Scalable object storage with built-in CDN',
      category: 'Infrastructure',
      rating: 4.9,
      price: 0.002,
      priceType: 'per_call',
      calls: 5000000,
      endpoint: '/api/v1/storage',
      tags: ['storage', 'cdn', 'infrastructure'],
      featured: true,
      provider: 'OMA Network'
    },
    {
      id: 'notification',
      name: 'Push Notifications',
      description: 'Send push notifications to mobile and web apps',
      category: 'Communication',
      rating: 4.5,
      price: 0.001,
      priceType: 'per_call',
      calls: 1200000,
      endpoint: '/api/v1/notifications',
      tags: ['notifications', 'push', 'mobile'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'analytics',
      name: 'Analytics Platform',
      description: 'Track user behavior, conversions, and custom events',
      category: 'Infrastructure',
      rating: 4.7,
      price: 0.003,
      priceType: 'per_call',
      calls: 900000,
      endpoint: '/api/v1/analytics',
      tags: ['analytics', 'tracking', 'metrics'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'payment-gateway',
      name: 'Payment Gateway',
      description: 'Accept payments via credit cards, crypto, and more',
      category: 'Infrastructure',
      rating: 4.8,
      price: 0.01,
      priceType: 'per_call',
      calls: 500000,
      endpoint: '/api/v1/payments',
      tags: ['payments', 'crypto', 'infrastructure'],
      featured: true,
      provider: 'OMA Network'
    },
    {
      id: 'auth-service',
      name: 'Authentication Service',
      description: 'User authentication with social login and 2FA',
      category: 'Infrastructure',
      rating: 4.9,
      price: 0.002,
      priceType: 'per_call',
      calls: 3000000,
      endpoint: '/api/v1/auth',
      tags: ['auth', 'security', 'infrastructure'],
      featured: true,
      provider: 'OMA Network'
    },
    {
      id: 'ai-chat',
      name: 'AI Chat Interface',
      description: 'Conversational AI with context awareness',
      category: 'AI & ML',
      rating: 4.6,
      price: 0.008,
      priceType: 'per_call',
      calls: 700000,
      endpoint: '/api/v1/chat',
      tags: ['chat', 'ai', 'conversational'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'code-execution',
      name: 'Code Execution',
      description: 'Execute code in multiple languages safely',
      category: 'Infrastructure',
      rating: 4.7,
      price: 0.005,
      priceType: 'per_call',
      calls: 600000,
      endpoint: '/api/v1/execute',
      tags: ['code', 'execution', 'infrastructure'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'api-monitoring',
      name: 'API Monitoring',
      description: 'Monitor API uptime, performance, and errors',
      category: 'Infrastructure',
      rating: 4.8,
      price: 0.004,
      priceType: 'per_call',
      calls: 400000,
      endpoint: '/api/v1/monitor',
      tags: ['monitoring', 'infrastructure', 'uptime'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'data-encryption',
      name: 'Data Encryption',
      description: 'Encrypt and decrypt data with enterprise-grade security',
      category: 'Security',
      rating: 4.9,
      price: 0.003,
      priceType: 'per_call',
      calls: 800000,
      endpoint: '/api/v1/encrypt',
      tags: ['encryption', 'security', 'data'],
      featured: true,
      provider: 'OMA Network'
    },
    {
      id: 'firewall',
      name: 'API Firewall',
      description: 'Protect your APIs from attacks and abuse',
      category: 'Security',
      rating: 4.7,
      price: 0.004,
      priceType: 'per_call',
      calls: 300000,
      endpoint: '/api/v1/firewall',
      tags: ['firewall', 'security', 'protection'],
      featured: false,
      provider: 'OMA Network'
    }
  ], []);

  // Categories
  const categories = useMemo(() => ['all', ...Array.from(new Set(apiServices.map(service => service.category)))], [apiServices]);

  // Filter services
  const filteredServices = useMemo(() => {
    return apiServices.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, apiServices]);

  // Featured services
  const featuredServices = useMemo(() => apiServices.filter(service => service.featured).slice(0, 6), [apiServices]);

  // Handlers with useCallback to prevent re-renders
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => setIsLoading(false), 300);
  }, []);

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
              Browse, test, and integrate 22+ APIs and MCP servers.
              Pay only for what you use with x402 crypto payments.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search APIs, MCPs..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
              <StatCard icon={Code} value="22+" label="APIs & MCPs" />
              <StatCard icon={Zap} value="25M+" label="Calls/mo" />
              <StatCard icon={Star} value="4.7" label="Avg Rating" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>
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
                onClick={() => handleCategoryChange(category)}
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
              {[...Array(6)].map((_, i) => (
                <ApiCardSkeleton key={i} />
              ))}
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
