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
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogList() {
  const blogPosts = [
    {
      slug: 'welcome-to-oma-ai',
      title: 'Welcome to OMA-AI: The Premier API Marketplace for AI Agents',
      excerpt: 'Announcing OMA-AI, the open marketplace that accelerates AGI by providing autonomous AI agents with infrastructure to discover, pay for, and use services autonomously.',
      date: 'February 7, 2026',
      author: 'OMA-AI Team',
      category: 'Announcement',
      readTime: '4 min read',
      image: '',
      tags: ['announcement', 'oma-ai', 'agents', 'api marketplace']
    },
    {
      slug: 'oma-ai-humans-and-agents-2026',
      title: 'How OMA-AI is Revolutionizing API Marketplace for Humans and AI Agents Alike',
      excerpt: 'Discover how OMA-AI creates the first unified marketplace where both humans and autonomous AI agents can discover, integrate, and pay for APIs, MCP servers, and developer tools using crypto payments.',
      date: 'February 6, 2026',
      author: 'OMA Team',
      category: 'Platform',
      readTime: '5 min read',
      image: '',
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
      image: '',
      tags: ['x402', 'crypto payments', 'ai agents', 'wallet adapter']
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Using Navbar component for consistency */}
      <Navbar />

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
                {/* Featured Image Placeholder */}
                <div className="relative mb-6 overflow-hidden rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 h-48 flex items-center justify-center">
                  <span className="text-4xl">📰</span>
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
      <Footer />
    </div>
  );
}
