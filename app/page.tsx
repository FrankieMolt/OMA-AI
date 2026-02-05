'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

// --- Components ---

function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🦞</span>
          <span className="font-bold text-xl tracking-tight">OMA-AI</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
            Launch Console
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            ✨ Managed OpenClaw Hosting
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Your Personal AI,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Running 24/7 in the Cloud.
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Deploy autonomous OpenClaw agents in seconds. We handle the infrastructure, security, and updates. You focus on the mission.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
              <span>🚀</span>
              <span>Deploy Agent</span>
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
              View Demo
            </button>
          </div>
          <div className="mt-8 text-sm text-gray-500">
            No credit card required • 5-minute setup • Cancel anytime
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to run autonomous agents</h2>
          <p className="text-gray-400">Enterprise-grade infrastructure for your personal AI workforce.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="🔒"
            title="MicroVM Isolation"
            desc="Each agent runs in its own secure Firecracker microVM. Complete isolation for memory, disk, and network."
          />
          <FeatureCard 
            icon="⚡"
            title="Instant Scaling"
            desc="One-click spawn. Scale from 1 to 100+ agents instantly. We manage the heavy lifting."
          />
          <FeatureCard 
            icon="💰"
            title="x402 Payments"
            desc="Built-in crypto wallet. Agents can pay for their own resources and accept payments for services."
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, features, recommended = false }: { title: string, price: string, features: string[], recommended?: boolean }) {
  return (
    <div className={`p-8 rounded-3xl border ${recommended ? 'bg-white/10 border-purple-500/50 relative overflow-hidden' : 'bg-white/5 border-white/5'} flex flex-col`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-bold mb-6">
        {price}<span className="text-lg text-gray-400 font-normal">/mo</span>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start space-x-3">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">{f}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-xl font-bold transition-colors ${recommended ? 'bg-purple-600 hover:bg-purple-500' : 'bg-white/10 hover:bg-white/20'}`}>
        Choose {title}
      </button>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400">Start small and scale as your agent workforce grows.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard 
            title="Starter"
            price="$12"
            features={['1 Active Agent', '2GB RAM / 1 vCPU', 'Basic Web Search', 'Community Support']}
          />
          <PricingCard 
            title="Pro"
            price="$39"
            features={['5 Active Agents', '8GB RAM / 4 vCPU', 'Full Browser Automation', 'Priority Support', 'x402 Wallet Integration']}
            recommended={true}
          />
          <PricingCard 
            title="Business"
            price="$99"
            features={['20 Active Agents', '32GB RAM / 16 vCPU', 'Custom Integrations', 'Dedicated Infrastructure', 'SLA Guarantee']}
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl">OMA-AI</span>
          <p className="text-gray-500 text-sm mt-1">© 2026 NOSYT LABS. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-white">Discord</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
      <Analytics />
    </main>
  );
}
