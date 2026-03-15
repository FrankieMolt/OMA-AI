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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@oma-ai.com" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Product</h4>
            <ul className="space-y-3">
              <li><Link href="/models" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">AI Models</Link></li>
              <li><Link href="/pricing" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Pricing</Link></li>
              <li><Link href="/mcps" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">MCP Registry</Link></li>
              <li><Link href="/status" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">System Status</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Documentation</Link></li>
              <li><Link href="/docs/api" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">API Reference</Link></li>
              <li><Link href="/docs/guides" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Guides</Link></li>
              <li><Link href="/blog" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">About</Link></li>
              <li><Link href="/careers" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Careers</Link></li>
              <li><Link href="/privacy" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">© 2026 OMA-AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
});