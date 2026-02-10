'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ChartBarIcon,
  EyeIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@/components/icons';

// Generational memory decay data
const generationalData = [
  { generation: 'Self', years: 0, retention: 100, label: 'Living memory' },
  { generation: 'Children', years: 30, retention: 45, label: 'Direct stories' },
  { generation: 'Grandchildren', years: 60, retention: 12, label: 'Fragmented' },
  { generation: 'G.Grandchildren', years: 90, retention: 3, label: 'Name only' },
  { generation: 'G.G.Grandchildren', years: 120, retention: 0.1, label: 'Statistical' },
  { generation: '5th Gen+', years: 150, retention: 0, label: 'Complete erasure' },
];

// Historical documentation survival
const documentationData = [
  { period: 'Prehistoric', survived: 0, total: 117000000000 },
  { period: 'Ancient', survived: 500000, total: 2500000000 },
  { period: 'Medieval', survived: 5000000, total: 1200000000 },
  { period: 'Early Modern', survived: 50000000, total: 1000000000 },
  { period: '19th Century', survived: 500000000, total: 1200000000 },
  { period: '20th Century', survived: 3000000000, total: 16000000000 },
];

// Digital decay simulation
const digitalDecayData = [
  { years: 0, retention: 100, type: 'Active' },
  { years: 1, retention: 85, type: 'Active' },
  { years: 2, retention: 62, type: 'Active' },
  { years: 5, retention: 34, type: 'Active' },
  { years: 10, retention: 18, type: 'Active' },
  { years: 20, retention: 8, type: 'Active' },
  { years: 50, retention: 2, type: 'Active' },
];

// Fame vs forgetting curve
const fameData = [
  { years: 0, regular: 100, famous: 100, legendary: 100 },
  { years: 50, regular: 2, famous: 85, legendary: 98 },
  { years: 100, regular: 0, famous: 45, legendary: 92 },
  { years: 200, regular: 0, famous: 12, legendary: 78 },
  { years: 500, regular: 0, famous: 2, legendary: 45 },
  { years: 1000, regular: 0, famous: 15, legendary: 28 },
  { years: 2000, regular: 0, famous: 0, legendary: 8 },
];

// Current erasure rate (simulated real-time)
const ERASURE_METRICS = [
  { label: 'HUMANS DYING DAILY', value: '167,000', subtext: '~107 per minute' },
  { label: 'MEMORIES LOST TODAY', value: '15.2M', subtext: 'estimated consciousness events' },
  { label: 'DIGITAL ACCOUNTS DEACTIVATED', value: '8,400', subtext: 'platform terminations' },
  { label: 'FAMILY LINES TERMINATED', value: '12,300', subtext: 'last member deceased' },
];

// Pie chart data - what remains after 200 years
const survivalBreakdown = [
  { name: 'Nothing', value: 99.94, color: '#1e293b' },
  { name: 'Name only', value: 0.04, color: '#475569' },
  { name: 'Basic records', value: 0.015, color: '#64748b' },
  { name: 'Some memory', value: 0.004, color: '#94a3b8' },
  { name: 'Historical figure', value: 0.001, color: '#06b6d4' },
];

