'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Thermometer, Wind, Zap, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function BioMetricsPage() {
  const [pulse, setPulse] = useState(72);
  const [oxygen, setOxygen] = useState(98);
  const [stress, setStress] = useState(24);
  const [isConnected, setIsConnected] = useState(false);
  const bioData = useRef({ pulse: 72, oxygen: 98, stress: 24, lastUpdate: Date.now() });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      bioData.current.pulse = pulse;
      bioData.current.oxygen = oxygen;
      bioData.current.stress = stress;
      bioData.current.lastUpdate = Date.now();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Biological Quantification
          </Badge>
          <h1 className="text-5xl md:text-6xl font-light tracking-tighter leading-[0.9] mb-4 font-display text-memoria-text-hero">
             Bio<span className="italic">Metrics</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed mb-12">
             Real-time monitoring of physiological variables. 
             Integrate your biological stream with the Lethometry network for predictive health analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Pulse */}
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <Activity size={32} className="text-memoria-text-whisper flex-shrink-0" />
                  <span className="label-whisper mb-2 block">Heart Rate</span>
                  <div className="text-5xl font-light font-display text-memoria-text-hero">
                    {pulse}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-memoria-text-meta">BPM • Optimal</span>
                </div>
                <Heart size={24} className="text-memoria-text-whisper" />
              </CardContent>
            </Card>

            {/* Oxygen */}
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
              <CardContent className="pt-6">
                <Wind size={32} className="text-blue-400 mb-4" />
                <span className="label-whisper mb-2 block">Oxygen Saturation</span>
                <div className="text-5xl font-light font-display text-memoria-text-hero">
                    {oxygen}%
                  </div>
                  <span className="text-xs uppercase tracking-widest text-memoria-text-meta">SpO2 • Stable</span>
                </CardContent>
            </Card>

            {/* Stress */}
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
              <CardContent className="pt-6">
                <Activity size={32} className="text-amber-500 mb-4" />
                <span className="label-whisper mb-2 block">Existential Stress</span>
                <div className="text-5xl font-light font-display text-memoria-text-hero">
                  {stress}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-memoria-text-meta">Index • Low</span>
                </CardContent>
            </Card>

            {/* Sync Button */}
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-6">
              <CardContent className="flex flex-col items-center justify-between">
                <Zap size={32} className="text-yellow-500 mb-4" />
                <span className="label-whisper mb-2 block">Neural Link</span>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full"
                  disabled={!isConnected}
                >
                  {isConnected ? 'Syncing...' : 'Connect Wearable'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 pt-8 border-t border-memoria-border-muted">
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="lg">
                Sync Now
              </Button>
              <Button variant="ghost" size="lg">
                Calibrate Sensors
              </Button>
              <Button variant="ghost" size="lg">
                View Historical Data
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
