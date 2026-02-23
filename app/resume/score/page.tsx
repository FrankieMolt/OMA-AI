/**
 * Resume Score Page - Analyze resume against job requirements
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Score Analysis | Match Your Skills to Jobs",
  description:
    "Upload your resume and get an instant compatibility score against job requirements. AI-powered analysis helps you find the best opportunities.",
  alternates: {
    canonical: "/resume/score",
  },
  openGraph: {
    title: "Resume Score | OMA-AI",
    description: "AI-powered resume analysis and job matching.",
    url: "https://oma-ai.com/resume/score",
    type: "website",
  },
};

export default function ResumeScorePage() {
  return (
    <div className="min-h-screen bg-memoria-bg-ultra-dark flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-memoria-bg-card border border-memoria-border-muted rounded-lg p-12">
          <h1 className="text-4xl font-light text-memoria-text-hero mb-4 font-display">
            Resume Score Analysis
          </h1>
          <p className="text-lg text-memoria-text-whisper mb-8 font-light">
            AI-powered resume analysis coming soon. Upload your resume and get
            instant compatibility scores against job requirements.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Skill Extraction",
                desc: "Automatically identify and categorize all technical skills from your resume",
              },
              {
                title: "Gap Analysis",
                desc: "Compare your experience against job requirements and highlight gaps",
              },
              {
                title: "Match Scoring",
                desc: "Get a 0-100 score showing how well you fit each role",
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
