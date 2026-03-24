import { Metadata } from 'next';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import { Cpu, Zap, Globe, Server, Link as LinkIcon, Wallet, ArrowRight, Check, ChevronDown, Database, Cloud, Bot, Sparkles, TrendingUp, Clock, Shield, Gauge, Layers, Terminal, Code, Network, HardDrive, Cpu as CpuIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GPU & VM Compute Marketplace - Rent GPU for AI Agents',
  description: 'GPU & VM Marketplace - Rent compute for AI agents. Pay per use with x402/USDC on Base. Starting at $0.003/request. Access H100, A100, RTX 4090 and more.',
  keywords: ['GPU Rental', 'AI Compute', 'VM Marketplace', 'x402 Payments', 'H100', 'A100', 'GPU-bridge', 'Akash', 'RunPod', 'io.net', 'Lambda Labs', 'Decentralized Compute'],
};

const gpuInstances = [
  { id: 'h100', name: 'NVIDIA H100', vram: '80GB HBM3', pricePerHour: 2.50, pricePerRequest: 0.003, tflops: 989, memory: '80GB', category: 'Premium', available: true },
  { id: 'h200', name: 'NVIDIA H200', vram: '141GB HBM3e', pricePerHour: 3.20, pricePerRequest: 0.004, tflops: 1057, memory: '141GB', category: 'Premium', available: true },
  { id: 'a100', name: 'NVIDIA A100', vram: '80GB HBM2', pricePerHour: 1.80, pricePerRequest: 0.002, tflops: 624, memory: '80GB', category: 'Professional', available: true },
  { id: 'rtx4090', name: 'NVIDIA RTX 4090', vram: '24GB GDDR6X', pricePerHour: 0.65, pricePerRequest: 0.001, tflops: 132, memory: '24GB', category: 'Consumer', available: true },
  { id: 'mi300x', name: 'AMD MI300X', vram: '192GB HBM3', pricePerHour: 2.90, pricePerRequest: 0.004, tflops: 1534, memory: '192GB', category: 'Premium', available: false },
  { id: 'a6000', name: 'NVIDIA RTX A6000', vram: '48GB GDDR6', pricePerHour: 1.20, pricePerRequest: 0.002, tflops: 318, memory: '48GB', category: 'Professional', available: true },
];

const vmInstances = [
  { id: 'cpu-small', name: 'Small VM', vcpu: 4, ram: '16GB', storage: '256GB SSD', pricePerHour: 0.15, category: 'CPU' },
  { id: 'cpu-medium', name: 'Medium VM', vcpu: 8, ram: '32GB', storage: '512GB SSD', pricePerHour: 0.30, category: 'CPU' },
  { id: 'cpu-large', name: 'Large VM', vcpu: 16, ram: '64GB', storage: '1TB SSD', pricePerHour: 0.60, category: 'CPU' },
  { id: 'cpu-xl', name: 'XL VM', vcpu: 32, ram: '128GB', storage: '2TB SSD', pricePerHour: 1.20, category: 'CPU' },
  { id: 'storage-basic', name: 'Storage Node', vcpu: 2, ram: '8GB', storage: '10TB HDD', pricePerHour: 0.10, category: 'Storage' },
  { id: 'storage-pro', name: 'Storage Pro', vcpu: 4, ram: '16GB', storage: '50TB NVMe', pricePerHour: 0.35, category: 'Storage' },
];

const serverlessOptions = [
  { id: 'inference-micro', name: 'Micro Inference', pricePerRequest: 0.0005, maxTokens: 2048, rpm: 100, category: 'Serverless' },
  { id: 'inference-small', name: 'Small Inference', pricePerRequest: 0.001, maxTokens: 8192, rpm: 500, category: 'Serverless' },
  { id: 'inference-medium', name: 'Medium Inference', pricePerRequest: 0.003, maxTokens: 32768, rpm: 1000, category: 'Serverless' },
  { id: 'inference-large', name: 'Large Inference', pricePerRequest: 0.008, maxTokens: 128000, rpm: 100, category: 'Serverless' },
  { id: 'training-micro', name: 'Micro Training', pricePerHour: 0.50, maxSteps: 1000, category: 'Serverless' },
  { id: 'training-standard', name: 'Standard Training', pricePerHour: 2.00, maxSteps: 10000, category: 'Serverless' },
];

