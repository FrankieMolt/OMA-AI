module.exports = {
  apps: [{
    name: 'oma-ai-web',
    script: '/home/nosyt/oma-ai-repo/node_modules/.bin/next',
    args: 'start',
    cwd: '/home/nosyt/oma-ai-repo',
    exec_mode: 'fork',
    instances: 1,
    env: { NODE_ENV: 'production' }
  }]
}
