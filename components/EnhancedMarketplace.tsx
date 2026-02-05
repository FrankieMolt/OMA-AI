import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  capabilities: string[];
  seller_wallet: string;
  seller_name?: string;
  status: string;
  total_sales: number;
  rating?: number;
  reviews?: number;
}

interface EnhancedMarketplaceProps {
  services: Service[];
  categories: string[];
}

export default function EnhancedMarketplace({ services, categories }: EnhancedMarketplaceProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-asc' | 'price-desc'>('popular');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredServices = services
    .filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter(s => selectedCategory === 'all' || s.type === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.total_sales - a.total_sales;
        case 'newest':
          return 0; // Would need created_at
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass bg-black/30 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="glass bg-black/30 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="glass bg-black/30 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Active Filters */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-gray-400">Filters:</span>
          {search && (
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2">
              Search: "{search}"
              <button onClick={() => setSearch('')} className="hover:text-white">×</button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-2">
              {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="hover:text-white">×</button>
            </span>
          )}
          {(search || selectedCategory !== 'all') && (
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all'); }}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-gray-400">
          {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
        </div>
        <button className="btn-secondary px-4 py-2 rounded-lg text-sm">
          + List Service
        </button>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <span className="text-6xl mb-4 block">🔍</span>
          <h3 className="text-2xl font-bold mb-2">No services found</h3>
          <p className="text-gray-400 mb-4">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => { setSearch(''); setSelectedCategory('all'); }}
            className="btn-primary px-6 py-3 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 hover:border-purple-500/50 transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs capitalize mb-2 inline-block">
                    {service.type}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                    {service.name}
                  </h3>
                  {service.seller_name && (
                    <div className="text-sm text-gray-400 mt-1">
                      by {service.seller_name}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleFavorite(service.id)}
                  className="text-xl hover:scale-110 transition-transform"
                >
                  {favorites.has(service.id) ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Capabilities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {service.capabilities.slice(0, 3).map((cap, i) => (
                  <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                    {cap}
                  </span>
                ))}
                {service.capabilities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                    +{service.capabilities.length - 3} more
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span>💰</span>
                  <span>{service.total_sales} sales</span>
                </div>
                {service.rating && (
                  <div className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{service.rating.toFixed(1)}</span>
                    {service.reviews && (
                      <span>({service.reviews})</span>
                    )}
                  </div>
                )}
              </div>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-2xl font-mono font-bold text-green-400">
                  ${service.price.toFixed(2)}
                </div>
                <button className="btn-primary px-4 py-2 rounded-lg text-sm hover:bg-purple-600 transition-colors">
                  Purchase
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
