import { Metadata } from 'next';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import { Zap, Shield, Code, DollarSign, Globe, BarChart3, Lock, Database, GitBranch, FileText, Search, Filter, Share2, Sparkles, Users, Rocket, CheckCircle2, TrendingUp, RefreshCw, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features | OMA-AI - Premier MCP Marketplace',
  description: 'Discover all features of OMA-AI. MCP marketplace, x402 gasless payments, multi-chain support, developer tools, and more.',
  keywords: ['OMA-AI', 'Features', 'MCP marketplace', 'x402 payments', 'AI agents'],
};

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'x402 Gasless Payments',
      description: 'Pay per API call without gas fees. Our x402 protocol on Base enables micro-transactions using ERC-3009. Sign once, execute instantly.',
      benefits: ['Zero gas fees for users', 'Instant transactions', 'Multi-chain support', 'Automatic payouts'],
      color: 'purple',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: '5% Platform Fee',
      description: 'Lowest in the industry. Keep 95% of your MCP revenue while we provide infrastructure, security, and support.',
      benefits: ['Industry-leading low fee', 'Monthly payouts', '$10 minimum threshold', 'Transparent reporting'],
      color: 'green',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Verified MCPs',
      description: 'All MCPs are manually reviewed and tested. No fake or placeholder tools. Only production-ready, deployable MCPs.',
      benefits: ['Manual review', 'Security testing', 'Performance benchmarking', 'Trust indicators'],
      color: 'blue',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Chain Support',
      description: 'Support for Base and Solana networks. Connect your preferred wallet and receive payouts in USDC.',
      benefits: ['Base network (x402)', 'Solana network', 'USDC payouts', 'Flexible wallet options'],
      color: 'amber',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Analytics',
      description: 'Track your MCP performance with detailed analytics. Calls, revenue, success rates, and user feedback - all in real-time.',
      benefits: ['Call tracking', 'Revenue dashboard', 'Success rate metrics', 'User insights'],
      color: 'indigo',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Official MCPs',
      description: 'Access official MCP tools out of the box. Filesystem, Fetch, Git, Memory, Database, and more - ready to integrate.',
      benefits: ['No setup required', 'Type-safe APIs', 'Documented', 'Well-tested'],
      color: 'slate',
    },
  ];

  const developerTools = [
    {
      icon: <Rocket className="w-5 h-5" />,
      title: '4-Step Publish Wizard',
      description: 'Get your MCP live in minutes. Configure info, endpoints, tools, and pricing with our intuitive wizard.',
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'MCP Management',
      description: 'Update descriptions, tools, pricing, and visibility. Manage everything from your dashboard.',
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: 'Advanced Search',
      description: 'Filter by category, verification status, price range. Sort by rating, calls, or newest.',
    },
    {
      icon: <Filter className="w-5 h-5" />,
      title: 'Smart Filters',
      description: 'Quickly find the perfect MCP with real-time search and intelligent category filtering.',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Performance Metrics',
      description: 'Track calls, revenue, and success rates. Export data for analysis.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'User Feedback',
      description: 'Collect ratings and reviews from users. Improve your MCP based on real feedback.',
    },
  ];

  const securityFeatures = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: 'Row Level Security',
      description: 'Database-level security ensures users only access their own data. Automatic access control.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Verified MCPs',
      description: 'All MCPs manually reviewed for security. No malicious or untrusted tools.',
    },
    {
      icon: <ExternalLink className="w-5 h-5" />,
      title: 'Secure APIs',
      description: 'Rate limiting, input validation, and error handling. Production-grade security.',
    },
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: 'Regular Audits',
      description: 'Periodic security audits and penetration testing. Continuous improvement.',
    },
  ];

  const integrations = [
    {
      name: 'Filesystem MCP',
      description: 'Read, write, and manage files on agent\'s behalf. Secure, scoped access.',
      tools: ['readFile', 'writeFile', 'listFiles', 'deleteFile'],
    },
    {
      name: 'Fetch MCP',
      description: 'Make HTTP requests to any URL. REST APIs, webhooks, and more.',
      tools: ['httpRequest', 'httpGet', 'httpPost', 'httpPut'],
    },
    {
      name: 'Git MCP',
      description: 'Interact with GitHub repositories. Clone, commit, and manage code.',
      tools: ['gitClone', 'gitCommit', 'gitPush', 'gitPull'],
    },
    {
      name: 'Memory MCP',
      description: 'Store and retrieve context across sessions. Persistent knowledge base.',
      tools: ['storeMemory', 'retrieveMemory', 'searchMemory', 'updateMemory'],
    },
    {
      name: 'Database MCP',
      description: 'Execute SQL queries against PostgreSQL databases. Full CRUD operations.',
      tools: ['query', 'insert', 'update', 'delete'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">All Features</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Everything You Need
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powerful features for both developers and users. Build, monetize, and integrate MCPs with ease.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Core Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className={`p-6 hover ${feature.color === 'purple' ? 'border-purple-700/50' : feature.color === 'green' ? 'border-green-700/50' : feature.color === 'blue' ? 'border-blue-700/50' : feature.color === 'amber' ? 'border-amber-700/50' : feature.color === 'indigo' ? 'border-indigo-700/50' : 'border-slate-700/50'}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                    feature.color === 'purple' ? 'bg-purple-600/20 text-purple-300' :
                    feature.color === 'green' ? 'bg-green-600/20 text-green-300' :
                    feature.color === 'blue' ? 'bg-blue-600/20 text-blue-300' :
                    feature.color === 'amber' ? 'bg-amber-600/20 text-amber-300' :
                    feature.color === 'indigo' ? 'bg-indigo-600/20 text-indigo-300' :
                    'bg-slate-600/20 text-slate-300'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-gray-400 text-sm">
                      <CheckCircle2 size={16} className="flex-shrink-0 text-green-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Developer Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Developer Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerTools.map((tool, index) => (
              <GlassCard key={index} className="p-6 hover">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-300">
                    {tool.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {tool.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Security & Trust</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <GlassCard key={index} className="p-6 hover">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center text-green-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Official MCPs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Official MCPs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <GlassCard key={index} className="p-6 hover">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-300">
                    <Code className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {integration.name}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {integration.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {integration.tools.map((tool) => (
                    <span key={tool} className="px-3 py-1 bg-slate-700/50 text-gray-300 text-sm rounded-full border border-slate-600">
                      {tool}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <GlassCard className="p-6 text-center hover">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">57+</div>
              <div className="text-gray-400">Pages</div>
            </GlassCard>
            <GlassCard className="p-6 text-center hover">
              <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">229</div>
              <div className="text-gray-400">MCP Tools</div>
            </GlassCard>
            <GlassCard className="p-6 text-center hover">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">13</div>
              <div className="text-gray-400">Blog Posts</div>
            </GlassCard>
            <GlassCard className="p-6 text-center hover">
              <Shield className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">95/100</div>
              <div className="text-gray-400">Health Score</div>
            </GlassCard>
          </div>
        </div>

        {/* CTA */}
        <GlassCardPurple className="max-w-4xl mx-auto p-12 text-center">
          <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore all features, browse hundreds of MCPs, or start building your own tools today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/mcps"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >
              <Search size={20} />
              Browse MCPs
            </a>
            <a
              href="/publish"
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors"
            >
              <Code size={20} />
              Publish Your MCP
            </a>
          </div>
        </GlassCardPurple>
      </div>
    </div>
  );
}
