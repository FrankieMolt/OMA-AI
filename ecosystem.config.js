module.exports = {
  apps: [{
    name: 'oma-ai-web',
    script: 'npm',
    args: 'run start -- -p 3000',
    cwd: '/root/oma-ai',
    env: {
      NODE_ENV: 'production',
      SUPABASE_URL: 'http://localhost:54321',
      SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3NzM5MTg0MTEsImV4cCI6MTgwNTQ1NDQxMX0.qCmPZO3lUMTFrJSETzLWkaSTW1X1SojEizYc0t6qD8I',
      NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvY2FsaG9zdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzczOTE4MTM5LCJleHAiOjE4MDU0NTQxMzl9.HXQ44y4QRwMVFAsHdLGslYvHtO5Fa7FOQCwkB6r0cgg',
      NEXT_PUBLIC_APP_URL: 'https://www.oma-ai.com',
      JWT_SECRET: 'oma-ai-jwt-secret-key-change-in-production-2026',
    }
  }]
};
