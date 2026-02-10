'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Target, Book, Sun, Moon } from 'lucide-react';

const philosophers = [
  {
    name: 'Marcus Aurelius',
    quote: 'You could leave life right now. Let that determine what you do and say and think.',
    tradition: 'Stoicism',
    practice: 'Memento Mori - "Remember death"'
  },
  {
    name: 'Seneca',
    quote: 'Life is long if you know how to use it.',
    tradition: 'Stoicism',
    practice: 'Mindful engagement with time'
  },
  {
    name: 'Epicurus',
    quote: 'The most important ingredient of happiness is to live in accordance with nature.',
    tradition: 'Epicureanism',
    practice: 'Focus on present experience'
  },
  {
    name: 'Thich Nhat Hanh',
    quote: 'Because you are alive, everything is possible.',
    tradition: 'Buddhism',
    practice: 'Mindfulness meditation'
  }
];

const practices = [
  {
    icon: Clock,
    title: 'Daily Death Awareness',
    description: 'Briefly contemplate mortality each morning to motivate purposeful living.',
    technique: 'Spend 5 minutes thinking: "If this were my last day, what would matter?"',
    color: 'text-rose-400'
  },
  {
    icon: Heart,
    title: 'Radical Acceptance',
    description: 'Accept mortality as natural, not morbid. It transforms fear into clarity.',
    technique: 'Practice accepting: "Death is not an enemy, but a natural conclusion to life."',
    color: 'text-amber-400'
  },
  {
    icon: Target,
    title: 'Values Clarification',
    description: 'Mortality awareness clarifies what truly matters.',
    technique: 'Write your top 3 values. Check if your actions align with them daily.',
    color: 'text-emerald-400'
  },
  {
    icon: Book,
    title: 'Reflective Journaling',
    description: 'Regular reflection on life\'s finite nature increases appreciation.',
    technique: 'Daily journal entry: "What am I grateful for today?"',
    color: 'text-blue-400'
  },
  {
    icon: Sun,
    title: 'Mindful Presence',
    description: 'The present moment is all we truly have.',
    technique: 'Practice mindfulness: When eating, just eat. When walking, just walk.',
    color: 'text-yellow-400'
  },
  {
    icon: Moon,
    title: 'Evening Review',
    description: 'Review your day with acceptance and gratitude.',
    technique: 'Before sleep: What went well? What did I learn? What am I grateful for?',
    color: 'text-indigo-400'
  }
];

export default function PhilosophhySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Philosophy & Mindfulness</h2>
        <p className="text-slate-400">Ancient wisdom on living with mortality awareness</p>
      </div>

      {/* Philosophers */}
      <div className="mb-8 grid md:grid-cols-2 gap-4">
        {philosophers.map((philosopher, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="text-emerald-400/60 text-xs font-medium uppercase tracking-wider mb-3">
              {philosopher.tradition}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{philosopher.name}</h3>
            <p className="text-slate-400 italic text-sm mb-4">"{philosopher.quote}"</p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <span className="text-slate-500">Practice: {philosopher.practice}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Practices */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Mindfulness Practices</h3>
        <div className="grid gap-4">
          {practices.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${practice.color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">{practice.title}</h4>
                    <p className="text-slate-400 text-sm mb-2">{practice.description}</p>
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/50">
                      <p className="text-slate-300 text-sm italic">{practice.technique}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
