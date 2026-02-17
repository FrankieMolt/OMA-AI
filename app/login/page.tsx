import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Sign In to OMA-AI | Access Your Agent Dashboard',
  description: 'Securely access your OMA-AI account. Manage API keys, monitor agent usage, track payments, and configure your autonomous agent fleet settings.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
