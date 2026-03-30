// Barrel file — re-exports all supabase utilities
// Internal modules split for maintainability:
//   config.ts   — client creation, env vars, error handling
//   types.ts    — Database schema types
//   api-keys.ts — validateApiKey

export { supabase, supabaseService, isSupabaseConfigured, handleSupabaseError, getSupabaseClient } from './config';
export type { Database, Json } from './types';
export { validateApiKey } from './api-keys';
