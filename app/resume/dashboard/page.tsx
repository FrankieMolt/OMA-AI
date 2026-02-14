import { Metadata } from 'next';
import ResumeDashboardClient from './ResumeDashboardClient';

export const metadata: Metadata = {
  title: 'Analytics Dashboard - AI Resume Metrics | OMA-AI',
  description: 'Monitor neural parsing performance and semantic matching metrics. Real-time analytics for AI-powered resume processing.',
  alternates: { canonical: '/resume/dashboard' },
};

export default function Page() {
  return <ResumeDashboardClient />;
}
