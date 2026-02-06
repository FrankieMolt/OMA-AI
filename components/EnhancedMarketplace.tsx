'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  ExternalLink,
  Play,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Shield,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface ApiService {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  priceType: 'per_call' | 'monthly' | 'free';
  calls: number;
  monthlyCalls: number;
  growth: number;
  endpoint: string;
  tags: string[];
  featured: boolean;
  provider: string;
  uptime: number;
  responseTime: number;
  lastUpdated: string;
}

interface EnhancedMarketplaceProps {
  services: ApiService[];
  categories?: string[];
  onCategoryChange?: (category: string) => void;
  selectedCategory?: string;
}

export default function EnhancedMarketplace({
  services,
  categories = [],
  onCategoryChange,
  selectedCategory = 'all'
}: EnhancedMarketplaceProps) {
  const formatPrice = (price: number, priceType: string): string => {
    if (priceType === 'free') return 'FREE';
    return `$${price.toFixed(4)}${priceType === 'per_call' ? '/call' : '/mo'}`;
  };

  const formatCalls = (calls: number): string => {
    if (calls >= 1000000) return `${(calls / 1000000).toFixed(1)}M`;
    if (calls >= 1000) return `${(calls / 1000).toFixed(1)}K`;
    return calls.toString();
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => onCategoryChange?.(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.slice(0, 12).map((service, index) => (
          <EnhancedAPICard key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

// Enhanced API Card Component
function EnhancedAPICard({ service, index }: { service: ApiService; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all group relative"
    >
      {/* Trending Badge */}
      {service.growth > 30 && (
        <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
          <TrendingUp size={14} className="text-white" />
          <span className="text-white text-xs font-bold">
            +{service.growth.toFixed(1)}%
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Server size={24} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                {service.name}
              </h3>
              {service.featured && (
                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500">{service.provider}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
        {service.description}
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-zinc-900/50 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity size={12} className="text-zinc-500" />
            <span className="text-xs text-zinc-500">Calls</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {service.monthlyCalls >= 1000
              ? `${(service.monthlyCalls / 1000).toFixed(0)}K`
              : service.monthlyCalls}
          </div>
          <div className="text-xs text-zinc-600">/mo</div>
        </div>

        <div className="text-center border-x border-zinc-800">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs text-zinc-500">Rating</span>
          </div>
          <div className="text-sm font-semibold text-white">
            {service.rating}
          </div>
          <div className="text-xs text-zinc-600">/5.0</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Shield size={12} className="text-zinc-500" />
            <span className="text-xs text-zinc-500">Uptime</span>
          </div>
          <div className="text-sm font-semibold text-green-400">
            {service.uptime}%
          </div>
          <div className="text-xs text-zinc-600">SLA</div>
        </div>
      </div>

      {/* Growth Indicator */}
      <div className="flex items-center gap-2 mb-4">
        {service.growth > 0 ? (
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp size={14} />
            <span className="text-sm font-medium">+{service.growth.toFixed(1)}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-400">
            <TrendingDown size={14} />
            <span className="text-sm font-medium">{service.growth.toFixed(1)}%</span>
          </div>
        )}
        <span className="text-xs text-zinc-500">this month</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-zinc-800/50 text-zinc-400 text-xs rounded-md border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            {tag}
          </span>
        ))}
        {service.tags.length > 4 && (
          <span className="px-2 py-1 bg-zinc-800/50 text-zinc-500 text-xs rounded-md">
            +{service.tags.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <div>
          <div className="flex items-baseline gap-1">
            {service.priceType === 'free' ? (
              <span className="text-lg font-bold text-green-500">FREE</span>
            ) : (
              <>
                <DollarSign size={14} className="text-zinc-500" />
                <span className="text-lg font-bold text-white">
                  {service.price.toFixed(4)}
                </span>
                <span className="text-xs text-zinc-500">
                  /{service.priceType === 'per_call' ? 'call' : 'mo'}
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-zinc-500">
            {service.responseTime}ms avg response
          </div>
        </div>

        <div className="flex gap-2">
          <button
            aria-label={`Try ${service.name} API`}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-purple-600 transition-colors group-hover:text-purple-400"
          >
            <Play size={16} />
          </button>
          <a
            href={service.endpoint}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${service.name} API documentation`}
            className="p-2 rounded-lg bg-zinc-800 hover:bg-purple-600 transition-colors group-hover:text-purple-400"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="absolute top-2 left-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-zinc-500">Online</span>
        </div>
      </div>
    </motion.div>
  );
}

// Compact card for smaller spaces
export function CompactAPICard({ service }: { service: ApiService }) {
  return (
    <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all">
      <div className="flex items-center gap-3 mb-2">
        <Server size={20} className="text-purple-500" />
        <div>
          <div className="font-semibold text-white text-sm">{service.name}</div>
          <div className="text-xs text-zinc-500">{service.provider}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">{service.calls.toLocaleString()} calls</span>
        <div className="flex items-center gap-1">
          <Star size={10} className="text-yellow-500 fill-yellow-500" />
          <span className="text-zinc-400">{service.rating}</span>
        </div>
      </div>
    </div>
  );
}

// Status badge component
export function StatusBadge({
  status,
  label
}: {
  status: 'online' | 'offline' | 'degraded';
  label: string;
}) {
  const statusConfig = {
    online: {
      icon: CheckCircle2,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    offline: {
      icon: XCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30'
    },
    degraded: {
      icon: Activity,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1 ${config.bgColor} ${config.color} text-xs rounded-md border ${config.borderColor}`}
    >
      <Icon size={12} />
      <span className="font-medium">{label}</span>
    </div>
  );
}
