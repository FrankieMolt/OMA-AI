'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-memoria-bg-ultra-dark">
      <h1>{categoryName}</h1>
    </div>
  );
}
