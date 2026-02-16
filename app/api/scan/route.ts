import { NextResponse } from 'next/server'
import { execSync } from 'child_process'

export async function POST() {
  const results: any = {
    timestamp: new Date().toISOString(),
    sites: [],
    system: {},
    actions: []
  }
  
  // Scan production sites
  const sites = [
    { name: 'OMA-AI', url: 'https://oma-ai.com' },
    { name: 'SpendThrone', url: 'https://spendthrone-olive.vercel.app' },
    { name: 'Lethometry', url: 'https://lethometry.vercel.app' }
  ]
  
  for (const site of sites) {
    try {
      const start = Date.now()
      const status = execSync(`curl -s -o /dev/null -w "%{http_code}" --max-time 10 ${site.url}`, { encoding: 'utf8' })
      const time = Date.now() - start
      results.sites.push({ 
        name: site.name, 
        url: site.url, 
        status: status.trim(),
        responseTime: `${time}ms`,
        healthy: status.trim() === '200'
      })
    } catch (e) {
      results.sites.push({ name: site.name, url: site.url, status: 'ERROR', healthy: false })
    }
  }
  
  // System stats
  results.system = {
    hostname: execSync('hostname').toString().trim(),
    uptime: execSync('uptime -p').toString().trim(),
    memory: execSync("free -h | grep Mem | awk '{print $3\"/\"$2}'").toString().trim(),
    disk: execSync("df -h / | tail -1 | awk '{print $3\"/\"$2\" (\"$5\")\"}'").toString().trim(),
    load: execSync("cat /proc/loadavg | awk '{print $1,$2,$3}'").toString().trim()
  }
  
  // Log action
  results.actions.push({
    type: 'scan',
    status: 'completed',
    timestamp: new Date().toISOString()
  })
  
  return NextResponse.json({ success: true, results })
}
