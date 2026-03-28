import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

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
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Graceful error handler for Supabase operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleSupabaseError = (error: any, context: string = 'Supabase operation') => {
  console.error(`[${context}] Error:`, error);

  if (!isSupabaseConfigured()) {
    return {
      data: null,
      error: new Error('Supabase not configured. Please check environment variables.'),
      isGraceful: true,
    };
  }

  return { data: null, error, isGraceful: false };
};

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          website_url: string | null
          social_links: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          username: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          website_url?: string | null
          social_links?: Json
          created_at?: string
          updated_at?: string
        }
      }
      mcp_servers: {
        Row: {
          id: string
          slug: string
          name: string
          category: string[]
          description: string
          long_description: string | null
          author: string
          author_email: string | null
          repository_url: string | null
          website_url: string | null
          documentation_url: string | null
          logo_url: string | null
          version: string | null
          mcp_endpoint: string
          transport: string
          pricing_usdc: number
          x402_enabled: boolean
          verified: boolean
          status: string
          rating: number | null
          total_calls: number
          success_rate: number | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          category: string[]
          description: string
          long_description?: string | null
          author: string
          author_email?: string | null
          repository_url?: string | null
          website_url?: string | null
          documentation_url?: string | null
          logo_url?: string | null
          version?: string | null
          mcp_endpoint: string
          transport: string
          pricing_usdc?: number
          x402_enabled?: boolean
          verified?: boolean
          status?: string
          rating?: number | null
          total_calls?: number
          success_rate?: number | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          category?: string[]
          description?: string
          long_description?: string | null
          author?: string
          author_email?: string | null
          repository_url?: string | null
          website_url?: string | null
          documentation_url?: string | null
          logo_url?: string | null
          version?: string | null
          mcp_endpoint?: string
          transport?: string
          pricing_usdc?: number
          x402_enabled?: boolean
          verified?: boolean
          status?: string
          rating?: number | null
          total_calls?: number
          success_rate?: number | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      mcp_tools: {
        Row: {
          id: string
          mcp_server_id: string
          name: string
          description: string
          input_schema: Json
          pricing_usdc: number
          total_calls: number
          success_rate: number | null
          created_at: string
        }
        Insert: {
          id?: string
          mcp_server_id: string
          name: string
          description: string
          input_schema?: Json
          pricing_usdc?: number
          total_calls?: number
          success_rate?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          mcp_server_id?: string
          name?: string
          description?: string
          input_schema?: Json
          pricing_usdc?: number
          total_calls?: number
          success_rate?: number | null
          created_at?: string
        }
      }
      mcp_usage: {
        Row: {
          id: string
          mcp_server_id: string
          mcp_tool_id: string | null
          user_id: string | null
          call_success: boolean
          error_message: string | null
          response_time_ms: number | null
          pricing_usdc: number
          created_at: string
        }
        Insert: {
          id?: string
          mcp_server_id: string
          mcp_tool_id?: string | null
          user_id?: string | null
          call_success: boolean
          error_message?: string | null
          response_time_ms?: number | null
          pricing_usdc?: number
          created_at?: string
        }
        Update: {
          id?: string
          mcp_server_id?: string
          mcp_tool_id?: string | null
          user_id?: string | null
          call_success?: boolean
          error_message?: string | null
          response_time_ms?: number | null
          pricing_usdc?: number
          created_at?: string
        }
      }
      mcp_reviews: {
        Row: {
          id: string
          mcp_server_id: string
          user_id: string
          rating: number
          review_text: string | null
          created_at: string
        }
        Insert: {
          id?: string
          mcp_server_id: string
          user_id: string
          rating: number
          review_text?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          mcp_server_id?: string
          user_id?: string
          rating?: number
          review_text?: string | null
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          mcp_id: string | null
          amount: number
          currency: string
          network: string
          tx_hash: string | null
          status: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mcp_id?: string | null
          amount: number
          currency?: string
          network: string
          tx_hash?: string | null
          status?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mcp_id?: string | null
          amount?: number
          currency?: string
          network?: string
          tx_hash?: string | null
          status?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      x402_nonces: {
        Row: {
          id: string
          user_id: string
          nonce: string
          amount: number
          mcp_id: string | null
          expires_at: string
          used_at: string | null
          signature: string | null
          network: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nonce: string
          amount: number
          mcp_id?: string | null
          expires_at: string
          used_at?: string | null
          signature?: string | null
          network: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nonce?: string
          amount?: number
          mcp_id?: string | null
          expires_at?: string
          used_at?: string | null
          signature?: string | null
          network?: string
          created_at?: string
        }
      }
      usage_stats: {
        Row: {
          id: string
          mcp_id: string
          user_id: string
          endpoint: string | null
          call_count: number
          last_called_at: string | null
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mcp_id: string
          user_id: string
          endpoint?: string | null
          call_count?: number
          last_called_at?: string | null
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mcp_id?: string
          user_id?: string
          endpoint?: string | null
          call_count?: number
          last_called_at?: string | null
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          network: string
          address: string
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          network: string
          address: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          network?: string
          address?: string
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          name: string
          key_hash: string
          scopes: string[]
          rate_limit: number
          last_used_at: string | null
          expires_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          key_hash: string
          scopes?: string[]
          rate_limit?: number
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          key_hash?: string
          scopes?: string[]
          rate_limit?: number
          last_used_at?: string | null
          expires_at?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      payouts: {
        Row: {
          id: string
          user_id: string
          mcp_id: string | null
          amount: number
          currency: string
          network: string
          wallet_address: string
          tx_hash: string | null
          status: string
          period_start: string
          period_end: string
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mcp_id?: string | null
          amount: number
          currency?: string
          network: string
          wallet_address: string
          tx_hash?: string | null
          status?: string
          period_start: string
          period_end: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mcp_id?: string | null
          amount?: number
          currency?: string
          network?: string
          wallet_address?: string
          tx_hash?: string | null
          status?: string
          period_start?: string
          period_end?: string
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string | null
          action_url: string | null
          is_read: boolean
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message?: string | null
          action_url?: string | null
          is_read?: boolean
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string | null
          action_url?: string | null
          is_read?: boolean
          metadata?: Json
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          user_id: string | null
          action: string
          resource_type: string | null
          resource_id: string | null
          ip_address: string | null
          user_agent: string | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          action: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          action?: string
          resource_type?: string | null
          resource_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          metadata?: Json
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          email_notifications: boolean
          push_notifications: boolean
          marketing_emails: boolean
          language: string
          timezone: string
          theme: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email_notifications?: boolean
          push_notifications?: boolean
          marketing_emails?: boolean
          language?: string
          timezone?: string
          theme?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email_notifications?: boolean
          push_notifications?: boolean
          marketing_emails?: boolean
          language?: string
          timezone?: string
          theme?: string
          created_at?: string
          updated_at?: string
        }
      }
      mcp_categories: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          icon: string | null
          parent_id: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          sort_order?: number
          created_at?: string
        }
      }
    }
  }
}

// API key validation - queries the api_keys and users tables
export async function validateApiKey(apiKey: string) {
  if (!apiKey || !apiKey.startsWith('oma-')) {
    return null;
  }

  try {
    // Hash the API key to compare with stored hash
    const encoder = new TextEncoder();
    const data = encoder.encode(apiKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data.buffer as ArrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('*, users(*)')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !keyData) {
      return null;
    }

    // Check if key has expired
    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      return null;
    }

    // Get user data // eslint-disable-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = keyData.users as any;
    
    if (!user) {
      return null;
    }

    // Update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', keyData.id);

    return {
      api_key: {
        id: keyData.id,
        name: keyData.name,
        scopes: keyData.scopes,
        rate_limit: keyData.rate_limit,
      },
      users: {
        id: user.id,
        email: user.email,
        username: user.username,
        credits: user.credits || 0,
        bonus_credits: user.bonus_credits || 0,
        used_this_month: user.used_this_month || 0,
      }
    };
  } catch (error) {
    console.error('validateApiKey error:', error);
    return null;
  }
}

/**
 * Lightweight server-side Supabase client factory for API routes.
 * Uses SERVICE_ROLE_KEY when available (bypasses RLS), falls back to ANON_KEY.
 * Returns null if NEXT_PUBLIC_SUPABASE_URL is not set.
 */
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
