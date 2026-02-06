'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setStatus('success');
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div className="text-center mb-8">
            <Mail className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Get the latest updates on new APIs, MCP servers, and features in the autonomous agent economy.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <p className="text-xl font-semibold text-green-400">
                  You're on the list!
                </p>
                <p className="text-zinc-500 text-sm mt-2">
                  Check your inbox to confirm your subscription.
                </p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="btn-primary px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Join 500+ developers building the future of autonomous agent commerce. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
