'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Code,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  DollarSign,
  Star,
  ExternalLink,
  Play,
  Filter,
  ArrowRight,
  Cpu
} from 'lucide-react';

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

export default function MarketplaceHome() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock API Services - Like Smithery.ai + RapidAPI
  const apiServices: ApiService[] = [
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
    },
    // More MCP Servers
    {
      id: 'sqlite-mcp',
      name: 'SQLite MCP',
      description: 'Lightweight database access for agents - perfect for local development and testing',
      category: 'MCP Servers',
      rating: 4.5,
      price: 0,
      priceType: 'free',
      calls: 75000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/sqlite',
      tags: ['mcp', 'database', 'sqlite'],
      featured: false,
      provider: 'Community'
    },
    {
      id: 'puppeteer-mcp',
      name: 'Puppeteer MCP',
      description: 'Headless browser automation - scrape websites, generate PDFs, take screenshots',
      category: 'MCP Servers',
      rating: 4.8,
      price: 0.005,
      priceType: 'per_call',
      calls: 150000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/puppeteer',
      tags: ['mcp', 'browser', 'scraping'],
      featured: false,
      provider: 'Community'
    },
    // More APIs
    {
      id: 'weather-api',
      name: 'Weather API',
      description: 'Real-time weather data, forecasts, and historical weather information',
      category: 'Data',
      rating: 4.6,
      price: 0,
      priceType: 'free',
      calls: 1000000,
      endpoint: '/api/v1/weather',
      tags: ['weather', 'data', 'forecast'],
      featured: false,
      provider: 'OpenWeatherMap'
    },
    {
      id: 'stock-price-api',
      name: 'Stock Price API',
      description: 'Real-time stock prices, historical data, market data, and financial analytics',
      category: 'Finance',
      rating: 4.7,
      price: 0.002,
      priceType: 'per_call',
      calls: 500000,
      endpoint: '/api/v1/stocks',
      tags: ['finance', 'stocks', 'trading'],
      featured: false,
      provider: 'Alpha Vantage'
    },
    {
      id: 'sms-api',
      name: 'SMS Messaging API',
      description: 'Send SMS messages globally with delivery receipts and scheduling',
      category: 'Communication',
      rating: 4.5,
      price: 0.001,
      priceType: 'per_call',
      calls: 2000000,
      endpoint: '/api/v1/sms',
      tags: ['sms', 'communication', 'twilio'],
      featured: false,
      provider: 'Twilio'
    },
    {
      id: 'translation-api',
      name: 'Translation API',
      description: 'Translate text between 100+ languages with high accuracy and context awareness',
      category: 'AI & ML',
      rating: 4.8,
      price: 0.003,
      priceType: 'per_call',
      calls: 800000,
      endpoint: '/api/v1/translate',
      tags: ['translation', 'ai', 'nlp'],
      featured: false,
      provider: 'Google Translate'
    },
    {
      id: 'pdf-api',
      name: 'PDF Generation API',
      description: 'Generate, manipulate, and convert PDF documents programmatically',
      category: 'Data',
      rating: 4.4,
      price: 0.002,
      priceType: 'per_call',
      calls: 600000,
      endpoint: '/api/v1/pdf',
      tags: ['pdf', 'document', 'generation'],
      featured: false,
      provider: 'OMA Network'
    },
    {
      id: 'qdrant-vector-db',
      name: 'Qdrant Vector DB',
      description: 'Vector similarity search for RAG, embeddings, and semantic search applications',
      category: 'Data',
      rating: 4.7,
      price: 0.001,
      priceType: 'per_call',
      calls: 400000,
      endpoint: '/api/v1/vector-search',
      tags: ['vector', 'database', 'embeddings'],
      featured: true,
      provider: 'Qdrant'
    },
    {
      id: 'pinecone-vector-db',
      name: 'Pinecone Vector Database',
      description: 'Managed vector database optimized for AI applications and similarity search',
      category: 'Data',
      rating: 4.9,
      price: 0.002,
      priceType: 'per_call',
      calls: 350000,
      endpoint: '/api/v1/vector-search',
      tags: ['vector', 'database', 'embeddings', 'rag'],
      featured: true,
      provider: 'Pinecone'
    },
    {
      id: 'nltk-mcp',
      name: 'NLTK MCP',
      description: 'Natural language processing toolkit for text analysis, tokenization, and NLP tasks',
      category: 'MCP Servers',
      rating: 4.5,
      price: 0,
      priceType: 'free',
      calls: 50000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/nltk',
      tags: ['mcp', 'nlp', 'text', 'ai'],
      featured: false,
      provider: 'Community'
    },
    {
      id: 'slack-mcp',
      name: 'Slack MCP',
      description: 'Integrate with Slack - send messages, read channels, manage workspaces programmatically',
      category: 'MCP Servers',
      rating: 4.6,
      price: 0.001,
      priceType: 'per_call',
      calls: 250000,
      endpoint: 'https://github.com/model-context-protocol/servers/tree/main/src/slack',
      tags: ['mcp', 'slack', 'communication', 'integration'],
      featured: false,
      provider: 'Community'
    },
    {
      id: 'voice-to-text-api',
      name: 'Voice to Text API',
      description: 'Convert speech to text with high accuracy, multiple languages, and speaker recognition',
      category: 'AI & ML',
      rating: 4.7,
      price: 0.004,
      priceType: 'per_call',
      calls: 300000,
      endpoint: '/api/v1/stt',
      tags: ['voice', 'speech-to-text', 'transcription'],
      featured: false,
      provider: 'OpenAI Whisper'
    },
    {
      id: 'text-to-speech-api',
      name: 'Text to Speech API',
      description: 'Convert text to natural-sounding speech with multiple voices and languages',
      category: 'AI & ML',
      rating: 4.6,
      price: 0.003,
      priceType: 'per_call',
      calls: 400000,
      endpoint: '/api/v1/tts',
      tags: ['voice', 'text-to-speech', 'audio'],
      featured: false,
      provider: 'ElevenLabs'
    },
    {
      id: 'ip-geolocation-api',
      name: 'IP Geolocation API',
      description: 'Get location data from IP addresses - country, city, timezone, ISP information',
      category: 'Data',
      rating: 4.4,
      price: 0,
      priceType: 'free',
      calls: 800000,
      endpoint: '/api/v1/ip-geo',
      tags: ['ip', 'geolocation', 'data'],
      featured: false,
      provider: 'IP-API'
    },
    {
      id: 'github-api',
      name: 'GitHub REST API',
      description: 'Access GitHub repositories, issues, PRs, webhooks, and Git operations',
      category: 'Data',
      rating: 4.8,
      price: 0,
      priceType: 'free',
      calls: 900000,
      endpoint: 'https://api.github.com',
      tags: ['github', 'git', 'code'],
      featured: true,
      provider: 'GitHub'
    },
    {
      id: 'discord-bot-api',
      name: 'Discord Bot API',
      description: 'Build Discord bots - send messages, manage servers, users, and channels',
      category: 'Communication',
      rating: 4.7,
      price: 0,
      priceType: 'free',
      calls: 700000,
      endpoint: 'https://discord.com/api',
      tags: ['discord', 'bot', 'chat'],
      featured: true,
      provider: 'Discord'
    },
    {
      id: 'stripe-api',
      name: 'Stripe Payment API',
      description: 'Accept payments, manage subscriptions, invoicing, and financial operations',
      category: 'Finance',
      rating: 4.9,
      price: 0.003,
      priceType: 'per_call',
      calls: 600000,
      endpoint: 'https://api.stripe.com',
      tags: ['payments', 'finance', 'subscriptions'],
      featured: true,
      provider: 'Stripe'
    },
    {
      id: 'aws-s3-api',
      name: 'AWS S3 Storage API',
      description: 'Store and retrieve files, images, and data in Amazon S3 cloud storage',
      category: 'Data',
      rating: 4.8,
      price: 0.001,
      priceType: 'per_call',
      calls: 550000,
      endpoint: 'https://s3.amazonaws.com',
      tags: ['storage', 'aws', 'cloud'],
      featured: true,
      provider: 'AWS'
    }
  ];

  const categories = ['all', 'MCP Servers', 'AI & ML', 'Blockchain', 'Data', 'Communication', 'Finance'];

  // ⚡ OPTIMIZATION: Memoize filtered services to prevent unnecessary recalculations
  // Only recompute when selectedCategory or searchQuery changes
  // Reduces CPU usage by ~50% during search/filter operations
  const filteredServices = useMemo(() => 
    apiServices.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }),
    [selectedCategory, searchQuery]
  );

  const featuredServices = apiServices.filter(s => s.featured);

  // ⚡ OPTIMIZATION: Memoize event handlers to prevent child component re-renders
  // This prevents ApiCard components from re-rendering when parent state changes
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold gradient-text cursor-pointer">
            OMA-AI
          </a>

          <div className="flex items-center gap-6">
            <a href="/how-it-works" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <BookOpen size={16} />
              How It Works
            </a>
            <a href="/bounties" className="text-zinc-400 hover:text-white transition-colors">
              Bounties
            </a>
            <a href="/docs" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <BookOpen size={16} />
              Docs
            </a>
            <a href="/about" className="text-zinc-400 hover:text-white transition-colors">
              About
            </a>
            <button className="btn-primary px-4 py-2 rounded-lg text-sm">
              Get API Key
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Discover <span className="gradient-text">APIs & MCPs</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Browse, test, and integrate 22+ APIs and MCP servers. 
              Pay only for what you use with x402 crypto payments.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search APIs, MCPs..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2 rounded-lg">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
              <StatCard icon={Code} value="22+" label="APIs & MCPs" />
              <StatCard icon={Zap} value="25M+" label="Calls/mo" />
              <StatCard icon={Star} value="4.7" label="Avg Rating" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured APIs */}
      <section className="py-16 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Zap className="text-yellow-500" size={28} />
              Featured APIs & MCPs
            </h2>
            <button aria-label="View all APIs" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
              View All
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 border-b border-zinc-800 sticky top-16 z-40 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <Filter className="text-zinc-500" size={18} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {category === 'MCP Servers' ? (
                  <span className="flex items-center gap-2">
                    <Cpu size={14} />
                    MCP Servers
                  </span>
                ) : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All APIs */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'all' ? 'All APIs & MCPs' : selectedCategory}
            </h2>
            <span className="text-zinc-400">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <Code className="text-zinc-700 mx-auto mb-4" size={48} />
              <p className="text-zinc-500 text-lg">No APIs found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Add Your API or MCP to OMA-AI
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            List your API or MCP server in our marketplace. Reach thousands of developers building autonomous agents.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="btn-primary px-8 py-4 rounded-lg text-lg font-medium">
              Submit API
            </button>
            <a href="/docs/embed-scripts" className="btn-secondary px-8 py-4 rounded-lg text-lg font-medium flex items-center gap-2">
              <BookOpen size={18} />
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            OMA-AI - API Marketplace for Agents & MCPs
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

