'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search,
  FileText,
  Calculator,
  Cloud,
  ArrowRight,
  Zap,
  Shield,
  Wallet,
  Gauge,
  Database,
  Cpu
} from 'lucide-react';

const endpoints = [
  {
    icon: Search,
    name: 'Web Search',
    description: 'AI-powered semantic search that understands context, not just keywords',
    price: 'From $0.004',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: FileText,
    name: 'Embeddings',
    description: 'High-dimensional vector embeddings for RAG, search, and similarity tasks',
    price: 'From $0.008',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    icon: Calculator,
    name: 'Live Crypto',
    description: 'Real-time prices, market data, and trading pairs for 10,000+ cryptocurrencies',
    price: 'FREE',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: Cloud,
    name: 'Weather',
    description: 'Global weather data with forecasts, historical data, and severe weather alerts',
    price: 'From $0.0015',
    gradient: 'from-sky-500/20 to-blue-500/20'
  },
  {
    icon: Database,
    name: 'MCP Marketplace',
    description: 'Access 19+ MCP servers including AI models, databases, and developer tools',
    price: 'From $0.001',
    gradient: 'from-indigo-500/20 to-violet-500/20'
  },
  {
    icon: Cpu,
    name: 'Compute Providers',
    description: 'Deploy agents on decentralized networks like Akash and traditional clouds',
    price: 'From $4.50/hour',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    icon: Zap,
    name: 'x402 Payments',
    description: 'Gasless micropayments on Base network for true agent-to-agent commerce',
    price: 'FREE protocol',
    gradient: 'from-purple-500/20 to-fuchsia-500/20'
  }
];

const benefits = [
  { icon: Zap, title: 'Gasless Payments', description: 'x402 protocol enables feeless micropayments on Base network' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliant with end-to-end encryption and audit logs' },
  { icon: Wallet, title: 'Transparent Pricing', description: 'Pay-per-use pricing with no hidden fees or subscriptions' },
  { icon: Gauge, title: '99.9% Uptime', description: 'Globally distributed infrastructure with automatic failover' },
  { icon: Database, title: '19+ MCPs', description: 'Growing marketplace of verified MCP servers for all use cases' },
  { icon: Zap, title: 'Instant Deployment', description: 'Deploy AI agents in seconds with pre-configured templates' }
];

export function FeaturesSection() {
  return (
    <section className="py-28 px-4 bg-[#12121f] relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            AI Agent Infrastructure
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Build, deploy, and monetize AI agents with MCP integrations, x402 payments, and developer APIs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {endpoints.map((endpoint, index) => {
            const Icon = endpoint.icon;
            return (
              <motion.div
                key={endpoint.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-2xl p-6 bg-gradient-to-br ${endpoint.gradient} border border-white/10`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full">
                    {endpoint.price}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {endpoint.name}
                </h3>
                <p className="text-gray-300 text-sm">
                  {endpoint.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Why Choose OMA-AI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/mcps"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#12121f]"
          >
            Explore MCP Marketplace
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
