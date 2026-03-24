import { NextResponse } from 'next/server';

// Free embedding APIs - using Together AI or OpenAI-compatible endpoints
// For production, you'd want to use OpenAI, Cohere, or Azure OpenAI

interface EmbeddingRequest {
  text?: string;
  model?: string;
}

export async function POST(request: Request) {
  try {
    const body: EmbeddingRequest = await request.json();
    const { text, model = 'sentence-transformers/all-MiniLM-L6-v2' } = body;
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text parameter required' },
        { status: 400 }
      );
    }
    
    // Using Hugging Face Inference API (free tier available)
    // For production, replace with OpenAI/Cohere with proper API key
    const HF_TOKEN = process.env.HUGGING_FACE_TOKEN;
    
    if (HF_TOKEN) {
      // Use Hugging Face for real embeddings
      const hfResponse = await fetch(
        'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: text,
            options: { wait_for_model: true }
          })
        }
      );
      
      if (hfResponse.ok) {
        const embedding = await hfResponse.json();
        return NextResponse.json({
          success: true,
          embedding,
          model: 'sentence-transformers/all-MiniLM-L6-v2',
          dimensions: embedding.length
        });
      }
    }
    
    // Fallback: Use a simple hash-based deterministic embedding
    // This is NOT real embeddings but provides consistent output
    const simpleEmbedding = generateSimpleEmbedding(text);
    
    const responseJson = NextResponse.json({
      success: true,
      embedding: simpleEmbedding,
      model: 'simple-hash-fallback',
      dimensions: simpleEmbedding.length,
      warning: 'Using fallback embedding - configure HUGGING_FACE_TOKEN for real embeddings'
    });
    responseJson.headers.set('Access-Control-Allow-Origin', '*');
    responseJson.headers.set('Cache-Control', 'no-cache');
    return responseJson;
    
  } catch (error) {
    console.error('Embeddings API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate embeddings' },
      { status: 500 }
    );
  }
}

function generateSimpleEmbedding(text: string): number[] {
  // Simple deterministic embedding based on character codes
  const dim = 384;
  const embedding = new Array(dim).fill(0);
  
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    embedding[i % dim] += charCode / text.length;
    embedding[(i * 7) % dim] += charCode / text.length;
  }
  
  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  if (magnitude > 0) {
    for (let i = 0; i < dim; i++) {
      embedding[i] /= magnitude;
    }
  }
  
  return embedding;
}

// Also support GET for simple use cases
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  
  if (!text) {
    return NextResponse.json(
      { error: 'Text parameter required' },
      { status: 400 }
    );
  }
  
  return POST(request);
}
