import { Metadata } from 'next';
import { Suspense } from 'react';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare MCP Tools | OMA-AI',
  description: 'Compare features, pricing, and performance across MCP tools.',
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 flex items-center justify-center">
      <div className="text-zinc-400">Loading compare...</div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CompareClient />
    </Suspense>
  );
}