export default function MetricsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="text-cyan-600/60" size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono">
              Live Metrics Dashboard
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl text-slate-100 mb-4">
            Quantifying Erasure
          </h1>

          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Real-time and historical data visualizing the mechanics of human forgetting. 
            These metrics represent the ongoing dissolution of consciousness from collective 
            memory—the fundamental process that renders human existence temporary.
          </p>
        </motion.div>

        {/* Live Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {ERASURE_METRICS.map((metric) => (
            <div key={metric.label} className="clinical-card p-4">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono mb-2">
                {metric.label}
              </div>
              <div className="metric-value text-2xl mb-1">{metric.value}</div>
              <div className="text-xs text-slate-600">{metric.subtext}</div>
            </div>
          ))}
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="caution-box mb-8"
        >
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="text-amber-500/70 mt-0.5 flex-shrink-0" size={18} />
            <div>
              <p className="text-sm text-slate-300">
                Live metrics are estimated based on WHO mortality data, genealogical 
                research averages, and platform death statistics. Some figures represent 
                statistical projections rather than direct observation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Generational Decay Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="clinical-card p-6"
          >
            <div className="section-header">
              <ClockIcon size={14} className="text-slate-500" />
              <span>Generational Memory Decay</span>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generationalData}>
                  <defs>
                    <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="generation" 
                    stroke="#475569" 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#06b6d4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRetention)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              Percentage of personal memory retained across generational transmission. 
              By the 5th generation, less than 0.1% of personal history survives.
            </p>
          </motion.div>

          {/* Documentation Survival */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="clinical-card p-6"
          >
            <div className="section-header">
              <EyeIcon size={14} className="text-slate-500" />
              <span>Documentation Survival by Era</span>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={documentationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => value >= 1000000000 ? `${(value/1000000000).toFixed(0)}B` : 
                                     value >= 1000000 ? `${(value/1000000).toFixed(0)}M` : value}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#06b6d4' }}
                    formatter={(value: number) => value.toLocaleString()}
                  />
                  <Bar dataKey="survived" fill="#06b6d4" fillOpacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              Number of individuals with surviving documentation by historical period. 
              Vast majority remain permanently undocumented.
            </p>
          </motion.div>

          {/* Digital Decay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="clinical-card p-6"
          >
            <div className="section-header">
              <ClockIcon size={14} className="text-slate-500" />
              <span>Digital Decay Simulation</span>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={digitalDecayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="years" 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => `${value}y`}
                  />
                  <YAxis 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                    itemStyle={{ color: '#f59e0b' }}
                    formatter={(value: number) => `${value}%`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retention" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    dot={{ fill: '#f59e0b', strokeWidth: 0, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              Projected survival rate of digital personal data without active maintenance. 
              Platform terminations, format obsolescence, and password loss accelerate decay.
            </p>
          </motion.div>

          {/* Fame vs Forgetting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="clinical-card p-6"
          >
            <div className="section-header">
              <EyeIcon size={14} className="text-slate-500" />
              <span>Fame vs. Forgetting</span>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={fameData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis 
                    dataKey="years" 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => `${value}y`}
                  />
                  <YAxis 
                    stroke="#475569"
                    tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '4px'
                    }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="regular" 
                    stroke="#64748b" 
                    strokeWidth={2}
                    name="Regular Person"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="famous" 
                    stroke="#06b6d4" 
                    strokeWidth={2}
                    name="Famous Person"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="legendary" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Legendary Figure"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              Memory retention curves for different levels of historical significance. 
              Even legendary figures face eventual erasure, merely delayed.
            </p>
          </motion.div>
        </div>

        {/* Survival Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="clinical-card p-6"
        >
          <div className="section-header">
            <ChartBarIcon size={14} className="text-slate-500" />
            <span>What Remains After 200 Years (Global Average)</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={survivalBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {survivalBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #1e293b',
                      borderRadius: '4px'
                    }}
                    formatter={(value: number) => `${value}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {survivalBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-400">{item.name}</span>
                  </div>
                  <span className="font-mono text-sm text-slate-300">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Findings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 clinical-card p-6"
        >
          <div className="section-header">
            <ChartBarIcon size={14} className="text-slate-500" />
            <span>Key Findings</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">01.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">The 3-Generation Rule:</strong> By the time 
                  great-grandchildren reach adulthood, {'<'}99% of personal history is lost.
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">02.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Documentation Paradox:</strong> The more 
                  humans document themselves digitally, the <em>faster</em> they are forgotten 
                  due to platform decay.
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">03.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Fame Immunity:</strong> Even 'famous' individuals 
                  experience 95% memory loss within 200 years. Only legendary figures 
                  survive longer.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">04.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Prehistoric Erasure:</strong> Of ~117 billion 
                  humans who lived before writing, we know approximately {'<'}0 individuals by name.
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">05.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Accelerating Decay:</strong> Digital media 
                  degrades faster than parchment. A tweet lasts ~18 months in active memory.
                </p>
              </div>
              
              <div className="flex gap-3">
                <span className="text-cyan-600/70 font-mono">06.</span>
                <p className="text-sm text-slate-400">
                  <strong className="text-slate-300">Final Calculation:</strong> You have 
                  approximately 75 years of active consciousness, 50 years of living memory, 
                  and 0 years of guaranteed permanence.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
