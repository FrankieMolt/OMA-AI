'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryFilter } from '@/components/product/CategoryFilter';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { realProducts as PRODUCTS } from '@/data/real-products';
import { SortOption } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

// Simple stub for cart/wishlist - in production this would be a context
const useApp = () => {
  return [
    { addToCart: () => {}, toggleWishlist: () => {}, toggleCompare: () => {}, isInWishlist: () => false, isInCompare: () => false },
    {},
    []
  ];
};

export default function MarketplaceClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  // Cart functionality disabled for static build
  // const [cart, wishlist, compareList] = useApp();
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = !debouncedSearch || 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, selectedCategory]);

  const sortedProducts = useMemo(() => {
    let products = [...filteredProducts];
    
    if (sortBy === 'featured') {
      products = products.filter(p => p.isNew === true || p.verified === true);
    } else if (sortBy === 'price-low') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products = products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      products = products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      products = products.sort((a, b) => (a.isNew ? -1 : 1));
    } else if (sortBy === 'name') {
      products = products.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    
    return products.slice(0, 12);
  }, [filteredProducts, sortBy]);

  return (
    <div role="main" className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-14">
        <h1 className="text-5xl md:text-6xl font-light text-memoria-text-hero mb-4 font-display tracking-tight">
          Marketplace
        </h1>
        <p className="text-memoria-text-whisper mb-8 max-w-2xl">
          Browse, discover, and purchase AI services from across the universe. Every integration is verified and ready for autonomous agent deployment.
        </p>
        
        {/* Search, Filter, Sort */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="w-full md:w-96">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search AI services..."
            />
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'price-low' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('price-low')}
              aria-label="Sort by price low to high"
            >
              Price ↑
            </Button>
            <Button
              variant={sortBy === 'price-high' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('price-high')}
              aria-label="Sort by price high to low"
            >
              Price ↓
            </Button>
            <Button
              variant={sortBy === 'newest' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortBy('newest')}
              aria-label="Sort by newest"
            >
              Newest
            </Button>
          </div>
        </div>
      </div>
      
      {/* Products Grid */}
      <ProductGrid 
        products={sortedProducts} 
        onInspect={(product) => console.log('Inspect:', product)}
      />
      
      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-20 h-20 bg-memoria-bg-surface rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-10 h-10 text-memoria-text-whisper"
              >
                <path 
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                  fill="currentColor" 
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-light text-memoria-text-whisper">No results found</h3>
              <p className="text-memoria-text-meta">Try adjusting your search or category filters</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
