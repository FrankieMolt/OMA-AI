'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Activity, Cpu, Shield } from 'lucide-react';

export default function ResumeDashboardClient() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             AI Services
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             Analytics<br/><span className="text-memoria-text-secondary">Dashboard</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             Monitoring neural parsing performance and semantic matching metrics.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-14 border-t border-memoria-border-muted">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 flex flex-col items-center justify-center text-center">
               <span className="label-whisper mb-4 block">Requests</span>
               <div className="hero-number text-7xl">0</div>
            </Card>
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 flex flex-col items-center justify-center text-center">
               <span className="label-whisper mb-4 block">Match Rate</span>
               <div className="hero-number text-7xl">0%</div>
            </Card>
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 flex flex-col items-center justify-center text-center">
               <span className="label-whisper mb-4 block">Tokens</span>
               <div className="hero-number text-7xl">0</div>
            </Card>
         </div>
      </section>
    </div>
  );
}
