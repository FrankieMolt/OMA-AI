import { Metadata } from 'next';
import ResumeScoreClient from './ResumeScoreClient';

export const metadata: Metadata = {
  title: 'Intelligence Score - AI Candidate Matching | OMA-AI',
  description: 'Evaluate candidate alignment with job requirements using semantic similarity models. AI-powered resume scoring and matching for precision hiring.',
  alternates: { canonical: '/resume/score' },
};

export default function Page() {
  return <ResumeScoreClient />;
}
