/**
 * SearchBar Component - Search input with history
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useDebounceCallback } from '@/hooks/useDebounce';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function SearchBar({ 
  value, 
  onChange, 
  onClear,
  placeholder = "Search products, tags, descriptions..."
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Debounce search input
  const debouncedOnChange = useDebounceCallback((value: string) => onChange(value), 300);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedOnChange(e.target.value);
  };

  // Handle clear
  const handleClear = () => {
    onChange('');
    onClear();
    inputRef.current?.focus();
  };

  // Popular searches
  const popularSearches = [
    'quantum',
    'levitation',
    'ai',
    'luxury',
    'weird',
  ];

  // Recent searches (from localStorage would be better)
  const recentSearches: string[] = [];

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative group',
          isFocused && 'z-10'
        )}
      >
        {/* Glow effect */}
        <div className={cn(
          'absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 transition-opacity duration-300',
          isFocused && 'opacity-25'
        )} />
        
        <div className="relative flex items-center">
          <Search 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors" 
            size={20} 
          />
          
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className={cn(
              'w-full pl-14 pr-12 py-4 bg-black border border-zinc-800 rounded-2xl',
              'text-white placeholder-zinc-600',
              'focus:outline-none focus:border-purple-500 transition-all duration-200',
              'text-base'
            )}
          />
          
          {value && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && !value && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl z-20"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} className="text-zinc-600" />
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Recent
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.slice(0, 5).map((term) => (
                    <button
                      key={term}
                      onClick={() => onChange(term)}
                      className="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700 hover:text-white transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-zinc-600" />
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  Trending
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => onChange(term)}
                    className="px-3 py-1.5 bg-purple-500/10 text-purple-300 text-sm rounded-lg hover:bg-purple-500/20 transition-colors border border-purple-500/20"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
