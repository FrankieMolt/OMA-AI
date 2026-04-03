import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// True when env vars are real (not placeholders from .env.production)
function isConfigured(): boolean {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-project') &&
    !supabaseUrl.includes('undefined')
  );
}

let _supabase: SupabaseClient | null = null;
let _supabaseService: SupabaseClient | null = null;

// During runtime (Vercel deployment): env vars are set, returns real client
// During next build without env vars: returns null, callers must guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabase = isConfigured()
  ? (_supabase ??= createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    }))
  : (null as unknown as SupabaseClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const supabaseService = isConfigured()
  ? (_supabaseService ??= createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: false, autoRefreshToken: false },
    }))
  : (null as unknown as SupabaseClient);

export function handleSupabaseError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  context = 'Supabase operation'
) {
  console.error(`[${context}] Error:`, error);
  return { data: null, error, isGraceful: false };
}

// Primary client factory — use this in API routes (always prefer this over direct supabase import)
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes('your-project')) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export function isSupabaseConfigured(): boolean {
  return isConfigured();
}
