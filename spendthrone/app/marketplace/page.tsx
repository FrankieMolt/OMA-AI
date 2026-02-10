/**
 * Marketplace Page - Full product catalog
 */

'use client';

import { useState, useMemo } from 'react';
import { useApp } from '@/components/providers/AppProvider';
import { ProductGrid } from '@/components/product/ProductGrid';
import { CategoryFilter } from '@/components/product/CategoryFilter';
import { SearchBar } from '@/components/search/SearchBar';
import { realProducts as PRODUCTS } from '@/data/real-products';
import { SortOption } from '@/types';
import { useDebounce } from '@/hooks/useDebounce';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  
  const { cart, wishlist, compareList } = useApp();
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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            The Marketplace
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Browse our collection of the most extraordinary, physics-defying, and satirical products in the known universe.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
           <SearchBar 
             value={searchQuery} 
             onChange={setSearchQuery}
             onClear={() => setSearchQuery('')}
           />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </aside>

        <div className="flex-grow">
          <ProductGrid 
            products={filteredProducts} 
            sortBy={sortBy}
            onSortChange={setSortBy}
            onInspect={() => {}} 
          />
        </div>
      </div>
    </div>
  );
}
