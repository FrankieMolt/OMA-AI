'use client';

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Zap, Shield } from 'lucide-react';

export default function ResumeScorePage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             AI Services
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
             Intelligence<br/><span className=\"text-memoria-text-secondary\">Score</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
             Evaluate candidate alignment with specific job requirements using semantic similarity models.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-14">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10">
               <span className="label-whisper mb-6 block">Target Parameters</span>
               <textarea 
                  className="w-full h-64 bg-memoria-bg-ultra-dark border border-memoria-border-default rounded-sm p-6 text-white text-sm focus:outline-none focus:border-white transition-all font-light resize-none"
                  placeholder="Paste job description or requirements here..."
               />
               <Button className="w-full bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm h-14 text-xs font-bold uppercase tracking-widest mt-8">Run Match Analysis</Button>
            </Card>

            <div className="flex flex-col items-center justify-center border border-dashed border-memoria-border-muted rounded-sm bg-memoria-bg-card/20 p-10 text-center">
               <Target size={48} className="text-memoria-text-whisper mb-6 opacity-20" />
               <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display italic">Awaiting Input</h3>
               <p className="text-xs text-memoria-text-meta uppercase tracking-widest font-bold">Provide parameters to generate score</p>
            </div>
         </div>
      </section>
    </div>
  );
}
