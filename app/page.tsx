'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Real API connection
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://oooijcrqpuqymgzlidrw.supabase.co/functions/v1';

interface Stats {
  total_agents: number;
  active_agents: number;
  total_services: number;
  total_revenue: number;
}

export default function Landing() {
  const [stats, setStats] = useState<Stats>({
    total_agents: 0,
    active_agents: 0,
    total_services: 0,
    total_revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real data fetch from Supabase
    async function fetchStats() {
      try {
        const res = await fetch(`${API_URL}/status`, {
          headers: {
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
          }
        });
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (e) {
        console.error('Failed to fetch stats:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-['Inter']">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">
              <span className="font-bold text-sm">O</span>
            </div>
            <span className="font-semibold text-lg">OMA</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/about" className="text-zinc-400 hover:text-white transition-colors text-sm">About</a>
            <a href="/docs" className="text-zinc-400 hover:text-white transition-colors text-sm">Documentation</a>
            <a href="/pricing" className="text-zinc-400 hover:text-white transition-colors text-sm">Pricing</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="/login" className="text-zinc-400 hover:text-white transition-colors text-sm">Log in</a>
            <a href="/dashboard" className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-sm transition-colors">
              Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 mb-6">
              Autonomic Infrastructure
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Deploy autonomous agents at scale
            </h1>

            <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
              Build, deploy, and monitor autonomous AI agents with enterprise-grade infrastructure. 
              No manual intervention required.
            </p>

            <div className="flex gap-4">
              <a
                href="/dashboard"
                className="bg-white text-black px-6 py-3 rounded font-medium hover:bg-zinc-200 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/docs"
                className="border border-zinc-700 px-6 py-3 rounded font-medium hover:bg-zinc-900 transition-colors"
              >
                Documentation
              </a>
            </div>
          </motion.div>

          {/* Real Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-zinc-800"
          >
            <StatCard
              label="Total Agents"
              value={loading ? '...' : stats.total_agents.toString()}
              loading={loading}
            />
            <StatCard
              label="Active Now"
              value={loading ? '...' : stats.active_agents.toString()}
              loading={loading}
            />
            <StatCard
              label="Services"
              value={loading ? '...' : stats.total_services.toString()}
              loading={loading}
            />
            <StatCard
              label="Revenue"
              value={loading ? '...' : `$${(stats.total_revenue).toFixed(2)}`}
              loading={loading}
            />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-zinc-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Enterprise-grade features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Autonomous Execution"
              description="Agents run independently with built-in error handling, retries, and monitoring. Configure once, run forever."
            />
            <FeatureCard
              title="Scalable Infrastructure"
              description="Deploy thousands of agents with automatic scaling. Pay only for what you use."
            />
            <FeatureCard
              title="Real-time Monitoring"
              description="Track agent performance, costs, and revenue in real-time. Get alerts when anomalies occur."
            />
            <FeatureCard
              title="API-first Design"
              description="Full REST API for programmatic agent management. Integrate with your existing workflows."
            />
            <FeatureCard
              title="Multi-cloud Support"
              description="Deploy agents across multiple cloud providers. Single pane of glass for management."
            />
            <FeatureCard
              title="Enterprise Security"
              description="SOC 2 compliant infrastructure with end-to-end encryption and audit logging."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to automate?</h2>
          <p className="text-xl text-zinc-400 mb-8">
            Start building autonomous agents today. No credit card required.
          </p>
          <a
            href="/dashboard"
            className="inline-block bg-white text-black px-8 py-4 rounded font-medium hover:bg-zinc-200 transition-colors"
          >
            Create Account
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                <li><a href="https://github.com/FrankieMolt/OMA-AI" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-zinc-500 text-sm">
            © 2025 OMA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, loading }: { label: string; value: string; loading: boolean }) {
  return (
    <div>
      <div className={`text-4xl font-bold mb-2 ${loading ? 'text-zinc-600' : 'text-white'}`}>
        {value}
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-zinc-800 p-6 rounded">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
