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
  Coins
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['All', 'Text', 'Code', 'Reasoning'];

const models = [
  {
    id: 'deepseek-v3.2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    description: 'State-of-the-art reasoning and coding performance. Competes with GPT-4o.',
    category: 'Reasoning',
    inputPrice: '$0.60',
    outputPrice: '$1.50',
    latency: '< 500ms',
    context: '128k',
    featured: true
  },
  {
    id: 'glm-4.7-flash',
    name: 'GLM 4.7 Flash',
    provider: 'Zhipu AI',
    description: 'Ultra-fast multilingual model optimized for low-latency tasks.',
    category: 'Text',
    inputPrice: '$0.10',
    outputPrice: '$0.20',
    latency: '< 100ms',
    context: '64k',
    featured: false
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    description: 'The standard for large-scale open source inference.',
    category: 'Text',
    inputPrice: '$1.00',
    outputPrice: '$4.00',
    latency: '< 400ms',
    context: '128k',
    featured: false
  },
  {
    id: 'qwen-3-coder',
    name: 'Qwen 3 Coder',
    provider: 'Alibaba',
    description: 'Specialized model for software engineering and complex logic.',
    category: 'Code',
    inputPrice: '$1.10',
    outputPrice: '$4.50',
    latency: '< 300ms',
    context: '32k',
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
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                activeCategory === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group p-6 rounded-2xl border transition-all flex flex-col",
              model.featured 
                ? "bg-gradient-to-br from-primary/5 via-card to-card border-primary/20 hover:border-primary/50" 
                : "bg-card border-border hover:border-muted-foreground/30"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  {model.category === 'Reasoning' && <Brain className="w-5 h-5 text-purple-500" />}
                  {model.category === 'Code' && <Cpu className="w-5 h-5 text-blue-500" />}
                  {model.category === 'Uncensored' && <Shield className="w-5 h-5 text-emerald-500" />}
                  {model.category === 'Text' && <MessageSquare className="w-5 h-5 text-orange-500" />}
                  {model.category === 'Image' && <Zap className="w-5 h-5 text-yellow-500" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">{model.name}</h3>
                  <p className="text-xs text-muted-foreground">{model.provider}</p>
                </div>
              </div>
              {model.featured && (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary px-2 py-0.5 rounded">
                  Top Tier
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-6 flex-grow">
              {model.description}
            </p>

            <div className="space-y-3 mb-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Price (Input/Output)</span>
                <span className="font-mono text-foreground">{model.inputPrice} / {model.outputPrice}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Avg Latency</span>
                <span className="text-foreground">{model.latency}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Context Window</span>
                <span className="text-foreground">{model.context}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <Coins className="w-4 h-4" />
                Pay with x402
              </button>
              <button className="px-3 py-2.5 bg-muted hover:bg-muted/80 rounded-xl transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
          <p className="text-muted-foreground">No models found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
