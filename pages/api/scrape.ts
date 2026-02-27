import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ScrapeRequest {
  url: string;
  selector?: string;
  extract?: 'text' | 'html' | 'links' | 'markdown';
  stealth?: boolean;
  wait?: number;
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
    const { url, selector, extract = 'text', stealth = false, wait = 0 } = req.body as ScrapeRequest;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid URL' });
    }

    // Build Python script
    const script = `
import json
import sys
from scrapling.fetchers import Fetcher, StealthyFetcher

url = "${url.replace(/"/g, '\\"')}"
selector = "${(selector || 'body').replace(/"/g, '\\"')}"
extract = "${extract}"
stealth = ${stealth}
wait = ${wait}

try:
    if stealth:
        page = StealthyFetcher.fetch(url, headless=True, network_idle=True)
    else:
        page = Fetcher.get(url, impersonate='chrome')
    
    result = {
        'url': url,
        'title': page.css('title::text').get() or '',
    }
    
    if extract == 'text':
        elements = page.css(selector)
        if len(elements) == 1:
            result['content'] = elements[0].text_content()
        else:
            result['content'] = [el.text_content() for el in elements]
    elif extract == 'html':
        elements = page.css(selector)
        if len(elements) == 1:
            result['content'] = elements[0].html_content()
        else:
            result['content'] = [el.html_content() for el in elements]
    elif extract == 'links':
        result['links'] = page.css('a::attr(href)').getall()
    elif extract == 'markdown':
        # Get main content
        main = page.css('main, article, .content, #content, body')
        if main:
            result['content'] = main[0].text_content()
    
    # Get metadata
    result['metadata'] = {}
    for meta in page.css('meta'):
        name = meta.attrib.get('name') or meta.attrib.get('property')
        content = meta.attrib.get('content')
        if name and content:
            result['metadata'][name] = content
    
    print(json.dumps({'success': True, 'data': result}))
except Exception as e:
    print(json.dumps({'success': False, 'error': str(e)}))
sys.exit(0)
`;

    // Execute Python script
    const venvPython = '/home/nosyt/.openclaw/workspace/scrapling-env/bin/python';
    const { stdout, stderr } = await execAsync(
      `"${venvPython}" -c '${script}'`,
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
