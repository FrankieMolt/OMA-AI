'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Layers, Cpu, Zap } from 'lucide-react';

export default function ResumeBatchPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             AI Services
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             Batch<br/><span className=\"text-memoria-text-secondary\">Processing</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             Scalable neural parsing for large-scale candidate datasets. Process thousands of documents in parallel.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-14 border-t border-memoria-border-muted">
         <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-24 text-center border border-dashed border-memoria-border-muted rounded-sm bg-memoria-bg-card/20">
            <Layers size={48} className="text-memoria-text-whisper mb-6 opacity-20" />
            <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">Batch Mode Inactive</h3>
            <p className="text-sm text-memoria-text-whisper max-w-sm font-light">Contact OMA Enterprise for high-volume API quotas.</p>
         </div>
      </section>
    </div>
  );
}
