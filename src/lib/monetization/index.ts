/**
 * OMA-AI Monetization Library
 * Handles per-call pricing, subscriptions, credits, and license keys
 */

import { randomBytes } from 'crypto';

// =====================================================
// CREDIT SYSTEM
// =====================================================

export interface CreditsPackage {
  id: string;
  name: string;
  credits: number;
  price_usd: number;
  bonus_credits: number;
}

export const DEFAULT_CREDITS_PACKAGES: CreditsPackage[] = [
  { id: 'starter', name: 'Starter', credits: 100, price_usd: 10, bonus_credits: 0 },
  { id: 'basic', name: 'Basic', credits: 500, price_usd: 45, bonus_credits: 25 },
  { id: 'pro', name: 'Pro', credits: 1000, price_usd: 80, bonus_credits: 100 },
  { id: 'business', name: 'Business', credits: 5000, price_usd: 350, bonus_credits: 500 },
];

export function calculateCreditsCost(credits: number, packageId?: string): number {
  if (!packageId) return credits;
  
  const pkg = DEFAULT_CREDITS_PACKAGES.find(p => p.id === packageId);
  if (!pkg) return credits;
  
  // Apply bonus credits
  return credits + pkg.bonus_credits;
}

// =====================================================
// PER-CALL PRICING
// =====================================================

export interface MCPPriceConfig {
  mcp_id: string;
  price_per_call: number; // in micro-USDC
  price_model: 'free' | 'per_call' | 'subscription';
  monthly_price?: number;
}

export function calculatePerCallPrice(microUnits: number): string {
  return `$${(microUnits / 1_000_000).toFixed(6)}`;
}

export function parsePriceToMicroUnits(priceString: string): number {
  const match = priceString.match(/\$?([\d.]+)/);
  if (!match) return 0;
  return Math.round(parseFloat(match[1]) * 1_000_000);
}

// =====================================================
// LICENSE KEY GENERATION
// =====================================================

export function generateLicenseKey(prefix: string = 'OMA'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const bytes = randomBytes(16);
  const randomPart = Array.from(bytes, b => chars[b % chars.length]).join('');
  
  // Format: OMA-XXXX-XXXX-XXXX-XXXX
  const formatted = randomPart.match(/.{1,4}/g)?.join('-') || randomPart;
  return `${prefix}-${formatted}`;
}

export function hashLicenseKey(key: string): string {
  // Simple hash for storage (in production, use proper crypto)
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    const char = key.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

// =====================================================
// USAGE TRACKING
// =====================================================

export interface UsageRecord {
  api_key_id: string;
  mcp_id: string;
  tool_name: string;
  credits_used: number;
  latency_ms: number;
  success: boolean;
  error_message?: string;
}

export async function recordUsage(record: UsageRecord): Promise<void> {
  // In production, this would write to the database
  // TODO: Implement database insertion
}

export function calculateCreditsForTokens(inputTokens: number, outputTokens: number): number {
  // Simple calculation: 1 credit per 1000 tokens
  const totalTokens = inputTokens + outputTokens;
  return Math.ceil(totalTokens / 1000);
}

// =====================================================
// SUBSCRIPTION MANAGEMENT
// =====================================================

export interface SubscriptionPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  features: string[];
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price_monthly: 0,
    price_yearly: 0,
    features: ['5 MCPs per month', 'Basic support', 'Community access']
  },
  {
    id: 'pro',
    name: 'Pro',
    price_monthly: 29,
    price_yearly: 290,
    features: ['100 MCPs per month', 'Priority support', 'API access', 'Custom MCPs']
  },
  {
    id: 'business',
    name: 'Business',
    price_monthly: 99,
    price_yearly: 990,
    features: ['Unlimited MCPs', '24/7 support', 'Dedicated infrastructure', 'Custom SLAs']
  }
];

// =====================================================
// REVENUE CALCULATION
// =====================================================

export interface RevenueShareConfig {
  platform_fee_percent: number;
  creator_fee_percent: number;
}

export const DEFAULT_REVENUE_SHARE: RevenueShareConfig = {
  platform_fee_percent: 15,
  creator_fee_percent: 85,
};

export function calculateRevenueSplit(
  amount: number,
  config: RevenueShareConfig = DEFAULT_REVENUE_SHARE
): { platform: number; creator: number } {
  const platformAmount = Math.round(amount * (config.platform_fee_percent / 100));
  const creatorAmount = amount - platformAmount;
  return { platform: platformAmount, creator: creatorAmount };
}

// =====================================================
// WEBHOOK HANDLING
// =====================================================

export interface WebhookEvent {
  id: string;
  type: 'purchase' | 'subscription_created' | 'subscription_cancelled' | 'license_activated';
  data: Record<string, unknown>;
}

export async function sendWebhook(
  url: string,
  secret: string,
  event: WebhookEvent
): Promise<boolean> {
  try {
    const signature = await createWebhookSignature(JSON.stringify(event), secret);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': event.type,
      },
      body: JSON.stringify(event),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Webhook failed:', error);
    return false;
  }
}

function createWebhookSignature(payload: string, secret: string): string {
  // In production, use proper HMAC
  const encoder = new TextEncoder();
  const data = encoder.encode(payload + secret);
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash) + data[i];
    hash = hash & hash;
  }
  return `sha256=${Math.abs(hash).toString(16)}`;
}

// =====================================================
// EXPORT ALL
// =====================================================

const monetizationExports = {
  DEFAULT_CREDITS_PACKAGES,
  calculateCreditsCost,
  calculatePerCallPrice,
  parsePriceToMicroUnits,
  generateLicenseKey,
  hashLicenseKey,
  recordUsage,
  calculateCreditsForTokens,
  SUBSCRIPTION_PLANS,
  DEFAULT_REVENUE_SHARE,
  calculateRevenueSplit,
  sendWebhook,
};

export default monetizationExports;
