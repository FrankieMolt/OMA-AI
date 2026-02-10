'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Code, Zap, Star } from 'lucide-react';
import StatCard from './StatCard';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  return (
    <section className="section-spacing">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Discover <span className="gradient-text">APIs & MCPs</span>
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Browse, test, and integrate 22+ APIs and MCP servers.
            Pay only for what you use with x402 crypto payments.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search APIs, MCPs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              aria-label="Search APIs and MCPs"
              role="searchbox"
              id="main-search"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 btn-primary px-6 py-2 rounded-lg"
              aria-label="Submit search"
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto">
            <StatCard icon={Code} value="22+" label="APIs & MCPs" />
            <StatCard icon={Zap} value="25M+" label="Calls/mo" />
            <StatCard icon={Star} value="4.7" label="Avg Rating" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