const providers = [
  { id: 'io-net', name: 'io.net', icon: '🔥', description: 'Decentralized GPU network with 100K+ GPUs', location: 'Global', gpus: ['H100', 'A100', 'H200', 'MI300'], basePrice: 0.50, status: 'integrated', margin: '15%', payment: 'x402/USDC on Base' },
  { id: 'runpod', name: 'RunPod', icon: '🚀', description: 'Cloud GPU platform for AI training and inference', location: 'Global', gpus: ['RTX 4090', 'A100', 'H100'], basePrice: 0.30, status: 'integrated', margin: '12%', payment: 'x402/USDC on Base' },
  { id: 'lambdalabs', name: 'Lambda Labs', icon: '💻', description: 'Enterprise-grade GPU instances for deep learning', location: 'US, EU, Asia', gpus: ['H100', 'A100', 'RTX 6000'], basePrice: 0.80, status: 'integrated', margin: '10%', payment: 'x402/USDC on Base' },
  { id: 'gpu-bridge', name: 'GPU-Bridge', icon: '🌉', description: 'DePIN GPU marketplace - First GPU provider with native x402 payments', location: 'Global', gpus: ['H100', 'A100', 'RTX 4090'], basePrice: 0.45, status: 'integrated', margin: '18%', payment: 'x402/USDC on Base (Native)' },
  { id: 'akash', name: 'Akash Network', icon: '🏰', description: 'Decentralized cloud computing marketplace - pay with stablecoins', location: 'Global', gpus: ['A100', 'RTX 4090'], basePrice: 0.35, status: 'integrated', margin: '20%', payment: 'x402/USDC on Base' },
];

const volumeDiscounts = [
  { tier: 'Starter', hours: '1-10', discount: '0%', markup: '15%' },
  { tier: 'Pro', hours: '10-100', discount: '5%', markup: '12%' },
  { tier: 'Business', hours: '100-500', discount: '10%', markup: '10%' },
  { tier: 'Enterprise', hours: '500+', discount: '20%', markup: '8%' },
];

const useCases = [
  { id: 'llm-inference', name: 'LLM Inference', icon: Bot, description: 'Run large language models for text generation, chatbots, and completions', price: 'From $0.003/request', providers: ['RunPod', 'io.net', 'Lambda Labs'] },
  { id: 'model-training', name: 'Model Training', icon: Cpu, description: 'Train custom models, fine-tune embeddings, and optimize weights', price: 'From $0.50/hour', providers: ['Lambda Labs', 'RunPod', 'io.net'] },
  { id: 'agent-compute', name: 'Agent Compute', icon: Sparkles, description: 'Power AI agents with persistent compute and memory', price: 'From $0.15/hour', providers: ['All Providers'] },
  { id: 'batch-processing', name: 'Batch Processing', icon: Layers, description: 'Process large datasets, embeddings, and vector search', price: 'From $0.10/hour', providers: ['io.net', 'RunPod', 'Akash'] },
];

const integrations = [
  { id: 'mcp', name: 'MCP Server', icon: Terminal, description: 'Connect via Model Context Protocol for seamless agent integration', status: 'ready' },
  { id: 'api', name: 'Direct API', icon: Code, description: 'REST API with x402 payment protocol for programmatic access', status: 'ready' },
  { id: 'x402', name: 'x402 Native', icon: Zap, description: 'Native x402/USDC payments on Base network - gasless & instant', status: 'ready' },
  { id: 'sdk', name: 'Python SDK', icon: Database, description: 'Python client library for easy integration', status: 'coming' },
];

