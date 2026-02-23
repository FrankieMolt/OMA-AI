"use client";
"use client";

import React, { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Cpu,
  Shield,
  Search,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const navLinks = [
    { label: "Upload", href: "/resume", active: true },
    { label: "Intelligence Score", href: "/resume/score" },
    { label: "Batch Processing", href: "/resume/batch" },
    { label: "Analytics", href: "/resume/dashboard" },
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <section className="pt-48 pb-12 px-4 md:px-14 border-b border-memoria-border-muted">
        <div className="max-w-7xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4"
          >
            AI Services
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
            Resume
            <br />
            <span className="text-memoria-text-secondary">Analyzer</span>
          </h1>

          <nav className="flex items-center gap-1 bg-memoria-bg-card border border-memoria-border-muted p-1 rounded-sm max-w-fit">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="no-underline">
                <button
                  className={`px-4 py-2 rounded-sm transition-all text-[10px] uppercase tracking-widest font-bold ${
                    link.active
                      ? "bg-memoria-text-hero text-memoria-bg-ultra-dark"
                      : "text-memoria-text-whisper hover:text-white hover:bg-memoria-bg-surface"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-14 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-20">
          <div>
            {!result ? (
              <div className="border border-dashed border-memoria-border-muted rounded-sm p-20 flex flex-col items-center justify-center text-center bg-memoria-bg-card/20">
                <div className="w-20 h-20 bg-memoria-bg-surface border border-memoria-border-default rounded-sm flex items-center justify-center mb-8">
                  <Upload className="text-memoria-text-whisper" size={32} />
                </div>
                <h3 className="text-2xl font-light text-memoria-text-hero mb-4 font-display">
                  System Input Required
                </h3>
                <p className="text-sm text-memoria-text-whisper mb-10 max-w-sm font-light">
                  Upload candidate documentation for neural parsing and semantic
                  analysis.
                </p>
                <input type="file" id="resume-file" className="hidden" />
                <label htmlFor="resume-file">
                  <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-10 h-14 text-xs font-bold uppercase tracking-widest hover:scale-[1.02] transition-all">
                    Initialize Upload
                  </Button>
                </label>
                <p className="mt-8 text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
                  PDF • DOCX • TXT (MAX 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-8">{/* Result UI would go here */}</div>
            )}
          </div>

          <aside className="space-y-8">
            <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-8">
              <span className="label-whisper mb-6 block">Capabilities</span>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Cpu size={20} className="text-memoria-text-hero shrink-0" />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-1">
                      Neural Extraction
                    </h4>
                    <p className="text-xs text-memoria-text-whisper font-light">
                      Identifying entities and skills with 99% accuracy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Search
                    size={20}
                    className="text-memoria-text-hero shrink-0"
                  />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-1">
                      Semantic Match
                    </h4>
                    <p className="text-xs text-memoria-text-whisper font-light">
                      Comparing profiles against job requirements.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Shield
                    size={20}
                    className="text-memoria-text-hero shrink-0"
                  />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-memoria-text-hero mb-1">
                      Anonymization
                    </h4>
                    <p className="text-xs text-memoria-text-whisper font-light">
                      Privacy-preserving parsing for bias reduction.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="p-8 border border-memoria-border-muted rounded-sm text-center">
              <div className="hero-number text-5xl mb-2">0.05</div>
              <p className="text-[10px] text-memoria-text-meta uppercase tracking-widest font-bold">
                USDC PER ANALYSIS
              </p>
              <Link
                href="/pricing"
                className="text-[10px] text-memoria-text-hero hover:underline mt-4 block uppercase tracking-widest font-bold"
              >
                View Quotas
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
