import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Graceful fallback for missing Supabase credentials
// This allows the build to succeed and the site to work in demo mode
let supabaseClient: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

export const supabase = supabaseClient;
export const isSupabaseEnabled = !!supabaseClient;

// Helper function to check if Supabase is available
export function checkSupabaseAvailability() {
  if (!isSupabaseEnabled) {
    console.warn('Supabase is not configured. Running in demo mode.');
  }
  return isSupabaseEnabled;
}
