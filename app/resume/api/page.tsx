"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code, Cpu } from "lucide-react";

export default function ResumeApiPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <section className="pt-48 pb-20 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 rounded-sm uppercase tracking-[0.2em] text-[10px] py-1 border-memoria-border-default text-memoria-text-whisper px-4"
          >
            Documentation
          </Badge>
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 font-display text-memoria-text-hero">
            Resume
            <br />
            <span className="text-memoria-text-secondary">API Reference</span>
          </h1>
          <p className="text-xl text-memoria-text-whisper max-w-2xl font-light leading-relaxed">
            Programmatic access to neural parsing and semantic analysis for
            candidate documentation.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-14 border-t border-memoria-border-muted">
        <div className="max-w-4xl mx-auto space-y-12">
          <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10">
            <div className="flex items-center gap-4 mb-6">
              <Badge
                variant="outline"
                className="rounded-sm text-[9px] uppercase tracking-widest border-blue-900/30 text-blue-400"
              >
                POST
              </Badge>
              <span className="text-xs font-mono text-memoria-text-hero">
                /api/v1/resume/parse
              </span>
            </div>
            <p className="text-sm text-memoria-text-whisper font-light mb-8">
              Submit a resume file for instant extraction of entities and
              skills.
            </p>
            <pre className="text-xs font-mono text-memoria-text-hero bg-memoria-bg-ultra-dark p-6 rounded-sm border border-memoria-border-muted">
              {`curl -X POST https://api.oma-ai.com/v1/resume/parse \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@resume.pdf"`}
            </pre>
          </Card>

          <Card className="bg-memoria-bg-card border-memoria-border-muted rounded-sm p-10">
            <div className="flex items-center gap-4 mb-6">
              <Badge
                variant="outline"
                className="rounded-sm text-[9px] uppercase tracking-widest border-blue-900/30 text-blue-400"
              >
                POST
              </Badge>
              <span className="text-xs font-mono text-memoria-text-hero">
                /api/v1/resume/score
              </span>
            </div>
            <p className="text-sm text-memoria-text-whisper font-light mb-8">
              Score a parsed resume against a specific job description.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
