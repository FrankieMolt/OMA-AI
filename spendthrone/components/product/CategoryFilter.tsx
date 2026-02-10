/**
 * CategoryFilter Component - Horizontal category pills
 */

'use client';

import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/constants';
import { getProductsByCategory } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  // Get count for each category
  const getCategoryCount = (category: string) => {
    if (category === 'all') {
      return getProductsByCategory('all').length;
    }
    return getProductsByCategory(category).length;
  };

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
        {CATEGORIES.map((category) => {
          const count = getCategoryCount(category);
          const isSelected = selectedCategory === category;
          
          return (
            <motion.button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={cn(
                'relative flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 snap-start',
                isSelected
                  ? 'bg-white text-black'
                  : 'bg-zinc-900/50 text-zinc-500 border border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category === 'all' ? 'All Items' : category}</span>
              <span 
                className={cn(
                  'ml-2 text-[10px] px-1.5 py-0.5 rounded-full',
                  isSelected ? 'bg-black/10' : 'bg-zinc-800'
                )}
              >
                {count}
              </span>
              
              {isSelected && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white rounded-xl -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
    </div>
  );
}
