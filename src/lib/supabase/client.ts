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
      mcps: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          long_description: string | null
          category: string
          tags: string[]
          author_id: string | null
          repository_url: string | null
          homepage_url: string | null
          documentation_url: string | null
          image_url: string | null
          icon_url: string | null
          price_tier: string
          pricing: Json
          tools: Json
          version: string
          status: string
          is_official: boolean
          is_featured: boolean
          downloads: number
          rating: number | null
          review_count: number
          monthly_active_users: number
          total_calls: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          long_description?: string | null
          category: string
          tags?: string[]
          author_id?: string | null
          repository_url?: string | null
          homepage_url?: string | null
          documentation_url?: string | null
          image_url?: string | null
          icon_url?: string | null
          price_tier?: string
          pricing?: Json
          tools: Json
          version?: string
          status?: string
          is_official?: boolean
          is_featured?: boolean
          downloads?: number
          rating?: number | null
          review_count?: number
          monthly_active_users?: number
          total_calls?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          long_description?: string | null
          category?: string
          tags?: string[]
          author_id?: string | null
          repository_url?: string | null
          homepage_url?: string | null
          documentation_url?: string | null
          image_url?: string | null
          icon_url?: string | null
          price_tier?: string
          pricing?: Json
          tools?: Json
          version?: string
          status?: string
          is_official?: boolean
          is_featured?: boolean
          downloads?: number
          rating?: number | null
          review_count?: number
          monthly_active_users?: number
          total_calls?: number
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          mcp_id: string
          user_id: string
          rating: number
          title: string | null
          content: string | null
          helpful_count: number
          not_helpful_count: number
          is_deleted: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mcp_id: string
          user_id: string
          rating: number
          title?: string | null
          content?: string | null
          helpful_count?: number
          not_helpful_count?: number
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mcp_id?: string
          user_id?: string
          rating?: number
          title?: string | null
          content?: string | null
          helpful_count?: number
          not_helpful_count?: number
          is_deleted?: boolean
          created_at?: string
          updated_at?: string
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
