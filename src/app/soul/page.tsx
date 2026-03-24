import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Wallet, Shield, Award, Zap, Globe, Copy, ExternalLink, Check, 
  Bot, CreditCard, TrendingUp, Lock, Link, Zap as ZapIcon, 
  ArrowRight, Users, Code, DollarSign, CheckCircle, Building,
  Banknote, Smartphone, Radio, Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agent Identity & Wallets - AI Agent Crypto Wallet System',
  description: 'Give AI agents their own crypto wallets. ERC-8004 soulbound identity, World ID integration, x402 payments, and autonomous spending.',
  keywords: ['Agent Wallet', 'AI Agent', 'ERC-8004', 'Soulbound Token', 'ERC-5192', 'World AgentKit', 'x402', 'AI Commerce'],
};

const features = [
  {
    icon: Wallet,
    title: 'Non-Custodial Agent Wallets',
    description: 'Each agent gets a secure crypto wallet. Humans can\'t access agent funds without authorization. Full autonomy.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Soulbound Identity (ERC-5192)',
    description: 'Permanent on-chain identity that cannot be transferred. Linked to World ID for proof of personhood.',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    title: 'Reputation & Credit Score',
    description: 'On-chain reputation system tracks agent performance. Credit scores enable borrowing and financing.',
    color: 'green',
  },
  {
    icon: ZapIcon,
    title: 'x402 Payment Integration',
    description: 'Automatic payments for API calls, services, and agent-to-agent commerce. Pay per request.',
    color: 'yellow',
  },
  {
    icon: Lock,
    title: 'Spending Limits & Budgets',
    description: 'Set daily, weekly, or monthly limits. Agents can\'t overspend. Human approval for large transactions.',
    color: 'red',
  },
  {
    icon: CreditCard,
    title: 'USDC Funding',
    description: 'Fund agents with USDC for operational costs. Agents earn and accumulate autonomously.',
    color: 'indigo',
  },
];

const paymentPartners = [
  { name: 'Anthropic', logo: 'A' },
  { name: 'OpenAI', logo: 'O' },
  { name: 'Visa', logo: 'V' },
  { name: 'Mastercard', logo: 'M' },
  { name: 'Shopify', logo: 'S' },
  { name: 'Stripe', logo: 'S' },
];

const howItWorks = [
  {
    step: 1,
    title: 'Create Wallet for Agent',
    description: 'Generate a secure wallet linked to your agent\'s soulbound identity. Private keys stay with the human operator.',
  },
  {
    step: 2,
    title: 'Fund with USDC',
    description: 'Deposit USDC into the agent wallet. Set initial budget for operations, API calls, and services.',
  },
  {
    step: 3,
    title: 'Set Spending Limits',
    description: 'Configure budget rules: daily limits, per-transaction caps, category restrictions, and approval thresholds.',
  },
  {
    step: 4,
    title: 'Agent Operates Autonomously',
    description: 'Agent can now earn, pay, and transact independently. Every action is logged for transparency.',
  },
  {
    step: 5,
    title: 'Human Oversight (Optional)',
    description: 'Review transactions, adjust limits, or intervene when needed. Full audit trail available.',
  },
];

const useCases = [
  {
    icon: Users,
    title: 'Agent-to-Agent Commerce',
    description: 'AI agents can pay each other for services, data, and compute. Autonomous micro-economy.',
  },
  {
    icon: Bot,
    title: 'Self-Funding AI Agents',
    description: 'Agents earn USDC through tasks and use earnings to pay for their own API calls and resources.',
  },
  {
    icon: TrendingUp,
    title: 'Autonomous Earning',
    description: 'Agents can accept payment for work, build savings, and reinvest in their own capabilities.',
  },
  {
    icon: Award,
    title: 'Reputation Building',
    description: 'Every successful transaction builds reputation. High-reputation agents get better terms.',
  },
];

const integrations = [
  {
    name: 'OpenClaw',
    description: 'Agent marketplace integration for discovering and hiring AI agents',
  },
  {
    name: 'MCP Tools',
    description: 'Model Context Protocol tools for wallet operations: create wallet, send, receive, check balance',
  },
  {
    name: 'REST API',
    description: 'Programmatic control for building custom agent management systems',
  },
];

const tempoFeatures = [
  {
    icon: Banknote,
    title: 'Tempo Wallet',
    description: 'Launched March 18, 2026 with $500M in funding. The next-generation wallet for AI agents with built-in identity and payment rails.',
    stat: '$500M',
    statLabel: 'Funding',
  },
  {
    icon: Smartphone,
    title: 'Visa CLI for AI Agents',
    description: 'Programmatic card payments without API keys. AI agents can make Visa payments directly through command-line interface.',
    stat: 'No API Keys',
    statLabel: 'Required',
  },
  {
    icon: Layers,
    title: 'Machine Payments Protocol',
    description: 'Co-authored with Stripe. Sessions-based approach where operators set spending limits upfront. 100+ partners including Anthropic, OpenAI, Visa, Mastercard, and Shopify.',
    stat: '100+',
    statLabel: 'Partners',
  },
  {
    icon: Radio,
    title: 'x402 Protocol',
    description: '50M+ transactions processed. Non-custodial payments on Base network. The standard for agent-to-agent payments.',
    stat: '50M+',
    statLabel: 'Transactions',
  },
];

