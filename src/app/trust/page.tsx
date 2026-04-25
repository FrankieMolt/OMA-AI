import { Metadata } from 'next';
import { Shield, CheckCircle, Star, Users, Globe, Lock, Eye, Award, TrendingUp, Zap, Server } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Trust & Security | OMA-AI',
  description: 'Learn how OMA-AI vets MCP servers, protects user data, and maintains a secure, reliable marketplace.',
  keywords: ['OMA-AI', 'Trust', 'Security', 'MCP verification', 'Data privacy', 'Verified MCPs'],
};

const stats = [
  { value: '34+', label: 'Verified MCPs' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '400K+', label: 'API Calls/Month' },
  { value: '0', label: 'Security Incidents' },
];

const verificationSteps = [
  {
    step: 1,
    title: 'Code Review',
    description: 'Every MCP undergoes automated security scanning and manual code review. We check for vulnerabilities, backdoors, and suspicious patterns.',
    icon: Eye,
  },
  {
    step: 2,
    title: 'Functional Testing',
    description: 'We test every MCP endpoint to verify it works as documented. Broken or misleading tools get rejected.',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'x402 Payment Audit',
    description: 'If the MCP accepts payments, we verify the payment flow works correctly and that funds are properly settleable.',
    icon: Shield,
  },
  {
    step: 4,
    title: 'Community Signals',
    description: 'We monitor usage patterns, ratings, and reports. Low-rated tools get flagged or removed.',
    icon: Star,
  },
];

const securityMeasures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data in transit is encrypted with TLS 1.3. Sensitive operations use additional encryption layers.',
  },
  {
    icon: Shield,
    title: 'x402 Protocol Security',
    description: 'Payments are secured by Base L2 blockchain. No credit card storage — all transactions use USDC with cryptographic finality.',
  },
  {
    icon: Eye,
    title: 'Transparent Operations',
    description: 'Our codebase, pricing, and fee structure are fully public. No hidden charges or surprise billing.',
  },
  {
    icon: Server,
    title: 'Reliable Infrastructure',
    description: 'Built on battle-tested infrastructure with 99.9% uptime. Automatic failover and DDoS protection included.',
  },
  {
    icon: Users,
    title: 'Community Moderation',
    description: 'Every MCP is community-rated. Users can report issues, and our team responds within 24 hours.',
  },
  {
    icon: Award,
    title: 'Verified Publisher Badges',
    description: 'Publishers who maintain high-quality MCPs earn verification badges — visible trust signals for users.',
  },
];

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'Senior Developer',
    avatar: 'A',
    rating: 5,
    revenue: '$850/mo',
    mcp: 'Filesystem MCP',
    story: 'Built a filesystem MCP in 2 weeks. Got approved in 24h. Now earning from 150+ calls/day. The verification badge builds trust immediately.',
    gradient: 'from-violet-600/20 to-fuchsia-600/20',
    border: 'border-violet-500/20',
  },
  {
    name: 'Sarah Johnson',
    role: 'AI Researcher',
    avatar: 'S',
    rating: 5,
    revenue: '$2,100/mo',
    mcp: 'Memory MCP',
    story: '300+ developers using it daily. OMA-AI\'s analytics helps us understand usage and improve. The community is responsive and supportive.',
    gradient: 'from-cyan-600/20 to-blue-600/20',
    border: 'border-cyan-500/20',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    avatar: 'E',
    rating: 5,
    revenue: '$4,275/mo',
    mcp: 'Database MCP',
    story: 'Enterprise-grade database MCP. Big clients love the verification badge. OMA-AI\'s trust infrastructure makes B2B sales so much easier.',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-500/20',
  },
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-600/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border border-emerald-700/50 rounded-full text-emerald-300 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trust & Verification
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Trust is Our Foundation
            </h1>
            
            <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
              Every MCP on OMA-AI is verified. Every payment is secured by blockchain. 
              Every publisher is accountable. We built trust into the protocol — 
              so you don't have to trust us.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Vet MCPs */}
      <section className="py-20 px-4 bg-zinc-900/30 border-y border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Vet MCPs
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Every MCP on OMA-AI goes through our 4-step verification process. 
              We catch issues before they reach your agents.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {verificationSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 bg-zinc-950 border border-zinc-800 rounded-2xl flex gap-5"
              >
                <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <step.icon className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-1 rounded">STEP {step.step}</span>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Security & Privacy
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Your data and payments are protected by military-grade security 
              and transparent blockchain verification.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityMeasures.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-zinc-900/30 border-y border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">Trusted by Developers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Developers Trust OMA-AI
            </h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Real MCP builders earning real revenue. See why they chose OMA-AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${t.gradient} border ${t.border} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-200`}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  "{t.story}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-zinc-500">{t.role}</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-sm">{t.revenue}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/testimonials"
              className="text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-1"
            >
              Read all success stories <Zap className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start with Confidence
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
              Every MCP on OMA-AI is verified, every payment is secured, 
              and every publisher is accountable. Jump in and build.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/mcps"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors font-semibold text-lg flex items-center gap-2"
              >
                Browse Verified MCPs <Zap className="w-5 h-5" />
              </Link>
              <Link
                href="/publish"
                className="px-8 py-4 bg-zinc-800 border border-zinc-700 text-white rounded-xl hover:bg-zinc-700 transition-colors font-semibold text-lg"
              >
                Become a Publisher
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}