const decentralizedProviders = [
  { 
    id: 'gpu-bridge', 
    name: 'GPU-Bridge', 
    icon: '🌉', 
    description: 'First GPU provider with native x402 payments - pay directly with USDC on Base without middlemen',
    features: ['Native x402 support', 'Pay with USDC on Base', 'Gasless transactions', 'Autonomous agent payments'],
    gpus: ['H100', 'A100', 'H200', 'RTX 4090'],
    price: 'From $0.45/hour'
  },
  { 
    id: 'akash', 
    name: 'Akash Network', 
    icon: '🏰', 
    description: 'Decentralized cloud computing marketplace - now accepting stablecoin payments via x402',
    features: ['Decentralized infrastructure', 'Pay with USDC', 'No middleman markup', 'Self-hosted deployments'],
    gpus: ['H100', 'A100', 'RTX 4090'],
    price: 'From $0.35/hour'
  },
  { 
    id: 'io-net', 
    name: 'io.net', 
    icon: '🔥', 
    description: 'Decentralized GPU network with 100K+ GPUs - x402 payments enabled for autonomous agents',
    features: ['Massive GPU capacity', 'x402 payments', 'Instant deployment', 'Agent-native billing'],
    gpus: ['H100', 'A100', 'H200', 'MI300'],
    price: 'From $0.50/hour'
  },
];

