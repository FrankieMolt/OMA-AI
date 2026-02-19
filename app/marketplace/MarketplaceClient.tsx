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
  Database
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
  const [displayServices, setDisplayServices] = useState<ApiService[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  // Client-side filtering for search and category
  useEffect(() => {
    let filtered = [...services];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => 
        s.category === selectedCategory ||
        s.tags?.some((tag: string) => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name?.toLowerCase().includes(query) ||
        s.description?.toLowerCase().includes(query) ||
        s.tags?.some((tag: string) => tag.toLowerCase().includes(query))
      );
    }
    
    setDisplayServices(filtered);
  }, [services, selectedCategory, searchQuery]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let url = '/api/services?limit=50';
      if (selectedCategory !== 'all') url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.services) {
        const mappedServices = data.services.map((s: any) => ({
          ...s,
          price: s.price_per_use || s.price || 0,
          category: s.categories?.name || 'Uncategorized',
          calls: s.total_sales || 0
        }));
        setServices(mappedServices);
        setDisplayServices(mappedServices);
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
            <button aria-label="Filter products"
              key={category}
              onClick={() => setSelectedCategory(category)}
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
              <span>{displayServices.length} Tools Discovered</span>
           </div>

           {loading ? (
             <div className="flex flex-col items-center justify-center py-24 text-memoria-text-meta">
                <Globe size={48} className="animate-pulse mb-4 opacity-20" />
                <p className="text-[10px] uppercase tracking-[0.3em]">Mapping Marketplace...</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <h2 className="sr-only">Available APIs and Tools</h2>
                {displayServices.map((service, i) => (
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
    </div>
  );
}
