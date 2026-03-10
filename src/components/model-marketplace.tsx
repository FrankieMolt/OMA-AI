'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Shield, 
  Zap, 
  Brain,
  MessageSquare,
  Cpu,
  Coins,
  Lock,
  ZapOff,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Reasoning', 'Code', 'Uncensored', 'Text'];

const models = [
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    provider: 'Anthropic',
    description: 'Elite reasoning and coding. The flagship model for autonomous agents.',
    category: 'Reasoning',
    inputPrice: '3,500',
    outputPrice: '15,000',
    latency: '< 800ms',
    context: '200k',
    featured: true
  },
  {
    id: 'deepseek-v3.2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    description: 'Unmatched price-to-performance. Optimized for high-volume agentic tasks.',
    category: 'Reasoning',
    inputPrice: '850',
    outputPrice: '2,500',
    latency: '< 500ms',
    context: '128k',
    featured: true
  },
  {
    id: 'venice-uncensored',
    name: 'Venice Llama 3.1 405B',
    provider: 'Venice AI',
    description: 'Fully uncensored, zero data retention. Perfect for sovereign intelligence.',
    category: 'Uncensored',
    inputPrice: '500',
    outputPrice: '1,800',
    latency: '< 400ms',
    context: '128k',
    featured: true
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Versatile multimodal intelligence for complex vision and text tasks.',
    category: 'Text',
    inputPrice: '3,000',
    outputPrice: '12,000',
    latency: '< 400ms',
    context: '128k',
    featured: false
  },
  {
    id: 'qwen-2-5-coder',
    name: 'Qwen 2.5 Coder 32B',
    provider: 'Alibaba',
    description: 'Highly capable coding model with deep algorithmic understanding.',
    category: 'Code',
    inputPrice: '1,200',
    outputPrice: '4,800',
    latency: '< 300ms',
    context: '32k',
    featured: false
  },
  {
    id: 'llama-3-3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    description: 'The production standard for open-source LLM deployments.',
    category: 'Text',
    inputPrice: '1,500',
    outputPrice: '5,000',
    latency: '< 400ms',
    context: '128k',
    featured: false
  }
];

export function ModelMarketplace() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = models.filter(model => {
    const matchesCategory = activeCategory === 'All' || model.category === activeCategory;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-12">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Model Registry</h2>
          <p className="text-gray-500 font-medium">50+ specialized models optimized for the x402 economy.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-gray-300">1,000 Credits = $1.00 USD</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
          <input
            aria-label="Search models"
            type="text"
            placeholder="Filter models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-white font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                activeCategory === cat 
                  ? "bg-primary border-primary text-black shadow-lg shadow-primary/20" 
                  : "bg-transparent border-white/10 text-gray-500 hover:border-white/20 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group p-8 rounded-[2rem] border transition-all flex flex-col relative overflow-hidden",
              model.featured 
                ? "bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-white/10 hover:border-primary/40 shadow-2xl" 
                : "bg-zinc-950 border-white/5 hover:border-white/20"
            )}
          >
            {model.featured && (
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded border border-primary/20 uppercase tracking-widest">
                  Active
                </div>
              </div>
            )}
            
            <div className="flex items-start gap-4 mb-6">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                model.featured ? "bg-primary/10 text-primary" : "bg-white/5 text-gray-500 group-hover:text-white"
              )}>
                {model.category === 'Reasoning' && <Brain className="w-6 h-6" />}
                {model.category === 'Code' && <Cpu className="w-6 h-6" />}
                {model.category === 'Uncensored' && <Shield className="w-6 h-6" />}
                {model.category === 'Text' && <MessageSquare className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-black text-xl leading-none mb-1 text-white tracking-tight">
                  {model.name}
                </h3>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{model.provider}</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed font-medium">
              {model.description}
            </p>

            <div className="space-y-4 mb-8 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Credits / 1M Tokens</span>
                <span className="font-mono text-white font-bold text-sm bg-white/5 px-2 py-1 rounded border border-white/5">
                  {model.inputPrice} <span className="text-gray-600">/</span> {model.outputPrice}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Avg Latency</span>
                <span className="text-xs text-gray-300 font-bold">{model.latency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Context</span>
                <span className="text-xs text-gray-300 font-bold">{model.context}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn active:scale-95 shadow-xl shadow-white/5">
                <Coins className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                Initialize
              </button>
              <button aria-label="View technical docs" className="px-4 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all">
                <ExternalLink className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center gap-4">
          <ZapOff className="w-12 h-12 text-gray-700 animate-pulse" />
          <p className="text-gray-500 font-black uppercase tracking-widest text-xs">No matching nodes found.</p>
        </div>
      )}
    </div>
  );
}
