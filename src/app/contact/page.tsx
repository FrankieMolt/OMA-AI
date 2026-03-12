'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general' as 'general' | 'support' | 'bug-report' | 'feature-request' | 'mcp-inquiry' | 'business-inquiry'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Have questions? Need support? Want to partner? We're here to help!
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="max-w-2xl mx-auto mb-8 bg-green-900/30 border border-green-500 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Message Sent Successfully!
            </h2>
            <p className="text-green-200">
              Thank you for reaching out. Our team will respond within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: '',
                  category: 'general'
                });
              }}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Send Another Message
            </button>
          </div>
        )}

        {/* Contact Form */}
        {!submitted && (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left: Contact Form */}
            <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>

              {error && (
                <div className="mb-6 bg-red-900/30 border border-red-500 rounded-lg p-4">
                  <p className="text-red-200">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-purple-200 mb-2">
                    Category <span className="text-red-400 ml-1">*</span>
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="bug-report">Bug Report</option>
                    <option value="feature-request">Feature Request</option>
                    <option value="mcp-inquiry">MCP Publication Inquiry</option>
                    <option value="business-inquiry">Business Partnership</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-purple-200 mb-2">
                      Name <span className="text-red-400 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-purple-200 mb-2">
                      Email <span className="text-red-400 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-purple-200 mb-2">
                    Subject <span className="text-red-400 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="Brief summary of your message"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-purple-200 mb-2">
                    Message <span className="text-red-400 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    placeholder="Describe your question or issue in detail..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-sm text-purple-300">
                  <span className="font-semibold text-purple-200">Response Time:</span> Typically within 24 hours
                </p>
                <p className="text-sm text-purple-300">
                  <span className="font-semibold text-purple-200">Business Hours:</span> Mon-Fri 9AM-6PM UTC
                </p>
              </div>
            </div>

            {/* Right: Contact Info & Resources */}
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="/faq"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">❓</span>
                    <span className="group-hover:underline">Frequently Asked Questions</span>
                  </a>
                  <a
                    href="/docs/blog/quick-start-5-minutes"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">🚀</span>
                    <span className="group-hover:underline">Quick Start Guide (5 minutes)</span>
                  </a>
                  <a
                    href="/api/docs"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">📚</span>
                    <span className="group-hover:underline">API Documentation</span>
                  </a>
                  <a
                    href="https://github.com/FrankieMolt/OMA-Ai/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">🐛</span>
                    <span className="group-hover:underline">Report a Bug (GitHub)</span>
                  </a>
                </div>
              </div>

              {/* Community Channels */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  Join Our Community
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://discord.gg/oma-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">💬</span>
                    <span>Join Discord Server</span>
                  </a>
                  <a
                    href="https://twitter.com/oma_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">🐦</span>
                    <span>Follow on Twitter/X</span>
                  </a>
                  <a
                    href="https://github.com/FrankieMolt/OMA-Ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <span className="text-2xl">🐙</span>
                    <span>GitHub Repository</span>
                  </a>
                </div>
              </div>

              {/* MCP Resources */}
              <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-4">
                  MCP Resources
                </h3>
                <div className="space-y-3">
                  <a
                    href="/mcps"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">📦</span>
                    <span className="group-hover:underline">Browse MCP Marketplace</span>
                  </a>
                  <a
                    href="/publish"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">📝</span>
                    <span className="group-hover:underline">Publish Your MCP</span>
                  </a>
                  <a
                    href="/docs/blog/local-mcp-installation-guides"
                    className="flex items-center gap-3 text-purple-200 hover:text-purple-100 transition-colors group"
                  >
                    <span className="text-2xl">🔧</span>
                    <span className="group-hover:underline">Install MCPs Locally</span>
                  </a>
                </div>
              </div>

              {/* Developer Support */}
              <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-xl p-6 shadow-lg border border-purple-700/50">
                <h3 className="text-xl font-bold text-white mb-4">
                  Developer Support
                </h3>
                <div className="space-y-3 text-sm text-purple-200">
                  <p>
                    <span className="font-semibold text-purple-100">Documentation:</span>
                    <a href="/api/docs" className="text-purple-400 hover:text-purple-300 underline ml-1">docs.oma-ai.com</a>
                  </p>
                  <p>
                    <span className="font-semibold text-purple-100">API Status:</span>
                    <a href="/api/health" className="text-purple-400 hover:text-purple-300 underline ml-1">status.oma-ai.com</a>
                  </p>
                  <p>
                    <span className="font-semibold text-purple-100">Email Support:</span>
                    <a href="mailto:support@oma-ai.com" className="text-purple-400 hover:text-purple-300 underline ml-1">support@oma-ai.com</a>
                  </p>
                  <p>
                    <span className="font-semibold text-purple-100">Response Time:</span>
                    <span className="ml-1">24 hours (developer inquiries)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
