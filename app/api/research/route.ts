import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const topic = body.topic || 'agentic web'
    
    // Trigger research task (would normally spawn agent)
    const task = {
      id: `research-${Date.now()}`,
      topic,
      status: 'queued',
      timestamp: new Date().toISOString(),
      message: `Research task queued: ${topic}`
    }
    
    return NextResponse.json({ success: true, task })
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
