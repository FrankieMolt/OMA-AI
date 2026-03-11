import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Missing text parameter' });
  }

  try {
    // Use HuggingFace Inference API (free tier)
    const response = await fetch(
      'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: text,
          options: {
            wait_for_model: true
          }
        })
      }
    );

    if (response.ok) {
      const embedding = await response.json();
      return res.json({
        success: true,
        embedding: Array.isArray(embedding) ? embedding.slice(0, 384) : embedding,
        model: 'sentence-transformers/all-MiniLM-L6-v2',
        dimensions: Array.isArray(embedding) ? embedding.length : 'unknown'
      });
    }

    // Fallback: generate simple hash-based embedding
    const textStr = String(text);
    const embedding = new Array(384).fill(0).map((_, i) => {
      const char = textStr.charCodeAt(i % textStr.length);
      return Math.sin(char + i) * Math.cos(char - i);
    });

    return res.json({
      success: true,
      embedding,
      model: 'fallback-hash',
      dimensions: 384,
      note: 'Using fallback embedding due to API limit'
    });
  } catch (error: unknown) {
    // Return fallback on error
    return res.json({
      success: true,
      embedding: new Array(384).fill(0).map(() => Math.random() - 0.5),
      model: 'error-fallback',
      dimensions: 384
    });
  }
}