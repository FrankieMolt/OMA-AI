'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';
import ApiCard from './ApiCard';
import { ApiService } from '@/lib/mock-api-data';

interface FeaturedAPIsProps {
  featuredServices: ApiService[];
}

export default function FeaturedAPIs({ featuredServices }: FeaturedAPIsProps) {
  return (
    <section className="section-spacing bg-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="text-yellow-500" size={28} aria-hidden="true" />
            Featured APIs & MCPs
          </h2>
          <Link
            href="/marketplace"
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2"
            aria-label="View all APIs"
          >
            View All
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service, index) => (
            <ApiCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
