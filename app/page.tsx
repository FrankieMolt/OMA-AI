'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code,
  Zap,
  Star,
  ExternalLink,
  Play,
  Filter,
  ArrowRight,
  Search,
  BookOpen,
  Shield,
  Loader2
} from 'lucide-react/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { LiveStats } from '@/components/LiveStats';
import { TrendingAPIs } from '@/components/TrendingAPIs';

// --- API Marketplace Types ---
interface ApiService {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  price: number;
  priceType: 'per_call' | 'monthly' | 'free';
  calls: number;
  endpoint: string;
  tags: string[];
  featured: boolean;
  provider: string;
}

// --- Skeleton Component for Loading State ---
const ApiCardSkeleton = memo(() => (
  <div className="glass-card p-6 rounded-xl">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded mb-3 skeleton" />
      </div>
      <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-zinc-800 rounded-md skeleton" />
          <div className="h-4 w-24 bg-zinc-800 rounded-md skeleton" />
      </div>
    </div>
    <div className="text-right ml-4 w-20">
        <div className="h-7 w-full bg-zinc-800 rounded mb-2 skeleton" />
        <div className="h-4 w-2/3 ml-auto bg-zinc-800 rounded skeleton" />
      </div>
  </div>
));

ApiCardSkeleton.displayName = 'ApiCardSkeleton';

// --- Stat Card Component ---
const StatCard = memo(({ icon: Icon, value, label, isLoading }: { icon: any; value: string; label: string; isLoading?: boolean }) => (
  <div className="glass-card p-6 text-center">
    {isLoading ? (
      <>
        <div className="w-8 h-8 mx-auto mb-2 bg-zinc-800 rounded-lg skeleton" />
        <div className="h-4 w-full bg-zinc-800 rounded mb-3 skeleton" />
        <div className="flex gap-2">
          <div className="w-4 h-4 rounded bg-zinc-800 skeleton" />
          <div className="h-4 w-24 bg-zinc-800 rounded skeleton" />
        </div>
      </>
    ) : (
      <>
        <Icon className="w-8 h-8 mx-auto mb-2 text-purple-400" />
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
      </>
    )}
  </div>
));

StatCard.displayName = 'StatCard';

// --- API Card Component ---
const ApiCard = memo(({ service, index }: { service: ApiService; index: number }) => (
  <motion.div

    [604 more lines in file. Use offset=101 to continue.]
