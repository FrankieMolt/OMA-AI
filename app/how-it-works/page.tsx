'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Zap,
  Shield,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Lock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            How <span className="gradient-text">OMA-AI</span> Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400"
          >
            The marketplace for APIs, MCP servers, and AI agent skills
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            For <span className="gradient-text">Developers</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StepCard
              step="1"
              title="Browse Marketplace"
              description="Explore hundreds of APIs, MCP servers, and AI skills. Filter by category, pricing, or rating."
              icon={<Globe size={32} />}
            />
            <StepCard
              step="2"
              title="Test for Free"
              description="Test APIs and MCPs directly from the browser. Try them out before integrating."
              icon={<Zap size={32} />}
            />
            <StepCard
              step="3"
              title="Get Your API Key"
              description="Get your unique API key and start building immediately. Pay only for what you use."
              icon={<Code size={32} />}
            />
          </div>
        </div>
      </section>

      {/* For Providers */}
      <section className="py-16 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            For <span className="gradient-text">Providers</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Users size={28} />
                List Your API
              </h3>
              <p className="text-zinc-400 mb-6">
                Reach thousands of developers building autonomous agents. 
                Showcase your API with pricing, documentation, and examples.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Exposure to AI agent developers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Automated billing via x402 payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Analytics and usage tracking</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Shield size={28} />
                MCP Server Integration
              </h3>
              <p className="text-zinc-400 mb-6">
                Deploy your MCP server and list it on OMA-AI. 
                Connect directly to agents via Model Context Protocol.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Standard MCP protocol support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Automatic discovery and connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-500 mt-1" />
                  <span>Local or cloud deployment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Hosting */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Where to Host Your APIs/MCPs?
          </h2>
          
          <div className="space-y-6">
            <HostingOption
              type="API"
              title="REST APIs"
              platforms={[
                { name: 'Railway', desc: 'Easy deployment with auto-scaling' },
                { name: 'Render', desc: 'Free tier available, Docker support' },
                { name: 'Vercel', desc: 'Serverless functions, great for APIs' },
                { name: 'AWS Lambda', desc: 'Enterprise-grade, pay per use' },
                { name: 'Google Cloud Functions', desc: 'Serverless, auto-scaling' },
              ]}
            />
            
            <HostingOption
              type="MCP"
              title="MCP Servers"
              platforms={[
                { name: 'Local Machine', desc: 'Run on your own computer' },
                { name: 'VPS (DigitalOcean, Linode)', desc: 'Full control, affordable' },
                { name: 'Railway', desc: 'Docker-based deployment' },
                { name: 'Fly.io', desc: 'Edge deployment, global CDN' },
              ]}
            />
            
            <HostingOption
              type="Payment"
              title="x402 Payments"
              platforms={[
                { name: 'Base Network', desc: 'L2 on Ethereum, low fees' },
                { name: 'Ethereum', desc: 'Mainnet for production' },
                { name: 'Solana', desc: 'Fast transactions, low cost' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Browse the marketplace or list your own API/MCP today.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="/"
              className="btn-primary px-8 py-4 rounded-lg text-lg font-medium flex items-center gap-2"
            >
              Browse Marketplace
              <ArrowRight size={20} />
            </a>
            <a
              href="/docs"
              className="btn-secondary px-8 py-4 rounded-lg text-lg font-medium flex items-center gap-2"
            >
              <Code size={18} />
              Documentation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function StepCard({ step, title, description, icon }: { step: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 text-center"
    >
      <div className="text-4xl font-bold text-purple-500 mb-4">{step}</div>
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </motion.div>
  );
}

function HostingOption({ type, title, platforms }: { type: string; title: string; platforms: Array<{name: string, desc: string}> }) {
  const typeColors: Record<string, string> = {
    API: 'bg-blue-500/20 text-blue-400',
    MCP: 'bg-purple-500/20 text-purple-400',
    Payment: 'bg-green-500/20 text-green-400'
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className={`px-3 py-1 rounded-full text-sm ${typeColors[type]}`}>
          {type}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform: any) => (
          <div
            key={platform.name}
            className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 hover:border-purple-500/50 transition-all"
          >
            <div className="font-semibold mb-1">{platform.name}</div>
            <div className="text-zinc-500 text-xs">{platform.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
