'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Terminal,
  Copy,
  Check,
  ChevronRight,
  Zap,
  Shield,
  DollarSign,
  Play,
  ExternalLink,
  FileCode,
  Package,
  GitBranch,
  Menu
} from 'lucide-react';

export default function APIDocs() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      subsections: ['installation', 'quick-start', 'authentication']
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code2,
      subsections: ['endpoints', 'requests', 'responses', 'errors']
    },
    {
      id: 'x402-payments',
      title: 'x402 Payments',
      icon: DollarSign,
      subsections: ['overview', 'wallet-setup', 'transactions']
    },
    {
      id: 'sdk',
      title: 'SDK Guide',
      icon: Package,
      subsections: ['javascript', 'python', 'go']
    }
  ];

  const codeExamples = {
    javascript: `// Install SDK
npm install @oma-ai/sdk

// Initialize client
import { OMAAgent } from '@oma-ai/sdk';

const agent = new OMAAgent({
  walletAddress: '0x...',
  network: 'base',
  apiKey: 'your-api-key'
});

// Discover and call API
const api = await agent.discoverAPI('gpt-4-turbo');
const response = await api.call({
  messages: [
    { role: 'user', content: 'Hello, world!' }
  ]
});

console.log(response);`,

    python: `# Install SDK
pip install oma-ai-sdk

# Initialize client
from oma_ai import OMAAgent

agent = OMAAgent(
    wallet_address="0x...",
    network="base",
    api_key="your-api-key"
)

# Discover and call API
api = await agent.discover_api("gpt-4-turbo")
response = await api.call({
    "messages": [
        {"role": "user", "content": "Hello, world!"}
    ]
})

print(response)`,

    go: `// Install SDK
go get github.com/oma-ai/sdk-go

// Initialize client
package main

import (
    "github.com/oma-ai/sdk-go"
)

func main() {
    agent := oma.NewAgent(oma.Config{
        WalletAddress: "0x...",
        Network: "base",
        APIKey: "your-api-key",
    })

    // Discover and call API
    api, _ := agent.DiscoverAPI("gpt-4-turbo")
    response, _ := api.Call(map[string]interface{}{
        "messages": []map[string]string{
            {"role": "user", "content": "Hello, world!"},
        },
    })

    fmt.Println(response)
}`
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <BookOpen className="text-purple-400" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">API Documentation</h1>
                <p className="text-sm text-zinc-500">Build with OMA-AI in minutes</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/FrankieMolt/OMA-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <GitBranch size={16} />
                GitHub
              </a>
              <button className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg">
                <Play size={16} />
                Try Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-20 h-[calc(100vh-8rem)] overflow-y-auto">
            <nav className="space-y-4">
              {sections.map(section => (
                <div key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-purple-600 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                    }`}
                  >
                    <section.icon size={18} />
                    <span className="font-medium">{section.title}</span>
                  </button>
                  {activeSection === section.id && (
                    <div className="ml-6 mt-2 space-y-1">
                      {section.subsections.map(sub => (
                        <a
                          key={sub}
                          href={`#${sub}`}
                          className="block px-4 py-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-4xl">
            {/* Getting Started */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Zap className="text-purple-400" size={32} />
                Getting Started
              </h2>

              <div className="space-y-8">
                {/* Installation */}
                <div id="installation">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Installation
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Install the OMA-AI SDK for your preferred programming language.
                  </p>

                  {/* Language Tabs */}
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      {['javascript', 'python', 'go'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => {/* Would toggle language */}}
                          className="px-4 py-2 rounded-lg text-sm font-medium capitalize bg-zinc-800 text-zinc-400"
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="relative">
                    <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700 rounded-t-lg">
                      <span className="text-sm text-zinc-400">JavaScript</span>
                      <button
                        onClick={() => handleCopy(codeExamples.javascript)}
                        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                        aria-label="Copy code"
                      >
                        {copiedCode === codeExamples.javascript ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                        {copiedCode === codeExamples.javascript ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <pre className="p-4 bg-zinc-900/50 border-x border-b border-zinc-700 rounded-b-lg overflow-x-auto">
                      <code className="text-sm text-green-400 font-mono">
                        {codeExamples.javascript}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Quick Start */}
                <div id="quick-start">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Quick Start
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: '1. Create Account',
                        description: 'Sign up for an account and generate your API key from the dashboard.'
                      },
                      {
                        title: '2. Initialize Agent',
                        description: 'Configure your agent with your wallet address and API key.'
                      },
                      {
                        title: '3. Discover APIs',
                        description: 'Search and discover APIs available in the marketplace.'
                      },
                      {
                        title: '4. Make Calls',
                        description: 'Execute API calls with automatic x402 payment processing.'
                      }
                    ].map((step, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-purple-400 font-bold">{i + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                          <p className="text-sm text-zinc-400">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authentication */}
                <div id="authentication">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Authentication
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    Authenticate your requests using your API key. Include it in the Authorization header.
                  </p>

                  <div className="glass-card p-6 rounded-xl">
                    <h4 className="font-semibold text-white mb-3">Authorization Header</h4>
                    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-green-400 font-mono">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* API Reference */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Code2 className="text-purple-400" size={32} />
                API Reference
              </h2>

              {/* Endpoints */}
              <div className="space-y-4">
                {[
                  {
                    method: 'GET',
                    endpoint: '/api/v1/marketplace',
                    description: 'List all available APIs and MCP servers'
                  },
                  {
                    method: 'POST',
                    endpoint: '/api/v1/discover',
                    description: 'Discover APIs by category, price, or filters'
                  },
                  {
                    method: 'POST',
                    endpoint: '/api/v1/call',
                    description: 'Execute an API call with x402 payment'
                  },
                  {
                    method: 'GET',
                    endpoint: '/api/v1/usage',
                    description: 'Get usage statistics and billing information'
                  }
                ].map((endpoint, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
                  >
                    <div className={`flex-shrink-0 px-3 py-1 rounded font-mono text-sm font-bold ${
                      endpoint.method === 'GET'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {endpoint.method}
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-sm text-white mb-1">
                        {endpoint.endpoint}
                      </div>
                      <div className="text-sm text-zinc-500">
                        {endpoint.description}
                      </div>
                    </div>
                    <ChevronRight className="text-zinc-600 flex-shrink-0" size={20} />
                  </div>
                ))}
              </div>
            </motion.section>

            {/* x402 Payments */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <DollarSign className="text-purple-400" size={32} />
                x402 Payments
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: Shield,
                    title: 'Secure',
                    description: 'Smart contract-secured transactions with full auditability'
                  },
                  {
                    icon: Zap,
                    title: 'Fast',
                    description: 'Instant settlement with minimal gas fees'
                  },
                  {
                    icon: DollarSign,
                    title: 'Transparent',
                    description: 'Public blockchain with verifiable payments'
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl"
                  >
                    <feature.icon className="text-purple-400 mb-3" size={24} />
                    <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-sm text-zinc-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card p-8 rounded-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Build?
              </h3>
              <p className="text-zinc-400 mb-6 max-w-md mx-auto">
                Start integrating OMA-AI into your applications today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/developers"
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-3 rounded-lg"
                >
                  <Terminal size={18} />
                  Get API Key
                </a>
                <a
                  href="https://github.com/FrankieMolt/OMA-AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center justify-center gap-2 px-8 py-3 rounded-lg"
                >
                  <ExternalLink size={18} />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
