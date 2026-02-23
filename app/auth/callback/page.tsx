'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data: { session }, error } = await supabase!.auth.getSession();
        
        if (error) throw error;

        if (session?.user) {
          // Create/update user record
          await supabase!.from('users').upsert({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
            avatar_url: session.user.user_metadata?.avatar_url,
          }, { onConflict: 'id' });

          router.push('/dashboard');
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-memoria-text-hero mx-auto mb-4"></div>
        <p className="text-memoria-text-whisper">Completing authentication...</p>
      </div>
    </div>
  );
}
