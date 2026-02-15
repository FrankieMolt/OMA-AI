'use client';
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Check, Cpu, Globe, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SearchFilters {
  category: string;
  sortBy: 'relevance' | 'newest' | 'rating' | 'price_low' | 'price_high';
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    sortBy: 'relevance'
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = ['AI & ML', 'Blockchain', 'Data', 'Infrastructure', 'Security'];

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      performSearch();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query, filters]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      if (filters.category !== 'all') params.append('category', filters.category);
      const res = await fetch(`/api/services?${params.toString()}`);
      const data = await res.json();
      setResults(data.services || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div role="main" className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-32 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Intelligence Index
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             Global<br/><span className="text-memoria-text-secondary">Search</span>
          </h1>
          
          <div className="relative max-w-4xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-memoria-text-whisper" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Query APIs, models, or agents..."
              aria-label="Search APIs, models, or agents"
              className="w-full pl-14 pr-4 py-5 bg-memoria-bg-card border border-memoria-border-default rounded-sm text-white text-lg focus:outline-none focus:border-white transition-all font-light"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-14 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
          
          {/* Filters */}
          <aside className="space-y-10">
            <div>
               <span className="label-whisper mb-6 block">Classification</span>
               <div className="space-y-2">
                  <button 
                    onClick={() => setFilters({...filters, category: 'all'})}
                    aria-label="Show all systems"
                    className={`w-full text-left px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${filters.category === 'all' ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark' : 'text-memoria-text-whisper hover:text-white'}`}
                  >
                    All Systems
                  </button>
                  {categories.map(c => (
                    <button 
                      key={c}
                      onClick={() => setFilters({...filters, category: c})}
                      aria-label={`Filter by ${c}`}
                      className={`w-full text-left px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${filters.category === c ? 'bg-memoria-text-hero text-memoria-bg-ultra-dark' : 'text-memoria-text-whisper hover:text-white'}`}
                    >
                      {c}
                    </button>
                  ))}
               </div>
            </div>

            <Button 
               variant="outline" 
               className="w-full border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm h-10 text-[10px] font-bold uppercase tracking-widest"
               onClick={() => { setQuery(''); setFilters({ category: 'all', sortBy: 'relevance' }); }}
            >
               Reset Parameters
            </Button>
          </aside>

          {/* Results */}
          <section>
            <div className="flex items-center justify-between mb-10 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
               <span>{results.length} Entities Indexed</span>
               <div className="flex items-center gap-4">
                  <span>Sort Order</span>
                  <select 
                     aria-label="Sort results by"
                     className="bg-transparent border-none text-memoria-text-hero focus:outline-none cursor-pointer"
                     value={filters.sortBy}
                     onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                  >
                     <option value="relevance">Relevance</option>
                     <option value="newest">Newest</option>
                     <option value="rating">Top Rated</option>
                  </select>
               </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-memoria-text-meta">
                 <Globe size={48} className="animate-pulse mb-4 opacity-20" />
                 <p className="text-[10px] uppercase tracking-[0.3em]">Querying Network...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((service) => (
                  <Card key={service.id} className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 hover:border-memoria-border-active transition-all group">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center">
                           <Cpu size={18} className="text-memoria-text-hero" />
                        </div>
                        <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta">
                           {service.category}
                        </Badge>
                     </div>
                     <h3 className="text-2xl font-light text-memoria-text-hero mb-2 font-display group-hover:translate-x-1 transition-transform">
                        {service.name}
                     </h3>
                     <p className="text-sm text-memoria-text-whisper font-light line-clamp-2 mb-8">
                        {service.description}
                     </p>
                     <div className="flex items-center justify-between pt-6 border-t border-memoria-border-muted">
                        <div className="flex items-baseline gap-1">
                           <span className="text-lg font-light text-memoria-text-hero">${service.price_per_use || service.price}</span>
                           <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">/ call</span>
                        </div>
                        <Button variant="outline" className="border-memoria-border-muted text-memoria-text-whisper hover:text-white rounded-sm h-10 text-[10px] font-bold uppercase tracking-widest">
                           Details
                        </Button>
                     </div>
                  </Card>
                ))}
                
                {results.length === 0 && !loading && (
                  <div className="col-span-full text-center py-32 border border-dashed border-memoria-border-muted rounded-sm">
                    <Database size={48} className="mx-auto mb-6 opacity-20" />
                    <p className="text-memoria-text-whisper text-lg font-light">No matches found in the current index.</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
