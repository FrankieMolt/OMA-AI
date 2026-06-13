import { Metadata } from 'next';
import { GlassCard } from '@/components/ui/GlassCard';
import { Briefcase, MapPin, Clock, DollarSign, Mail, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers | NOSYT LLC',
  description: 'Join NOSYT LLC and help build the future of agentic AI infrastructure.',
};

const openings = [
  {
    title: 'Senior Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote (Global)',
    salary: '$120k–$180k',
    description: 'Build and scale OMA-AI MCP marketplace, payment infrastructure, and agentic AI tools.',
    tags: ['Next.js', 'TypeScript', 'Solidity', 'PostgreSQL'],
  },
  {
    title: 'MCP Developer Advocate',
    type: 'Full-time',
    location: 'Remote (Global)',
    salary: '$80k–$130k',
    description: 'Grow the MCP ecosystem. Build sample MCPs, write documentation, and help publishers succeed.',
    tags: ['Python', 'Node.js', 'Technical Writing', 'Community'],
  },
  {
    title: 'DevOps / Platform Engineer',
    type: 'Full-time',
    location: 'Remote (Global)',
    salary: '$110k–$160k',
    description: 'Manage cloud infrastructure (Coolify, Cloudflare, Vercel), CI/CD pipelines, and 99.9% uptime.',
    tags: ['Docker', 'Kubernetes', 'Cloudflare', 'CI/CD'],
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-purple-300" />
            <span className="text-sm font-semibold text-purple-300">NOSYT LLC</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Work with us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            NOSYT LLC builds infrastructure for agentic AI. OMA-AI is our flagship product — 
            the premier MCP marketplace with x402 gasless payments.
          </p>
          <p className="text-gray-400 mt-4">
            We are small, remote-first, and move fast. No bureaucracy. Real ownership.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Own your work', desc: 'Meaningful equity. Real autonomy. Ship things that matter.' },
            { title: 'Remote-first', desc: 'Work from anywhere. Async by default, meet when it counts.' },
            { title: 'AI-native', desc: 'We use AI to build AI infrastructure. Meta, but it works.' },
          ].map((v) => (
            <GlassCard key={v.title} className="p-6 text-center">
              <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
              <p className="text-gray-400 text-sm">{v.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Openings */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Open positions</h2>
          <div className="space-y-6">
            {openings.map((job) => (
              <GlassCard key={job.title} className="p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-purple-900/40 border border-purple-700/50 rounded-full text-xs text-purple-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{job.type}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" />{job.salary}</span>
                    </div>
                  </div>
                  <a
                    href="mailto:hello@nosytlabs.com"
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Speculative Applications */}
        <GlassCard className="p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Don&apos;t see a fit?</h3>
          <p className="text-gray-400 mb-6">
            We are always looking for exceptional people. Send us your background and what you&apos;d like to work on.
          </p>
          <a
            href="mailto:hello@nosytlabs.com?subject=Speculative Application"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" /> Speculative Application
          </a>
        </GlassCard>
      </div>
    </div>
  );
}
