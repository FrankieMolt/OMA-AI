import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | OMA-AI',
  description: 'Manage your OMA-AI profile, account settings, and preferences.',
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
