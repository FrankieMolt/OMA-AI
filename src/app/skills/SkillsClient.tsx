'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, Sparkles, Code, Zap, Shield, Search, ChevronRight, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SKILLS_CATALOG } from '@/lib/skills-catalog';

export default function SkillsClient() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync state FROM URL on mount
  useEffect(() => {
    const urlSearch = searchParams.get('q') || '';
    const urlCategory = searchParams.get('cat') || 'all';
    setSearch(urlSearch);
    setCategory(urlCategory);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync state TO URL when it changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category !== 'all') params.set('cat', category);
    const newUrl = params.toString() ? `?${params.toString()}` : '/skills';
    router.replace(newUrl, { scroll: false });
  }, [search, category, router]);

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

        {/* Results count */}
        <div className="mb-6 text-sm text-zinc-500">
          Showing {filtered.length} of {SKILLS_CATALOG.length} skills
          {search && ` matching "${search}"`}
          {category !== 'all' && ` in ${category}`}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <Link key={skill.name} href={`/mcps/${skill.slug}`}>
              <GlassCard className="p-5 hover:border-violet-500/50 transition-colors cursor-pointer h-full">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${skill.color || 'bg-violet-500/20'}`}>
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm">{skill.name}</h3>
                    <span className="text-xs text-zinc-400 capitalize">{skill.category}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded-full">
                    {skill.tools.length} tools
                  </span>
                  {skill.verified && (
                    <span className="text-xs text-green-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-zinc-700" />
            <p>No skills found matching your criteria.</p>
            <button onClick={() => { setSearch(''); setCategory('all'); }} className="mt-4 text-violet-400 hover:text-violet-300">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
