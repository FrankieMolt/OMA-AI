import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthCallback() {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Auth error:', error);
    redirect('/login?error=auth_failed');
  }

  if (data.session) {
    redirect('/dashboard');
  }

  redirect('/login');
}
