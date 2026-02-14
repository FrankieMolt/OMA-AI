import { Metadata } from 'next';
import ResumeBatchClient from './ResumeBatchClient';

export const metadata: Metadata = {
  title: 'Batch Processing - Scalable Resume Parsing | OMA-AI',
  description: 'Scalable neural parsing for large-scale candidate datasets. Process thousands of resumes in parallel with AI-powered extraction.',
  alternates: { canonical: '/resume/batch' },
};

export default function Page() {
  return <ResumeBatchClient />;
}
