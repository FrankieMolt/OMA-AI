/**
 * SpendThrone - Viral Weird Products Marketplace
 * Style: thisiswhyimbroke.com inspired
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, ShoppingBag, TrendingUp, Flame, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { realProducts } from '@/data/products';
import { RealProduct } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', ...new Set(realProducts.map(p => p.category))];
  
  const filteredProducts = realProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  SPENDTHRONE
                </span>
                <p className="text-[10px] text-zinc-500 -mt-1">Weird Stuff Worth Buying</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/marketplace" className="text-sm text-zinc-400 hover:text-white transition-colors">All Products</Link>
              <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <button aria-label="Favorites" className="p-2 text-zinc-400 hover:text-pink-400 hover:bg-zinc-900 rounded-lg transition-all">
                <Heart className="w-5 h-5" />
              </button>
              <button aria-label="Shopping cart" className="p-2 text-zinc-400 hover:text-purple-400 hover:bg-zinc-900 rounded-lg transition-all">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">The Sovereign Marketplace</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Discover{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Weird
              </span>{' '}
              &{' '}
              <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-purple-400 bg-clip-text text-transparent">
                Extreme
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
              The curated kingdom of the weirdest, most viral products on Earth. 
              WTF-level technology for the modern age.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity" />
              <div className="relative flex items-center bg-zinc-900 rounded-xl border border-zinc-800 group-focus-within:border-purple-500 transition-colors">
                <Search className="w-5 h-5 text-zinc-500 ml-4" />
                <input
                  type="text"
                  placeholder="Search weird products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none py-4 px-4 text-white placeholder-zinc-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {categories.slice(0, 8).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter by ${category === 'all' ? 'all categories' : category}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                }`}
              >
                {category === 'all' ? 'All' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </motion.div>

          <p className="text-zinc-600 text-sm">
            Showing {filteredProducts.length} of {realProducts.length} products
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 15).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SPENDTHRONE
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            
            <p className="text-sm text-zinc-600">
              © 2026 SpendThrone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: RealProduct }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-zinc-700" />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-xl bg-black/40 backdrop-blur-sm text-white hover:bg-pink-500 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          
          {/* Category badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-zinc-300">
              {product.category.replace('-', ' ')}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              {product.id}
            </span>
            {product.isNew && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase">
                <Flame className="w-3 h-3" /> New
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-sm text-zinc-500 mb-4 line-clamp-2">
            {product.shortDescription || product.description.substring(0, 100) + '...'}
          </p>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold text-white">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-zinc-600 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags?.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400">
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 px-4 py-2.5 bg-white text-black font-bold text-xs uppercase rounded-xl hover:bg-purple-500 hover:text-white transition-all">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
