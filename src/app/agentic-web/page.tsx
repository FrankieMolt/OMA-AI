"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Brain, Network, Wallet, Zap, ArrowRight, Code2, Bot, Globe } from 'lucide-react';

export const metadata = {
  title: 'Agentic Web - OMA-AI',
  description: 'Build autonomous AI agents that can navigate, interact, and complete tasks without human intervention. The future of AI is agentic.',
};

export default function AgenticWebPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-[#12121f]">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/10 via-purple-600/5 to-transparent opacity-50" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 12 }}
            className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-gradient-to-r from-violet-600/20 to-fuchsia-600/15 rounded-full blur-[150px]"
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-violet-500/20 mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-violet-200/80">The Future of AI</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
              <span className="block text-zinc-100">The Agentic</span>
              <span className="block mt-2">
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                  Web
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Autonomous AI agents that navigate, interact, and complete tasks without human intervention.
              No clicks, no scrolling—agents that think and act.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/models"
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold text-base hover:from-violet-500 hover:to-fuchsia-500 transition-all flex items-center gap-2"
              >
                <span>Explore Models</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 glass-card text-zinc-300 border border-violet-500/20 rounded-full font-medium text-base hover:border-violet-500/40 hover:bg-violet-500/10 transition-all"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concepts Section */}
      <section className="py-24 px-4 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What is the Agentic Web?
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                The shift from human-centric browsing to autonomous AI agents
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Brain,
                  title: 'Autonomous Agents',
                  description: 'AI systems that make decisions and execute actions independently',
                  example: 'Trading bots that analyze markets and execute trades'
                },
                {
                  icon: Network,
                  title: 'Agent-to-Agent Communication',
                  description: 'Direct AI-to-AI workflows and data exchange',
                  example: 'One agent researches, another executes trades'
                },
                {
                  icon: Code2,
                  title: 'MCP as Service Bus',
                  description: 'Model Context Protocol connects agents to any tool',
                  example: 'GitHub, databases, APIs—all plug-and-play'
                },
                {
                  icon: Wallet,
                  title: 'x402 for Payments',
                  description: 'Machine-to-machine micropayments via HTTP 402',
                  example: 'Agents pay for their own compute, no gas fees'
                }
              ].map((concept, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass-card border border-zinc-800 hover:border-violet-500/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 border border-violet-500/20">
                    <concept.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-lg">{concept.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{concept.description}</p>
                  <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                    <code className="text-xs text-violet-300">{concept.example}</code>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                How Agentic Workflows Function
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Agents communicate, collaborate, and execute complex tasks autonomously
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Task Assignment',
                  description: 'User requests task via natural language prompt',
                  icon: Globe
                },
                {
                  step: '2',
                  title: 'Agent Planning',
                  description: 'AI breaks down task into sub-goals and selects tools',
                  icon: Brain
                },
                {
                  step: '3',
                  title: 'Execution',
                  description: 'Agent uses MCP tools to complete task autonomously',
                  icon: Bot
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="text-6xl font-black text-zinc-800 absolute -top-4 -left-2 bg-zinc-200 w-12 h-12 rounded-lg flex items-center justify-center">
                    {step.step}
                  </div>
                  <div className="ml-8 pt-6 border-l-2 border-zinc-700 pl-8">
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-zinc-400 mb-4">{step.description}</p>
                    <step.icon className="w-6 h-6 text-violet-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-4 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Build Your First Agentic Workflow
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Three lines of code to create an autonomous research agent
              </p>
            </div>

            <div className="rounded-2xl glass-card border border-zinc-800 overflow-hidden">
              <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-3 bg-zinc-950">
                <Code2 className="w-4 h-4 text-violet-400" />
                <span className="text-sm text-zinc-500 font-mono">index.ts</span>
              </div>
              <pre className="p-6 bg-black/50 text-sm text-zinc-300 overflow-x-auto">
                <code className="text-zinc-200">
{`import { Agent } from '@oma-ai/sdk';

// Create autonomous research agent
const researcher = new Agent({
  name: 'research-agent',
  capabilities: [
    'web_search',
    'document_analysis',
    'data_synthesis'
  ],
  payment: {
    method: 'x402',
    wallet: '0x40AE4455055feeCac30e1EEEcbFE8dBEd77e4eC6'
  }
});

// Agent works autonomously—no human intervention
const report = await researcher.execute(
  'Research latest AI trends and summarize key insights'
);

console.log(report); // Returns structured data
`}
                </code>
              </pre>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all"
              >
                <span>Read Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
