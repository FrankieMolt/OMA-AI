import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn('WARNING: SUPABASE_URL not configured. Using graceful fallback.');
}

// Client for browser/public use (has RLS policies)
export const supabase = createClient(
  supabaseUrl || 'https://fallback.supabase.co',
  supabaseAnonKey || 'fallback-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  }
);

// Service client for server-side (bypasses RLS)
export const supabaseService = createClient(
  supabaseUrl || 'https://fallback.supabase.co',
  supabaseServiceKey || 'fallback-service-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
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

// Lightweight server-side Supabase client factory for API routes.
// Uses SERVICE_ROLE_KEY when available (bypasses RLS), falls back to ANON_KEY.
export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
