/**
 * Resume Batch Page - Process multiple resumes at once
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batch Resume Processing | Analyze Multiple Resumes",
  description:
    "Upload and analyze multiple resumes at once. Perfect for recruiters and HR teams processing multiple candidates.",
  alternates: {
    canonical: "/resume/batch",
  },
  openGraph: {
    title: "Batch Resume Processing | OMA-AI",
    description: "Process multiple resumes with AI-powered analysis.",
    url: "https://oma-ai.com/resume/batch",
    type: "website",
  },
};

export default function ResumeBatchPage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-memoria-bg-card border border-memoria-border-muted rounded-lg p-12">
          <h1 className="text-4xl font-light text-memoria-text-hero mb-4 font-display">
            Batch Resume Processing
          </h1>
          <p className="text-lg text-memoria-text-whisper mb-8 font-light">
            Process multiple resumes simultaneously with AI-powered analysis.
            Perfect for recruiters, HR teams, and high-volume hiring operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Bulk Upload",
                desc: "Upload up to 100 resumes in a single batch operation",
              },
              {
                title: "Parallel Processing",
                desc: "All resumes analyzed simultaneously for faster turnaround",
              },
              {
                title: "Export Results",
                desc: "Download detailed reports in CSV or JSON format",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-memoria-bg-ultra-dark border border-memoria-border-default p-6 rounded"
              >
                <h3 className="text-base font-bold text-memoria-text-hero mb-2 uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-sm text-memoria-text-whisper font-light">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <button className="bg-memoria-text-whisper/20 text-memoria-text-whisper border border-memoria-border-muted rounded px-8 py-3 text-xs font-bold uppercase tracking-widest cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
