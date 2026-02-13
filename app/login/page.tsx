import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Sign In - OMA-AI',
  description: 'Secure access to your autonomous agent fleet. Manage API keys, monitor usage, and configure payment methods.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <LoginClient />;
}
