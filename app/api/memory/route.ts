import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MEMORY_DIR = path.join(process.cwd(), 'memory')

export async function GET(request: Request) {
  const url = new URL(request.url)
  const file = url.searchParams.get('file')
  
  try {
    if (file) {
      const filePath = path.join(MEMORY_DIR, file)
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8')
        return NextResponse.json({ file, content })
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
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
    
    return NextResponse.json({ files, count: files.length })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
