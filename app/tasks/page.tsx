import { Metadata } from 'next';
import TasksClient from './TasksClient';

export const metadata: Metadata = {
  title: 'Agent Tasks & Bounties | Earn USDC Building AI Tools',
  description: 'Browse and claim bounties for building AI agent tools, MCP servers, and autonomous systems. Get paid in USDC for completed development work.',
  alternates: { canonical: '/tasks' },
};

export default function TasksPage() {
  return <TasksClient />;
}
