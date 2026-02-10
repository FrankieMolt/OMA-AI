'use client';

import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <nav aria-label="Filter APIs by category" className="py-8 px-6 border-b border-zinc-800 sticky top-16 z-40 bg-zinc-950/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="text-zinc-500 shrink-0" size={18} aria-hidden="true" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
