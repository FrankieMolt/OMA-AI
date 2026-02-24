/**
 * OMA-AI Scrape API
 * Simple web scraping
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { url, selector } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Basic scraping - just return text content
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 10000);
    
    res.json({
      url,
      title: html.match(/<title>([^<]*)<\/title>/i)?.[1] || '',
      text: text.slice(0, 5000),
      length: text.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
