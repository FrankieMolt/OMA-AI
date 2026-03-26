import { memo } from 'react';
import Link from 'next/link';
import { Brain, Github, Twitter, Mail, Zap, Cpu, Globe, Code, BookOpen, MessageSquare, DollarSign } from 'lucide-react';

export const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-violet-500/10 bg-[#0a0a14] py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">OMA-AI</span>
            </Link>
            <p className="text-zinc-400 max-w-sm leading-relaxed mb-6">
              The premier MCP marketplace with x402 micropayments. Build, monetize, and discover AI agents with crypto-native payments.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/FrankieMolt/OMA-AI" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/OMA_AI" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://discord.gg/oma-ai" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="mailto:hello@oma-ai.com" aria-label="Email" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-zinc-400 hover:text-white hover:border-violet-500/30 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Products
            </h4>
            <ul className="space-y-3">
              <li><Link href="/mcps" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">MCP Marketplace</Link></li>
              <li><Link href="/skills" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Agent Skills</Link></li>
              <li><Link href="/models" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">AI Models</Link></li>
              <li><Link href="/compute" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm flex items-center gap-2">
                GPU Compute <Cpu className="w-3 h-3 text-green-400" />
              </Link></li>
              <li><Link href="/pricing" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Pricing</Link></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              Developers
            </h4>
            <ul className="space-y-3">
              <li><Link href="/docs" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Documentation</Link></li>
              <li><Link href="/docs/api" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">API Reference</Link></li>
              <li><Link href="/docs/guides" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Guides & Tutorials</Link></li>
              <li><Link href="/publish" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Publish MCP</Link></li>
              <li><Link href="https://github.com/FrankieMolt/OMA-AI" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">GitHub</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li><Link href="/blog" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Blog</Link></li>
              <li><Link href="/blog/quick-start-5-minutes" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Quick Start</Link></li>
              <li><Link href="/blog/how-to-monetize-your-mcps" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Monetization Guide</Link></li>
              <li><Link href="/faq" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">FAQ</Link></li>
              <li><Link href="/security" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Security</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-5 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">About</Link></li>
              <li><Link href="/careers" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Careers</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Contact</Link></li>
              <li><Link href="/privacy" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-zinc-400 hover:text-violet-400 transition-colors text-sm">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Status */}
        <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-violet-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-400">© 2026 OMA-AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <DollarSign className="w-4 h-4 text-green-400" />
              USDC Payments via x402
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
