/**
 * Contact Page - Contact form and info
 */

import { Mail, MapPin, Twitter, Github } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8">
          ← Back to Marketplace
        </Link>

        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9] uppercase italic">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400">Us</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Have questions about our weird products? We&apos;re here to help.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 text-white rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  />
                </div>
                <Button variant="primary" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl space-y-6">
              <h2 className="text-2xl font-bold text-white">Get in touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm mb-1">Email</p>
                    <a href="mailto:hello@spendthrone.com" className="text-white hover:text-purple-400 transition-colors">
                      hello@spendthrone.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Twitter className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm mb-1">Twitter</p>
                    <a href="https://twitter.com/spendthrone" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
                      @spendthrone
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Github className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm mb-1">GitHub</p>
                    <a href="https://github.com/frankiemolt/spendthrone" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
                      frankiemolt/spendthrone
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm mb-1">Location</p>
                    <p className="text-white">Somewhere weird and wonderful</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl">
              <p className="text-sm text-zinc-300">
                <strong className="text-white">Response Time:</strong> We usually respond within 24-48 hours. For urgent weird stuff emergencies, ping us on Twitter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
