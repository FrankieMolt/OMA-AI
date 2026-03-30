// Database types for OMA-AI Supabase schema

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
          id: string; email: string; username: string; display_name: string | null;
          bio: string | null; avatar_url: string | null; website_url: string | null;
          social_links: Json; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; email: string; username: string; display_name?: string | null;
          bio?: string | null; avatar_url?: string | null; website_url?: string | null;
          social_links?: Json; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; email?: string; username?: string; display_name?: string | null;
          bio?: string | null; avatar_url?: string | null; website_url?: string | null;
          social_links?: Json; created_at?: string; updated_at?: string;
        };
      };
      mcp_servers: {
        Row: {
          id: string; slug: string; name: string; category: string[];
          description: string; long_description: string | null; author: string;
          author_email: string | null; repository_url: string | null; website_url: string | null;
          documentation_url: string | null; logo_url: string | null; version: string | null;
          mcp_endpoint: string; transport: string; pricing_usdc: number;
          x402_enabled: boolean; verified: boolean; status: string;
          rating: number | null; total_calls: number; success_rate: number | null;
          tags: string[]; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; slug: string; name: string; category: string[];
          description: string; long_description?: string | null; author: string;
          author_email?: string | null; repository_url?: string | null; website_url?: string | null;
          documentation_url?: string | null; logo_url?: string | null; version?: string | null;
          mcp_endpoint: string; transport: string; pricing_usdc?: number;
          x402_enabled?: boolean; verified?: boolean; status?: string;
          rating?: number | null; total_calls?: number; success_rate?: number | null;
          tags?: string[]; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; slug?: string; name?: string; category?: string[];
          description?: string; long_description?: string | null; author?: string;
          author_email?: string | null; repository_url?: string | null; website_url?: string | null;
          documentation_url?: string | null; logo_url?: string | null; version?: string | null;
          mcp_endpoint?: string; transport?: string; pricing_usdc?: number;
          x402_enabled?: boolean; verified?: boolean; status?: string;
          rating?: number | null; total_calls?: number; success_rate?: number | null;
          tags?: string[]; created_at?: string; updated_at?: string;
        };
      };
      mcp_tools: {
        Row: {
          id: string; mcp_server_id: string; name: string; description: string;
          input_schema: Json; pricing_usdc: number; total_calls: number;
          success_rate: number | null; created_at: string;
        };
        Insert: {
          id?: string; mcp_server_id: string; name: string; description: string;
          input_schema?: Json; pricing_usdc?: number; total_calls?: number;
          success_rate?: number | null; created_at?: string;
        };
        Update: {
          id?: string; mcp_server_id?: string; name?: string; description?: string;
          input_schema?: Json; pricing_usdc?: number; total_calls?: number;
          success_rate?: number | null; created_at?: string;
        };
      };
      mcp_usage: {
        Row: {
          id: string; mcp_server_id: string; mcp_tool_id: string | null;
          user_id: string | null; call_success: boolean; error_message: string | null;
          response_time_ms: number | null; pricing_usdc: number; created_at: string;
        };
        Insert: {
          id?: string; mcp_server_id: string; mcp_tool_id?: string | null;
          user_id?: string | null; call_success: boolean; error_message?: string | null;
          response_time_ms?: number | null; pricing_usdc?: number; created_at?: string;
        };
        Update: {
          id?: string; mcp_server_id?: string; mcp_tool_id?: string | null;
          user_id?: string | null; call_success?: boolean; error_message?: string | null;
          response_time_ms?: number | null; pricing_usdc?: number; created_at?: string;
        };
      };
      mcp_reviews: {
        Row: {
          id: string; mcp_server_id: string; user_id: string; rating: number;
          review_text: string | null; created_at: string;
        };
        Insert: {
          id?: string; mcp_server_id: string; user_id: string; rating: number;
          review_text?: string | null; created_at?: string;
        };
        Update: {
          id?: string; mcp_server_id?: string; user_id?: string; rating?: number;
          review_text?: string | null; created_at?: string;
        };
      };
      transactions: {
        Row: {
          id: string; user_id: string; mcp_id: string | null; amount: number;
          currency: string; network: string; tx_hash: string | null;
          status: string; metadata: Json; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; user_id: string; mcp_id?: string | null; amount: number;
          currency?: string; network: string; tx_hash?: string | null;
          status?: string; metadata?: Json; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; user_id?: string; mcp_id?: string | null; amount?: number;
          currency?: string; network?: string; tx_hash?: string | null;
          status?: string; metadata?: Json; created_at?: string; updated_at?: string;
        };
      };
      x402_nonces: {
        Row: {
          id: string; user_id: string; nonce: string; amount: number;
          mcp_id: string | null; expires_at: string; used_at: string | null;
          signature: string | null; network: string; created_at: string;
        };
        Insert: {
          id?: string; user_id: string; nonce: string; amount: number;
          mcp_id?: string | null; expires_at: string; used_at?: string | null;
          signature?: string | null; network: string; created_at?: string;
        };
        Update: {
          id?: string; user_id?: string; nonce?: string; amount?: number;
          mcp_id?: string | null; expires_at?: string; used_at?: string | null;
          signature?: string | null; network?: string; created_at?: string;
        };
      };
      usage_stats: {
        Row: {
          id: string; mcp_id: string; user_id: string; endpoint: string | null;
          call_count: number; last_called_at: string | null; date: string;
          created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; mcp_id: string; user_id: string; endpoint?: string | null;
          call_count?: number; last_called_at?: string | null; date: string;
          created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; mcp_id?: string; user_id?: string; endpoint?: string | null;
          call_count?: number; last_called_at?: string | null; date?: string;
          created_at?: string; updated_at?: string;
        };
      };
      wallets: {
        Row: {
          id: string; user_id: string; network: string; address: string;
          is_primary: boolean; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; user_id: string; network: string; address: string;
          is_primary?: boolean; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; user_id?: string; network?: string; address?: string;
          is_primary?: boolean; created_at?: string; updated_at?: string;
        };
      };
      api_keys: {
        Row: {
          id: string; user_id: string; name: string; key_hash: string;
          scopes: string[]; rate_limit: number; last_used_at: string | null;
          expires_at: string | null; is_active: boolean; created_at: string;
        };
        Insert: {
          id?: string; user_id: string; name: string; key_hash: string;
          scopes?: string[]; rate_limit?: number; last_used_at?: string | null;
          expires_at?: string | null; is_active?: boolean; created_at?: string;
        };
        Update: {
          id?: string; user_id?: string; name?: string; key_hash?: string;
          scopes?: string[]; rate_limit?: number; last_used_at?: string | null;
          expires_at?: string | null; is_active?: boolean; created_at?: string;
        };
      };
      payouts: {
        Row: {
          id: string; user_id: string; mcp_id: string | null; amount: number;
          currency: string; network: string; wallet_address: string;
          tx_hash: string | null; status: string; period_start: string;
          period_end: string; metadata: Json; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; user_id: string; mcp_id?: string | null; amount: number;
          currency?: string; network: string; wallet_address: string;
          tx_hash?: string | null; status?: string; period_start: string;
          period_end: string; metadata?: Json; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; user_id?: string; mcp_id?: string | null; amount?: number;
          currency?: string; network?: string; wallet_address?: string;
          tx_hash?: string | null; status?: string; period_start?: string;
          period_end?: string; metadata?: Json; created_at?: string; updated_at?: string;
        };
      };
      notifications: {
        Row: {
          id: string; user_id: string; type: string; title: string;
          message: string | null; action_url: string | null; is_read: boolean;
          metadata: Json; created_at: string;
        };
        Insert: {
          id?: string; user_id: string; type: string; title: string;
          message?: string | null; action_url?: string | null; is_read?: boolean;
          metadata?: Json; created_at?: string;
        };
        Update: {
          id?: string; user_id?: string; type?: string; title?: string;
          message?: string | null; action_url?: string | null; is_read?: boolean;
          metadata?: Json; created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string; user_id: string | null; action: string;
          resource_type: string | null; resource_id: string | null;
          ip_address: string | null; user_agent: string | null;
          metadata: Json; created_at: string;
        };
        Insert: {
          id?: string; user_id?: string | null; action: string;
          resource_type?: string | null; resource_id?: string | null;
          ip_address?: string | null; user_agent?: string | null;
          metadata?: Json; created_at?: string;
        };
        Update: {
          id?: string; user_id?: string | null; action?: string;
          resource_type?: string | null; resource_id?: string | null;
          ip_address?: string | null; user_agent?: string | null;
          metadata?: Json; created_at?: string;
        };
      };
      user_settings: {
        Row: {
          id: string; user_id: string; email_notifications: boolean;
          push_notifications: boolean; marketing_emails: boolean;
          language: string; timezone: string; theme: string;
          created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; user_id: string; email_notifications?: boolean;
          push_notifications?: boolean; marketing_emails?: boolean;
          language?: string; timezone?: string; theme?: string;
          created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; user_id?: string; email_notifications?: boolean;
          push_notifications?: boolean; marketing_emails?: boolean;
          language?: string; timezone?: string; theme?: string;
          created_at?: string; updated_at?: string;
        };
      };
      mcp_categories: {
        Row: {
          id: string; slug: string; name: string; description: string | null;
          icon: string | null; parent_id: string | null; sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string; slug: string; name: string; description?: string | null;
          icon?: string | null; parent_id?: string | null; sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string; slug?: string; name?: string; description?: string | null;
          icon?: string | null; parent_id?: string | null; sort_order?: number;
          created_at?: string;
        };
      };
    };
  };
}
