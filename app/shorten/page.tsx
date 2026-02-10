'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, Copy, Check, QrCode, BarChart3, 
  Zap, Shield, Globe, ArrowRight, Sparkles 
} from 'lucide-react';
import { ShortenResponse } from '@/types/url-shortener';

export default function ShortenPage() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenResponse['data'] | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          custom_code: customCode || undefined
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to shorten URL');
      } else {
        setResult(data.data);
        setUrl('');
        setCustomCode('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Shorty</span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/shorten/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </a>
              <a href="/shorten/api" className="text-gray-300 hover:text-white transition-colors">
                API
              </a>
              <a href="/shorten/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a 
                href="/login" 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
              >
                Sign In
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Free URL Shortener with Analytics</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Shorten Your Links,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amplify Your Reach
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Create short, memorable links in seconds. Track clicks, generate QR codes, 
              and analyze your audience with our powerful dashboard.
            </p>
          </motion.div>

          {/* URL Shortener Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-6 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !url}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Shortening...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Shorten URL
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-sm">Custom code (optional):</label>
                <input
                  type="text"
                  placeholder="my-link"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="flex-1 max-w-xs px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  maxLength={10}
                />
              </div>
            </form>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-green-400 text-sm font-medium mb-1">Your shortened URL:</p>
                      <a 
                        href={result.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-bold text-white hover:text-purple-400 transition-colors break-all"
                      >
                        {result.short_url}
                      </a>
                      <p className="text-gray-500 text-sm mt-1 truncate">
                        {result.original_url}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyToClipboard(result.short_url)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        {copied ? (
                          <><Check className="w-4 h-4" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Copy</>
                        )}
                      </button>
                      <a
                        href={`/api/qr/${result.short_code}`}
                        target="_blank"
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <QrCode className="w-4 h-4" /> QR
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Generate short links instantly with our optimized infrastructure.'
              },
              {
                icon: BarChart3,
                title: 'Detailed Analytics',
                description: 'Track clicks, locations, devices, and referrers in real-time.'
              },
              {
                icon: Shield,
                title: 'Secure & Reliable',
                description: 'Enterprise-grade security with 99.9% uptime guarantee.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10M+', label: 'Links Created' },
              { value: '1B+', label: 'Clicks Tracked' },
              { value: '99.9%', label: 'Uptime' },
              { value: '50ms', label: 'Avg. Redirect' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-300 mb-8">
              Join thousands of users who trust Shorty for their link management needs.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Link2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">Shorty</span>
          </div>
          
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shorty. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">Privacy</a>
            <a href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
