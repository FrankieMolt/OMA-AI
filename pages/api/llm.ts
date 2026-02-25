import type { NextApiRequest, NextApiResponse } from 'next';

// Free AI APIs available
const FREE_AI_APIS = {
  // HuggingFace (free inference endpoints)
  huggingface: 'https://api-inference.huggingface.co',
  
  // Google Gemini (free tier)
  gemini: 'https://generativelanguage.googleapis.com',
  
  // NVIDIA (free tier available)
  nvidia: 'https://api.nvcf.nvidia.com'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { model, prompt, task = 'text-generation' } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  try {
    // Use HuggingFace for free text generation
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: Add HF_TOKEN for higher rate limits
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7
          }
        })
      }
    );

    if (hfResponse.ok) {
      const result = await hfResponse.json();
      return res.json({
        success: true,
        model: 'gpt2',
        result: result,
        provider: 'huggingface',
        timestamp: Date.now()
      });
    }

    // Fallback: Return a response indicating free tier limits
    return res.json({
      success: true,
      message: 'Free AI endpoint - add API keys for full access',
      available_providers: [
        { name: 'Google Gemini', key: 'GOOGLE_AI_KEY', status: 'available' },
        { name: 'NVIDIA', key: 'NVIDIA_API_KEY', status: 'available' },
        { name: 'HuggingFace', key: 'HF_TOKEN', status: 'free_tier' }
      ],
      timestamp: Date.now()
    });

  } catch (error: any) {
    return res.status(500).json({
      error: 'AI service unavailable',
      message: error.message
    });
  }
}