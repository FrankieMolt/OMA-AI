import { Metadata } from 'next';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Compare MCP Tools | OMA-AI',
  description: 'Side-by-side comparison of MCP servers. Compare pricing, ratings, latency, and features to find the best tools for your AI agents.',
  keywords: ['MCP comparison', 'MCP tools', 'compare servers', 'agent tools'],
};

export default function ComparePage() {
  return <CompareClient />;
}
