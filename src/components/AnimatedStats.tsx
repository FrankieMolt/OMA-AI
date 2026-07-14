'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  { value: 34, suffix: '+', label: 'MCP Servers', color: 'text-violet-400' },
  { value: 300, suffix: '+', label: 'AI Tools', color: 'text-cyan-400' },
  { value: 50, suffix: '+', label: 'Models', color: 'text-green-400' },
  { value: 5, suffix: '%', label: 'Platform Fee', color: 'text-amber-400' },
];

function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  // SSR-safe: render the final value on server so search engines and slow clients see "34+" not "0+"
  // Client animates from 0 -> value on first mount after hydration
  const [count, setCount] = useState(value);
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    if (!isInView) return;

    setCount(0); // animate from 0 on client
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [hasMounted, isInView, value]);

  return (
    <span ref={ref} className={`font-bold ${color}`}>
      {count}{suffix}
    </span>
  );
}

export function AnimatedStats() {
  return (
    <section className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
              </div>
              <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
