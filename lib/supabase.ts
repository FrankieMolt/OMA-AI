import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Re-export createClient for use in other modules
export { createSupabaseClient };
export type { SupabaseClient };

// Factory function that creates a client with default env vars
export function createClient(): SupabaseClient {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Check your environment variables.');
  }
  return supabaseClient;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if the Supabase key looks valid (should not be a placeholder)
const isValidKey = (key: string): boolean => {
  // Must start with eyJ (JWT header)
  // Must not contain "example" or "demo" placeholders
  return key.startsWith('eyJ') && 
         !key.toLowerCase().includes('example') && 
         !key.toLowerCase().includes('demo') &&
         !key.toLowerCase().includes('placeholder');
};

// Check if URL looks valid
const isValidUrl = (url: string): boolean => {
  return url.startsWith('https://') && 
         url.includes('.supabase.co') &&
         !url.includes('example');
};

// Graceful fallback for missing or invalid Supabase credentials
// This allows the build to succeed and the site to work in demo mode
let supabaseClient: SupabaseClient | null = null;
let supabaseHealthStatus: 'unknown' | 'healthy' | 'unhealthy' = 'unknown';

if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)) {
  try {
    supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabaseHealthStatus = 'unhealthy';
  }
} else {
  if (supabaseUrl || supabaseAnonKey) {
    console.warn('Supabase credentials appear to be invalid or placeholder values. Running in demo mode.');
  }
  supabaseHealthStatus = 'unhealthy';
}

export const supabase = supabaseClient;
export const isSupabaseEnabled = !!supabaseClient && supabaseHealthStatus !== 'unhealthy';

// Helper function to check if Supabase is available
export function checkSupabaseAvailability() {
  if (!isSupabaseEnabled) {
    console.warn('Supabase is not configured. Running in demo mode.');
  }
  return isSupabaseEnabled;
}

// Helper to safely handle Supabase errors and return demo data fallback
export function handleSupabaseError(error: any, demoData: any): { error: string } | any {
  console.error('Supabase error:', error);
  
  // If it's an auth error or connection error, return demo data
  if (error?.message?.includes('Invalid API key') || 
      error?.message?.includes('JWT') ||
      error?.code === 'PGRST301' ||
      !supabaseClient) {
    console.warn('Supabase authentication failed. Returning demo data.');
    return demoData;
  }
  
  // For other errors, return the error
  return { error: error?.message || 'Database error' };
}
