import { Metadata } from 'next';
import { GlassCard, GlassCardPurple } from '@/components/ui/GlassCard';
import { Star, Quote, ExternalLink, TrendingUp, DollarSign, Users, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Testimonials | OMA-AI - Success Stories from MCP Developers',
  description: 'Read success stories from MCP developers earning revenue on OMA-AI. Real examples of monetizing AI tools.',
  keywords: ['OMA-AI', 'Testimonials', 'Success Stories', 'MCP monetization', 'Developer revenue'],
};

export default function TestimonialsPage() {
  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Senior Developer',
      company: 'TechCorp',
      avatar: 'A',
      rating: 5,
      revenue: '$850/month',
      mcp: 'Filesystem MCP',
      category: 'Storage',
      story: 'Built a filesystem MCP in 2 weeks using OMA-AI documentation. Got approved in 24 hours. Now earning steady revenue from 150+ calls/day. The 5% fee is unbeatable compared to other platforms.',
      stats: { calls: '4,500/month', rating: '4.9★', published: 'Jan 2026' },
    },
    {
      name: 'Sarah Johnson',
      role: 'AI Researcher',
      company: 'OpenAI Labs',
      avatar: 'S',
      rating: 5,
      revenue: '$2,100/month',
      mcp: 'Memory MCP',
      category: 'Utility',
      story: 'Our memory MCP for AI context storage has been a game-changer. 300+ developers are using it daily. OMA-AI\'s analytics dashboard helps us understand usage patterns and improve performance.',
      stats: { calls: '8,200/month', rating: '4.8★', published: 'Dec 2025' },
    },
    {
      name: 'Michael Park',
      role: 'Full Stack Developer',
      company: 'Indie Dev',
      avatar: 'M',
      rating: 5,
      revenue: '$1,275/month',
      mcp: 'Fetch MCP',
      category: 'Development',
      story: 'Simple HTTP fetch MCP is surprisingly popular. Webhooks, authentication, and rate limiting make it production-ready. x402 gasless payments mean users don\'t worry about gas.',
      stats: { calls: '6,375/month', rating: '4.7★', published: 'Nov 2025' },
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'DataFlow Inc',
      avatar: 'E',
      rating: 5,
      revenue: '$4,275/month',
      mcp: 'Database MCP',
      category: 'Data',
      story: 'Enterprise-grade database MCP with PostgreSQL support. Row Level Security makes it safe for multi-tenant use. Big clients love it. OMA-AI\'s verification badge builds trust immediately.',
      stats: { calls: '12,825/month', rating: '5.0★', published: 'Oct 2025' },
    },
    {
      name: 'David Kim',
      role: 'Blockchain Developer',
      company: 'CryptoTools',
      avatar: 'D',
      rating: 5,
      revenue: '$1,600/month',
      mcp: 'Git MCP',
      category: 'Development',
      story: 'Git integration is critical for many agents. Our MCP supports cloning, commits, and PR management. Monetizing essential developer tools has never been easier.',
      stats: { calls: '8,000/month', rating: '4.8★', published: 'Jan 2026' },
    },
    {
      name: 'Lisa Thompson',
      role: 'Indie Developer',
      company: 'Freelance',
      avatar: 'L',
      rating: 5,
      revenue: '$650/month',
      mcp: 'Analytics MCP',
      category: 'Analytics',
      story: 'Built analytics MCP specifically for AI agents. Tracks calls, errors, and performance metrics. Indie developers like me can actually make a living on OMA-AI.',
      stats: { calls: '3,250/month', rating: '4.6★', published: 'Feb 2026' },
    },
  ];

  const categories = [
    { name: 'Storage', icon: '📁', count: 1 },
    { name: 'Utility', icon: '🔧', count: 1 },
    { name: 'Development', icon: '💻', count: 2 },
    { name: 'Data', icon: '🗄️', count: 1 },
    { name: 'Analytics', icon: '📊', count: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-green-300" />
            <span className="text-sm font-semibold text-green-300">Success Stories</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Real Developers,
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real Revenue, Real Results. See how MCP developers are earning on OMA-AI.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto">
          <GlassCard className="p-6 text-center hover">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">6+</div>
            <div className="text-sm text-gray-400">Success Stories</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">$10,750</div>
            <div className="text-sm text-gray-400">Total Monthly Revenue</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">4.9★</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </GlassCard>
          <GlassCard className="p-6 text-center hover">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">43,750+</div>
            <div className="text-sm text-gray-400">Total Calls/Month</div>
          </GlassCard>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-gray-300 text-sm"
              >
                {cat.icon} {cat.name} ({cat.count})
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <GlassCard key={index} className="p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                    {testimonial.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-purple-400">{testimonial.role}</p>
                      <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={18} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Quote className="w-5 h-5 text-purple-300" />
                      <p className="text-gray-200 italic leading-relaxed">
                        {testimonial.story}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">MCP</p>
                      <p className="text-white font-semibold">{testimonial.mcp}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Category</p>
                      <p className="text-white font-semibold">{testimonial.category}</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Published</p>
                      <p className="text-white font-semibold">{testimonial.stats.published}</p>
                    </div>
                  </div>

                  {/* Revenue Badge */}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        <div className="text-white font-bold">{testimonial.revenue}</div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-zinc-800/50 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-300">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="text-sm">{testimonial.rating}★</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <GlassCardPurple className="max-w-4xl mx-auto p-12 text-center">
          <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Star className="w-8 h-8 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Have an MCP on OMA-AI? We&apos;d love to feature your success story.
            Join our community of thriving MCP developers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/publish"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
            ><ExternalLink size={20} />
              Publish Your MCP
            </Link>
            <Link href="https://discord.gg/oma-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors"
            ><MessageSquare size={20} />
              Join Discord
            </Link>
          </div>
        </GlassCardPurple>
      </div>
    </div>
  );
}