export default function ComputePage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-950 py-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full mb-8">
              <Zap className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-300">Pay with USDC on Base via x402</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">Rent Compute for<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI Agents</span></h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">Pay with <span className="text-emerald-400 font-bold">USDC on Base</span> via x402. <span className="text-white font-bold">No account needed</span> - connect wallet. <span className="text-cyan-400 font-bold">Instant deployment</span>.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30">
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>
              <button type="button" className="px-8 py-4 bg-zinc-800/80 text-white rounded-xl font-semibold hover:bg-zinc-700/80 transition-all flex items-center gap-2 border border-zinc-700">
                <Terminal className="w-5 h-5" />
                View Documentation
              </button>
            </div>
            <div className="flex justify-center gap-8 md:gap-16">
              <div><div className="text-4xl font-bold text-white">500K+</div><div className="text-gray-400">GPUs Available</div></div>
              <div><div className="text-4xl font-bold text-white">5</div><div className="text-gray-400">Providers</div></div>
              <div><div className="text-4xl font-bold text-white">&lt;$0.003</div><div className="text-gray-400">Per Request</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Get started in minutes with our streamlined compute rental process</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Wallet, step: '01', title: 'Connect Wallet', desc: 'Link your Base wallet to enable x402/USDC payments' },
            { icon: Cpu, step: '02', title: 'Choose Compute', desc: 'Select GPU, VM, or serverless based on your needs' },
            { icon: Zap, step: '03', title: 'Pay Automatically', desc: 'x402 handles payments - just use compute, we bill automatically' },
            { icon: Bot, step: '04', title: 'Run AI Workloads', desc: 'Execute inference, training, or agent tasks instantly' }
          ].map((item, i) => (
            <div key={item.step} className="relative">
              <GlassCard className="p-8 text-center h-full">
                <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="text-emerald-400 text-sm font-mono mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </GlassCard>
              {i < 3 && <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-zinc-700 w-6 h-6 z-10" />}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">GPU Instances</h2>
            <p className="text-gray-400">Premium GPU compute with transparent pricing</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Real-time pricing
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gpuInstances.map((gpu) => (
            <GlassCard key={gpu.id} className={`p-6 hover:border-emerald-500/50 transition-all ${!gpu.available ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full mb-2 inline-block ${gpu.category === 'Premium' ? 'bg-purple-600/20 text-purple-400' : gpu.category === 'Professional' ? 'bg-cyan-600/20 text-cyan-400' : 'bg-zinc-700 text-gray-400'}`}>{gpu.category}</span>
                  <h3 className="text-xl font-bold text-white">{gpu.name}</h3>
                  <p className="text-gray-400 text-sm">{gpu.vram}</p>
                </div>
                {!gpu.available && <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">Unavailable</span>}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Performance</span><span className="text-white font-mono">{gpu.tflops} TFLOPS</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Memory</span><span className="text-white font-mono">{gpu.memory}</span></div>
              </div>
              <div className="border-t border-zinc-700 pt-4">
                <div className="flex justify-between items-end mb-4">
                  <div><div className="text-2xl font-bold text-white">${gpu.pricePerHour}</div><div className="text-gray-400 text-sm">/hour</div></div>
                  <div className="text-right"><div className="text-emerald-400 font-semibold">${gpu.pricePerRequest}</div><div className="text-gray-400 text-xs">/request</div></div>
                </div>
                <button type="button" className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2" disabled={!gpu.available}>
                  {gpu.available ? 'Rent Now' : 'Join Waitlist'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">VM Types & Storage</h2>
              <p className="text-gray-400">CPU instances and storage for any workload</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vmInstances.map((vm) => (
              <GlassCard key={vm.id} className="p-6 hover:border-cyan-500/50 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center">
                    {vm.category === 'Storage' ? <HardDrive className="w-6 h-6 text-cyan-400" /> : <Server className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-zinc-700 text-gray-300 text-xs rounded-full">{vm.category}</span>
                    <h3 className="text-lg font-semibold text-white mt-1">{vm.name}</h3>
                  </div>
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">vCPU</span><span className="text-white font-mono">{vm.vcpu} cores</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">RAM</span><span className="text-white font-mono">{vm.ram}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Storage</span><span className="text-white font-mono">{vm.storage}</span></div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-700">
                  <div><span className="text-2xl font-bold text-white">${vm.pricePerHour}</span><span className="text-gray-400 text-sm">/hour</span></div>
                  <button type="button" className="px-4 py-2 bg-cyan-600/20 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-600/30 transition-all">Rent</button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Serverless Compute</h2>
            <p className="text-gray-400">Pay per request - no instance management required</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serverlessOptions.map((opt) => (
            <GlassCard key={opt.id} className="p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded-full">{opt.category}</span>
                  <h3 className="text-lg font-semibold text-white mt-2">{opt.name}</h3>
                </div>
                <Cloud className="w-6 h-6 text-purple-400" />
              </div>
              <div className="space-y-2 mb-4 text-sm">
                {'maxTokens' in opt && opt.maxTokens && <div className="flex justify-between"><span className="text-gray-400">Max Tokens</span><span className="text-white font-mono">{opt.maxTokens.toLocaleString()}</span></div>}
                {'rpm' in opt && opt.rpm && <div className="flex justify-between"><span className="text-gray-400">Rate Limit</span><span className="text-white font-mono">{opt.rpm} req/min</span></div>}
                {'maxSteps' in opt && opt.maxSteps && <div className="flex justify-between"><span className="text-gray-400">Max Steps</span><span className="text-white font-mono">{opt.maxSteps.toLocaleString()}</span></div>}
              </div>
              <div className="pt-4 border-t border-zinc-700">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">${'pricePerRequest' in opt ? opt.pricePerRequest : opt.pricePerHour}</span>
                  <span className="text-gray-400 text-sm">{'pricePerRequest' in opt ? '/request' : '/hour'}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/20 border border-cyan-500/30 rounded-full mb-4">
              <Zap className="w-4 h-4 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-300">x402 Payments</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Decentralized Compute with x402</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Pay with USDC on Base via x402. These providers integrate directly with x402 for autonomous agent payments - no account needed, instant deployment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {decentralizedProviders.map((p) => (
              <GlassCard key={p.id} className="p-6 hover:border-cyan-500/50 transition-all border-cyan-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{p.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{p.description}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-emerald-400 font-bold text-2xl mb-1">{p.price}</div>
                </div>
                <div className="space-y-2 mb-4">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-cyan-400" />
                      <span className="text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.gpus.map((g) => <span key={g} className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded">{g}</span>)}
                </div>
                <button type="button" className="w-full py-3 bg-cyan-600/20 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-600/30 transition-all flex items-center justify-center gap-2">
                  Deploy Now <ArrowRight className="w-4 h-4" />
                </button>
              </GlassCard>
            ))}
          </div>
          <GlassCardPurple className="p-8 text-center max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">Autonomous Agent Payments</h3>
            <p className="text-gray-300">AI agents can pay autonomously using x402 protocol. Connect your wallet once, and agents automatically pay for compute with USDC on Base - no human intervention needed.</p>
          </GlassCardPurple>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Provider Integration</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">We aggregate compute from leading providers, adding our markup for convenience and unified billing. All payments via x402/USDC on Base.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((p) => (
            <GlassCard key={p.id} className="p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{p.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${p.status === 'integrated' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-yellow-600/20 text-yellow-400'}`}>{p.status === 'integrated' ? 'Integrated' : 'Coming'}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{p.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.gpus.map((g) => <span key={g} className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded">{g}</span>)}
              </div>
              <div className="pt-4 border-t border-zinc-700">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm">
                    <span className="text-gray-400">Payment:</span>
                    <span className="text-emerald-400 font-semibold ml-1">{p.payment}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-gray-400">Our Margin:</span>
                    <span className="text-cyan-400 font-semibold ml-1">{p.margin}</span>
                  </div>
                  <button type="button" className="px-4 py-2 bg-emerald-600/20 text-emerald-400 rounded-lg font-semibold hover:bg-emerald-600/30 transition-all text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        <GlassCardPurple className="mt-12 p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-2">Resale Model Disclosure</h3>
          <p className="text-gray-300">OMA-AI acts as a reseller aggregating compute from third-party providers. Prices include our markup (10-20%) which covers platform overhead, unified billing, and simplified integration. Base pricing from providers shown for comparison.</p>
        </GlassCardPurple>
      </div>

      <div className="bg-zinc-900/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Volume Pricing</h2>
            <p className="text-gray-400 text-lg">The more you use, the less you pay</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                {volumeDiscounts.map((tier) => (
                  <div key={tier.tier} className="text-center p-4">
                    <div className="text-lg font-semibold text-white mb-2">{tier.tier}</div>
                    <div className="text-sm text-gray-400 mb-3">{tier.hours} hours/mo</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Customer Discount</span><span className="text-emerald-400 font-semibold">{tier.discount}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-500">Our Margin</span><span className="text-cyan-400 font-semibold">{tier.markup}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Integration Options</h2>
          <p className="text-gray-400 text-lg">Multiple ways to connect your AI agents to compute</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((int) => (
            <GlassCard key={int.id} className="p-6 text-center hover:border-emerald-500/50 transition-all">
              <div className="w-16 h-16 bg-emerald-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <int.icon className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{int.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{int.description}</p>
              <span className={`px-3 py-1 text-xs rounded-full ${int.status === 'ready' ? 'bg-emerald-600/20 text-emerald-400' : 'bg-yellow-600/20 text-yellow-400'}`}>{int.status === 'ready' ? 'Ready' : 'Coming Soon'}</span>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Use Cases</h2>
            <p className="text-gray-400 text-lg">Whatever your AI workload, we have the compute</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((use) => (
              <GlassCard key={use.id} className="p-8 hover:border-purple-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <use.icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{use.name}</h3>
                      <span className="text-emerald-400 font-semibold">{use.price}</span>
                    </div>
                    <p className="text-gray-400 mb-4">{use.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {use.providers.map((prov) => <span key={prov} className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded">{prov}</span>)}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Rent Compute?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Connect your wallet and start using GPU compute in minutes. Pay with USDC via x402 on Base. Agents can pay autonomously.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
            <button type="button" className="px-8 py-4 bg-zinc-800/80 text-white rounded-xl font-semibold hover:bg-zinc-700/80 transition-all flex items-center gap-2 border border-zinc-700">
              <Terminal className="w-5 h-5" />
              Read Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
