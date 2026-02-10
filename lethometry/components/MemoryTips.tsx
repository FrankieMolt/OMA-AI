'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Moon, Droplets, Utensils, Zap, CheckCircle2 } from 'lucide-react';

interface MemoryTip {
  icon: any;
  title: string;
  description: string;
  science: string;
  action: string;
}

const memoryTips: MemoryTip[] = [
  {
    icon: BookOpen,
    title: 'Spaced Repetition',
    description: 'Review material at gradually increasing intervals to reinforce long-term retention.',
    science: 'Based on the "forgetting curve" discovered by Hermann Ebbinghaus, spacing reviews strengthens memory traces.',
    action: 'Review: 1 day later, 3 days later, 1 week later, 1 month later'
  },
  {
    icon: Moon,
    title: 'Quality Sleep',
    description: 'Deep sleep is when your brain consolidates and stores memories.',
    science: 'Research shows that slow-wave sleep transfers short-term memories to long-term storage in the hippocampus.',
    action: 'Aim for 7-9 hours. Maintain consistent sleep schedule.'
  },
  {
    icon: Brain,
    title: 'Active Recall',
    description: 'Test yourself instead of re-reading. The effort strengthens memory.',
    science: 'The "testing effect" shows that retrieval practice creates stronger memory traces than passive review.',
    action: 'After learning, close materials and write everything you remember.'
  },
  {
    icon: Droplets,
    title: 'Stay Hydrated',
    description: 'Your brain is 75% water. Dehydration impairs cognitive function.',
    science: 'Even mild dehydration (2% body weight) can impair memory, attention, and reaction time.',
    action: 'Drink water throughout the day. Aim for 8 glasses (2L).'
  },
  {
    icon: Utensils,
    title: 'Brain-Boosting Foods',
    description: 'Nutrition affects memory. Certain foods support cognitive health.',
    science: 'Omega-3s, antioxidants, and B-vitamins support brain cell communication and protection.',
    action: 'Include: fatty fish, berries, nuts, dark chocolate, leafy greens'
  },
  {
    icon: Zap,
    title: 'Physical Exercise',
    description: 'Exercise increases blood flow to the brain and stimulates neurogenesis.',
    science: 'Aerobic exercise increases BDNF (brain-derived neurotrophic factor), supporting new neuron growth.',
    action: '150 minutes moderate exercise per week. Even walking counts!'
  }
];

export default function MemoryTips() {
  const [expandedTip, setExpandedTip] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Memory Improvement Tips</h2>
        <p className="text-slate-400">Evidence-based techniques to strengthen your memory</p>
      </div>

      <div className="grid gap-4">
        {memoryTips.map((tip, index) => {
          const Icon = tip.icon;
          const isExpanded = expandedTip === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-colors"
            >
              <button
                onClick={() => setExpandedTip(isExpanded ? null : index)}
                className="w-full p-4 text-left flex items-start gap-4 hover:bg-slate-900/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isExpanded ? 'bg-emerald-500/20' : 'bg-slate-800'
                }`}>
                  <Icon size={24} className={isExpanded ? 'text-emerald-400' : 'text-slate-400'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-white">{tip.title}</h3>
                    {isExpanded && (
                      <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">{tip.description}</p>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-800"
                  >
                    <div className="p-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2">The Science</h4>
                        <p className="text-slate-400 text-sm">{tip.science}</p>
                      </div>
                      <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                        <h4 className="text-sm font-semibold text-emerald-400 mb-2">Actionable Advice</h4>
                        <p className="text-slate-300 text-sm">{tip.action}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
