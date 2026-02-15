'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Search, Plus, Trash2, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MemoryNode {
  id: string;
  title: string;
  type: 'concept' | 'event' | 'person' | 'technical';
  connections: number;
}

export default function MemoryToolsClient() {
  const [nodes, setNodes] = useState<MemoryNode[]>([
    { id: '1', title: 'Lethometry Protocol', type: 'technical', connections: 12 },
    { id: '2', title: 'Existential Risk', type: 'concept', connections: 8 },
    { id: '3', title: 'Agent Economy', type: 'concept', connections: 15 },
    { id: '4', title: 'Neural Networks', type: 'technical', connections: 24 },
    { id: '5', title: 'Marcus Aurelius', type: 'person', connections: 5 },
  ]);

  const [search, setSearch] = useState('');
  const filteredNodes = nodes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark text-memoria-text-hero selection:bg-memoria-text-hero selection:text-memoria-bg-ultra-dark">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Cognitive Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             Memory<br/><span className="italic text-memoria-text-secondary">Systems</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-12">
             Advanced tools for long-term knowledge retention and semantic mapping. 
             Externalize your cognitive architecture to prevent intellectual decay.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
                <h2 className="text-xs uppercase tracking-widest text-memoria-text-meta mb-4 font-normal">Knowledge Graph</h2>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta" size={16} />
                  <input
                    type="text"
                    id="node-search"
                    placeholder="Search nodes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search knowledge graph nodes"
                    className="w-full pl-10 pr-4 py-2 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm text-sm focus:outline-none focus:border-memoria-border-active"
                  />
                </div>
                <div className="space-y-2">
                  {filteredNodes.map(node => (
                    <div key={node.id} className="flex items-center justify-between p-3 bg-memoria-bg-ultra-dark rounded-sm">
                      <span className="text-sm">{node.title}</span>
                      <span className="text-xs text-memoria-text-meta">{node.connections}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Brain size={48} className="text-memoria-text-meta mx-auto mb-4 opacity-30" />
                  <p className="text-memoria-text-whisper text-sm">Graph visualization coming soon</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
