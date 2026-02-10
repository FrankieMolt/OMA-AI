/**
 * URL Shortener Utility Functions
 * Base62 encoding for short codes, URL validation, and helper functions
 */

const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Convert a number to base62 string
 */
export function toBase62(num: number): string {
  if (num === 0) return BASE62_CHARS[0];
  
  let result = '';
  const base = BASE62_CHARS.length;
  
  while (num > 0) {
    result = BASE62_CHARS[num % base] + result;
    num = Math.floor(num / base);
  }
  
  return result;
}

/**
 * Convert base62 string to number
 */
export function fromBase62(str: string): number {
  let result = 0;
  const base = BASE62_CHARS.length;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const value = BASE62_CHARS.indexOf(char);
    if (value === -1) {
      throw new Error(`Invalid base62 character: ${char}`);
    }
    result = result * base + value;
  }
  
  return result;
}

/**
 * Generate a random short code of specified length
 */
export function generateShortCode(length: number = 7): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += BASE62_CHARS.charAt(Math.floor(Math.random() * BASE62_CHARS.length));
  }
  return result;
}

/**
 * Validate a URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Normalize a URL (add https if missing)
 */
export function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

/**
 * Extract domain from URL
 */
export function extractDomain(url: string): string {
  try {
    const parsed = new URL(normalizeUrl(url));
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Get the base URL for the application
 */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:3000';
}

/**
 * Build a short URL from a short code
 */
export function buildShortUrl(shortCode: string, customDomain?: string): string {
  if (customDomain) {
    return `https://${customDomain}/${shortCode}`;
  }
  return `${getBaseUrl()}/${shortCode}`;
}

/**
 * Parse user agent string to extract device info
 */
export function parseUserAgent(userAgent: string): {
  deviceType: string;
  browser: string;
  os: string;
} {
  const ua = userAgent.toLowerCase();
  
  // Device type
  let deviceType = 'desktop';
  if (/mobile|android|iphone|ipad|ipod/.test(ua)) {
    deviceType = /ipad/.test(ua) ? 'tablet' : 'mobile';
  } else if (/tablet|ipad/.test(ua)) {
    deviceType = 'tablet';
  }
  
  // Browser
  let browser = 'unknown';
  if (/chrome/.test(ua) && !/edg/.test(ua)) browser = 'chrome';
  else if (/safari/.test(ua) && !/chrome/.test(ua)) browser = 'safari';
  else if (/firefox/.test(ua)) browser = 'firefox';
  else if (/edg/.test(ua)) browser = 'edge';
  else if (/opera|opr/.test(ua)) browser = 'opera';
  else if (/trident|msie/.test(ua)) browser = 'ie';
  
  // OS
  let os = 'unknown';
  if (/windows/.test(ua)) os = 'windows';
  else if (/macintosh|mac os/.test(ua)) os = 'macos';
  else if (/linux/.test(ua)) os = 'linux';
  else if (/android/.test(ua)) os = 'android';
  else if (/ios|iphone|ipad|ipod/.test(ua)) os = 'ios';
  
  return { deviceType, browser, os };
}

/**
 * Check if a string is a valid short code format
 */
export function isValidShortCode(code: string): boolean {
  return /^[a-zA-Z0-9]{4,10}$/.test(code);
}

/**
 * Generate a unique short code using timestamp + random
 * This ensures uniqueness while keeping codes short
 */
export function generateUniqueShortCode(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  const combined = timestamp * 1000 + random;
  return toBase62(combined).slice(0, 7);
}
