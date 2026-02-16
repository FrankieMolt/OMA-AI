'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Filter, ArrowUpDown, ChevronRight, Search, ArrowLeft } from 'lucide-react';
import { PRODUCTS, getProductsByCategory } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryPageClientProps {
  categoryId: string;
}

export default function CategoryPageClient({ categoryId }: CategoryPageClientProps) {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [categoryName, setCategoryName] = useState('All Products');

  useEffect(() => {
    if (categoryId) {
      const products = getProductsByCategory(categoryId);
      setFilteredProducts(products);
      
      // Format category name
      const name = categoryId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      setCategoryName(name);
    }
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-white selection:text-black">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 md:px-14 border-b border-[#1e1e1e]">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#71717a] hover:text-white transition-colors mb-8 group no-underline text-xs uppercase tracking-widest">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#71717a] mb-4 block">Curated Collection</span>
              <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-6 font-display">
                {categoryName}
              </h1>
              <p className="text-lg text-[#a1a1aa] font-light max-w-2xl">
                Explore our selection of {filteredProducts.length} extraordinary items in {categoryName}. 
                Excellence in every detail, delivered to your timeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1e1e1e] px-4 md:px-14 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#71717a]">
              <Filter size={14} />
              <span>Filter By</span>
              <Badge variant="outline" className="rounded-sm border-[#2a2a2a] text-white py-0.5">Price: Low to High</Badge>
           </div>
           <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#71717a]">
              <ArrowUpDown size={14} />
              <span>Sort By</span>
              <Badge variant="outline" className="rounded-sm border-[#2a2a2a] text-white py-0.5">Most Recent</Badge>
           </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group no-underline"
                >
                  <Card className="bg-[#121212] border-[#1e1e1e] rounded-sm overflow-hidden group-hover:border-[#3a3a3a] transition-all">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-[#050505] flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
                        <ShoppingBag size={48} className="text-[#1e1e1e] group-hover:text-[#71717a] transition-colors" />
                      </div>
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-light tracking-tight text-white font-display">
                            {product.name}
                          </h3>
                          <span className="text-lg font-light text-white font-display">
                            ${product.price}
                          </span>
                        </div>
                        <p className="text-[#71717a] text-xs line-clamp-2 mb-6 font-light leading-relaxed">
                          {product.shortDescription}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-[#2a2a2a] text-[#71717a] group-hover:border-[#a1a1aa] group-hover:text-white transition-colors">
                            {product.category.replace('-', ' ')}
                          </Badge>
                          <ChevronRight size={14} className="text-[#2a2a2a] group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-[#1e1e1e] rounded-sm">
               <Search size={48} className="text-[#1e1e1e] mx-auto mb-4" />
               <h3 className="text-xl font-light text-[#71717a]">No products found in this category</h3>
               <Link href="/">
                 <Button variant="outline" className="mt-6 border-[#2a2a2a] text-[#71717a] hover:text-white">
                    Browse All Products
                 </Button>
               </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
