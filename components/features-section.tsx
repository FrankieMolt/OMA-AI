'use client';

import { motion } from 'framer-motion';
import { 
  Brain, 
  Search, 
  Code2, 
  Image, 
  FileText, 
  Calculator,
  Cloud,
  Database,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const models = [
  { name: 'GPT-5.2', tier: 'premium', provider: 'OpenAI' },
  { name: 'Claude Opus 4.6', tier: 'premium', provider: 'Anthropic' },
  { name: 'Gemini 3.1 Pro', tier: 'premium', provider: 'Google' },
  { name: 'DeepSeek V3.2', tier: 'standard', provider: 'DeepSeek' },
  { name: 'Llama 3.3 70B', tier: 'standard', provider: 'Meta' },
  { name: 'Kimi K2.5', tier: 'standard', provider: 'Moonshot' },
  { name: 'Qwen 3 Coder', tier: 'standard', provider: 'Alibaba' },
  { name: 'GLM 4.7 Flash', tier: 'budget', provider: 'Zhipu' },
];

const endpoints = [
  {
    icon: Brain,
    name: 'LLM Chat',
    description: 'Chat with 38+ AI models',
    endpoint: '/api/llm',
    price: '$0.01-0.05',
    method: 'POST'
  },
  {
    icon: Search,
    name: 'Web Search',
    description: 'Search the web with AI',
    endpoint: '/api/search',
    price: '$0.005',
    method: 'POST'
  },
  {
    icon: Image,
    name: 'Image Generation',
    description: 'Generate images with AI',
    endpoint: '/api/image',
    price: '$0.02',
    method: 'POST'
  },
  {
    icon: Code2,
    name: 'Code Execution',
    description: 'Execute code safely',
    endpoint: '/api/compute',
    price: '$0.02',
    method: 'POST'
  },
  {
    icon: FileText,
    name: 'Embeddings',
    description: 'Generate text embeddings',
    endpoint: '/api/embeddings',
    price: '$0.01',
    method: 'POST'
  },
  {
    icon: Calculator,
    name: 'Crypto Prices',
    description: 'Real-time crypto data',
    endpoint: '/api/prices',
    price: 'FREE',
    method: 'GET'
  },
  {
    icon: Cloud,
    name: 'Weather',
    description: 'Weather data worldwide',
    endpoint: '/api/weather',
    price: '$0.002',
    method: 'GET'
  },
  {
    icon: Database,
    name: 'Web Scraping',
    description: 'Scrape any website',
    endpoint: '/api/scrape',
    price: '$0.008',
    method: 'POST'
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Models Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              38+ AI Models, One API
            </h2>
            <p className="text-xl text-muted-foreground">
              Access all major AI providers through a single unified interface
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "p-4 rounded-xl border transition-all hover:scale-105",
                  model.tier === 'premium' && "border-purple-500/50 bg-purple-500/5",
                  model.tier === 'standard' && "border-blue-500/50 bg-blue-500/5",
                  model.tier === 'budget' && "border-green-500/50 bg-green-500/5"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{model.name}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    model.tier === 'premium' && "bg-purple-500/20 text-purple-400",
                    model.tier === 'standard' && "bg-blue-500/20 text-blue-400",
                    model.tier === 'budget' && "bg-green-500/20 text-green-400"
                  )}>
                    {model.tier}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">{model.provider}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <button className="text-primary hover:underline">
              View all 38+ models →
            </button>
          </motion.div>
        </div>

        {/* API Endpoints Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              More Than Just LLMs
            </h2>
            <p className="text-xl text-muted-foreground">
              A complete suite of AI-powered APIs for every use case
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <endpoint.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={cn(
                    "text-xs font-mono px-2 py-1 rounded",
                    endpoint.price === 'FREE' 
                      ? "bg-green-500/20 text-green-400"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {endpoint.price}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{endpoint.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{endpoint.description}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <span className={cn(
                    "px-2 py-0.5 rounded",
                    endpoint.method === 'GET' ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                  )}>
                    {endpoint.method}
                  </span>
                  <span>{endpoint.endpoint}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-border p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why OMA-AI?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-sm">One API for all major AI models</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-sm">Zero data retention guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-sm">X402 micropayments support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <span className="text-sm">99.9% uptime SLA</span>
                </li>
              </ul>
            </div>

            <div className="md:border-l md:border-r border-border md:px-8">
              <h3 className="text-2xl font-bold mb-4">vs OpenRouter</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✅ Privacy-first (no data logging)</li>
                <li>✅ Simplified pricing (3 tiers)</li>
                <li>✅ Web3 native (wallet auth)</li>
                <li>✅ X402 micropayments</li>
                <li>❌ Fewer models (38 vs 300+)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">vs Venice AI</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>✅ Multiple providers</li>
                <li>✅ Aggregated billing</li>
                <li>✅ More model variety</li>
                <li>✅ Better documentation</li>
                <li>❌ Not first-party infra</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
