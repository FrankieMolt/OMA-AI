import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * Authentication Middleware
 * 
 * Validates API key or session token
 * Returns user data on success, 401/403 on failure
 */
export async function authenticate(
  request: NextRequest
): Promise<{ user: any; error: NextResponse | null }> {
  try {
    // Check for API key in header
    const apiKey = request.headers.get('x-api-key');
    
    // Check for session token
    const authHeader = request.headers.get('authorization');
    const sessionToken = authHeader?.replace('Bearer ', '');

    let user = null;

    // API Key auth
    if (apiKey && apiKey.startsWith('oma-')) {
      const encoder = new TextEncoder();
      const data = encoder.encode(apiKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data.buffer as ArrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const { data: keyData, error } = await supabase
        .from('api_keys')
        .select('*, users(*)')
        .eq('key_hash', keyHash)
        .eq('is_active', true)
        .single();

      if (!error && keyData) {
        user = keyData.users;
      }
    }

    // Session token auth
    if (!user && sessionToken) {
      try {
        const decoded = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
        
        if (decoded.expires > Date.now()) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.userId)
            .single();

          if (!error && data) {
            user = data;
          }
        }
      } catch (e) {
        // Invalid token
      }
    }

    if (!user) {
      return { 
        user: null, 
        error: NextResponse.json(
          { 
            error: 'Authentication required',
            message: 'Provide valid API key (x-api-key header) or session token (Authorization header)'
          },
          { status: 401 }
        )
      };
    }

    // Check if user is banned
    if ((user as any).banned_at) {
      return { 
        user: null, 
        error: NextResponse.json(
          { 
            error: 'Account suspended',
            message: 'Contact support@oma-ai.com'
          },
          { status: 403 }
        )
      };
    }

    return { user, error: null };

  } catch (error) {
    console.error('Auth middleware error:', error);
    return { 
      user: null, 
      error: NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    };
  }
}

/**
 * Optional Authentication
 * 
 * Attaches user if authenticated, but doesn't require it
 */
export async function optionalAuth(
  request: NextRequest
): Promise<{ user: any | null }> {
  try {
    const apiKey = request.headers.get('x-api-key');
    const authHeader = request.headers.get('authorization');
    const sessionToken = authHeader?.replace('Bearer ', '');

    let user = null;

    if (apiKey && apiKey.startsWith('oma-')) {
      const encoder = new TextEncoder();
      const data = encoder.encode(apiKey);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data.buffer as ArrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const { data: keyData } = await supabase
        .from('api_keys')
        .select('*, users(*)')
        .eq('key_hash', keyHash)
        .eq('is_active', true)
        .single();
      
      if (keyData) user = keyData.users;
    }

    if (!user && sessionToken) {
      try {
        const decoded = JSON.parse(Buffer.from(sessionToken, 'base64').toString());
        if (decoded.expires > Date.now()) {
          const { data } = await supabase
            .from('users')
            .select('*')
            .eq('id', decoded.userId)
            .single();
          
          if (data) user = data;
        }
      } catch (e) {}
    }

    return { user };

  } catch (error) {
    return { user: null };
  }
}

/**
 * Require Tier
 * 
 * Ensures user has required tier or higher
 */
export function requireTier(minTier: string) {
  const tierHierarchy = ['free', 'starter', 'pro', 'enterprise'];
  
  return (user: any): NextResponse | null => {
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const userTierIndex = tierHierarchy.indexOf((user as any).tier || 'free');
    const minTierIndex = tierHierarchy.indexOf(minTier);

    if (userTierIndex < minTierIndex) {
      return NextResponse.json(
        { 
          error: 'Upgrade required',
          message: `This feature requires ${minTier} tier or higher`,
          current_tier: (user as any).tier,
          required_tier: minTier
        },
        { status: 403 }
      );
    }

    return null;
  };
}
