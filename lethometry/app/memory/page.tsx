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

export default function MemoryToolsPage() {
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
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Cognitive Infrastructure
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             Memory<br/><span className="italic">Systems</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-12">
             Advanced tools for long-term knowledge retention and semantic mapping. 
             Externalize your cognitive architecture to prevent intellectual decay.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Semantic Search */}
             <div className="lg:col-span-1 space-y-6">
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
                   <span className="label-whisper mb-4 block">Knowledge Graph</span>
                   <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-memoria-text-meta" size={14} />
                      <input 
                        type="text" 
                        placeholder="Search nodes..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-memoria-bg-ultra-dark border border-memoria-border-muted rounded-sm text-xs text-white focus:outline-none focus:border-white transition-all"
                      />
                   </div>
                   <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {filteredNodes.map(node => (
                         <div key={node.id} className="flex items-center justify-between p-3 bg-memoria-bg-ultra-dark border border-memoria-border-muted rounded-sm group hover:border-white transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-memoria-text-whisper" />
                               <span className="text-xs font-light">{node.title}</span>
                            </div>
                            <span className="text-[9px] text-memoria-text-meta">{node.connections} links</span>
                         </div>
                      ))}
                   </div>
                   <Button className="w-full mt-6 bg-white text-black hover:bg-zinc-200 h-10 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      <Plus size={14} className="mr-2" /> Add Entity
                   </Button>
                </Card>

                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
                   <span className="label-whisper mb-4 block">System Health</span>
                   <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase text-memoria-text-meta">Sync Status</span>
                      <span className="text-[10px] uppercase text-green-500 font-bold">Encrypted</span>
                   </div>
                   <div className="w-full bg-memoria-bg-ultra-dark h-1 rounded-full overflow-hidden">
                      <div className="bg-white h-full w-3/4" />
                   </div>
                   <span className="text-[9px] text-memoria-text-meta mt-2 block">742.4 GB utilized in memory cloud</span>
                </Card>
             </div>

             {/* Visualization / Main Area */}
             <div className="lg:col-span-2">
                <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm h-[600px] relative overflow-hidden flex flex-col items-center justify-center p-10">
                   <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-10 pointer-events-none">
                      {Array.from({ length: 400 }).map((_, i) => (
                         <div key={i} className="border-[0.5px] border-memoria-text-hero/20" />
                      ))}
                   </div>
                   
                   {/* Simulated Graph Content */}
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="relative w-64 h-64 border border-memoria-border-muted rounded-full flex items-center justify-center"
                   >
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-4 h-4 bg-white rounded-full blur-md animate-pulse" />
                      </div>
                      {nodes.map((node, i) => {
                         const angle = (i / nodes.length) * Math.PI * 2;
                         const x = Math.cos(angle) * 120;
                         const y = Math.sin(angle) * 120;
                         return (
                            <motion.div
                              key={node.id}
                              style={{ x, y }}
                              className="absolute w-3 h-3 bg-memoria-text-hero rounded-full border border-memoria-bg-ultra-dark cursor-pointer group"
                            >
                               <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all pointer-events-none bg-white text-black px-2 py-1 rounded-sm text-[9px] font-bold uppercase whitespace-nowrap z-50">
                                  {node.title}
                               </div>
                            </motion.div>
                         );
                      })}
                   </motion.div>

                   <div className="mt-20 text-center relative z-10">
                      <h3 className="text-2xl font-light font-display mb-4">Neural Knowledge Mapping</h3>
                      <p className="text-sm text-memoria-text-whisper max-w-sm font-light">
                         Your mental schema is being actively indexed. 
                         Navigate the nodes to explore connected concepts.
                      </p>
                      <div className="flex gap-4 mt-8 justify-center">
                         <Badge variant="outline" className="rounded-sm border-memoria-border-muted">2D Projection</Badge>
                         <Badge variant="outline" className="rounded-sm border-memoria-border-muted">Topological</Badge>
                      </div>
                   </div>

                   <div className="absolute bottom-6 right-6">
                      <div className="p-3 bg-memoria-bg-ultra-dark border border-memoria-border-muted rounded-sm flex items-center gap-3">
                         <Zap size={14} className="text-yellow-500" />
                         <span className="text-[10px] uppercase tracking-widest font-bold">Real-time Sync Active</span>
                      </div>
                   </div>
                </Card>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
