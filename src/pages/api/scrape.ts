import type { NextApiRequest, NextApiResponse } from 'next';

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
  message?: string;
  localEndpoint?: string;
}

// This API requires a local backend with Scrapling installed
// For cloud deployment, use the local endpoint: http://localhost:3003/api/scrape

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapeResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { url } = req.body as ScrapeRequest;

    if (!url) {
      return res.status(400).json({ success: false, error: 'URL is required' });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid URL' });
    }

    // Cloud deployment - return info about local endpoint
    return res.status(200).json({
      success: true,
      message: 'Scrape API requires local backend with Scrapling',
      localEndpoint: 'http://localhost:3003/api/scrape',
      data: {
        url,
        title: 'Use local endpoint for scraping',
        content: 'This endpoint is available on the local server at localhost:3003'
      }
    });

  } catch (error) {
    console.error('Scrape API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}
