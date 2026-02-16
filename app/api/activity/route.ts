import { NextResponse } from 'next/server'

// OpenClaw Activity API for LobsterBoard
export async function GET() {
  const activities = [
    { id: 1, type: 'message', source: 'telegram', text: 'Heartbeat received', timestamp: new Date().toISOString() },
    { id: 2, type: 'cron', source: 'scheduler', text: 'Daily backup completed', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, type: 'deployment', source: 'vercel', text: 'OMA-AI deployed successfully', timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: 4, type: 'session', source: 'main', text: 'Session started', timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: 5, type: 'task', source: 'agent', text: 'Site audit completed', timestamp: new Date(Date.now() - 14400000).toISOString() },
  ]
  
  return NextResponse.json({ 
    activities,
    count: activities.length,
    lastUpdated: new Date().toISOString()
  })
}
