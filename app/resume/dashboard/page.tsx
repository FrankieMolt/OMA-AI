/**
 * Resume Dashboard - Manage your resumes and analyses
 */

import { Metadata } from "next";
import Link from "next/link";
import { FileText, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume Dashboard | Manage Your Analyses",
  description:
    "View and manage all your resume analyses. Track scores, compare jobs, and optimize your profile for better matches.",
  alternates: {
    canonical: "/resume/dashboard",
  },
  openGraph: {
    title: "Resume Dashboard | OMA-AI",
    description: "Manage your resume analyses and job matches.",
    url: "https://oma-ai.com/resume/dashboard",
    type: "website",
  },
};

export default function ResumeDashboardPage() {
  const stats = [
    { label: "Resumes Uploaded", value: "0", icon: <FileText size={20} /> },
    {
      label: "Analyses Completed",
      value: "0",
      icon: <CheckCircle size={20} />,
    },
    { label: "Job Matches Found", value: "0", icon: <TrendingUp size={20} /> },
    { label: "Last Analysis", value: "Never", icon: <Clock size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark">
      {/* Header */}
      <section className="pt-48 pb-12 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-4 font-display text-memoria-text-hero">
            Resume Dashboard
          </h1>
          <p className="text-lg text-memoria-text-whisper max-w-2xl font-light">
            Track your resume analyses, view job match scores, and optimize your
            profile for better opportunities. All data securely encrypted and
            private.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-12 px-4 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="bg-memoria-bg-card border border-memoria-border-muted p-6"
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-memoria-bg-surface border border-memoria-border-default rounded">
                      {stat.icon}
                    </div>
                    <span className="text-[10px] text-memoria-text-meta uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-3xl font-black text-memoria-text-hero font-display">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-14 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-light text-memoria-text-hero mb-6 font-display">
            Start Your First Analysis
          </h2>
          <p className="text-base text-memoria-text-whisper mb-8 font-light">
            Upload your resume and let AI identify your strengths, find skill
            gaps, and match you with the best opportunities. Takes less than 30
            seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/resume/score" className="no-underline">
              <Button className="bg-memoria-text-hero text-memoria-bg-ultra-dark rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest hover:bg-memoria-text-secondary transition-all">
                Analyze Resume
              </Button>
            </Link>
            <Link href="/resume/batch" className="no-underline">
              <Button
                variant="outline"
                className="border-memoria-border-muted text-memoria-text-whisper hover:bg-memoria-bg-surface hover:text-memoria-text-hero rounded-sm px-8 h-14 text-xs font-bold uppercase tracking-widest transition-all"
              >
                Batch Process
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
