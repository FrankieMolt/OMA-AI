/**
 * SpendThrone Homepage - Refactored with Approved Components
 * Following Wednesday Design guidelines
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  ShoppingCart, 
  ArrowRight,
  Star,
  Zap,
  Filter
} from 'lucide-react';

export default function SpendThronePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'AI-Powered Resume Builder', price: 49.99, category: 'AI Tools', rating: 4.8, reviews: 1247 },
    { id: 2, name: 'Smart Calendar Assistant', price: 19.99, category: 'Productivity', rating: 4.6, reviews: 892 },
    { id: 3, name: 'Email Summarizer', price: 29.99, category: 'Communication', rating: 4.7, reviews: 2341 },
    { id: 4, name: 'Code Review AI', price: 39.99, category: 'Development', rating: 4.9, reviews: 5678 },
    { id: 5, name: 'Meeting Notes AI', price: 14.99, category: 'Productivity', rating: 4.5, reviews: 1834 },
    { id: 6, name: 'Social Media Assistant', price: 24.99, category: 'Marketing', rating: 4.4, reviews: 923 },
  ];

  const categories = ['all', 'AI Tools', 'Productivity', 'Communication', 'Development', 'Marketing'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
              <ShoppingBag size={20} className="text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">SpendThrone</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Button variant="ghost">Marketplace</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-[#4ADE80] to-[#0D9488]">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              The Sovereign Marketplace
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Discover
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4ADE80] to-[#0D9488]">
                Premium AI Products
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-xl">
              Curated AI tools and products that actually work. 
              Verified quality, real reviews, transparent pricing.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-[#4ADE80] to-[#0D9488] px-8">
                Browse Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>

            <div className="mt-12 flex gap-10">
              <div>
                <div className="text-3xl font-bold">2,500+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold">15K+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Categories</div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
             <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20" />
             <div className="grid gap-4 relative">
               {products.slice(0, 3).map((product, i) => (
                 <motion.div
                   key={product.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                 >
                   <Card className="glass-card hover:border-primary/40 transition-all">
                     <CardContent className="p-6 flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                           <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                              <Zap className="text-primary w-6 h-6" />
                           </div>
                           <div>
                              <div className="font-semibold text-lg">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.category}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-2xl font-bold">${product.price}</div>
                           <div className="flex items-center gap-1 text-sm text-[#4ADE80] justify-end">
                              <Star size={12} fill="currentColor" />
                              {product.rating}
                           </div>
                        </div>
                     </CardContent>
                   </Card>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section className="py-20 bg-muted/30 border-y border-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <Badge variant="outline" className="mb-4">Product Catalog</Badge>
              <h2 className="text-4xl font-bold">Browse AI-Powered Products</h2>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search tools..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat ? 'bg-primary/20 text-primary border-primary/30 hover:bg-primary/30' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All Products' : cat}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col group hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary">{product.category}</Badge>
                      <div className="flex items-center gap-1 text-sm font-medium">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        {product.rating}
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription>
                      Empowering your workflow with advanced neural networks and automation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-6 border-t border-border flex justify-between items-center">
                    <div className="text-2xl font-bold">${product.price}</div>
                    <Button size="sm" className="bg-[#4ADE80] hover:bg-[#4ADE80]/90">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <ShoppingBag size={16} className="text-muted-foreground" />
             </div>
             <span className="font-bold">SpendThrone</span>
          </div>
          
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Marketplace</a>
            <a href="#" className="hover:text-foreground transition-colors">Reviews</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2026 SpendThrone Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
