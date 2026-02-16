import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Trigger deployment to Vercel
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    // Deploy to Vercel
    await execPromise('vercel --prod --yes --force', {
      env: { ...process.env, VERCEL_TOKEN: process.env.VERCEL_TOKEN || 'QyhX0ndRnOOmiv4uyc3JfCrr' }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: '🚀 Deployment triggered successfully!' 
    });
  } catch (error: unknown) {
    return NextResponse.json({ 
      success: false, 
      message: `❌ Deployment failed: ${(error as Error).message}` 
    }, { status: 500 });
  }
}
