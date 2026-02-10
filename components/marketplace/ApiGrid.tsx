'use client';

import React from 'react';
import { Search } from 'lucide-react';
import ApiCard from './ApiCard';
import ApiCardSkeleton from './ApiCardSkeleton';
import { ApiService } from '@/lib/mock-api-data';

interface ApiGridProps {
  filteredServices: ApiService[];
  isLoading: boolean;
  selectedCategory: string;
}

export default function ApiGrid({ filteredServices, isLoading, selectedCategory }: ApiGridProps) {
  return (
    <section className="section-spacing">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">
            {selectedCategory === 'all' ? 'All APIs & MCPs' : selectedCategory}
            <span className="text-zinc-500 text-lg font-normal ml-3">
              ({filteredServices.length} results)
            </span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Sort APIs"
            >
              <option>Popularity</option>
              <option>Rating</option>
              <option>Price</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ApiCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-state">
            <Search className="w-16 h-16 empty-state-icon" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-2">No APIs found</h3>
            <p className="empty-state-text">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ApiCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
