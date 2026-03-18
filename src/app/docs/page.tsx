import { Metadata } from 'next';
import Link from 'next/link';
import { Book, Code, Database, Zap, FileText, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Comprehensive documentation for OMA-AI. Learn to build, publish, and monetize MCPs with x402 gasless payments.',
};

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Quick start guides and tutorials to get you up and running with OMA-AI.',
      icon: <Zap className="w-6 h-6" />,
      items: [
        { title: 'Quick Start Guide', description: 'Get started in 5 minutes', href: '/blog/quick-start-5-minutes' },
        { title: 'Building Your First MCP', description: 'Step-by-step tutorial', href: '/blog/building-your-first-mcp' },
        { title: 'Understanding x402 Payments', description: 'Gasless payment protocol', href: '/blog/understanding-x402-payments' },
      ],
    },
    {
      title: 'MCP Development',
      description: 'Deep dive into MCP architecture, patterns, and best practices.',
      icon: <Code className="w-6 h-6" />,
      items: [
        { title: 'MCP Security Checklist', description: 'Secure your MCP', href: '/blog/mcp-security-checklist' },
        { title: 'Security Best Practices', description: 'Production-ready patterns', href: '/blog/security-best-practices-for-mcps' },
        { title: 'How to Monetize Your MCPs', description: 'Revenue strategies', href: '/blog/how-to-monetize-your-mcps' },
      ],
    },
    {
      title: 'Platform Guides',
      description: 'Learn to use OMA-AI features effectively.',
      icon: <Database className="w-6 h-6" />,
      items: [
        { title: 'Multi-Chain Wallet Management', description: 'Base + Solana', href: '/blog/multi-chain-wallet-management' },
        { title: 'Real-Time Analytics Dashboard', description: 'Track performance', href: '/blog/real-time-analytics-dashboard' },
        { title: 'Supabase Integration', description: 'Database setup', href: '/blog/supabase-integration' },
      ],
    },
    {
      title: 'Resources',
      description: 'Blog posts, success stories, and platform comparisons.',
      icon: <Book className="w-6 h-6" />,
      items: [
        { title: 'Top 10 MCPs in 2026', description: 'Best tools', href: '/blog/top-10-mcps-2026' },
        { title: 'Success Stories', description: 'Real revenue examples', href: '/blog/success-stories-real-revenue' },
        { title: 'OMA-AI vs Competitors', description: 'Why choose us', href: '/blog/oma-ai-vs-competitors-2026' },
      ],
    },
  ];

  const quickLinks = [
    { title: 'API Documentation', description: 'Complete API reference', href: '/api/docs', icon: <FileText className="w-5 h-5" /> },
    { title: 'FAQ', description: 'Frequently asked questions', href: '/faq', icon: <MessageCircle className="w-5 h-5" /> },
    { title: 'Contact Support', description: 'Get help from our team', href: '/contact', icon: <ExternalLink className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Book className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">Documentation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Developer Documentation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to build, publish, and monetize MCPs on OMA-AI. From quick start guides to advanced security practices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <GlassCard className="p-6 hover:cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-300">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-300">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                  <p className="text-gray-400">{section.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <GlassCard className="p-6 hover:cursor-pointer group h-full">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-purple-400 text-sm font-medium">
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* API Reference */}
        <div className="mt-20">
          <GlassCardPurple className="max-w-4xl mx-auto p-12 text-center">
            <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8 text-purple-300" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Need API Reference?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our complete API documentation with all endpoints, parameters, and examples.
            </p>
            <a
              href="/api/docs"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white hover:bg-gray-100 text-purple-600 font-bold rounded-lg transition-colors"
            >
              View API Docs
              <ExternalLink className="w-5 h-5" />
            </a>
          </GlassCardPurple>
        </div>

        {/* Community Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Join the Community
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="GlassCard p-6 hover:cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-indigo-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    Discord Community
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Chat with developers, share MCPs, get help
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-300 transition-colors" />
              </div>
            </a>

            <a
              href="https://github.com/FrankieMolt/OMA-Ai"
              target="_blank"
              rel="noopener noreferrer"
              className="GlassCard p-6 hover:cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <Code className="w-6 h-6 text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                    GitHub Repository
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Star us, fork, contribute improvements
                  </p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
              </div>
            </a>
          </div>
        </div>

        {/* Need Help CTA */}
        <div className="mt-20 text-center">
          <GlassCard className="max-w-3xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Can't Find What You Need?
            </h2>
            <p className="text-gray-300 mb-6">
              Our team is here to help. Contact us with any questions or feedback.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </a>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}
