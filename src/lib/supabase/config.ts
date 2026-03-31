import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Client for browser (persistSession: true — used in credits/balance for user auth)
export const supabase = createClient(
  supabaseUrl || 'https://fallback.supabase.co',
  supabaseAnonKey || 'fallback-anon-key',
  {
    auth: { persistSession: true, autoRefreshToken: true },
  }
);

// Server-side client (no session persistence — used for all API route DB ops)
export const supabaseService = createClient(
  supabaseUrl || 'https://fallback.supabase.co',
  supabaseAnonKey || 'fallback-anon-key',
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);

// Check if Supabase is properly configured
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey);
}

// Graceful error handler for Supabase operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleSupabaseError(error: any, context: string = 'Supabase operation') {
  console.error(`[${context}] Error:`, error);

  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: new Error('Supabase not configured. Please check environment variables.'),
      isGraceful: true,
    };
  }

  return { data: null, error, isGraceful: false };
}

// Server-side client factory — use this in API routes for per-request isolation.
// NOTE: Currently backed by anon key (service role key expired — regenerate at
// supabase.com/dashboard → Settings → API if write-without-RLS is needed).
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}
