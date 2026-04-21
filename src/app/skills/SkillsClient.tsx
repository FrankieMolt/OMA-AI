'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Brain, Sparkles, Code, Zap, Shield, Search, ChevronRight, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SKILLS_CATALOG } from '@/lib/skills-catalog';

export default function SkillsClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  
  const categories = ['all', ...Array.from(new Set(SKILLS_CATALOG.map(s => s.category).flat()))];
  
  const filtered = SKILLS_CATALOG.filter(skill => {
    const matchesSearch = !search || 
      skill.name.toLowerCase().includes(search.toLowerCase()) ||
      skill.description.toLowerCase().includes(search.toLowerCase()) ||
      skill.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'all' || skill.category.includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-xl bg-violet-500/10 border border-violet-500/20 mb-6">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300/80">Skills Marketplace</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Agent Skills</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Pre-built capabilities that extend AI agents. Browse verified skills, compare capabilities, and install with one click.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500/50"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((skill) => (
            <GlassCard key={skill.slug} className="p-6 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: skill.color + '33', color: skill.color }}
                >
                  {skill.name.charAt(0)}
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  <span>★</span>
                  <span>{skill.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
              <p className="text-zinc-400 text-sm mb-4 flex-1">{skill.description}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skill.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="text-sm">
                  {skill.pricing_usdc === 0 ? (
                    <span className="text-green-400 font-medium">Free</span>
                  ) : (
                    <span className="text-violet-400 font-medium">${skill.pricing_usdc}/call</span>
                  )}
                </div>
                <Link
                  href={`/mcps/${skill.slug}`}
                  className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  View <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No skills match your search.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-zinc-500 mb-4">Want to publish your own skill?</p>
          <Link
            href="/publish"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
          >
            Publish a Skill <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
