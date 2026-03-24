import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Search, 
  Cog, 
  Brain, 
  Database, 
  Zap, 
  Globe, 
  Lock, 
  Code, 
  FileText, 
  TrendingUp,
  DollarSign,
  Webhook,
  MessageSquare,
  Server,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const categories = [
  { name: 'Development', icon: Code, count: 2450, color: 'text-blue-400' },
  { name: 'Finance', icon: DollarSign, count: 890, color: 'text-green-400' },
  { name: 'Testing', icon: Cog, count: 720, color: 'text-orange-400' },
  { name: 'Data', icon: Database, count: 650, color: 'text-purple-400' },
  { name: 'Communication', icon: MessageSquare, count: 580, color: 'text-pink-400' },
  { name: 'Automation', icon: Zap, count: 420, color: 'text-yellow-400' },
  { name: 'Research', icon: TrendingUp, count: 380, color: 'text-cyan-400' },
  { name: 'Security', icon: Lock, count: 320, color: 'text-red-400' },
];

const featuredSkills = {
  Development: [
    { name: 'Code Reviewer', description: 'Automated code reviews and architectural analysis', author: 'Anthropic', installs: '45.2K', rating: 4.8, icon: '🔍' },
    { name: 'FastAPI Production Suite', description: 'Build high-performance Python APIs with FastAPI', author: 'Community', installs: '22.8K', rating: 4.7, icon: '🐍' },
    { name: 'Git Operations', description: 'Automated git workflows and PR management', author: 'Anthropic', installs: '18.5K', rating: 4.9, icon: '📦' },
  ],
  Finance: [
    { name: 'Crypto Research', description: 'Due diligence on any cryptocurrency via CoinMarketCap', author: 'CoinMarketCap', installs: '12.5K', rating: 4.9, icon: '📊' },
    { name: 'Trading Strategy', description: 'Automated trading signals and portfolio analysis', author: 'Community', installs: '8.2K', rating: 4.6, icon: '📈' },
    { name: 'DeFi Analyzer', description: 'Analyze DeFi protocols and yield farming', author: 'Anthropic', installs: '6.7K', rating: 4.7, icon: '💎' },
  ],
  Data: [
    { name: 'Web Scraper', description: 'Extract structured data from any website', author: 'Community', installs: '15.3K', rating: 4.5, icon: '🕸️' },
    { name: 'Data Pipeline', description: 'Build ETL pipelines for data processing', author: 'Anthropic', installs: '11.8K', rating: 4.8, icon: '🔄' },
    { name: 'SQL Expert', description: 'Query optimization and database design', author: 'Community', installs: '9.4K', rating: 4.7, icon: '🗄️' },
  ],
  Communication: [
    { name: 'Email Automation', description: 'Send personalized emails at scale', author: 'Anthropic', installs: '14.2K', rating: 4.6, icon: '✉️' },
    { name: 'Slack Integration', description: 'Automate Slack workflows and notifications', author: 'Community', installs: '10.8K', rating: 4.8, icon: '💬' },
    { name: 'Discord Bot', description: 'Build and manage Discord community bots', author: 'Community', installs: '8.9K', rating: 4.5, icon: '🎮' },
  ],
  Automation: [
    { name: 'n8n Integration', description: 'Connect AI agents to n8n workflows', author: 'Community', installs: '13.5K', rating: 4.9, icon: '🔗' },
    { name: 'Webhook Handler', description: 'Process and respond to webhooks', author: 'Anthropic', installs: '9.1K', rating: 4.7, icon: '🪝' },
    { name: 'Zapier Connector', description: 'Connect to 5000+ apps via Zapier', author: 'Community', installs: '7.6K', rating: 4.6, icon: '⚡' },
  ],
  Research: [
    { name: 'Web Search Pro', description: 'Advanced web research with source citation', author: 'Anthropic', installs: '28.4K', rating: 4.9, icon: '🔎' },
    { name: 'Content Analyzer', description: 'Analyze content for insights and trends', author: 'Community', installs: '12.3K', rating: 4.7, icon: '📑' },
    { name: 'Competitor Analysis', description: 'Track and analyze competitor data', author: 'Anthropic', installs: '8.7K', rating: 4.8, icon: '🎯' },
  ],
};

