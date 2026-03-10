/**
 * OMA-AI Supabase Client
 * 
 * Database operations for OMA-AI platform
 * Optimized for free tier (5000 rows max)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ===========================================
// USER OPERATIONS
// ===========================================

/**
 * Get or create user by wallet address
 */
export async function getOrCreateUser(walletAddress: string) {
  if (!supabase) return null;
  
  // Try to find existing user
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();
  
  if (existing) return existing;
  
  // Create new user
  const { data: user, error } = await supabase
    .from('users')
    .insert({ wallet_address: walletAddress })
    .select()
    .single();
  
  if (error) throw error;
  return user;
}

/**
 * Get user by wallet
 */
export async function getUserByWallet(walletAddress: string) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();
  
  return error ? null : data;
}

// ===========================================
// API KEY OPERATIONS  
// ===========================================

/**
 * Generate API key for user
 */
export async function generateApiKey(userId: string, name: string) {
  if (!supabase) return null;
  
  // Generate random key
  const key = 'oma_' + Math.random().toString(36).substring(2, 15) + 
              Math.random().toString(36).substring(2, 15);
  
  // Hash the key for storage
  const keyHash = await hashKey(key);
  
  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      user_id: userId,
      key_hash: keyHash,
      name
    })
    .select()
    .single();
  
  if (error) throw error;
  
  return { ...data, key }; // Return full key only once
}

/**
 * Validate API key
 */
export async function validateApiKey(key: string) {
  if (!supabase) return null;
  
  const keyHash = await hashKey(key);
  
  const { data, error } = await supabase
    .from('api_keys')
    .select('*, users(*)')
    .eq('key_hash', keyHash)
    .eq('is_active', true)
    .single();
  
  if (error || !data) return null;
  
  // Update last_used
  await supabase
    .from('api_keys')
    .update({ last_used: new Date().toISOString() })
    .eq('id', data.id);
  
  return data;
}

/**
 * Hash API key for storage
 */
async function hashKey(key: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(key);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===========================================
// API CALL TRACKING
// ===========================================

/**
 * Log API call
 */
export async function logApiCall(
  userId: string, 
  endpoint: string, 
  method: string,
  statusCode: number,
  responseTimeMs: number,
  paymentAmount?: number
) {
  if (!supabase) return;
  
  // Check if approaching free tier limit
  const { count } = await supabase
    .from('api_calls')
    .select('*', { count: 'exact', head: true });
  
  if (count && count > 4500) {
    console.warn('Approaching free tier limit (5000 rows)');
  }
  
  await supabase
    .from('api_calls')
    .insert({
      user_id: userId,
      endpoint,
      method,
      status_code: statusCode,
      response_time_ms: responseTimeMs,
      payment_amount: paymentAmount || 0
    });
}

// ===========================================
// SKILLS/MCP OPERATIONS
// ===========================================

/**
 * List skills with pagination
 */
export async function listSkills(limit = 20, offset = 0) {
  if (!supabase) return [];
  
  const { data, error } = await supabase
    .from('skills')
    .select('*, users(wallet_address)')
    .order('installs', { ascending: false })
    .range(offset, offset + limit - 1);
  
  return error ? [] : data;
}

/**
 * Get skill by ID
 */
export async function getSkill(id: string) {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('skills')
    .select('*, users(wallet_address)')
    .eq('id', id)
    .single();
  
  return error ? null : data;
}

// ===========================================
// PAYMENTS/EARNINGS
// ===========================================

/**
 * Get user earnings
 */
export async function getUserEarnings(userId: string) {
  if (!supabase) return { total: 0, pending: 0, paid: 0 };
  
  const { data } = await supabase
    .from('payments')
    .select('*')
    .eq('publisher_id', userId);
  
  if (!data) return { total: 0, pending: 0, paid: 0 };
  
  return {
    total: data.reduce((sum, p) => sum + parseFloat(p.amount), 0),
    pending: data.filter(p => p.status === 'pending').reduce((sum, p) => sum + parseFloat(p.amount), 0),
    paid: data.filter(p => p.status === 'completed').reduce((sum, p) => sum + parseFloat(p.amount), 0)
  };
}

export default supabase;