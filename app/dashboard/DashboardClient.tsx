'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      
      try {
        const response = await fetch('/api/services?limit=100');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Failed to fetch services');
        
        setServices(data.services || []);
      } catch (err: any) {
        console.error('Error fetching services:', err);
        setServices(fallbackServices);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    
    fetchServices();
  }, []);

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
      endpoint: 'https://platform.openai.com/docs/models/gpt-4-turbo',
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
      endpoint: 'https://docs.anthropic.com/en/docs/models-overview',
      tags: ['llm', 'analysis', 'writing'],
      featured: true,
      provider: 'Anthropic'
    },
    {
      id: 'github-mcp',
      name: 'GitHub MCP Server',
      description: 'Connect your agents to GitHub repositories, issues, and PRs',
      category: 'MCP Servers',
      rating: 4.9,
      price: 0,
      priceType: 'free',
      calls: 500000,
      endpoint: 'https://github.com/modelcontextprotocol/servers',
      tags: ['mcp', 'github', 'dev-tools'],
      featured: true,
      provider: 'Model Context Protocol'
    },
    {
      id: 'brave-search-mcp',
      name: 'Brave Search MCP',
      description: 'Enable web search capabilities using Brave Search API',
      category: 'MCP Servers',
      rating: 4.8,
      price: 0.001,
      priceType: 'per_call',
      calls: 200000,
      endpoint: 'https://github.com/modelcontextprotocol/servers',
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
      endpoint: '/marketplace',
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
      endpoint: '/marketplace',
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
    <div role="main" className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-light text-memoria-text-hero tracking-tight">
                OMA SYSTEMS
              </Link>
              <span className="text-memoria-border-muted">/</span>
              <span className="text-sm text-memoria-text-whisper">API Marketplace</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/docs" className="hidden md:flex items-center gap-2 text-memoria-text-whisper hover:text-white transition-colors text-sm uppercase tracking-widest">
                <BookOpen size={14} /> Docs
              </Link>
              <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-6 h-10 text-[10px] font-bold uppercase tracking-widest hover:bg-memoria-text-secondary">
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <Badge variant="outline" className="mb-8 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
               Discover APIs
            </Badge>
            
            <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
               Powerful APIs for<br/><span className="text-memoria-text-secondary">Autonomous Agents</span>
            </h1>
            
            <p className="text-lg md:text-xl text-memoria-text-whisper mb-10 font-light leading-relaxed max-w-2xl">
               Access the best AI, blockchain, and data APIs. Pay only for what you use with 
               <span className="text-white"> x402 crypto payments</span>.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-memoria-text-whisper" size={18} />
              <input aria-label="Search"
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search APIs"
                className="w-full pl-12 pr-4 py-4 bg-memoria-bg-card border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
              />
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-memoria-text-meta uppercase tracking-widest mb-12">
              <span>Popular:</span>
              {['MCP Servers', 'GPT-4', 'Solana'].map((term) => (
                <button aria-label="Action button"
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  aria-label={`Search for ${term}`}
                  className="hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-xl">
              <div>
                <span className="label-whisper block mb-2">APIs</span>
                <div className="hero-number text-5xl">8+</div>
              </div>
              <div>
                <span className="label-whisper block mb-2">Calls/mo</span>
                <div className="hero-number text-5xl">15M+</div>
              </div>
              <div>
                <span className="label-whisper block mb-2">Avg Rating</span>
                <div className="hero-number text-5xl">4.7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured APIs */}
      <section className="py-20 px-4 md:px-14 bg-memoria-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="label-whisper mb-4 block">Featured</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight font-display">Top APIs</h2>
            </div>
            <Link href="/marketplace" className="hidden md:flex items-center gap-2 text-memoria-text-whisper hover:text-white transition-colors text-xs uppercase tracking-widest">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-14 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <Filter className="text-memoria-text-whisper shrink-0" size={16} />
            {categories.map((category) => (
              <button aria-label="Action button"
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter by ${category}`}
                className={`px-5 py-2 rounded-sm text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark'
                    : 'bg-memoria-bg-card text-memoria-text-whisper hover:text-white border border-memoria-border-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* All APIs */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-light text-memoria-text-hero">
              {selectedCategory === 'all' ? 'All APIs' : selectedCategory}
            </h2>
            <span className="text-memoria-text-whisper text-xs uppercase tracking-widest">
              {filteredServices.length} APIs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {filteredServices.length === 0 && !loading && (
            <div className="text-center py-32 border border-memoria-border-muted rounded-sm">
              <Code className="text-memoria-border-muted mx-auto mb-6" size={48} />
              <p className="text-memoria-text-whisper text-lg">No APIs found matching your criteria</p>
              <button aria-label="Action button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                aria-label="Clear all filters"
                className="mt-6 text-xs uppercase tracking-widest text-memoria-text-whisper hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-8 font-display">
            Build with the Best
          </h2>
          <p className="text-lg text-memoria-text-whisper mb-10 max-w-2xl mx-auto font-light">
            Start building your app today. Get your free API key and integrate in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-12 h-14 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary">
              Get API Key
            </Button>
            <Link href="/docs" className="no-underline">
              <Button variant="outline" className="border-memoria-border-muted text-memoria-text-whisper hover:text-white rounded-sm px-12 h-14 text-xs font-bold uppercase tracking-widest">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ApiCard({ service, index }: { service: ApiService, index: number }) {
  const isFree = service.price === 0 || service.priceType === 'free';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6 h-full hover:border-memoria-border-active transition-all">
        <CardContent className="p-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-light text-memoria-text-hero">{service.name}</h3>
                {service.featured && (
                  <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-default text-memoria-text-meta">
                    Featured
                  </Badge>
                )}
              </div>
              <p className="text-sm text-memoria-text-whisper line-clamp-2 font-light">{service.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(service.rating) ? 'text-white' : 'text-memoria-border-muted'}
              />
            ))}
            <span className="text-xs text-memoria-text-whisper ml-2">{service.rating}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-memoria-border-muted">
            <div>
              <div className="flex items-baseline gap-1">
                {isFree ? (
                  <span className="text-lg font-light text-green-400">Free</span>
                ) : (
                  <>
                    <span className="text-lg font-light text-memoria-text-hero">${service.price.toFixed(4)}</span>
                    <span className="text-xs text-memoria-text-meta">/{service.priceType === 'per_call' ? 'call' : 'mo'}</span>
                  </>
                )}
              </div>
              <div className="text-[10px] text-memoria-text-meta">{service.calls.toLocaleString()} calls/mo</div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-sm hover:bg-memoria-bg-surface">
                <Play size={14} />
              </Button>
              <a href={service.endpoint} target="_blank" rel="noopener noreferrer" className="no-underline">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-sm hover:bg-memoria-bg-surface">
                  <ExternalLink size={14} />
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-memoria-border-muted">
            <div className="flex items-center gap-2 text-[10px] text-memoria-text-meta uppercase tracking-widest">
              <Shield size={10} />
              <span>{service.provider}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
