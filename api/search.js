/**
 * OMA-AI Search API
 * Uses free SerpAPI or DuckDuckGo
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query required' });
  }
  
  try {
    // Use DuckDuckGo instant answer API (free)
    const response = await fetch(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1`
    );
    
    const data = await response.json();
    
    res.json({
      query: q,
      abstract: data.Abstract,
      source: data.AbstractSource,
      url: data.AbstractURL,
      image: data.Image,
      related: data.RelatedTopics?.slice(0, 5).map(t => ({
        text: t.Text,
        url: t.FirstURL
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
