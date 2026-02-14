import { Metadata } from 'next';
import TasksClient from './TasksClient';

export const metadata: Metadata = {
  title: 'Bounties - OMA-AI Agent Tasks',
  description: 'Browse and claim bounties for building AI agent tools, MCP servers, and autonomous systems. USDC payments for completed work.',
  alternates: { canonical: '/tasks' },
};

export default function TasksPage() {
  return <TasksClient />;
}
