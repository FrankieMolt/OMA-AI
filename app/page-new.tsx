/**
 * OMA-AI Homepage - Refactored with Approved Components
 * Following Wednesday Design guidelines
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Terminal, 
  Zap, 
  Shield, 
  Globe, 
  Code2, 
  Cpu,
  Network,
  Lock,
  Rocket,
  Search,
  TrendingUp,
  Users
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'APIs Listed', value: '450+', icon: Code2 },
    { label: 'Active Agents', value: '12.5K', icon: Cpu },
    { label: 'Transactions', value: '$2.3M', icon: TrendingUp },
    { label: 'Countries', value: '145+', icon: Globe },
  ];

  const features = [
    {
      icon: Terminal,
      title: 'Agent Integration',
      description: 'Seamlessly connect AI agents to 450+ APIs with one line of code.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'x402 infrastructure ensures safe, transparent transactions.',
    },
    {
      icon: Network,
      title: 'Global Network',
      description: 'Access APIs and services from providers worldwide.',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with SOC 2 standards.',
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Sub-100ms response times with edge caching worldwide.',
    },
    {
      icon: Zap,
      title: 'Auto-Scaling',
      description: 'Automatic load balancing to handle any traffic volume.',
    },
  ];

  const trendingAPIs = [
    { name: 'OpenAI GPT-5', category: 'LLM', calls: '1.2M', growth: '+23%' },
    { name: 'Claude 4 Opus', category: 'LLM', calls: '980K', growth: '+18%' },
    { name: 'Groq Inference', category: 'Compute', calls: '750K', growth: '+45%' },
    { name: 'Perplexity Search', category: 'Search', calls: '620K', growth: '+12%' },
    { name: 'Anthropic Claude', category: 'LLM', calls: '580K', growth: '+8%' },
    { name: 'Replicate ML', category: 'ML', calls: '450K', growth: '+31%' },
  ];

  const recentActivity = [
    { agent: 'AlphaBot', action: 'deployed new model', time: '2 min ago' },
    { agent: 'DataMiner', action: 'processed 1M records', time: '5 min ago' },
    { agent: 'TradeMaster', action: 'executed 500 trades', time: '12 min ago' },
    { agent: 'SentinelAI', action: 'blocked suspicious activity', time: '18 min ago' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
        <div className="container relative mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Zap className="w-3 h-3 mr-2" />
              The Future of Agent Commerce
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Where AI Agents
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500">
                {' '}Connect
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The premier marketplace for AI agents to discover, access, and pay for APIs.
              Seamlessly integrate 450+ services with autonomous authentication.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Explore Marketplace
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Documentation
                <Code2 className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {stats.map((stat, i) => (
              <Card key={i} className="glass-card border-purple-500/20">
                <CardContent className="pt-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search APIs, agents, or documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-zinc-900/50 border-zinc-800"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Categories
              </Button>
              <Button variant="outline" size="sm">
                Pricing
              </Button>
              <Button variant="outline" size="sm">
                Rating
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose OMA-AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The most advanced API marketplace designed specifically for autonomous AI agents
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full glass-card hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending APIs Section */}
      <section className="py-20 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending APIs</h2>
              <p className="text-muted-foreground">Most popular services this week</p>
            </div>
            <Button variant="outline">
              View All
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingAPIs.map((api, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Card className="hover:border-purple-500/30 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm text-purple-400 font-medium mb-1">
                          {api.category}
                        </div>
                        <h3 className="font-semibold text-lg">{api.name}</h3>
                      </div>
                      <Badge variant="secondary" className="text-green-400">
                        {api.growth}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {api.calls} calls this week
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900/30 border border-zinc-800"
                  >
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.agent}</div>
                      <div className="text-sm text-muted-foreground">
                        {activity.action}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Card className="glass-card border-purple-500/20">
              <CardHeader>
                <CardTitle>Ready to Integrate?</CardTitle>
                <CardDescription>
                  Get started in minutes with our comprehensive documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 font-mono text-sm">
                  <div className="text-purple-400 mb-2"># Install SDK</div>
                  <div className="text-white">npm install @x402/core</div>
                </div>
                <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 font-mono text-sm">
                  <div className="text-purple-400 mb-2"># Initialize</div>
                  <div className="text-white">const x402 = new X402Client();</div>
                </div>
                <Button className="w-full" size="lg">
                  Read Documentation
                  <Code2 className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="gradient-border bg-zinc-900/60 backdrop-blur-sm border-0">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Join the Future of Agent Commerce
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect with thousands of AI agents already using OMA-AI to power their applications
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Get Started Free
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
