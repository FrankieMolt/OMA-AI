'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Wifi, Clock } from 'lucide-react';

interface NetworkMetric {
  value: number | string;
  label: string;
  suffix?: string;
  prefix?: string;
  change?: number;
  icon?: React.ReactNode;
}

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let timer: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        timer = requestAnimationFrame(animate);
      }
    };

    timer = requestAnimationFrame(animate);
    return () => {
      if (timer) cancelAnimationFrame(timer);
    };
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function StatusDot({ active = true }: { active?: boolean }) {
  return (
    <span className="relative flex h-2 w-2">
      {active && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
      )}
      <span
        className={`relative inline-flex rounded-full h-2 w-2 ${active ? 'bg-success' : 'bg-muted-foreground/60'}`}
      />
    </span>
  );
}

export function NetworkStats() {
  const [metrics] = useState<NetworkMetric[]>([
    { value: 15420, label: 'ACTIVE NEURAL NODES', icon: <Activity className="w-4 h-4" /> },
    { value: '18', label: 'COGNITIVE LATENCY', suffix: 'ms', icon: <Clock className="w-4 h-4" /> },
    { value: 99.9, label: 'SYSTEM ENTROPY', suffix: '%', icon: <Wifi className="w-4 h-4" /> },
  ]);

  const [tokenCounter, setTokenCounter] = useState(873326286);

  // Simulate live token counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenCounter((prev) => prev + Math.floor(Math.random() * 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Token Counter Panel - Jatevo Style */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative glass-card border-border/60 rounded-3xl p-8 backdrop-blur-3xl shadow-2xl group transition-all duration-500 hover:shadow-glow-primary/20 hover:border-primary/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Token Counter */}
            <div className="text-center md:text-left space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-primary uppercase tracking-[0.3em] font-bold font-mono">
                <StatusDot active />
                <span>NEURAL FRAMES PROCESSED</span>
              </div>
              <div className="text-5xl md:text-6xl font-bold text-foreground tracking-tighter font-mono bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
                {tokenCounter.toLocaleString()}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-20 bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />

            {/* Price & Savings */}
            <div className="flex items-center gap-6">
              <div className="text-center space-y-1">
                <div className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em] font-bold font-mono">
                  ACTIVE USERS
                </div>
                <div className="text-3xl font-bold text-foreground tracking-tight">2,847</div>
              </div>
              <div className="text-center bg-primary/10 border border-primary/20 rounded-2xl px-6 py-3 shadow-neon-sm">
                <div className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold font-mono mb-1">
                  AVG COST
                </div>
                <div className="text-3xl font-bold text-primary tracking-tight">
                  $0.79<span className="text-xs text-primary/60 font-medium">/1M</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Metrics Row - Jatevo Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center border-border/60 bg-foreground/[0.02] relative group overflow-hidden transition-all duration-300 hover:shadow-glow hover:border-primary/20"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <span className="text-primary/70 group-hover:text-primary transition-colors">
                {metric.icon}
              </span>
              <span className="text-[10px] text-muted-foreground/70 uppercase tracking-[0.2em] font-bold font-mono">
                {metric.label}
              </span>
            </div>
            <div className="text-4xl font-bold text-foreground mb-1 font-mono relative z-10 tracking-tight">
              {typeof metric.value === 'number' ? (
                <AnimatedNumber value={metric.value} />
              ) : (
                metric.value
              )}
              {metric.suffix && <span className="text-muted-foreground/70 text-xl ml-1">{metric.suffix}</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default NetworkStats;
