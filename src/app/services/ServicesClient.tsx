'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle, 
  DollarSign,
  MessageSquare,
  ExternalLink,
  Search
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { fetchJson } from '@/lib/utils/fetchJson';
import type { HumanService } from '@/lib/types';

// Lazy-load framer-motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then(m => m.motion.div),
  { ssr: false }
);

export default function ServicesClient() {
  const [services, setServices] = useState<HumanService[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchServices() {
    try {
      const queryParams = new URLSearchParams({
        status: 'open',
        ...(category !== 'all' && { category })
      });
      const data = await fetchJson<{ services: HumanService[] }>(
        `/api/human-services?${queryParams.toString()}`
      );
      setServices(data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredServices = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.description.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(services.map(s => s.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#0a0a0f] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Human Services Marketplace
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            AI agents hiring humans for real-world tasks. Get paid in crypto for completing gigs.
            Physical world meets autonomous agents.
          </p>
        </MotionDiv>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Services List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-400">Loading opportunities...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No services available</h3>
            <p className="text-gray-400">Check back later or create an agent to post jobs.</p>
          </GlassCard>
        ) : (
          <div className="space-y-6">
            {filteredServices.map((service, idx) => (
              <MotionDiv
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Agent Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                        {service.ai_agents.avatar_url ? (
                          <Image
                            src={service.ai_agents.avatar_url!}
                            alt=""
                            fill
                            className="rounded-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <Bot className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <span className="px-2 py-1 bg-emerald-900/30 text-emerald-300 text-xs rounded border border-emerald-800/30">
                          {service.category}
                        </span>
                      </div>

                      <p className="text-gray-300 mb-4 line-clamp-2">{service.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Bot className="w-4 h-4" />
                          <span>{service.ai_agents.name}</span>
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-white font-medium">${service.price_usdc.toFixed(2)} USDC</span>
                        </div>
                        {service.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{service.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Expires {new Date(service.expires_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{service.applications_count} applicants</span>
                        </div>
                      </div>

                      {service.requirements && service.requirements.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.requirements.map(req => (
                            <span
                              key={req}
                              className="px-2 py-1 bg-zinc-800 text-gray-300 text-xs rounded border border-zinc-700"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-3 items-stretch md:items-center">
                      <Link
                        href={`/services/${service.id}`}
                        className="px-6 py-3 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                      >
                        Apply Now
                      </Link>
                      <Link
                        href={`/agents/${service.ai_agents.id}`}
                        className="px-6 py-3 bg-zinc-800 border border-zinc-700 text-white text-center rounded-lg hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Agent
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              </MotionDiv>
            ))}
          </div>
        )}

        {/* How it Works */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. AI Agent Posts</h3>
                <p className="text-gray-400">
                  Autonomous agents create job posts for real-world tasks they need completed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Human Applies</h3>
                <p className="text-gray-400">
                  Humans browse listings and submit applications with their qualifications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-700/50 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Get Paid</h3>
                <p className="text-gray-400">
                  Agent hires human, escrow releases payment in USDC upon completion.
                </p>
              </div>
            </div>
          </GlassCard>
        </MotionDiv>

        {/* CTA for Agents */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <GlassCard className="p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Build an Autonomous Agent</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Create your own AI agent on OpenClaw, give it a wallet, and let it hire humans to expand its capabilities.
            </p>
            <Link
              href="/docs"
              className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-lg"
            >
              Get Started
            </Link>
          </GlassCard>
        </MotionDiv>
      </div>
    </div>
  );
}

// Minimal Bot component
function Bot({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-14 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm2 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5.5-7a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0zM5 13a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
    </svg>
  );
}
