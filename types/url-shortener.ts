/**
 * Types for URL Shortener Service
 */

export interface Link {
  id: string;
  short_code: string;
  original_url: string;
  created_at: string;
  clicks: number;
  user_id: string | null;
  custom_domain: string | null;
  title: string | null;
  description: string | null;
  is_active: boolean;
}

export interface LinkClick {
  id: string;
  link_id: string;
  clicked_at: string;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  country: string | null;
  city: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
}

export interface LinkWithStats extends Link {
  click_stats: {
    total_clicks: number;
    unique_visitors: number;
    clicks_by_day: { date: string; count: number }[];
    clicks_by_country: { country: string; count: number }[];
    clicks_by_device: { device: string; count: number }[];
    clicks_by_browser: { browser: string; count: number }[];
  };
}

export interface CreateLinkInput {
  original_url: string;
  custom_code?: string;
  custom_domain?: string;
  title?: string;
  description?: string;
}

export interface ShortenResponse {
  success: boolean;
  data?: {
    short_code: string;
    short_url: string;
    original_url: string;
    created_at: string;
  };
  error?: string;
}

export interface StatsResponse {
  success: boolean;
  data?: {
    link: Link;
    stats: {
      total_clicks: number;
      unique_visitors: number;
      clicks_by_day: { date: string; count: number }[];
      clicks_by_country: { country: string; count: number }[];
      clicks_by_device: { device: string; count: number }[];
      clicks_by_browser: { browser: string; count: number }[];
      recent_clicks: LinkClick[];
    };
  };
  error?: string;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  limits: {
    links_per_month: number;
    clicks_tracked: string;
    custom_domains: number;
    team_members: number;
  };
  popular?: boolean;
}
