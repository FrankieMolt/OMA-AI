'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Thermometer, Wind, Zap, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function BioMetricsPage() {
  const [pulse, setPulse] = useState(72);
  const [oxygen, setOxygen] = useState(98);
  const [stress, setStress] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p + (Math.random() > 0.5 ? 1 : -1));
      setOxygen(o => Math.min(100, Math.max(95, o + (Math.random() > 0.5 ? 0.1 : -0.1))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Biological Quantification
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-10 font-display text-memoria-text-hero">
             Bio<br/><span className="italic">Metrics</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-12">
             Real-time monitoring of physiological variables. 
             Integrate your biological stream with the Lethometry network for predictive health analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Pulse */}
             <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 flex flex-col items-center text-center">
                <Heart size={32} className="text-red-500 mb-6 animate-pulse" />
                <span className="label-whisper mb-2 block">Heart Rate</span>
                <div className="hero-number text-7xl mb-2">{pulse}</div>
                <span className="text-[10px] uppercase text-memoria-text-meta tracking-widest">BPM • Optimal</span>
             </Card>

             {/* Oxygen */}
             <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 flex flex-col items-center text-center">
                <Wind size={32} className="text-blue-400 mb-6" />
                <span className="label-whisper mb-2 block">Oxygen Saturation</span>
                <div className="hero-number text-7xl mb-2">{oxygen.toFixed(1)}%</div>
                <span className="text-[10px] uppercase text-memoria-text-meta tracking-widest">SpO2 • Stable</span>
             </Card>

             {/* Stress */}
             <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8 flex flex-col items-center text-center">
                <Activity size={32} className="text-scientific-amber mb-6" />
                <span className="label-whisper mb-2 block">Existential Stress</span>
                <div className="hero-number text-7xl mb-2">{stress}</div>
                <span className="text-[10px] uppercase text-memoria-text-meta tracking-widest">Index • Low</span>
             </Card>
          </div>
        </div>
      </section>

      {/* Sync Section */}
      <section className="py-20 px-4 md:px-14 border-t border-memoria-border-muted">
        <div className="mx-auto max-w-4xl text-center">
           <div className="inline-flex items-center gap-3 p-4 bg-memoria-bg-card border border-memoria-border-muted rounded-sm mb-12">
              <Zap size={16} className="text-yellow-500" />
              <span className="text-xs uppercase tracking-[0.2em] font-bold">Neural Link Pending Initiation</span>
           </div>
           <h2 className="text-3xl font-light font-display mb-8">Ready to synchronize?</h2>
           <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-12 text-xs font-bold uppercase tracking-widest">
                 Connect Wearable
              </Button>
              <Button variant="outline" className="border-memoria-border-muted text-memoria-text-meta hover:text-white rounded-sm px-8 h-12 text-xs font-bold uppercase tracking-widest">
                 View Historical Data
              </Button>
           </div>
        </div>
      </section>
    </div>
  );
}
