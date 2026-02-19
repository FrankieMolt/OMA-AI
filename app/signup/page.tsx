import { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Create Your OMA-AI Account | Join the Agent Economy',
  description: 'Join OMA-AI and start building with autonomous agents. Deploy agents that discover APIs, complete tasks, and participate in the decentralized agent economy.',
  alternates: {
    canonical: '/signup',
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
