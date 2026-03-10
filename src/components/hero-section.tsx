'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Zap, 
  Wallet, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Code2,
  Lock,
  Coins,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Brain,
    title: '38+ AI Models',
    description: 'Access GPT-5, Claude Opus, Gemini Pro, DeepSeek, and more through one unified API',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Privacy-First',
    description: 'Zero data retention. Your prompts are never stored, logged, or used for training',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Global edge deployment with <100ms latency. Stream responses in real-time',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Wallet,
    title: 'Web3 Native',
    description: 'Pay with crypto via X402. Connect wallet and start using AI instantly',
    gradient: 'from-blue-500 to-cyan-500'
  }
];

const codeExamples = [
  {
    language: 'bash',
    code: `# Install OMA-AI CLI
npm install -g @oma-ai/cli

# Authenticate with wallet
oma login --wallet

# Start chatting
oma chat "Explain quantum computing"`
  },
  {
    language: 'typescript',
    code: `import { OMA } from '@oma-ai/sdk';

const oma = new OMA(process.env.OMA_API_KEY);

const response = await oma.chat({
  model: 'deepseek-v3.2',
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
});

console.log(response.content);`
  },
  {
    language: 'python',
    code: `from oma_ai import OMA

oma = OMA(api_key='oma-...')

response = oma.chat(
    model='claude-opus-4.6',
    messages=[{'role': 'user', 'content': 'Hi!'}]
)

print(response.content)`
  }
];

const stats = [
  { label: 'AI Models', value: '38+' },
  { label: 'Latency', value: '<100ms' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Users', value: '10K+' }
];

export function HeroSection() {
  const [activeExample, setActiveExample] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveExample((prev) => (prev + 1) % codeExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        {/* Main Hero */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Now with X402 micropayments</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Private AI API
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Without Compromise
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Access 38+ AI models through one API. Zero data retention. 
            Pay with crypto or card. Privacy-first, always.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/models" className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
              Browse Marketplace
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/mcps" className="px-8 py-4 bg-muted hover:bg-muted/80 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              MCP Registry
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
            >
              <div className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                feature.gradient
              )}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl bg-card border border-border overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {codeExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={cn(
                    "px-6 py-3 text-sm font-medium transition-all",
                    activeExample === index
                      ? "bg-muted text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {example.language.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Code */}
            <div className="p-6 bg-black/50">
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeExample}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm font-mono text-gray-300 overflow-x-auto"
                >
                  <code>{codeExamples[activeExample].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* X402 Payment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Pay Per Request with X402</h3>
                <p className="text-muted-foreground">
                  Connect your wallet and pay only for what you use. No subscription needed.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6">
                <div className="text-2xl font-bold">$0.002</div>
                <div className="text-xs text-muted-foreground">per weather API</div>
              </div>
              <div className="text-center px-6">
                <div className="text-2xl font-bold">$0.01</div>
                <div className="text-xs text-muted-foreground">per LLM call</div>
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Connect Wallet
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
