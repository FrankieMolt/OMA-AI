import { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume Analysis - OMA-AI",
  description:
    "AI-powered resume parsing and job matching. Upload your resume for instant analysis and career recommendations.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return <ResumeClient />;
}
