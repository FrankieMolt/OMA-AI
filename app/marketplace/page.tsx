'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Code, Zap, Star, ExternalLink, Play, Filter, DollarSign, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface ApiService {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  price_per_use: number;
  priceType: 'per_call' | 'monthly' | 'free';
  calls: number;
  endpoint: string;
  x402_endpoint?: string;
  tags: string[];
  featured: boolean;
  provider: string;
  seller_wallet?: string;
}

export default function MarketplacePage() {
  const [services, setServices] = useState<ApiService[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>(['all']);

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
          priceType: 'per_call',
          calls: s.total_sales || 0,
          provider: 'Verified Provider', // Default for now
          category: s.categories?.name || 'Uncategorized'
        })));

        // Extract categories if fetching all
        if (selectedCategory === 'all' && !searchQuery) {
           const uniqueCats = Array.from(new Set(data.services.map((s: any) => s.categories?.name || 'Uncategorized'))) as string[];
           setCategories(['all', ...uniqueCats]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const featuredServices = services.filter(s => s.featured);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6">
              Discover <span className="gradient-text">All APIs</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Browse {services.length}+ APIs and MCP servers. Pay only for what you use with x402 crypto payments.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
              <input
                type="text"
                placeholder="Search APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button onClick={() => fetchServices()} className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2 rounded-lg">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured APIs */}
      {featuredServices.length > 0 && (
        <section className="py-16 px-6 bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title="Featured APIs" subtitle="Top rated services chosen by our team" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredServices.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 px-6 border-b border-zinc-800 sticky top-16 z-40 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <Filter className="text-zinc-500" size={18} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {category === 'all' ? 'All APIs' : category}
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
              {selectedCategory === 'all' ? 'All APIs' : selectedCategory}
            </h2>
            <span className="text-zinc-400">
              {services.length} API{services.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ApiCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}

          {!loading && services.length === 0 && (
            <div className="text-center py-20">
              <Code className="text-zinc-700 mx-auto mb-4" size={48} />
              <p className="text-zinc-500 text-lg">No APIs found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ApiCard({ service, index }: { service: ApiService, index: number }) {
  return (
    <Card hoverable className="h-full flex flex-col group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">{service.name}</h3>
            {service.featured && (
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full inline-block mt-1">
                Featured
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2 mt-2">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1">
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

        <div className="flex flex-wrap gap-2">
          {service.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <div className="mt-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <DollarSign size={14} className="text-zinc-500" />
              <span className="text-lg font-bold text-white">
                {service.price === 0 ? 'Free' : `$${service.price.toFixed(4)}`}
              </span>
              {service.price > 0 && (
                <span className="text-sm text-zinc-500">/call</span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group-hover:text-purple-400">
              <Play size={16} />
            </button>
            <Link
              href={`/service/${service.id}`}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors group-hover:text-purple-400"
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
