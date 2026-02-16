import { NextResponse } from 'next/server'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const topic = body.topic || 'agentic web'
  
  return NextResponse.json({ 
    success: true, 
    message: `🔍 Research started on: ${topic}`,
    task: {
      id: `research-${Date.now()}`,
      topic,
      status: 'queued'
    }
  }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}
