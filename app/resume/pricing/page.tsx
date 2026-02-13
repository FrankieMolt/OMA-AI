'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResumePricingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Economics
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             Service<br/><span className="text-memoria-text-secondary">Quotas</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl mx-auto font-light leading-relaxed">
             Simple pay-per-use pricing for AI Resume Parsing. 
             Transparent, automated settlement via x402.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-14">
         <div className="max-w-xl mx-auto">
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10 text-center">
               <span className="label-whisper mb-6 block">Standard Rate</span>
               <div className="flex items-baseline justify-center gap-2 mb-8">
                  <span className="hero-number text-8xl">0.05</span>
                  <span className="text-memoria-text-meta text-lg font-light uppercase tracking-widest">USDC</span>
               </div>
               <p className="text-sm text-memoria-text-whisper mb-10 font-light italic">Per successful neural analysis.</p>
               <Button className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-14 text-xs font-bold uppercase tracking-widest">Initialize Balance</Button>
            </Card>
         </div>
      </section>
    </div>
  );
}
