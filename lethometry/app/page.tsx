'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UserGroupIcon,
  EyeIcon,
  ArchiveBoxIcon
} from '@/components/icons';

// Terrifying statistics about human erasure
const ERASURE_STATS = [
  {
    value: '99.9%',
    label: 'FORGOTTEN WITHIN 3 GENERATIONS',
    subtext: 'Biological descendants cease memory transmission',
    caution: true
  },
  {
    value: '0.01%',
    label: 'DOCUMENTED IN HISTORICAL RECORDS',
    subtext: 'Of all humans who have ever lived',
    caution: true
  },
  {
    value: '117B',
    label: 'HUMANS HAVE EXISTED',
    subtext: 'Estimated total since ~200,000 BCE',
    caution: false
  },
  {
    value: '76Y',
    label: 'AVERAGE LIFESPAN',
    subtext: 'Global average (declining in some regions)',
    caution: false
  }
];

// Generational forgetting curve
const GENERATIONAL_DATA = [
  { generation: 'Living', percentage: 100, status: 'Active consciousness' },
  { generation: 'Children', percentage: 45, status: 'Direct memory retention' },
  { generation: 'Grandchildren', percentage: 12, status: 'Fragmented recall' },
  { generation: 'G.Grandchildren', percentage: 3, status: 'Name only' },
  { generation: 'G.G.Grandchildren', percentage: 0.1, status: 'Statistical erasure' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 px-4 overflow-hidden grid-bg">
        <div className="max-w-5xl mx-auto relative">
          {/* Classification Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="px-3 py-1 border border-amber-700/50 bg-amber-950/20">
              <span className="text-[10px] font-mono text-amber-600/80 tracking-[0.2em]">
                OBSERVATIONAL RESEARCH // CLASS: THREAT ASSESSMENT
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-light tracking-tight text-slate-100 mb-4">
              <span className="text-cyan-500/80">LETHOMETRY</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide">
              The Science of Human Erasure
            </p>
          </motion.div>

          {/* Etymology */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-12 text-sm font-mono text-slate-500"
          >
            <span>λήθη (lḗthē)</span>
            <span className="text-slate-700">→</span>
            <span>forgetfulness</span>
            <span className="text-slate-700">+</span>
            <span>μέτρον (métron)</span>
            <span className="text-slate-700">→</span>
            <span>measurement</span>
          </motion.div>

          {/* Warning Banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="alert-box mb-12 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="text-red-500/70 mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm text-slate-300 font-medium mb-1">
                  CRITICAL OBSERVATION
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  The following data quantifies the systematic erasure of human existence 
                  from collective memory. Reader discretion is advised. These metrics represent 
                  the documented dissolution of individual consciousness post-mortem.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Primary Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {ERASURE_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`clinical-card p-5 ${stat.caution ? 'border-amber-800/30' : ''}`}
              >
                <div className="metric-value text-3xl md:text-4xl mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-mono mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Generational Decay Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="clinical-card p-6 mb-12"
          >
            <div className="section-header">
              <ClockIcon size={14} className="text-slate-500" />
              <span>Generational Memory Decay Curve</span>
            </div>

            <div className="overflow-x-auto">
              <table className="clinical-table w-full">
                <thead>
                  <tr>
                    <th>Generational Distance</th>
                    <th>Memory Retention</th>
                    <th>Visual</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GENERATIONAL_DATA.map((row) => (
                    <tr key={row.generation}>
                      <td className="font-mono text-slate-300">{row.generation}</td>
                      <td className="font-mono tabular-nums">{row.percentage}%</td>
                      <td>
                        <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500/60 to-red-500/60"
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                      </td>
                      <td className="text-xs text-slate-500">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Research Sections Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-3 gap-4 mb-12"
          >
            <Link href="/research" className="group">
              <div className="clinical-card p-5 h-full hover:border-cyan-700/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <ArchiveBoxIcon className="text-cyan-600/60" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-mono">
                    Research Papers
                  </span>
                </div>
                <h3 className="text-sm text-slate-300 mb-2 group-hover:text-cyan-400/80 transition-colors">
                  Academic Foundations
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Peer-reviewed studies on historical forgetting, collective memory, 
                  and the mechanics of human obsolescence.
                </p>
                <div className="flex items-center gap-1 mt-4 text-[10px] text-cyan-600/60 font-mono">
                  ACCESS ARCHIVE
                  <ArrowRightIcon size={12} />
                </div>
              </div>
            </Link>

            <Link href="/cases" className="group">
              <div className="clinical-card p-5 h-full hover:border-cyan-700/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <UserGroupIcon className="text-cyan-600/60" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-mono">
                    Case Studies
                  </span>
                </div>
                <h3 className="text-sm text-slate-300 mb-2 group-hover:text-cyan-400/80 transition-colors">
                  The Forgotten
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Documented case studies of individuals who existed, lived entire 
                  lives, and subsequently vanished from all record.
                </p>
                <div className="flex items-center gap-1 mt-4 text-[10px] text-cyan-600/60 font-mono">
                  VIEW SPECIMENS
                  <ArrowRightIcon size={12} />
                </div>
              </div>
            </Link>

            <Link href="/metrics" className="group">
              <div className="clinical-card p-5 h-full hover:border-cyan-700/40 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <EyeIcon className="text-cyan-600/60" size={18} />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-mono">
                    Live Metrics
                  </span>
                </div>
                <h3 className="text-sm text-slate-300 mb-2 group-hover:text-cyan-400/80 transition-colors">
                  Real-time Erasure
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Live data visualization of ongoing human forgetting. Watch as 
                  the present becomes the past becomes nothing.
                </p>
                <div className="flex items-center gap-1 mt-4 text-[10px] text-cyan-600/60 font-mono">
                  OBSERVE DATA
                  <ArrowRightIcon size={12} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <blockquote className="text-slate-500 text-sm italic mb-2">
              "The life of the dead is placed in the memory of the living. 
              But for how long?"
            </blockquote>
            <cite className="text-xs text-slate-600 font-mono">
              — Marcus Tullius Cicero, modified
            </cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
