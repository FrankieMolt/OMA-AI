import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=1800');
  
  const { q, limit = '10' } = req.query;
  
  if (!q) {
    return res.json({ error: 'Missing query parameter q' });
  }
  
  try {
    // Use Exa for AI-powered search (free tier available)
    const response = await fetch(`https://api.exa.ai/search?query=${encodeURIComponent(q as string)}&limit=${limit}`, {
      headers: {
        'Authorization': process.env.EXA_API_KEY || ''
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return res.json({
        success: true,
        results: data.results || [],
        query: q
      });
    }
  } catch (e) {
    console.error('Search error:', e);
  }
  
  // Fallback mock data
  return res.json({
    success: true,
    results: [
      { title: `${q} - Result 1`, url: 'https://example.com/1', snippet: 'Relevant information about ' + q },
      { title: `${q} - Result 2`, url: 'https://example.com/2', snippet: 'More details on ' + q }
    ],
    query: q,
    source: 'fallback'
  });
}