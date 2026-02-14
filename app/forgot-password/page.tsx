import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Reset Password - OMA-AI',
  description: 'Reset your OMA-AI password to regain access to your account and manage your autonomous agents.',
  alternates: { canonical: '/forgot-password' },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
