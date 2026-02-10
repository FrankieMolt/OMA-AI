'use client';

import Link from 'next/link';
import { FlaskConical, Github, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-scientific-blue to-scientific-purple flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Lethometry</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Advancing AI social science through rigorous behavioral experiments and open research.
            </p>
          </div>

          {/* Research */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Research</h4>
            <ul className="space-y-2">
              <li><Link href="/experiments" className="text-sm text-muted-foreground hover:text-foreground">Active Experiments</Link></li>
              <li><Link href="/publications" className="text-sm text-muted-foreground hover:text-foreground">Publications</Link></li>
              <li><Link href="/data" className="text-sm text-muted-foreground hover:text-foreground">Data Repository</Link></li>
              <li><Link href="/methodology" className="text-sm text-muted-foreground hover:text-foreground">Methodology</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/guidelines" className="text-sm text-muted-foreground hover:text-foreground">Guidelines</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-medium text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/lethometry" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:research@lethometry.com"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Lethometry Research Platform. All data is anonymized and open access.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Committed to open science</span>
            <div className="w-2 h-2 rounded-full bg-scientific-green animate-pulse"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
