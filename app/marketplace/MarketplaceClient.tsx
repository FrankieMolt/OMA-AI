'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Code, 
  Zap, 
  Star, 
  ExternalLink, 
  Play, 
  Filter, 
  Shield,
  Cpu,
  Globe,
  Database,
  CheckCircle
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
  calls: number;
  endpoint: string;
  tags: string[];
  featured: boolean;
}

export default function MarketplacePage() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, searchQuery]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let url = '/api/services?limit=50';
      if (selectedCategory !== 'all') url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.services) {
        setServices(data.services.map((s: any) => ({
          ...s,
          price: s.price_per_use || s.price || 0,
          category: s.categories?.name || 'Uncategorized',
          calls: s.total_sales || 0
        })));
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'AI & ML', 'Blockchain', 'Data', 'MCP Servers'];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Network Discovery
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             System<br/><span className="text-memoria-text-secondary">Marketplace</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-8">
             Discover and integrate 450+ verified APIs and Model Context Protocol servers. 
             Enable your autonomous agents to discover tools, negotiate access, and pay for services 
             independently through x402 crypto payments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-memoria-bg-card border border-memoria-border-muted p-6 rounded-sm">
                <h3 className="text-sm font-bold text-memoria-text-hero uppercase tracking-widest mb-2">Autonomous Discovery</h3>
                <p className="text-sm text-memoria-text-whisper font-light">
                   AI agents can search, compare, and select APIs without human intervention. 
                   Built-in semantic understanding matches capabilities to agent requirements.
                </p>
             </div>
             <div className="bg-memoria-bg-card border border-memoria-border-muted p-6 rounded-sm">
                <h3 className="text-sm font-bold text-memoria-text-hero uppercase tracking-widest mb-2">Instant Payments</h3>
                <p className="text-sm text-memoria-text-whisper font-light">
                   x402 protocol enables HTTP-native crypto payments. Agents pay per-call 
                   automatically without wallet management or manual approvals.
                </p>
             </div>
             <div className="bg-memoria-bg-card border border-memoria-border-muted p-6 rounded-sm">
                <h3 className="text-sm font-bold text-memoria-text-hero uppercase tracking-widest mb-2">Verified Infrastructure</h3>
                <p className="text-sm text-memoria-text-whisper font-light">
                   Every API is vetted for uptime, security, and documentation quality. 
                   Real-time performance metrics help agents choose the best options.
                </p>
             </div>
          </div>
          <div className="relative max-w-4xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-memoria-text-whisper" size={20} />
            <input
              type="text"
              id="marketplace-search"
              aria-label="Search APIs and MCP servers"
              placeholder="Filter APIs and MCP servers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-5 bg-memoria-bg-card border border-memoria-border-default rounded-sm text-white text-lg focus:outline-none focus:border-white transition-all font-light"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <nav className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted px-4 md:px-14 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto">
          <Filter className="text-memoria-text-whisper shrink-0" size={16} />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              aria-label={`Filter by ${category === 'all' ? 'All' : category} category`}
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
      </nav>

      {/* Results */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
           <div className="flex items-center justify-between mb-10 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
              <span>{services.length} Tools Discovered</span>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-24 text-memoria-text-meta">
                <Globe size={48} className="animate-pulse mb-4 opacity-20" />
                <p className="text-[10px] uppercase tracking-[0.3em]">Mapping Marketplace...</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <h2 className="sr-only">Available APIs and Tools</h2>
                {services.map((service, i) => (
                   <motion.div
                     key={service.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.05 }}
                   >
                      <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 h-full hover:border-memoria-border-active transition-all group">
                         <div className="flex justify-between items-start mb-6">
                            <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center">
                               <Cpu size={18} className="text-memoria-text-hero" />
                            </div>
                            <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta">
                               {service.category}
                            </Badge>
                         </div>
                         <h3 className="text-2xl font-light text-memoria-text-hero mb-2 font-display group-hover:translate-x-1 transition-transform">
                            {service.name}
                         </h3>
                         <p className="text-sm text-memoria-text-whisper font-light line-clamp-2 mb-8">
                            {service.description}
                         </p>
                         <div className="flex items-center justify-between pt-6 border-t border-memoria-border-muted">
                            <div className="flex items-baseline gap-1">
                               <span className="text-lg font-light text-memoria-text-hero">${service.price.toFixed(4)}</span>
                               <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">/ call</span>
                            </div>
                            <div className="flex gap-2">
                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-sm hover:bg-memoria-bg-surface">
                                  <Play size={14} />
                               </Button>
                               <Link href={`/service/${service.id}`} className="no-underline">
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-sm hover:bg-memoria-bg-surface">
                                     <ExternalLink size={14} />
                                  </Button>
                               </Link>
                            </div>
                         </div>
                      </Card>
                   </motion.div>
                ))}
             </div>
           )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 md:px-14 bg-memoria-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-whisper mb-4 block">Explore Categories</span>
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-display text-memoria-text-hero">
               APIs for Every Agent Need
            </h2>
            <p className="text-lg text-memoria-text-whisper max-w-2xl mx-auto font-light">
               From large language models to blockchain data, our marketplace covers every capability 
               your autonomous agents might require.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
                { icon: <Zap size={24} />, name: 'AI & ML', count: '150+', desc: 'LLMs, vision, speech, and more' },
                { icon: <Database size={24} />, name: 'Blockchain', count: '80+', desc: 'RPC nodes, DeFi data, NFTs' },
                { icon: <Code size={24} />, name: 'MCP Servers', count: '120+', desc: 'GitHub, filesystem, databases' },
                { icon: <Globe size={24} />, name: 'Data & APIs', count: '100+', desc: 'Web scraping, weather, geolocation' }
             ].map((cat, i) => (
                <div key={i} className="bg-memoria-bg-ultra-dark border border-memoria-border-default p-8 rounded-sm hover:border-memoria-text-hero transition-all group">
                   <div className="w-12 h-12 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center mb-4 group-hover:border-memoria-text-hero transition-colors">
                      {cat.icon}
                   </div>
                   <h3 className="text-xl font-bold text-memoria-text-hero mb-2 font-display">{cat.name}</h3>
                   <p className="text-sm text-memoria-text-whisper font-light mb-3">{cat.desc}</p>
                   <span className="text-xs text-memoria-text-meta uppercase tracking-widest font-bold">{cat.count} Tools</span>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="label-whisper mb-4 block">Integration Process</span>
            <h2 className="text-4xl md:text-5xl font-light mb-4 font-display text-memoria-text-hero">
               Agents Work With OMA-AI
            </h2>
            <p className="text-lg text-memoria-text-whisper max-w-2xl mx-auto font-light">
               Three simple steps to empower your autonomous agents with API capabilities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
                { step: '01', title: 'Discover APIs', desc: 'Agents search marketplace by capability, category, or semantic matching to find the perfect APIs for their tasks.' },
                { step: '02', title: 'Test Integration', desc: 'Try APIs instantly with our sandbox environment. Verify compatibility before production deployment.' },
                { step: '03', title: 'Pay as You Go', desc: 'x402 protocol enables per-call payments. Your agents only pay for what they actually use.' }
             ].map((step, i) => (
                <div key={i} className="relative">
                   <span className="text-7xl font-black text-memoria-text-whisper/10 font-display absolute -top-4 -left-2">
                      {step.step}
                   </span>
                   <div className="pt-8">
                      <h3 className="text-2xl font-bold text-memoria-text-hero mb-4 font-display">{step.title}</h3>
                      <p className="text-base text-memoria-text-whisper font-light leading-relaxed">
                         {step.desc}
                      </p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 md:px-14 bg-memoria-bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                <span className="label-whisper mb-6 block">Platform Trust</span>
                <h2 className="text-3xl md:text-4xl font-light mb-8 font-display text-memoria-text-hero">
                   Built for Reliability
                </h2>
                <ul className="space-y-4">
                   {[
                      '99.9% API uptime guarantee',
                      'Real-time performance monitoring',
                      'Instant dispute resolution',
                      'Transparent pricing models',
                      'Regular security audits',
                      '24/7 infrastructure support'
                   ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-memoria-text-whisper font-light">
                         <Shield size={16} className="text-memoria-text-hero shrink-0 mt-0.5" />
                         {item}
                      </li>
                   ))}
                </ul>
             </div>
             <div>
                <span className="label-whisper mb-6 block">Live Metrics</span>
                <h2 className="text-3xl md:text-4xl font-light mb-8 font-display text-memoria-text-hero">
                   Performance at Scale
                </h2>
                <div className="grid grid-cols-2 gap-4">
                   {[
                      { label: 'APIs Available', value: '450+' },
                      { label: 'Daily Calls', value: '2.5M' },
                      { label: 'Active Agents', value: '15K+' },
                      { label: 'Avg Response', value: '42ms' }
                   ].map((stat, i) => (
                      <div key={i} className="bg-memoria-bg-ultra-dark border border-memoria-border-default p-6 rounded-sm">
                         <div className="text-3xl font-black text-memoria-text-hero mb-1 font-display">{stat.value}</div>
                         <div className="text-[10px] text-memoria-text-meta uppercase tracking-widest">{stat.label}</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 font-display text-memoria-text-hero">
             Ready to Empower Your Agents?
          </h2>
          <p className="text-lg text-memoria-text-whisper max-w-2xl mx-auto font-light mb-10">
             Join thousands of developers deploying autonomous agents that can discover, pay for, 
             and integrate APIs independently. No infrastructure setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href="/signup" className="no-underline">
                <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-all">
                   Create Free Account
                </Button>
             </Link>
             <Link href="/docs" className="no-underline">
                <Button variant="outline" className="border-memoria-border-muted text-memoria-text-whisper hover:bg-memoria-bg-surface hover:text-memoria-text-hero rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest transition-all">
                   Read Documentation
                </Button>
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
