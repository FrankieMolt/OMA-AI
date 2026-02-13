/**
 * SpendThrone Landing Page - shadcn/ui + Memoria
 * Philosophy: "Numbers are heroes, labels are whispers"
 */

'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const products = [
    { id: 1, name: 'Chronos Elite', price: '1,200', category: 'Timepieces', slug: 'chronos-elite' },
    { id: 2, name: 'Aether Speaker', price: '850', category: 'Audio', slug: 'aether-speaker' },
    { id: 3, name: 'Lumina Lamp', price: '450', category: 'Lighting', slug: 'lumina-lamp' },
    { id: 4, name: 'Vertex Wallet', price: '250', category: 'Accessories', slug: 'vertex-wallet' },
    { id: 5, name: 'Nova Pen', price: '180', category: 'Writing', slug: 'nova-pen' },
    { id: 6, name: 'Origin Desk', price: '2,400', category: 'Furniture', slug: 'origin-desk' },
  ];

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      
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
          <p className="text-lg md:text-xl text-memoria-text-whisper max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            A curated collection of premium goods for those who demand excellence in every detail. 
            From precision timepieces to artisan furniture, each piece in our collection represents 
            the pinnacle of craftsmanship and design. We partner with master artisans and innovative 
            creators worldwide to bring you products that transcend the ordinary—objects that combine 
            functionality with timeless aesthetics. Whether you seek the perfect writing instrument, 
            audiophile-grade sound systems, or statement lighting for your space, SpendThrone offers 
            a carefully vetted selection that meets the highest standards of quality and provenance.
          </p>
          <Link href="/marketplace">
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
                aria-label={`View ${product.name} - $${product.price}`}
              >
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm overflow-hidden group-hover:border-memoria-border-active transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-memoria-bg-surface flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                      <ShoppingBag size={48} className="text-memoria-text-secondary group-hover:text-memoria-text-hero transition-colors" />
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
    </div>
  );
}
