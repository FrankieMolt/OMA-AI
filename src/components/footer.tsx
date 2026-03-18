import { memo } from 'react';
import Link from 'next/link';
import { Brain, Github, Twitter, Mail } from 'lucide-react';

export const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#0a0a14] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OMA-AI</span>
            </Link>
            <p className="text-zinc-400 max-w-sm leading-relaxed mb-6">
              Build powerful AI applications with ease. Access all major language models through one simple API.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/FrankieMolt" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/OMA_AI" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@oma-ai.com" aria-label="Email" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/models" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">AI Models</Link></li>
              <li><Link href="/pricing" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Pricing</Link></li>
              <li><Link href="/mcps" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">MCP Registry</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Documentation</Link></li>
              <li><Link href="/docs/api" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">API Reference</Link></li>
              <li><Link href="/docs/guides" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Guides</Link></li>
              <li><Link href="/blog" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">About</Link></li>
              <li><Link href="/careers" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Careers</Link></li>
              <li><Link href="/privacy" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0a0a14] rounded px-1">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">© 2026 OMA-AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
});