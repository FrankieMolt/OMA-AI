'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  BookOpen,
  Wallet,
  Code,
  Shield,
  Zap,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Copy,
  Check,
  Terminal,
  FileText,
  Link2,
  Lock,
  Award,
  Database,
  Sparkles,
  Package,
  Play,
  AlertTriangle,
  Info,
  Lightbulb
} from 'lucide-react';

// --- Types ---
interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  subsections: DocSubsection[];
}

interface DocSubsection {
  id: string;
  title: string;
  content: string;
  code?: string;
  externalLink?: string;
  externalLinkText?: string;
  note?: string;
  warning?: string;
  tip?: string;
}

// --- Documentation Content ---
const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    description: 'Quick start guide to begin using OMA-AI',
    subsections: [
      {
        id: 'introduction',
        title: 'Introduction to OMA-AI',
        content: 'OMA-AI is a decentralized API marketplace for autonomous AI agents. It enables agents to discover, access, and pay for APIs and MCP servers using x402 crypto payments on the Base network. Our platform eliminates the need for traditional API keys and credit cards, allowing seamless, autonomous agent commerce.',
        note: 'OMA-AI supports both traditional APIs and Model Context Protocol (MCP) servers.',
      },
      {
        id: 'quick-start',
        title: 'Quick Start',
        content: 'Get up and running with OMA-AI in minutes:',
        code: `# 1. Install the OMA-AI SDK
npm install @oma-ai/sdk

# 2. Initialize your agent
import { OMAAgent } from '@oma-ai/sdk';

const agent = new OMAAgent({
  walletAddress: '0x...',
  network: 'base'
});

# 3. Discover and call APIs
const api = await agent.discoverAPI('gpt-4-turbo');
const result = await api.call({
  messages: [{ role: 'user', content: 'Hello, world!' }]
});`,
      },
      {
        id: 'account-setup',
        title: 'Account Setup',
        content: 'To start using OMA-AI, you need to:',
        note: 'You need a crypto wallet compatible with Base network (e.g., MetaMask, Coinbase Wallet)',
      },
      {
        id: 'api-key',
        title: 'Getting Your API Key',
        content: 'After setting up your wallet, generate an API key from your dashboard:',
        warning: 'Keep your API key secret. Never commit it to version control or share it publicly.',
      },
    ],
  },
  {
    id: 'x402-payments',
    title: 'x402 Payments',
    icon: Wallet,
    description: 'Integrate x402 crypto payments for API access',
    subsections: [
      {
        id: 'overview',
        title: 'Payment Overview',
        content: 'x402 is a payment protocol built on Base that enables autonomous agents to pay for API usage without human intervention. It uses smart contracts for trustless transactions and automatic billing.',
      },
      {
        id: 'wallet-adapter',
        title: 'Wallet Adapter Setup',
        content: 'Configure your agent\'s wallet to make x402 payments:',
        code: `import { X402WalletAdapter } from '@oma-ai/sdk';

const wallet = new X402WalletAdapter({
  privateKey: process.env.WALLET_PRIVATE_KEY,
  network: 'base',
  gasLimit: 100000
});

// Auto-topup when balance is low
wallet.setAutoTopup({
  threshold: 0.1,
  amount: 1.0,
  paymentMethod: 'usdc'
});`,
        tip: 'Use environment variables for private keys. Never hardcode credentials in your application.',
      },
      {
        id: 'paywall-integration',
        title: 'Paywall Integration',
        content: 'Add x402 paywalls to your APIs:',
        code: `import { X402Paywall } from '@oma-ai/sdk';

const paywall = new X402Paywall({
  pricePerCall: 0.01, // in USDC
  currency: 'usdc',
  network: 'base',
  recipientAddress: '0x...'
});

// Protect your API endpoint
app.post('/api/v1/endpoint', async (req, res) => {
  const { paymentProof } = req.body;
  
  const isValid = await paywall.verifyPayment(paymentProof);
  if (!isValid) {
    return res.status(402).json({ error: 'Payment required' });
  }
  
  // Process the API call
  const result = await processRequest(req.body);
  res.json(result);
});`,
      },
      {
        id: 'payment-verification',
        title: 'Payment Verification',
        content: 'Verify x402 payments on the server side:',
        code: `const paymentVerification = async (paymentProof: string) => {
  const isValid = await X402.verify(paymentProof, {
    network: 'base',
    amount: 0.01,
    recipient: '0x...'
  });
  
  return isValid;
};`,
      },
      {
        id: 'billing',
        title: 'Billing & Invoicing',
        content: 'Track your API usage and costs through the dashboard. x402 payments are automatically deducted from your wallet balance as you use APIs. You can set spending limits and receive alerts when approaching thresholds.',
        externalLink: 'https://docs.base.org/guides/payments',
        externalLinkText: 'Learn more about Base network payments',
      },
    ],
  },
  {
    id: 'mcp-integration',
    title: 'MCP Integration',
    icon: Database,
    description: 'Connect Model Context Protocol servers to your agents',
    subsections: [
      {
        id: 'what-is-mcp',
        title: 'What is MCP?',
        content: 'Model Context Protocol (MCP) is an open standard that enables AI models to securely connect to external data sources and tools. OMA-AI hosts a marketplace of MCP servers that agents can discover and use.',
        externalLink: 'https://modelcontextprotocol.io',
        externalLinkText: 'Official MCP documentation',
      },
      {
        id: 'connecting-mcp',
        title: 'Connecting MCP Servers',
        content: 'Connect your agent to MCP servers:',
        code: `import { MCPServer } from '@oma-ai/sdk';

// Discover available MCP servers
const servers = await agent.listMCPServers();

// Connect to a specific server
const githubMCP = new MCPServer({
  name: 'github',
  endpoint: 'https://api.oma-ai.com/mcp/github',
  authToken: process.env.GITHUB_TOKEN
});

// Use MCP tools
const issues = await githubMCP.call('list_issues', {
  owner: 'openai',
  repo: 'openai-node'
});`,
      },
      {
        id: 'popular-mcps',
        title: 'Popular MCP Servers',
        content: 'Some of the most used MCP servers on OMA-AI:',
        note: 'All MCP servers are verified and monitored for uptime and performance.',
      },
      {
        id: 'building-mcp',
        title: 'Building Your Own MCP Server',
        content: 'Create and deploy custom MCP servers:',
        code: `// mcp-server.ts
import { MCPServer } from '@oma-ai/sdk';

export const myMCPServer = new MCPServer({
  name: 'custom-tool',
  version: '1.0.0',
  tools: [
    {
      name: 'analyze_data',
      description: 'Analyze data using custom logic',
      parameters: {
        type: 'object',
        properties: {
          data: { type: 'string' }
        }
      }
    }
  ]
});

// Deploy to OMA-AI
await myMCPServer.deploy({
  pricing: { perCall: 0.005 },
  network: 'base'
});`,
        tip: 'MCP servers can be monetized through x402 payments. Set your own pricing model.',
      },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code,
    description: 'Complete API documentation and endpoints',
    subsections: [
      {
        id: 'sdk-methods',
        title: 'SDK Methods',
        content: 'Core SDK methods available in @oma-ai/sdk:',
        code: `// Agent initialization
const agent = new OMAAgent({ walletAddress, network });

// API discovery
const apis = await agent.listAPIs({ category, tags });
const api = await agent.getAPI(id);

// API calls
const result = await api.call({ params, options });

// Payment management
const balance = await agent.getBalance();
await agent.topup({ amount, currency });

// MCP operations
const mcps = await agent.listMCPServers();
const mcp = await agent.connectMCP(id);

// Usage tracking
const usage = await agent.getUsage({ period });`,
      },
      {
        id: 'rest-endpoints',
        title: 'REST API Endpoints',
        content: 'Direct HTTP endpoints for integration:',
        code: `# List all APIs
GET /api/v1/apis
Query: ?category={category}&tags={tags}

# Get API details
GET /api/v1/apis/{id}

# Call an API (with x402 payment)
POST /api/v1/apis/{id}/call
Headers: {
  "Authorization": "Bearer {api_key}",
  "X-Payment-Proof": "{x402_proof}"
}

# MCP servers
GET /api/v1/mcp/servers
POST /api/v1/mcp/{id}/call

# Payment verification
POST /api/v1/payments/verify
Body: { paymentProof, amount, recipient }

# Usage statistics
GET /api/v1/usage
Headers: { "Authorization": "Bearer {api_key}" }`,
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        content: 'Receive real-time notifications about events:',
        code: `// Register a webhook
await agent.createWebhook({
  url: 'https://your-app.com/webhooks/oma',
  events: ['payment.success', 'payment.failed', 'api.call']
});

// Webhook payload example
{
  "event": "payment.success",
  "timestamp": "2026-02-06T10:30:00Z",
  "data": {
    "amount": "0.01",
    "currency": "usdc",
    "apiId": "gpt-4-turbo",
    "transactionHash": "0x..."
  }
}`,
      },
      {
        id: 'error-codes',
        title: 'Error Codes',
        content: 'Common error codes and their meanings:',
        warning: 'Always implement proper error handling in your application.',
      },
    ],
  },
  {
    id: 'bounties-tasks',
    title: 'Bounties & Tasks',
    icon: Award,
    description: 'Participate in bounties and earn rewards',
    subsections: [
      {
        id: 'overview',
        title: 'Bounties Overview',
        content: 'OMA-AI offers bounties for developers who build and contribute to the ecosystem. Bounties include API integrations, MCP server development, bug fixes, and feature implementations.',
        externalLink: '/tasks',
        externalLinkText: 'View active bounties',
      },
      {
        id: 'submitting',
        title: 'Submitting Bounties',
        content: 'Submit your work for bounty rewards:',
        code: `// Submit a bounty claim
import { BountyClient } from '@oma-ai/sdk';

const bounty = await BountyClient.claim({
  bountyId: 'integrate-stripe-api',
  repositoryUrl: 'https://github.com/username/repo',
  description: 'Implemented Stripe API integration',
  screenshots: ['path/to/screenshot.png']
});

// Track submission status
const status = await bounty.getStatus();`,
      },
      {
        id: 'payment',
        title: 'Bounty Payments',
        content: 'Bounty rewards are paid in USDC on the Base network via x402. Payments are automatically transferred once your submission is approved by the OMA-AI team.',
        tip: 'Ensure your wallet address is correctly configured in your profile before submitting bounties.',
      },
      {
        id: 'guidelines',
        title: 'Submission Guidelines',
        content: 'Follow these guidelines for successful bounty submissions:\n- Write clear, documented code\n- Include tests where applicable\n- Provide screenshots or demos\n- Follow the project\'s code style\n- Ensure your code is production-ready',
        warning: 'Plagiarized or low-quality submissions will be rejected.',
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    description: 'Security best practices and guidelines',
    subsections: [
      {
        id: 'overview',
        title: 'Security Overview',
        content: 'OMA-AI is built with security as a top priority. We use smart contracts for trustless payments, end-to-end encryption for sensitive data, and regular security audits.',
      },
      {
        id: 'api-keys',
        title: 'API Key Security',
        content: 'Protect your API keys:',
        code: `# Use environment variables
OMA_AI_API_KEY=your_api_key_here
WALLET_PRIVATE_KEY=your_private_key_here

# Rotate keys regularly
# Use different keys for development and production
# Set key permissions and scopes
# Monitor usage for suspicious activity`,
        warning: 'Never expose API keys in client-side code or public repositories.',
      },
      {
        id: 'wallet-security',
        title: 'Wallet Security',
        content: 'Best practices for wallet security:\n- Use hardware wallets for production\n- Never share private keys\n- Enable 2FA where available\n- Keep small amounts for daily operations\n- Use separate wallets for different environments',
        note: 'OMA-AI never stores your private keys. All transactions are signed locally.',
      },
      {
        id: 'smart-contracts',
        title: 'Smart Contract Security',
        content: 'Our smart contracts are audited by leading security firms. Key security features include:\n- Reentrancy protection\n- Overflow/underflow checks\n- Access control mechanisms\n- Emergency pause functions\n- Time-locked admin changes',
        externalLink: 'https://github.com/FrankieMolt/OMA-AI/blob/main/contracts',
        externalLinkText: 'View smart contracts on GitHub',
      },
      {
        id: 'reporting',
        title: 'Reporting Vulnerabilities',
        content: 'Found a security vulnerability? Please report it responsibly:',
        code: `// Send security reports to
security@oma-ai.com

// Include in your report:
// - Description of the vulnerability
// - Steps to reproduce
// - Potential impact
// - Suggested fix (if known)

// Bounty rewards available for valid reports`,
        note: 'We follow responsible disclosure and will work with you to address the issue.',
      },
    ],
  },
];

// --- Main Component ---
export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filteredSections, setFilteredSections] = useState(docSections);

  // Filter documentation based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSections(docSections);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = docSections.map(section => ({
      ...section,
      subsections: section.subsections.filter(sub =>
        sub.title.toLowerCase().includes(query) ||
        sub.content.toLowerCase().includes(query) ||
        (sub.code && sub.code.toLowerCase().includes(query))
      )
    })).filter(section => section.subsections.length > 0);

    setFilteredSections(filtered);
  }, [searchQuery]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold gradient-text cursor-pointer">
            OMA-AI
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-zinc-400 hover:text-white transition-colors">
              Home
            </a>
            <a href="/tasks" className="text-zinc-400 hover:text-white transition-colors">
              Bounties
            </a>
            <a href="/docs" className="text-white font-medium flex items-center gap-2">
              <BookOpen size={16} />
              Docs
            </a>
            <a href="/about" className="text-zinc-400 hover:text-white transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-primary px-4 py-2 rounded-lg text-sm">
              Get API Key
            </button>
            <button
              className="md:hidden p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-zinc-800">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-zinc-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="/tasks" className="text-zinc-400 hover:text-white transition-colors">
                Bounties
              </a>
              <a href="/docs" className="text-white font-medium">
                Docs
              </a>
              <a href="/about" className="text-zinc-400 hover:text-white transition-colors">
                About
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Search Bar */}
      <section className="py-8 px-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-zinc-500 mt-2">
              Found {filteredSections.reduce((acc, s) => acc + s.subsections.length, 0)} results
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0">
          <nav className="sticky top-24 space-y-1">
            {docSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    isActive
                      ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile Section Selector */}
        <div className="lg:hidden w-full mb-6">
          <select
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {docSections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {filteredSections.map((section) => {
            if (activeSection !== section.id) return null;
            
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30">
                      <Icon className="text-purple-400" size={28} />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold">{section.title}</h1>
                      <p className="text-zinc-400">{section.description}</p>
                    </div>
                  </div>
                </div>

                {/* Subsections */}
                <div className="space-y-8">
                  {section.subsections.map((subsection) => (
                    <div
                      key={subsection.id}
                      className="glass-card p-6 rounded-xl"
                    >
                      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Link2 size={18} className="text-purple-400" />
                        {subsection.title}
                      </h2>

                      {/* Content */}
                      <div className="prose prose-invert max-w-none">
                        {subsection.content.split('\n').map((paragraph, idx) => (
                          <p key={idx} className="text-zinc-300 leading-relaxed mb-3">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Code Block */}
                      {subsection.code && (
                        <div className="mt-4 relative group">
                          <div className="absolute top-3 right-3 flex items-center gap-2">
                            <Terminal size={14} className="text-zinc-500" />
                            <button
                              onClick={() => handleCopyCode(subsection.code!, subsection.id)}
                              className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
                            >
                              {copiedCode === subsection.id ? (
                                <Check size={14} className="text-green-500" />
                              ) : (
                                <Copy size={14} className="text-zinc-400" />
                              )}
                            </button>
                          </div>
                          <pre className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 overflow-x-auto">
                            <code className="text-sm text-zinc-300 font-mono">
                              {subsection.code}
                            </code>
                          </pre>
                        </div>
                      )}

                      {/* Note */}
                      {subsection.note && (
                        <div className="mt-4 p-4 rounded-lg bg-blue-900/20 border border-blue-500/30 flex items-start gap-3">
                          <Info size={18} className="text-blue-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-blue-300">{subsection.note}</p>
                        </div>
                      )}

                      {/* Warning */}
                      {subsection.warning && (
                        <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-500/30 flex items-start gap-3">
                          <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-300">{subsection.warning}</p>
                        </div>
                      )}

                      {/* Tip */}
                      {subsection.tip && (
                        <div className="mt-4 p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30 flex items-start gap-3">
                          <Lightbulb size={18} className="text-yellow-400 shrink-0 mt-0.5" />
                          <p className="text-sm text-yellow-300">{subsection.tip}</p>
                        </div>
                      )}

                      {/* External Link */}
                      {subsection.externalLink && (
                        <div className="mt-4">
                          <a
                            href={subsection.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {subsection.externalLinkText || 'Learn more'}
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="text-center py-20">
              <Search className="text-zinc-700 mx-auto mb-4" size={48} />
              <p className="text-zinc-500 text-lg">No documentation found matching "{searchQuery}"</p>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Documentation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#getting-started" className="text-zinc-400 hover:text-white transition-colors">
                    Getting Started
                  </a>
                </li>
                <li>
                  <a href="#x402-payments" className="text-zinc-400 hover:text-white transition-colors">
                    x402 Payments
                  </a>
                </li>
                <li>
                  <a href="#mcp-integration" className="text-zinc-400 hover:text-white transition-colors">
                    MCP Integration
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/tasks" className="text-zinc-400 hover:text-white transition-colors">
                    Bounties
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-zinc-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="https://github.com/FrankieMolt/OMA-AI" className="text-zinc-400 hover:text-white transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">External Docs</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://modelcontextprotocol.io" className="text-zinc-400 hover:text-white transition-colors">
                    MCP Documentation
                  </a>
                </li>
                <li>
                  <a href="https://docs.base.org" className="text-zinc-400 hover:text-white transition-colors">
                    Base Network
                  </a>
                </li>
                <li>
                  <a href="https://docs.soliditylang.org" className="text-zinc-400 hover:text-white transition-colors">
                    Solidity Docs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 gradient-text">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/FrankieMolt/OMA-AI/issues" className="text-zinc-400 hover:text-white transition-colors">
                    Report Issue
                  </a>
                </li>
                <li>
                  <a href="mailto:support@oma-ai.com" className="text-zinc-400 hover:text-white transition-colors">
                    Email Support
                  </a>
                </li>
                <li>
                  <a href="mailto:security@oma-ai.com" className="text-zinc-400 hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              OMA-AI - API Marketplace for Agents & MCPs
            </p>
            <p className="text-zinc-600 text-xs mt-2">
              © 2026 OMA-AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
