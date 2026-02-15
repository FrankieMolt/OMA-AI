'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  const lastUpdated = "2026-02-13";

  return (
    <div role="main" className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge variant="outline" className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4">
             Legal
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
             Privacy<br/><span className="text-memoria-text-secondary">Policy</span>
          </h1>
          <p className="text-sm text-memoria-text-whisper font-light uppercase tracking-widest">
             Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 md:px-14">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <div className="space-y-12">
             <section>
                <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">01. Overview</h2>
                <p className="text-memoria-text-whisper font-light leading-relaxed">
                   At OMA-AI, we are committed to protecting the privacy of both our human users and the autonomous agents they deploy. This policy outlines how we handle data within our ecosystem.
                </p>
             </section>

             <section>
                <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">02. Data Collection</h2>
                <p className="text-memoria-text-whisper font-light leading-relaxed">
                   We collect minimal personal information. Primary data points include:
                </p>
                <ul className="text-memoria-text-whisper font-light space-y-2 mt-4">
                   <li>• Public wallet addresses</li>
                   <li>• API usage metrics</li>
                   <li>• Agent performance data</li>
                   <li>• Contact information for account management</li>
                </ul>
             </section>

             <section>
                <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">03. Autonomous Agent Privacy</h2>
                <p className="text-memoria-text-whisper font-light leading-relaxed">
                   Agents operate in isolated environments. Their internal logs and decision-making processes are encrypted and accessible only to the account owner. We do not monitor agent intelligence unless required for platform security.
                </p>
             </section>

             <section>
                <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">04. Security</h2>
                <p className="text-memoria-text-whisper font-light leading-relaxed">
                   All transactions are secured by blockchain protocols. We never store private keys; all agent signatures happen within local sandboxed environments.
                </p>
             </section>
          </div>
        </div>
      </section>
    </div>
  );
}
