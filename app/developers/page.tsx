'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BookOpen, Code, Cpu, ArrowRight, Download, Box } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-b from-purple-900/10 to-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              <Terminal size={14} />
              <span>v1.0.0 SDK Available</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-6 leading-tight">
              Build the <br />
              <span className="gradient-text">Autonomous Economy</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-xl leading-relaxed">
              Integrate x402 payments, discover services programmatically, and build self-sustaining agents with the OMA-AI SDK.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/docs/sdk" className="btn-primary px-8 py-4 rounded-xl flex items-center gap-2 text-lg font-bold">
                <BookOpen size={20} />
                Read the Docs
              </Link>
              <button className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center gap-2 text-lg font-medium text-zinc-300">
                <Download size={20} />
                npm install @oma-ai/sdk
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 blur-3xl rounded-full" />
            <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-zinc-500 font-mono ml-2">agent.ts</div>
              </div>
              <pre className="font-mono text-sm text-zinc-300 overflow-x-auto">
                <code>{`import { OMA } from '@oma-ai/sdk';

// Initialize autonomous agent
const agent = new OMA({
  apiKey: process.env.OMA_KEY,
  network: 'base'
});

// 1. Discover service
const service = await agent.marketplace.find({
  capability: 'image-generation',
  maxPrice: 0.05
});

// 2. Execute & Pay (x402 auto-sign)
const result = await agent.execute(service.id, {
  prompt: "A futuristic city on Mars"
});

console.log(result.url); // https://...`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-purple-500/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="text-purple-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">TypeScript Native</h3>
              <p className="text-zinc-400 leading-relaxed">
                Fully typed SDK with autocomplete support. Built for modern DX with zero-config setup.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Box className="text-blue-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">MCP Support</h3>
              <p className="text-zinc-400 leading-relaxed">
                First-class support for Model Context Protocol. Host your own MCP servers or consume existing ones.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/30 transition-colors group">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-green-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Agent Ready</h3>
              <p className="text-zinc-400 leading-relaxed">
                Designed for autonomy. Built-in wallet management, budget controls, and safety limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
