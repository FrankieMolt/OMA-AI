'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Search,
  Code2,
  Image,
  FileText,
  Calculator,
  Cloud,
  Database,
  Zap,
  ArrowRight,
  Bot,
  Wallet,
  Shield,
  Gauge,
  MessageCircle,
  Sparkles
} from 'lucide-react';

const models = [
  { name: 'GPT-5.2', tier: 'premium', provider: 'OpenAI' },
  { name: 'Claude 4 Opus', tier: 'premium', provider: 'Anthropic' },
  { name: 'Gemini 2.5 Pro', tier: 'premium', provider: 'Google' },
  { name: 'DeepSeek V3', tier: 'standard', provider: 'DeepSeek' },
  { name: 'Llama 4', tier: 'standard', provider: 'Meta' },
  { name: 'Kimi K2.5', tier: 'standard', provider: 'Moonshot' },
  { name: 'Qwen 3', tier: 'standard', provider: 'Alibaba' },
  { name: 'GLM-4.7', tier: 'budget', provider: 'Zhipu' },
];

const endpoints = [
  {
    icon: Brain,
    name: 'AI Chat',
    description: 'Converse with the world\'s most capable AI models',
    price: 'From $0.01',
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  {
    icon: Search,
    name: 'Web Search',
    description: 'Get real-time answers with AI-powered search',
    price: 'From $0.005',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  {
    icon: Image,
    name: 'Image Generation',
    description: 'Create beautiful images from simple text prompts',
    price: 'From $0.02',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  {
    icon: Code2,
    name: 'Code Assistant',
    description: 'Write, debug, and explain code instantly',
    price: 'From $0.02',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    icon: FileText,
    name: 'Embeddings',
    description: 'Understand text at scale with vector embeddings',
    price: 'From $0.01',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  {
    icon: Calculator,
    name: 'Live Crypto',
    description: 'Real-time cryptocurrency prices & data',
    price: 'FREE',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  {
    icon: Cloud,
    name: 'Weather',
    description: 'Accurate forecasts for any location worldwide',
    price: 'From $0.002',
    gradient: 'from-sky-500/20 to-blue-500/20'
  },
  {
    icon: Database,
    name: 'Web Scraping',
    description: 'Extract data from websites with ease',
    price: 'From $0.008',
    gradient: 'from-indigo-500/20 to-violet-500/20'
  },
];

const benefits = [
  { icon: Zap, title: 'Lightning Fast', description: 'Lightning-fast responses worldwide' },
  { icon: Shield, title: 'Privacy First', description: 'Your data stays yours—always' },
  { icon: Wallet, title: 'Simple Pricing', description: 'Pay only for what you use' },
  { icon: Gauge, title: '99.99% Uptime', description: 'Reliable when you need it most' },
];

export function FeaturesSection() {
  return (
    <section className="py-28 px-4 bg-[#12121f] relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-600/5 to-fuchsia-600/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              All the AI Models You Need
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Access leading AI models through a single, easy-to-use API. 
              Switch between providers seamlessly—no code changes needed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-5 rounded-2xl glass-card transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/30 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-white">{model.name}</span>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium uppercase ${
                    model.tier === 'premium' ? 'bg-violet-500/20 text-violet-400' :
                    model.tier === 'standard' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {model.tier}
                  </span>
                </div>
                <div className="text-xs text-zinc-500">{model.provider}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link href="/models" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium group">
              View all available models <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight">
              Everything You Need to Build
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              A complete suite of AI-powered tools to bring your ideas to life. 
              From chatbots to image generation, we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-7 rounded-2xl glass-card border border-violet-500/10 hover:border-violet-500/25 transition-all duration-300 hover:bg-violet-500/5"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-gradient-to-br ${endpoint.gradient}`}>
                  <endpoint.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{endpoint.name}</h3>
                <p className="text-sm text-zinc-400 mb-5 leading-relaxed">{endpoint.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className={`font-mono px-2.5 py-1.5 rounded-lg ${
                    endpoint.price === 'FREE' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-700/40 text-zinc-300'
                  }`}>
                    {endpoint.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl glass-card border border-violet-500/20 p-10 md:p-14"
        >
          <div className="grid md:grid-cols-4 gap-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-5 border border-violet-500/20">
                  <benefit.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{benefit.title}</h3>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}