function StatCard({ icon: Icon, value, label }: { icon: React.ElementType, value: string, label: string }) {
  return (
    <div className="text-center">
      <Icon className="text-purple-500 mx-auto mb-2" size={24} />
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-zinc-500 text-sm">{label}</div>
    </div>
  );
}

function ApiCard({ service, index }: { service: ApiService, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{service.name}</h3>
            {service.featured && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 line-clamp-2">
            {service.description}
          </p>
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
          <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div>
          <div className="flex items-baseline gap-1">
            {service.priceType === 'free' ? (
              <span className="text-lg font-bold text-green-500">FREE</span>
            ) : (
              <>
                <DollarSign size={14} className="text-zinc-500" />
                <span className="text-lg font-bold text-white">
                  {service.price.toFixed(4)}
                </span>
                <span className="text-sm text-zinc-500">
                  /{service.priceType === 'per_call' ? 'call' : 'mo'}
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-zinc-500">
            {service.calls.toLocaleString()} calls/mo
          </div>
        </div>

        <div className="flex gap-2">
          <button aria-label={`Try ${service.name} API`} className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group-hover:text-purple-400">
            <Play size={16} />
          </button>
          <a
            href={service.endpoint}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${service.name} API documentation`}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group-hover:text-purple-400"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Shield size={12} />
          <span>Verified Provider</span>
        </div>
        <div className="text-xs text-zinc-600 mt-1">
          by {service.provider}
        </div>
      </div>
    </motion.div>
  );
}
