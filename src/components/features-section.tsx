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
  Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    name: 'LLM Chat', 
    description: 'Chat with 38+ frontier models through a single API',
    price: '$0.01-0.05',
    method: 'POST',
    gradient: 'from-violet-500/20 to-purple-500/20'
  },
  { 
    icon: Search, 
    name: 'Web Search', 
    description: 'Real-time web search powered by AI',
    price: '$0.005',
    method: 'POST',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  { 
    icon: Image, 
    name: 'Image Gen', 
    description: 'Create stunning images with DALL-E 3',
    price: '$0.02',
    method: 'POST',
    gradient: 'from-pink-500/20 to-rose-500/20'
  },
  { 
    icon: Code2, 
    name: 'Code Exec', 
    description: 'Sandboxed code execution for agents',
    price: '$0.02',
    method: 'POST',
    gradient: 'from-emerald-500/20 to-teal-500/20'
  },
  { 
    icon: FileText, 
    name: 'Embeddings', 
    description: 'Generate vector embeddings for RAG',
    price: '$0.01',
    method: 'POST',
    gradient: 'from-amber-500/20 to-orange-500/20'
  },
  { 
    icon: Calculator, 
    name: 'Crypto', 
    description: 'Real-time prices & market data',
    price: 'FREE',
    method: 'GET',
    gradient: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    icon: Cloud, 
    name: 'Weather', 
    description: 'Accurate forecasts worldwide',
    price: '$0.002',
    method: 'GET',
    gradient: 'from-sky-500/20 to-blue-500/20'
  },
  { 
    icon: Database, 
    name: 'Scrape', 
    description: 'Extract data from any website',
    price: '$0.008',
    method: 'POST',
    gradient: 'from-indigo-500/20 to-violet-500/20'
  },
];

const benefits = [
  { icon: Zap, title: 'Lightning Fast', description: 'Sub-50ms latency globally' },
  { icon: Shield, title: 'Privacy First', description: 'Zero data retention' },
  { icon: Wallet, title: 'x402 Payments', description: 'Pay per request, no accounts' },
  { icon: Gauge, title: '99.99% Uptime', description: 'Enterprise-grade reliability' },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-[#030305]">
      <div className="max-w-7xl mx-auto">
        
        {/* Models Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              38+ Models, One API
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Access every frontier model through a unified, type-safe interface. 
              Switch providers instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "p-4 rounded-2xl border transition-all hover:scale-[1.02] cursor-pointer",
                  model.tier === 'premium' && "border-violet-500/30 bg-violet-500/[0.03] hover:border-violet-500/50",
                  model.tier === 'standard' && "border-blue-500/30 bg-blue-500/[0.03] hover:border-blue-500/50",
                  model.tier === 'budget' && "border-emerald-500/30 bg-emerald-500/[0.03] hover:border-emerald-500/50"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-white">{model.name}</span>
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase",
                    model.tier === 'premium' && "bg-violet-500/20 text-violet-400",
                    model.tier === 'standard' && "bg-blue-500/20 text-blue-400",
                    model.tier === 'budget' && "bg-emerald-500/20 text-emerald-400"
                  )}>
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
            <Link href="/models" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium">
              View all models <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* API Endpoints Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              More Than Just LLMs
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A complete toolkit for building autonomous agents. 
              Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all hover:bg-white/[0.04]"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br",
                  endpoint.gradient
                )}>
                  <endpoint.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{endpoint.name}</h3>
                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{endpoint.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className={cn(
                    "px-2 py-1 rounded font-mono",
                    endpoint.method === 'GET' ? "bg-green-500/15 text-green-400" : "bg-blue-500/15 text-blue-400"
                  )}>
                    {endpoint.method}
                  </span>
                  <span className={cn(
                    "font-mono px-2 py-1 rounded",
                    endpoint.price === 'FREE' ? "bg-emerald-500/15 text-emerald-400" : "text-zinc-500 bg-zinc-500/10"
                  )}>
                    {endpoint.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/[0.06] p-8 md:p-12"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
