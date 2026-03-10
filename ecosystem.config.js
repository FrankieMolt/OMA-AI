module.exports = {
  apps: [
    {
      name: 'oma-ai',
      script: 'npm',
      args: 'run dev',
      cwd: '/home/nosyt/.openclaw/workspace',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000,
      min_uptime: '10s',
      max_restarts: 10,
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
        NODE_ENV: 'development',
        PORT: 3001
      },
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000,
      min_uptime: '10s',
      max_restarts: 10,
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
        NODE_ENV: 'development',
        PORT: 3002
      },
      watch: false,
      max_memory_restart: '1G',
      restart_delay: 4000,
      min_uptime: '10s',
      max_restarts: 10,
      error_file: '/home/nosyt/.pm2/logs/lethometry-error.log',
      out_file: '/home/nosyt/.pm2/logs/lethometry-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
}
