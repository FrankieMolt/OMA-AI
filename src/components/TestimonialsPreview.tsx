'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Developer',
    avatar: 'A',
    rating: 5,
    revenue: '$850/mo',
    mcp: 'Filesystem MCP',
    story: 'Built a filesystem MCP in 2 weeks. Got approved in 24h. Now earning from 150+ calls/day.',
    gradient: 'from-violet-600/20 to-fuchsia-600/20',
    border: 'border-violet-500/20',
  },
  {
    name: 'Sarah Johnson',
    role: 'AI Researcher',
    avatar: 'S',
    rating: 5,
    revenue: '$2,100/mo',
    mcp: 'Memory MCP',
    story: '300+ developers using it daily. OMA-AI\'s analytics helps us understand usage and improve.',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    border: 'border-cyan-500/20',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    avatar: 'E',
    rating: 5,
    revenue: '$4,275/mo',
    mcp: 'Database MCP',
    story: 'Enterprise-grade database MCP. Big clients love it. OMA-AI\'s verification badge builds trust.',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-500/20',
  },
];

export function TestimonialsPreview() {
  return (
    <section className="py-24 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
            <TrendingUp size={14} className="text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Real Revenue</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Developers earning on OMA-AI
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Real MCP builders, real revenue. See what they're earning.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${t.gradient} border ${t.border} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                "{t.story}"
              </p>
              
              {/* Revenue badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                  <DollarSign size={14} />
                  {t.revenue}
                </div>
              </div>
              
              {/* MCP tag */}
              <div className="mt-3 pt-3 border-t border-white/5">
                <span className="text-xs text-zinc-500">{t.mcp}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors group"
          >
            See all success stories
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
