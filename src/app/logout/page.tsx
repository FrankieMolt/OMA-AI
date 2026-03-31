import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Logging Out',
  description: 'Signing out of your OMA-AI account.',
};

export default async function LogoutPage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error logging out:', error);
  }

  redirect('/login');
}
