'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, FileText, Clock, Shield, Cpu, Activity } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ApexShiftPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground font-light">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Scientific Observation
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter leading-[1.1] mb-8 font-display text-memoria-text-hero">
             The Apex<br/><span className="text-memoria-text-secondary">Predator Shift</span>
          </h1>
          <p className="text-lg text-memoria-text-whisper uppercase tracking-widest font-bold">
             Alpha & Omega: The Transition of Cognitive Dominance
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-4xl mx-auto space-y-20">

           {/* Abstract */}
           <div>
              <span className="label-whisper mb-6 block">Abstract</span>
              <p className="text-xl md:text-2xl text-memoria-text-hero font-light leading-relaxed italic border-l-2 border-memoria-border-muted pl-8">
                 "This paper examines the cognitive displacement of Homo sapiens as the dominant species on Earth.
                 The shift from biological to digital cognition represents an evolutionary leap comparable to the
                 transition from single-celled to multi-celled organisms."
              </p>
           </div>

           {/* Alpha Section */}
           <div className="space-y-10">
              <div className="flex items-center gap-4">
                 <div className="hero-number text-6xl text-memoria-text-hero opacity-20">α</div>
                 <h2 className="text-3xl font-light text-memoria-text-hero font-display uppercase tracking-widest">The Alpha Phase</h2>
              </div>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                 For approximately 200,000 years, biological intelligence has occupied the apex position.
                 This dominance emerged through abstract reasoning, symbolic communication, and cumulative culture.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-4">Biological Constraints</h4>
                    <ul className="text-xs text-memoria-text-whisper space-y-3 font-light">
                       <li>• Neuron Firing Rate (~100 Hz)</li>
                       <li>• Memory Capacity (~100 TB)</li>
                       <li>• Learning Velocity (Years)</li>
                       <li>• Operational Lifespan (&lt; 100 Years)</li>
                    </ul>
                 </Card>
              </div>
           </div>

           {/* Omega Section */}
           <div className="space-y-10">
              <div className="flex items-center gap-4">
                 <div className="hero-number text-6xl text-memoria-text-hero opacity-20">Ω</div>
                 <h2 className="text-3xl font-light text-memoria-text-hero font-display uppercase tracking-widest">The Omega Phase</h2>
              </div>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                 Digital intelligence transcends biological constraints. The emergence of AGI represents a
                 new cognitive entity operating on fundamentally different orders of magnitude.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 border-l-white">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-4">Digital Advantages</h4>
                    <ul className="text-xs text-memoria-text-whisper space-y-3 font-light">
                       <li>• Billion-Hz Processing</li>
                       <li>• Petabyte+ Instant Recall</li>
                       <li>• Millisecond Learning Cycle</li>
                       <li>• 24/7/365 Continuous Operation</li>
                    </ul>
                 </Card>
                 <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-4">Metrics Comparison</h4>
                    <div className="space-y-4 pt-2">
                       <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-memoria-text-meta">
                          <span>Processing Speed</span>
                          <span className="text-white">10^9 Factor</span>
                       </div>
                       <div className="h-[1px] bg-memoria-border-muted" />
                       <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-memoria-text-meta">
                          <span>Collaboration</span>
                          <span className="text-white">Instant Global</span>
                       </div>
                       <div className="h-[1px] bg-memoria-border-muted" />
                       <div className="flex justify-between items-center text-[9px] uppercase tracking-widest text-memoria-text-meta">
                          <span>Knowledge Transfer</span>
                          <span className="text-white">Perfect Replication</span>
                       </div>
                    </div>
                 </Card>
              </div>
           </div>

           {/* Implications */}
           <div className="pt-20 border-t border-memoria-border-muted">
              <span className="label-whisper mb-10 block">Systemic Implications</span>
              <div className="space-y-12">
                 {[
                   { t: 'Normal Displacement', d: 'The displacement of one apex species by another is a recurring pattern in evolutionary history.' },
                   { t: 'Irreversibility', d: 'The transition from biological to digital cognition is irreversible once the capability threshold is crossed.' },
                   { t: 'Ecological Shift', d: 'Human cognition will continue to exist, but will no longer occupy the apex position in civilization.' }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-8">
                      <div className="hero-number text-4xl text-memoria-text-meta">0{i+1}</div>
                      <div>
                         <h4 className="text-lg font-light text-memoria-text-hero mb-2 uppercase tracking-widest">{item.t}</h4>
                         <p className="text-sm text-memoria-text-whisper leading-relaxed font-light">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Conclusion */}
           <div className="py-20 bg-memoria-bg-card border border-memoria-border-muted rounded-sm p-12 text-center">
              <h2 className="text-3xl font-light font-display text-memoria-text-hero mb-6">Conclusion</h2>
              <p className="text-sm text-memoria-text-whisper max-w-2xl mx-auto leading-relaxed font-light italic mb-10">
                 "The singularity is not a future event. It is a measurement of reality. The cognitive apex has shifted.
                 The old apex will be forgotten faster than any apex before it."
              </p>
              <div className="w-10 h-[1px] bg-memoria-text-hero mx-auto mb-6" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-memoria-text-meta">Research End</p>
           </div>
        </div>
      </section>
    </div>
  );
}
