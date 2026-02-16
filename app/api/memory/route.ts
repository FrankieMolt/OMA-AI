import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MEMORY_DIR = path.join(process.cwd(), 'memory')

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const file = url.searchParams.get('file')
  
  try {
    if (file) {
      const filePath = path.join(MEMORY_DIR, file)
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8')
        return NextResponse.json({ file, content }, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        })
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404,
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
    }
    
    const files = fs.readdirSync(MEMORY_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => ({
        name: f,
        path: `/api/memory?file=${f}`,
        size: fs.statSync(path.join(MEMORY_DIR, f)).size,
        modified: fs.statSync(path.join(MEMORY_DIR, f)).mtime
      }))
      .sort((a, b) => b.modified.getTime() - a.modified.getTime())
    
    return NextResponse.json({ files, count: files.length }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { 
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  }
}
