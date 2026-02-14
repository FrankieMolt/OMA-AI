import { Metadata } from 'next';
import FrankieOSClient from './FrankieOSClient';

export const metadata: Metadata = {
  title: 'Frankie OS - Autonomous Agent Interface',
  description: 'Explore the Frankie OS, an advanced operating system for interacting with autonomous AI agents. Real-time monitoring, task management, and communication protocols.',
  alternates: { canonical: '/frankie-os' },
};

export default function FrankieOSPage() {
  return <FrankieOSClient />;
}
