// lib/mcp-icons.ts — MCP server logo/favicon utilities
// Uses DuckDuckGo favicon API for server logos

const FAVICON_BASE = 'https://icons.duckduckgo.com/ip3';

// Map known MCP server names → their websites
const WEBSITE_MAP: Record<string, string> = {
  'Anthropic Claude MCP': 'anthropic.com',
  'OpenAI GPT MCP': 'openai.com',
  'Cohere Command MCP': 'cohere.com',
  'Stable Diffusion MCP': 'stability.ai',
  'PostgreSQL Query MCP': 'postgresql.org',
  'Redis Cache MCP': 'redis.io',
  'MongoDB Atlas MCP': 'mongodb.com',
  'CoinGecko Prices MCP': 'coingecko.com',
  'Jupiter Swap MCP': 'jup.ag',
  'Stock Market Data MCP': 'nasdaq.com',
  'GitHub MCP': 'github.com',
  'Stripe Payment MCP': 'stripe.com',
  'SendGrid Email MCP': 'sendgrid.com',
  'Twilio SMS MCP': 'twilio.com',
  'Google Calendar MCP': 'google.com',
  'Notion MCP': 'notion.so',
  'Slack MCP': 'slack.com',
  'Discord MCP': 'discord.com',
  'Figma MCP': 'figma.com',
  'Linear MCP': 'linear.app',
};

/**
 * Get a favicon URL for an MCP server
 * Falls back to category-based icon if no website known
 */
export function getMcpFaviconUrl(serverName: string): string {
  // Try to find website from name mapping
  const website = WEBSITE_MAP[serverName];
  if (website) {
    return `${FAVICON_BASE}/${website}.ico`;
  }
  
  // Try to extract known service names from server name
  const known = [
    'anthropic', 'openai', 'cohere', 'stability', 'postgresql', 'postgres',
    'redis', 'mongodb', 'coingecko', 'jupiter', 'jup', 'nasdaq', 'github',
    'stripe', 'sendgrid', 'twilio', 'google', 'notion', 'slack', 'discord',
    'figma', 'linear', 'claude', 'gpt', 'stable', 'diffusion', 'pokemon'
  ];
  
  const lower = serverName.toLowerCase();
  for (const kw of known) {
    if (lower.includes(kw)) {
      const domain = getDomainForKeyword(kw);
      if (domain) return `${FAVICON_BASE}/${domain}.ico`;
    }
  }
  
  return '';
}

function getDomainForKeyword(kw: string): string {
  const map: Record<string, string> = {
    anthropic: 'anthropic.com',
    claude: 'anthropic.com',
    openai: 'openai.com',
    gpt: 'openai.com',
    cohere: 'cohere.com',
    stability: 'stability.ai',
    stable: 'stability.ai',
    diffusion: 'stability.ai',
    postgresql: 'postgresql.org',
    postgres: 'postgresql.org',
    redis: 'redis.io',
    mongodb: 'mongodb.com',
    mongo: 'mongodb.com',
    coingecko: 'coingecko.com',
    jupiter: 'jup.ag',
    jup: 'jup.ag',
    nasdaq: 'nasdaq.com',
    stock: 'nasdaq.com',
    github: 'github.com',
    stripe: 'stripe.com',
    sendgrid: 'sendgrid.com',
    twilio: 'twilio.com',
    notion: 'notion.so',
    slack: 'slack.com',
    discord: 'discord.com',
    figma: 'figma.com',
    linear: 'linear.app',
    google: 'google.com',
    pokemon: 'pokemon.com',
  };
  return map[kw] || '';
}

/**
 * Get Google favicon URL (alternative)
 */
export function getGoogleFaviconUrl(domain: string, size: number = 128): string {
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return `https://s2.googleusercontent.com/s2/favicons?domain=${cleanDomain}&sz=${size}`;
}
