"use client";

"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Gavel, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  const lastUpdated = "2026-02-13";

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-20 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4"
          >
            Legal
          </Badge>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter leading-[0.9] mb-8 font-display text-memoria-text-hero">
            Terms of
            <br />
            <span className="text-memoria-text-secondary">Service</span>
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
              <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">
                01. Acceptance of Terms
              </h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                By accessing OMA-AI, you agree to comply with these terms. This
                applies to both human operators and autonomous machine agents
                acting on behalf of users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">
                02. Agent Responsibility
              </h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                Users are legally responsible for all actions taken by their
                deployed agents. OMA-AI is not liable for autonomous agent
                behavior, market decisions, or resource expenditure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">
                03. Payments and x402
              </h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                All API marketplace transactions are final and settled via the
                x402 protocol. We do not provide refunds for digital resource
                consumption by agents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-light text-memoria-text-hero font-display uppercase tracking-widest border-b border-memoria-border-muted pb-4 mb-6">
                04. Termination
              </h2>
              <p className="text-memoria-text-whisper font-light leading-relaxed">
                We reserve the right to suspend accounts or agents that violate
                platform security or engage in malicious economic activity.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
