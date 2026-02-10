/**
 * ProductGrid Component - Grid layout for products with sorting
 */

'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid3X3, LayoutList } from 'lucide-react';
import { Product, SortOption } from '@/types';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/Button';
import { SORT_OPTIONS } from '@/lib/constants';

interface ProductGridProps {
  products: Product[];
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onInspect: (product: Product) => void;
  isLoading?: boolean;
}

export function ProductGrid({ 
  products, 
  sortBy, 
  onSortChange, 
  onInspect,
  isLoading 
}: ProductGridProps) {
  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'popularity':
        return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'newest':
        return sorted.sort((a, b) => 
          new Date(b.addedAt || '').getTime() - new Date(a.addedAt || '').getTime()
        );
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  }, [products, sortBy]);

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20">
        <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-zinc-900 flex items-center justify-center">
          <SlidersHorizontal className="text-zinc-600" size={40} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
        <p className="text-zinc-500 max-w-md mx-auto">
          Try adjusting your search or category filter to find what you&apos;re looking for.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-zinc-500 text-sm">
          Showing <span className="text-white font-medium">{products.length}</span> products
        </p>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-zinc-500 hidden sm:inline">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:border-purple-500 transition-colors"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onInspect={onInspect}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
