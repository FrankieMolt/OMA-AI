module.exports = {
  apps: [
    {
      name: 'oma-ai',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/nosyt/.openclaw/workspace',
      env: {
        PORT: 3000
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 5,
      min_uptime: '10s',
      error_file: '/home/nosyt/.pm2/logs/oma-ai-error.log',
      out_file: '/home/nosyt/.pm2/logs/oma-ai-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'spendthrone',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/nosyt/.openclaw/workspace/spendthrone',
      env: {
        PORT: 3001
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 5,
      min_uptime: '10s',
      error_file: '/home/nosyt/.pm2/logs/spendthrone-error.log',
      out_file: '/home/nosyt/.pm2/logs/spendthrone-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'lethometry',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/nosyt/.openclaw/workspace/lethometry',
      env: {
        PORT: 3002
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 5,
      min_uptime: '10s',
      error_file: '/home/nosyt/.pm2/logs/lethometry-error.log',
      out_file: '/home/nosyt/.pm2/logs/lethometry-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
