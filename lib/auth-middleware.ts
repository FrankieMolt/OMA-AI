import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

/**
 * Authentication Middleware
 * 
 * Validates API key or session token
 * Attaches user to request
 */
export async function authenticate(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (user: any) => Promise<void>
) {
  try {
    // Check for API key in header
    const apiKey = req.headers['x-api-key'] as string;
    
    // Check for session token
    const authHeader = req.headers['authorization'] as string;
    const sessionToken = authHeader?.replace('Bearer ', '');

    let user = null;

    // API Key auth
    if (apiKey && apiKey.startsWith('oma-')) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('api_key', apiKey)
        .single();

      if (!error && data) {
        user = data;
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
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Provide valid API key (x-api-key header) or session token (Authorization header)'
      });
    }

    // Check if user is active
    if (user.banned_at) {
      return res.status(403).json({ 
        error: 'Account suspended',
        message: 'Contact support@oma-ai.com'
      });
    }

    // Attach user to request
    (req as any).user = user;

    // Continue to next handler
    await next(user);

  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed' 
    });
  }
}

/**
 * Optional Authentication
 * 
 * Attaches user if authenticated, but doesn't require it
 */
export async function optionalAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  next: (user: any | null) => Promise<void>
) {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    const authHeader = req.headers['authorization'] as string;
    const sessionToken = authHeader?.replace('Bearer ', '');

    let user = null;

    if (apiKey && apiKey.startsWith('oma-')) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('api_key', apiKey)
        .single();
      
      if (data) user = data;
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

    (req as any).user = user;
    await next(user);

  } catch (error) {
    await next(null);
  }
}

/**
 * Require Tier
 * 
 * Ensures user has required tier or higher
 */
export function requireTier(minTier: string) {
  const tierHierarchy = ['free', 'starter', 'pro', 'enterprise'];
  
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => Promise<void>
  ) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const userTierIndex = tierHierarchy.indexOf(user.tier);
    const minTierIndex = tierHierarchy.indexOf(minTier);

    if (userTierIndex < minTierIndex) {
      return res.status(403).json({ 
        error: 'Upgrade required',
        message: `This feature requires ${minTier} tier or higher`,
        current_tier: user.tier,
        required_tier: minTier
      });
    }

    await next();
  };
}
