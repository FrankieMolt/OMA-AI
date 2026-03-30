import { supabase } from './config';

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
      },
    };
  } catch (error) {
    console.error('validateApiKey error:', error);
    return null;
  }
}
