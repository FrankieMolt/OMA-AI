'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Rocket,
  Terminal,
  BookOpen,
  Users,
  Zap,
  Shield,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  FileText,
  MessageSquare,
  Mail
} from 'lucide-react';

export default function Developers() {
  const features = [
    {
      icon: Zap,
      title: 'Fast Integration',
      description: 'Get started in minutes with our comprehensive SDK and documentation',
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Secure by Default',
      description: 'Enterprise-grade security with encryption and secure key management',
      color: 'blue'
    },
    {
      icon: DollarSign,
      title: 'Built-in Payments',
      description: 'Automatic x402 payment processing with crypto support',
      color: 'green'
    },
    {
      icon: BookOpen,
      title: 'Extensive Docs',
      description: 'Complete guides, API reference, and code examples',
      color: 'yellow'
    }
  ];

  const quickStartSteps = [
    {
      step: '1',
      title: 'Create Account',
      description: 'Sign up and get your API key in seconds',
      icon: Users
    },
    {
      step: '2',
      title: 'Install SDK',
      description: 'Install our SDK for your preferred language',
      icon: Code2
    },
    {
      step: '3',
      title: 'Initialize Agent',
      description: 'Configure your agent with wallet and credentials',
      icon: Terminal
    },
    {
      step: '4',
      title: 'Start Building',
      description: 'Discover APIs and start making calls',
      icon: Rocket
    }
  ];

  const resources = [
    {
      title: 'API Documentation',
      description: 'Complete API reference with examples',
      icon: BookOpen,
      link: '/api-docs',
      color: 'purple'
    },
    {
      title: 'GitHub Repository',
      description: 'Open source code and examples',
      icon: Github,
      link: 'https://github.com/FrankieMolt/OMA-AI',
      color: 'gray'
    },
    {
      title: 'Blog & Tutorials',
      description: 'Latest updates and step-by-step guides',
      icon: FileText,
      link: '/blog',
      color: 'blue'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other developers',
      icon: MessageSquare,
      link: 'https://github.com/FrankieMolt/OMA-AI/discussions',
      color: 'green'
    }
  ];

  const codeExamples = [
    {
      language: 'JavaScript',
      install: 'npm install @oma-ai/sdk',
      code: `import { OMAAgent } from '@oma-ai/sdk';

const agent = new OMAAgent({
  apiKey: 'your-api-key',
  network: 'base'
});

const api = await agent.discoverAPI('gpt-4');
const response = await api.call({ query: 'Hello!' });`
    },
    {
      language: 'Python',
      install: 'pip install oma-ai-sdk',
      code: `from oma_ai import OMAAgent

agent = OMAAgent(
    api_key="your-api-key",
    network="base"
)

api = await agent.discover_api("gpt-4")
response = await api.call({"query": "Hello!"})`
    },
    {
      language: 'Go',
      install: 'go get github.com/oma-ai/sdk-go',
      code: `import "github.com/oma-ai/sdk-go"

agent := oma.NewAgent(oma.Config{
    APIKey: "your-api-key",
    Network: "base",
})

api := agent.DiscoverAPI("gpt-4")
response := api.Call(oma.Query{"query": "Hello!"})`
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-6 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-6">
              <Rocket size={16} />
              Start Building Today
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Build with <span className="gradient-text">OMA-AI</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              The complete toolkit for integrating APIs, MCP servers, and autonomous agent payments into your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api-docs"
                className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <BookOpen size={20} />
                View Documentation
              </a>
              <a
                href="https://github.com/FrankieMolt/OMA-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <Github size={20} />
                Get Started
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Why Developers Choose OMA-AI
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-all"
              >
                <feature.icon className={`text-${feature.color}-400 mb-4`} size={32} />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Quick Start in 4 Steps
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {quickStartSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector */}
                {i < quickStartSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 -right-3 w-6 border-t-2 border-dashed border-zinc-700" />
                )}
                <div className="glass-card p-6 rounded-xl h-full">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="text-purple-400" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Code Examples
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {codeExamples.map((example, i) => (
              <motion.div
                key={example.language}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  {example.language}
                </h3>
                <div className="mb-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                  <code className="text-sm text-green-400 font-mono">
                    {example.install}
                  </code>
                </div>
                <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-x-auto">
                  <pre className="text-xs text-zinc-400 font-mono">
                    {example.code}
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Developer Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, i) => (
              <motion.a
                key={resource.title}
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : undefined}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:border-${resource.color}-500/50 transition-all cursor-pointer"
              >
                <resource.icon className={`text-${resource.color}-400 mb-4 group-hover:scale-110 transition-transform`} size={28} />
                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">
                  {resource.description}
                </p>
                <div className="flex items-center text-sm text-zinc-400 group-hover:text-purple-400 transition-colors">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-2xl text-center"
          >
            <Terminal className="text-purple-400 mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Join thousands of developers building the future of autonomous agent commerce with OMA-AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/api-docs"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <BookOpen size={20} />
                Read Documentation
              </a>
              <a
                href="https://github.com/FrankieMolt/OMA-AI/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-medium"
              >
                <MessageSquare size={20} />
                Ask a Question
              </a>
            </div>

            {/* Benefits List */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                'Free to get started',
                'No credit card required',
                '24/7 community support'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-zinc-400">
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={16} />
                  {benefit}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Need Help?
          </h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Our team is here to help you succeed. Reach out with any questions.
          </p>
          <a
            href="mailto:hello@oma-ai.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Mail size={18} />
            hello@oma-ai.com
          </a>
        </div>
      </section>
    </div>
  );
}
