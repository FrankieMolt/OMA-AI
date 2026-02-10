'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Wind, Eye, MessageCircle, Moon, Utensils, Footprints, Clock } from 'lucide-react';
import { calculateLifeStats, formatNumber } from '@/lib/calculations';
import { UserData } from '@/types';

interface LifeStatsProps {
  userData: UserData | null;
}

const statsConfig = [
  { key: 'secondsLived', label: 'Seconds Lived', icon: Clock, color: 'text-blue-400' },
  { key: 'heartbeats', label: 'Heartbeats', icon: Heart, color: 'text-rose-400' },
  { key: 'breathsTaken', label: 'Breaths Taken', icon: Wind, color: 'text-cyan-400' },
  { key: 'blinks', label: 'Blinks', icon: Eye, color: 'text-amber-400' },
  { key: 'wordsSpoken', label: 'Words Spoken', icon: MessageCircle, color: 'text-purple-400' },
  { key: 'sleepHours', label: 'Hours Slept', icon: Moon, color: 'text-indigo-400' },
  { key: 'mealsEaten', label: 'Meals Eaten', icon: Utensils, color: 'text-orange-400' },
  { key: 'stepsTaken', label: 'Steps Taken', icon: Footprints, color: 'text-emerald-400' },
];

export default function LifeStats({ userData }: LifeStatsProps) {
  const [stats, setStats] = useState<ReturnType<typeof calculateLifeStats> | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  useEffect(() => {
    if (userData?.birthDate) {
      const calculated = calculateLifeStats(userData.birthDate);
      setStats(calculated);
      
      // Initialize animated stats at 0
      const initial: Record<string, number> = {};
      statsConfig.forEach(({ key }) => {
        initial[key] = 0;
      });
      setAnimatedStats(initial);
    }
  }, [userData]);

  useEffect(() => {
    if (!stats) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats(prev => {
        const next: Record<string, number> = {};
        statsConfig.forEach(({ key }) => {
          const targetValue = stats[key as keyof typeof stats] as number;
          next[key] = Math.floor(targetValue * easeOut);
        });
        return next;
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);

  // Live update effect
  useEffect(() => {
    if (!stats || !userData?.birthDate) return;

    const timer = setInterval(() => {
      const updated = calculateLifeStats(userData.birthDate);
      setStats(updated);
      setAnimatedStats(prev => ({
        ...prev,
        secondsLived: updated.secondsLived,
        heartbeats: updated.heartbeats,
        breathsTaken: updated.breathsTaken,
        blinks: updated.blinks,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [stats, userData]);

  if (!userData?.birthDate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock size={32} className="text-slate-600" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Life Statistics</h3>
        <p className="text-slate-400">Set up your profile above to see your life stats</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Your Life in Numbers</h2>
        <p className="text-slate-400">The incredible statistics of your existence</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsConfig.map(({ key, label, icon: Icon, color }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center mb-3 ${color}`}>
              <Icon size={20} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {formatNumber(animatedStats[key] || 0)}
            </div>
            <div className="text-xs text-slate-500">{label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
