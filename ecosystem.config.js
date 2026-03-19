module.exports = {
  apps: [{
    name: 'oma-ai-web',
    script: 'npm',
    args: 'run start -- -p 3000',
    cwd: '/root/oma-ai',
    env: {
      NODE_ENV: 'production',
      // All secrets are loaded from environment variables
      // See .env.local for local development
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    }
  }]
};