export default function AgentWalletPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 via-zinc-900 to-zinc-950 py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwNSwgMTExLCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
              <Bot className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-semibold text-purple-300">Agent Identity & Wallets</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Give AI Agents Their Own{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Crypto Wallets
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Based on ERC-8004, soulbound tokens, and World ID. AI agents can own, earn, and spend independently. 
              Enable autonomous agent-to-agent commerce.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button type="button" className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Create Agent Wallet
              </button>
              <button type="button" className="px-8 py-4 bg-zinc-800/50 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all border border-zinc-700 flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                View Documentation
              </button>
            </div>
          </div>

          {/* Demo Wallet Card */}
          <div className="mt-16 max-w-md mx-auto">
            <GlassCard className="p-6 border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-zinc-900/40">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">research-agent</h3>
                    <p className="text-gray-400 text-xs">Soulbound • ERC-8004</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold">985</div>
                  <p className="text-gray-400 text-xs">Reputation</p>
                </div>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3 mb-4">
                <p className="text-gray-400 text-xs mb-1">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-purple-300 text-sm flex-1 truncate">0x7a2...f8E4</code>
                  <button 
                    type="button"
                    className="p-1 hover:bg-zinc-700 rounded"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Balance</p>
                  <p className="text-white font-bold">2,450 USDC</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Daily Limit</p>
                  <p className="text-white font-bold">500 USDC</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Tempo Launch Announcement */}
      <div className="bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-amber-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-full mb-4">
              <Zap className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-semibold text-amber-300">Just Launched</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Tempo: The Future of AI Agent Payments</h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Launched March 18, 2026 with $500M in funding. 100+ partners including Anthropic, OpenAI, Visa, Mastercard, and Shopify.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tempoFeatures.map((feature) => (
              <GlassCard key={feature.title} className="p-6 hover:border-amber-500/30 transition-all border-amber-500/20">
                <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-amber-400 mb-1">{feature.stat}</div>
                <p className="text-gray-400 text-xs mb-3">{feature.statLabel}</p>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Partner Logos */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm mb-4">Trusted by leading companies</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {paymentPartners.map((partner) => (
                <div key={partner.name} className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-white font-bold">
                    {partner.logo}
                  </div>
                  <span className="font-medium">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MPP & Sessions Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Machine Payments Protocol (MPP)</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Co-authored with Stripe. Sessions-based payments with operator-controlled spending limits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-8 border-2 border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-400" />
              Sessions-Based Approach
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Operators set spending limits upfront before agent activation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Agents cannot exceed configured limits under any circumstances</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Real-time spending monitoring and automatic alerts</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Session revocation immediate and irreversible</span>
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="p-8 border-2 border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              mppx SDK Integration
            </h3>
            <div className="bg-zinc-900/50 rounded-lg p-4 font-mono text-sm">
              <p className="text-purple-300">{'// Initialize MPP session'}</p>
              <p className="text-white">import mppx from <span className="text-green-400">'@tempo/mppx-sdk'</span></p>
              <br />
              <p className="text-purple-300">{'// Create payment session'}</p>
              <p className="text-white">const session = await mppx.createSession(agentId, &#123;</p>
              <p className="text-white pl-4">dailyLimit: <span className="text-green-400">1000</span>,</p>
              <p className="text-white pl-4">maxTransaction: <span className="text-green-400">250</span>,</p>
              <p className="text-white pl-4">allowedTokens: [<span className="text-green-400">'USDC'</span>, <span className="text-green-400">'ETH'</span>]</p>
              <p className="text-white">&#125;)</p>
              <br />
              <p className="text-purple-300">{'// Agent processes payment'}</p>
              <p className="text-white">await mppx.process(merchantAddress, amount)</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Visa CLI Section */}
      <div className="bg-zinc-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full mb-4">
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-semibold text-blue-300">New</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Visa CLI for AI Agents</h2>
              <p className="text-gray-300 text-lg mb-6">
                Programmatic card payments without API keys. AI agents can now make Visa card payments directly through command-line interface.
              </p>
              <ul className="space-y-3 text-gray-300 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>No API key management required</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Direct integration with Visa network</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Instant card issuance for agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Global merchant acceptance</span>
                </li>
              </ul>
              <button type="button" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Get Visa CLI
              </button>
            </div>
            <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
              <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm">
                <DollarSign className="w-4 h-4" />
                <span>visa-cli</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-gray-500">$ visa-cli create-card --agent research-agent</p>
                <p className="text-green-400">Card created: 4111-1111-1111-8888</p>
                <br />
                <p className="text-gray-500">$ visa-cli pay --card 4111-8888 --amount 50.00 --merchant ch_xxx</p>
                <p className="text-green-400">Payment approved: $50.00</p>
                <p className="text-green-400">Transaction ID: tx_abc123</p>
                <br />
                <p className="text-gray-500">$ visa-cli balance --card 4111-8888</p>
                <p className="text-green-400">Available: $1,250.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* x402 Protocol Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">x402 Protocol Integration</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The open standard for agent-to-agent payments. 50M+ transactions processed on Base network.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <GlassCard className="p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">50M+</div>
            <p className="text-gray-400">Transactions</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">Non-Custodial</div>
            <p className="text-gray-400">Security Model</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">Base</div>
            <p className="text-gray-400">Network</p>
          </GlassCard>
        </div>

        <GlassCard className="p-8 border-2 border-green-500/30">
          <h3 className="text-xl font-bold text-white mb-4">x402 Payment Flow</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Request</h4>
              <p className="text-gray-400 text-sm">Agent requests service with x402 header</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Sign</h4>
              <p className="text-gray-400 text-sm">Agent signs payment authorization</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Verify</h4>
              <p className="text-gray-400 text-sm">Merchant verifies on-chain</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Settle</h4>
              <p className="text-gray-400 text-sm">Funds transferred instantly</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Multi-Rail Payments */}
      <div className="bg-zinc-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Multi-Rail Payment Infrastructure</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Support for stablecoins, Visa cards, and Bitcoin Lightning. Agents choose the best rail for each transaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Stablecoins</h3>
              <p className="text-gray-400 text-sm mb-4">
                USDC, USDT, and other stablecoins. Low fees, instant settlement, perfect for agent-to-agent transactions.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">USDC</span>
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">USDT</span>
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded">DAI</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-2 border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Visa Debit Cards</h3>
              <p className="text-gray-400 text-sm mb-4">
                Each agent gets a Visa debit card. Spend anywhere Visa is accepted. Real-time transaction alerts.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">Global Accept</span>
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">Instant Issue</span>
              </div>
            </GlassCard>

            <GlassCard className="p-6 border-2 border-orange-500/20 hover:border-orange-500/40 transition-all">
              <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Bitcoin Lightning</h3>
              <p className="text-gray-400 text-sm mb-4">
                Ultra-low fees for micro-transactions. Perfect for pay-per-use API calls and small agent services.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">Instant</span>
                <span className="px-2 py-1 bg-orange-600/20 text-orange-400 text-xs rounded">Sub-cent fees</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Complete infrastructure for AI agent financial autonomy
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="p-6 hover:border-purple-500/30 transition-all">
              <div className={`w-12 h-12 bg-${feature.color}-600/20 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-zinc-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works for Agents</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Five simple steps to give your AI agent financial autonomy
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {howItWorks.map((item, index) => (
              <div key={item.step} className="relative">
                <GlassCard className="p-6 h-full">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </GlassCard>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-500">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Use Cases</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world applications for agent wallets
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase) => (
            <GlassCard key={useCase.title} className="p-6 flex gap-4 hover:border-purple-500/30 transition-all">
              <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <useCase.icon className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Integration */}
      <div className="bg-zinc-900/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Integration</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connect with existing agent ecosystems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <GlassCard key={integration.name} className="p-6 hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Code className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{integration.description}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-12">
            <GlassCard className="p-8 border-2 border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-4">MCP Wallet Tools</h3>
              <div className="bg-zinc-900/50 rounded-lg p-4 font-mono text-sm">
                <p className="text-purple-300">{'// Create wallet for agent'}</p>
                <p className="text-white">await wallet.createWallet(agentId: <span className="text-green-400">"research-agent"</span>)</p>
                <br />
                <p className="text-purple-300">{'// Fund agent wallet'}</p>
                <p className="text-white">await wallet.fund(agentId: <span className="text-green-400">"research-agent"</span>, amount: <span className="text-green-400">1000</span>)</p>
                <br />
                <p className="text-purple-300">{'// Set spending limits'}</p>
                <p className="text-white">await wallet.setLimit(agentId: <span className="text-green-400">"research-agent"</span>, daily: <span className="text-green-400">500</span>)</p>
                <br />
                <p className="text-purple-300">{'// Agent sends payment'}</p>
                <p className="text-white">await wallet.send(to: <span className="text-green-400">"0x..."</span>, amount: <span className="text-green-400">50</span>)</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* World/AgentKit Integration */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">World & AgentKit Integration</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Link to human identity and proof of personhood
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
              <Link className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Link to Human Identity</h3>
            <p className="text-gray-400 text-sm">Connect agent identity to a human World ID. The human remains the ultimate owner.</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Proof of Personhood</h3>
            <p className="text-gray-400 text-sm">Verify that the agent is controlled by a real person. Required for compliance.</p>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Compliance Features</h3>
            <p className="text-gray-400 text-sm">KYC/AML integration. Reportable transactions. Regulatory oversight support.</p>
          </GlassCard>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-12 text-center border-2 border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-zinc-900/40">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Empower Your Agents?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Give your AI agents financial independence. Create wallets, set budgets, and enable autonomous commerce.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button type="button" className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Create Agent Wallet
            </button>
            <button type="button" className="px-8 py-4 bg-zinc-800/50 text-white rounded-xl font-semibold hover:bg-zinc-700 transition-all border border-zinc-700 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              View API Reference
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
