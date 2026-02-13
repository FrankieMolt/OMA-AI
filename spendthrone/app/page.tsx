/**
 * SpendThrone Landing Page - shadcn/ui + Memoria
 * Philosophy: "Numbers are heroes, labels are whispers"
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, ArrowRight, Star, ShieldCheck, Globe } from 'lucide-react';
import Link from 'next/link';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Memoria Design Tokens (imported from parent lib or local if available)
// Assuming local lib structure based on previous interactions
import { colors, spacing, typography } from '../lib/memoria/tokens';

export default function HomePage() {
  const products = [
    { id: 1, name: 'Chronos Elite', price: '1,200', category: 'Timepieces' },
    { id: 2, name: 'Aether Speaker', price: '850', category: 'Audio' },
    { id: 3, name: 'Lumina Lamp', price: '450', category: 'Lighting' },
    { id: 4, name: 'Vertex Wallet', price: '250', category: 'Accessories' },
    { id: 5, name: 'Nova Pen', price: '180', category: 'Writing' },
    { id: 6, name: 'Origin Desk', price: '2,400', category: 'Furniture' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-14 py-4 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-memoria-border-muted"
        role="navigation"
        aria-label="Main Navigation"
      >
        <Link href="/" className="flex items-center gap-3 no-underline group" aria-label="SpendThrone Home">
          <div className="w-8 h-8 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center group-hover:border-memoria-border-active transition-colors">
            <ShoppingBag size={14} className="text-memoria-text-hero" />
          </div>
          <span className="text-lg font-normal text-memoria-text-hero tracking-tight">
            SpendThrone
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[11px] uppercase tracking-widest text-memoria-text-whisper hover:text-memoria-text-hero"
            aria-label="Search"
          >
            <Search size={14} className="mr-2" /> Search
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="rounded-sm px-6 text-[11px] uppercase tracking-widest font-semibold border-memoria-border-default"
            aria-label="Sign In"
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-40 pb-20 px-4 md:px-14 text-center"
        aria-labelledby="hero-title"
      >
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
            Luxury Commerce
          </Badge>
          <h1 
            id="hero-title"
            className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero"
          >
            Exceptional<br/>Products
          </h1>
          <p className="text-lg md:text-xl text-memoria-text-whisper max-w-lg mx-auto mb-12 font-light leading-relaxed">
            A curated collection of premium goods for those who demand excellence in every detail.
          </p>
          <Link href="/category/all">
            <Button 
              size="lg" 
              className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-12 h-16 text-base font-medium hover:bg-memoria-text-secondary transition-all"
              aria-label="View Collection"
            >
              View Collection <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="py-12 px-4 md:px-14 border-y border-memoria-border-muted"
        aria-label="Quick Stats"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row gap-12 justify-center items-center">
          {[
            { label: 'Products', value: '15' },
            { label: 'Categories', value: '6' },
            { label: 'Customers', value: '2.4K' }
          ].map(stat => (
            <div key={stat.label} className="text-center md:text-left">
              <span className="label-whisper block mb-2">{stat.label}</span>
              <div className="hero-number text-7xl md:text-8xl text-memoria-text-hero">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section 
        className="py-32 px-4 md:px-14"
        aria-labelledby="collection-title"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <span className="label-whisper">Curated Selection</span>
            <h2 id="collection-title" className="text-4xl md:text-6xl font-light tracking-tight mt-4 font-display">
              Featured Goods
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group no-underline"
                aria-label={`View details for ${product.name}`}
              >
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm overflow-hidden group-hover:border-memoria-border-active transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-memoria-bg-ultra-dark flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                      <ShoppingBag size={48} className="text-memoria-bg-surface group-hover:text-memoria-text-meta transition-colors" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-normal text-memoria-text-hero">
                          {product.name}
                        </h3>
                        <span className="text-lg font-light text-memoria-text-hero font-display">
                          ${product.price}
                        </span>
                      </div>
                      <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta">
                        {product.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="border-t border-memoria-border-muted py-20 px-4 md:px-14 bg-memoria-bg-ultra-dark"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-lg font-normal text-memoria-text-hero tracking-tight mb-2">SpendThrone</span>
            <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
              © 2026 SpendThrone • Excellence in Detail
            </span>
          </div>
          <div className="flex gap-8 items-center">
            <div className="flex gap-2 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest text-memoria-text-meta">
                Global Network Online
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
