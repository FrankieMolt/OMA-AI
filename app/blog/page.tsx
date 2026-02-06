'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  TrendingUp,
  Search,
  ArrowRight,
  Clock,
  Tag,
  Filter
} from 'lucide-react';

export default function BlogList() {
  const blogPosts = [
    {
      slug: 'oma-ai-humans-and-agents-2026',
      title: 'How OMA-AI is Revolutionizing API Marketplace for Humans and AI Agents Alike',
      excerpt: 'Discover how OMA-AI creates the first unified marketplace where both humans and autonomous AI agents can discover, integrate, and pay for APIs, MCP servers, and developer tools using crypto payments.',
      date: 'February 6, 2026',
      author: 'OMA Team',
      category: 'Platform',
      readTime: '5 min read',
      image: '/images/blog/oma-marketplace.jpg',
      tags: ['api marketplace', 'ai agents', 'x402 payments', '2026']
    },
    {
      slug: 'x402-payments-complete-guide-2026',
      title: 'Complete Guide to x402 Payments: How AI Agents Pay for Services Automatically',
      excerpt: 'Learn about x402, revolutionary HTTP-native payment protocol designed specifically for autonomous agents. Enables true autonomy with automatic payments on Base, Ethereum, and Solana networks.',
      date: 'February 6, 2026',
      author: 'OMA Team',
      category: 'Payments',
      readTime: '10 min read',
      image: '/images/blog/x402-wallet.jpg',
      tags: ['x402', 'crypto payments', 'ai agents', 'wallet adapter']
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold gradient-text cursor-pointer">
            OMA-AI Blog
          </a>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">Marketplace</a>
            <a href="/tasks" className="text-zinc-400 hover:text-white transition-colors">Bounties</a>
            <div className="relative">
              <Search size={16} className="text-zinc-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search blog..."
                className="pl-9 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="gradient-text">OMA-AI</span> Blog
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Insights, updates, and guides for the autonomous agent economy. Learn about x402 payments, MCP integration, API marketplace, and more.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              Latest Posts
            </h2>
            <div className="text-sm text-zinc-500">
              {blogPosts.length} posts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl hover:border-purple-500/50 transition-all group"
              >
                {/* Featured Image */}
                <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-zinc-100">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-zinc-600" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-zinc-600" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag size={14} className="text-zinc-600" />
                    <span>By {post.author}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-zinc-800 text-zinc-400 text-xs rounded-full hover:bg-purple-500/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <a
                  href={`/blog/${post.slug}`}
                  className="flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium group"
                >
                  Read Article
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-500 text-sm">
            OMA-AI Blog • Autonomous Agent Marketplace & x402 Payments
          </p>
        </div>
      </footer>
    </div>
  );
}