const hostingPlans = [
  {
    name: 'Starter',
    price: 0,
    description: 'Perfect for individuals getting started',
    features: ['1 agent', '5 skills', '100 messages/month', 'Community support'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    description: 'For developers building production agents',
    features: ['5 agents', 'Unlimited skills', '10K messages/month', 'Email support', 'MCP integrations', 'Telegram/Discord'],
    cta: 'Start Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'For teams requiring full customization',
    features: ['Unlimited agents', 'Unlimited messages', 'Priority support', 'Custom integrations', 'Dedicated infrastructure', 'SLA guarantee'],
    cta: 'Contact Sales',
    popular: false,
  },
];

export const metadata: Metadata = {
  title: 'OpenClaw Skills Marketplace - Extend Your AI Agents',
  description: 'Discover 10,000+ community skills for OpenClaw AI agents. MCP-powered with Telegram, Discord, and WhatsApp integration.',
  keywords: ['OpenClaw', 'AI Skills', 'MCP', 'AI agents', 'automation', 'Telegram bot', 'Discord bot'],
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900/40 via-zinc-900 to-zinc-950 py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-300">OpenClaw Skills Marketplace</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Extend Your AI Agents with <span className="text-emerald-400">Powerful Skills</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover 10,000+ community skills. MCP-powered integrations with Telegram, Discord, and WhatsApp. Build unstoppable AI agents.
            </p>
            
            <div className="flex justify-center gap-4 mb-10">
              <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2">
                Explore Skills <ArrowRight className="w-5 h-5" />
              </button>
              <button type="button" className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-white rounded-xl font-semibold hover:border-emerald-500/50 transition-colors">
                Create Skill
              </button>
            </div>
            
            <div className="flex justify-center gap-12">
              <div>
                <div className="text-4xl font-bold text-white">10,000+</div>
                <div className="text-gray-400">Community Skills</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">2.4M+</div>
                <div className="text-gray-400">Total Installs</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white">4.8★</div>
                <div className="text-gray-400">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What are Skills Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">What are OpenClaw Skills?</h2>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Skills are modular capabilities that extend your AI agents to perform specific tasks
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-6 border-zinc-800 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">OpenClaw Skills</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Pre-built capabilities that give your agents specific abilities—from crypto research to code review. 
                Simply install and your agent gains new superpowers.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Ready to use out of the box
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Community-vetted and maintained
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Configure once, use forever
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6 border-zinc-800 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">MCP (Model Context Protocol)</h3>
              </div>
              <p className="text-gray-400 mb-4">
                MCP is the underlying protocol that connects your agents to external tools and services—APIs, 
                databases, and communication platforms.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Connect to any API or service
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Standardized tool definitions
                </li>
                <li className="flex items-center gap-2 text-gray-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400" /> Secure credential management
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-zinc-900/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button type="button" key={cat.name} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-gray-300 hover:border-purple-500/50 transition-colors">
                <cat.icon className="w-4 h-4" />
                {cat.name}
                <span className="text-xs text-gray-500">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Skills by Category */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Featured Skills</h2>
        <p className="text-gray-400 text-center mb-12">Popular skills across all categories</p>

        {Object.entries(featuredSkills).map(([category, skills]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-white">{category}</h3>
              <button type="button" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <GlassCard key={skill.name} className="p-5 hover:border-emerald-500/50 transition-all cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="text-2xl">{skill.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-gray-500">by {skill.author}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm">
                      ★ <span className="text-white">{skill.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
                  <div className="text-xs text-emerald-400">{skill.installs} installs</div>
                </GlassCard>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* For Creators Section */}
      <div className="bg-gradient-to-br from-purple-900/20 to-zinc-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-4">For Skill Creators</h2>
            <p className="text-gray-400 text-center mb-12">Build, publish, and monetize your skills</p>

            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6 text-center hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Publish Skills</h3>
                <p className="text-gray-400 text-sm">
                  Package your expertise as a skill and share with the OpenClaw community. 
                  Simple publishing process with instant availability.
                </p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Monetize with x402</h3>
                <p className="text-gray-400 text-sm">
                  Use x402 payment protocol to charge for premium skills. 
                  Automated payments with crypto or fiat via stablecoins.
                </p>
              </GlassCard>

              <GlassCard className="p-6 text-center hover:border-purple-500/50 transition-all">
                <div className="w-14 h-14 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">70% Revenue Share</h3>
                <p className="text-gray-400 text-sm">
                  Keep 70% of all skill revenue. We handle hosting, payments, and distribution—you 
                  focus on building amazing skills.
                </p>
              </GlassCard>
            </div>

            <div className="text-center mt-10">
              <button type="button" className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OpenClaw Hosting Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">OpenClaw Hosting</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Self-hosted or fully managed. Run OpenClaw your way.
          </p>
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-6 border-zinc-800">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Server className="w-5 h-5 text-gray-400" /> Self-Hosted
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Full control of your data
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Deploy anywhere (Docker, Kubernetes)
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" /> No per-message costs
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400" /> Custom integrations
                </li>
                <li className="flex items-center gap-2 text-gray-500 text-sm">
                  Requires: DevOps expertise, server infrastructure, maintenance
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6 border-emerald-500/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Cloud className="w-5 h-5 text-emerald-400" /> Managed Hosting
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Zero infrastructure management
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Built-in MCP integrations
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Telegram/Discord/WhatsApp ready
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> 99.9% uptime SLA
                </li>
                <li className="flex items-center gap-2 text-gray-500 text-sm">
                  Starts at $0, scales with your usage
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>

        {/* Pricing Plans */}
        <h3 className="text-2xl font-bold text-white text-center mb-8">Managed Plans</h3>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {hostingPlans.map((plan) => (
            <GlassCard 
              key={plan.name} 
              className={`p-6 ${plan.popular ? 'border-emerald-500/50' : 'border-zinc-800'} relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-emerald-600 text-white text-xs rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-white">{plan.name}</h4>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price > 0 && <span className="text-gray-400">/month</span>}
                </div>
                <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                plan.popular 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}>
                {plan.cta}
              </button>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-20">
        <GlassCard className="p-12 text-center bg-gradient-to-r from-emerald-900/30 to-purple-900/30 border-emerald-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build unstoppable Agents?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Join thousands of developers building powerful AI agents with OpenClaw skills. 
            Start with our free tier—no credit card required.
          </p>
          <div className="flex justify-center gap-4">
            <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">
              Get Started Free
            </button>
            <button type="button" className="px-8 py-4 bg-zinc-900 border border-zinc-700 text-white rounded-xl font-semibold hover:border-emerald-500/50 transition-colors">
              View Documentation
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Upload({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Upload">
      <title>Upload</title>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  );
}

function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" role="img" aria-label="Cloud">
      <title>Cloud</title>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}