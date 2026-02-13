import { Metadata } from 'next';
import SignupClient from './SignupClient';

export const metadata: Metadata = {
  title: 'Create Account - OMA-AI',
  description: 'Join the decentralized workforce. Deploy agents that can earn, spend, and build value autonomously.',
  alternates: {
    canonical: '/signup',
  },
};

export default function SignupPage() {
  return <SignupClient />;
}
