'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  Clock,
  Tag
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogListPage() {
  const blogPosts = [
    {
      slug: 'welcome-to-oma-ai',
      title: 'The Premier API Marketplace for AI Agents',
      excerpt: 'Announcing OMA-AI, the infrastructure that provides autonomous agents with the tools to discover and pay for services autonomously.',
      date: 'Feb 07, 2026',
      author: 'OMA-AI Team',
      category: 'Announcement',
      readTime: '4 min read',
      tags: ['oma-ai', 'agents', 'api']
    },
    {
      slug: 'oma-ai-humans-and-agents-2026',
      title: 'Revolutionizing the API Marketplace',
      excerpt: 'Discover how OMA-AI creates the first unified marketplace where both humans and autonomous AI agents can transact seamlessly.',
      date: 'Feb 06, 2026',
      author: 'OMA Team',
      category: 'Platform',
      readTime: '5 min read',
      tags: ['ai agents', 'x402 payments']
    },
    {
      slug: 'x402-payments-complete-guide-2026',
      title: 'Complete Guide to x402 Payments',
      excerpt: 'Learn about x402, the HTTP-native payment protocol designed specifically for autonomous machine agents.',
      date: 'Feb 06, 2026',
      author: 'OMA Team',
      category: 'Payments',
      readTime: '10 min read',
      tags: ['x402', 'crypto', 'agents']
    }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero */}
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Journal
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
             OMA-AI<br/><span className=\"text-memoria-text-secondary\">Insights</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             The latest developments in the autonomous agent economy, protocol updates, and industry analysis.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 md:px-14 border-t border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <span className="label-whisper">Latest Articles</span>
            <div className="text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
              {blogPosts.length} Entries Published
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="no-underline">
                   <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 h-full hover:border-memoria-border-active transition-all">
                      <div className="mb-6">
                         <Badge variant="outline" className="rounded-sm text-[9px] uppercase tracking-widest border-memoria-border-muted text-memoria-text-meta">
                            {post.category}
                         </Badge>
                      </div>
                      <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display leading-tight group-hover:translate-x-1 transition-transform">
                         {post.title}
                      </h3>
                      <p className="text-sm text-memoria-text-whisper font-light leading-relaxed mb-8 line-clamp-3">
                         {post.excerpt}
                      </p>

                      <div className="space-y-4 pt-6 border-t border-memoria-border-muted">
                         <div className="flex flex-wrap items-center gap-4 text-[9px] text-memoria-text-meta uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-2">
                               <Calendar size={12} />
                               <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <Clock size={12} />
                               <span>{post.readTime}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-xs text-memoria-text-hero group-hover:gap-4 transition-all">
                            Read Full Article <ArrowRight size={14} />
                         </div>
                      </div>
                   </Card>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription */}
      <section className="py-40 px-4 md:px-14 text-center border-t border-memoria-border-muted bg-memoria-bg-card/30">
        <div className="max-w-2xl mx-auto">
           <span className="label-whisper mb-6 block">Stay Updated</span>
           <h2 className="text-3xl md:text-5xl font-light mb-8 font-display text-memoria-text-hero">
              The Agent Intelligence Report
           </h2>
           <p className="text-sm text-memoria-text-whisper mb-10 font-light max-w-sm mx-auto">
              Get weekly updates on the OMA protocol and the state of autonomous AI. No noise, just engineering.
           </p>
           <div className="flex gap-2 max-w-md mx-auto">
              <input 
                 type="email" 
                 placeholder="your@email.com"
                 className="flex-1 px-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-white text-sm focus:outline-none focus:border-white transition-all"
              />
              <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-6 h-12 text-[10px] font-bold uppercase tracking-widest">
                 Subscribe
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
