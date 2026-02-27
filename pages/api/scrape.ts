import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ScrapeRequest {
  url: string;
  selector?: string;
  extract?: 'text' | 'html' | 'links' | 'markdown';
  stealth?: boolean;
}

interface ScrapeResponse {
  success: boolean;
  data?: {
    url: string;
    title?: string;
    content?: string | string[];
    links?: string[];
    metadata?: Record<string, string>;
  };
  error?: string;
  payment?: {
    verified: boolean;
    amount: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapeResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { url, selector = 'body', extract = 'text', stealth = false } = req.body as ScrapeRequest;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid URL' });
    }

    // Build parameters for Python script
    const params = JSON.stringify({ url, selector, extract, stealth });
    
    // Paths
    const venvPython = '/home/nosyt/.openclaw/workspace/scrapling-env/bin/python';
    const scriptPath = '/home/nosyt/.openclaw/workspace/oma-ai-repo/scripts/scrape.py';

    // Execute Python script with parameters
    const { stdout, stderr } = await execAsync(
      `${venvPython} ${scriptPath} '${params}'`,
      { timeout: 30000, maxBuffer: 10 * 1024 * 1024 }
    );

    if (stderr && !stdout) {
      console.error('Scrapling error:', stderr);
      return res.status(500).json({ success: false, error: 'Scraping failed' });
    }

    const result = JSON.parse(stdout.trim());
    
    if (!result.success) {
      return res.status(400).json(result);
    }

    // Check for x402 payment header
    const paymentHeader = req.headers['payment-signature'];
    
    return res.status(200).json({
      ...result,
      payment: paymentHeader ? { verified: true, amount: '1000' } : undefined
    });

  } catch (error) {
    console.error('Scrape API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
