import { NextRequest, NextResponse } from 'next/server';

const mockModels = [
  {
    id: 'openai/gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: "OpenAI's most advanced model with 128k context window",
    pricing: {
      input: 0.00001,
      output: 0.00003,
    },
    contextLength: 128000,
    capabilities: ['chat', 'code', 'analysis', 'vision'],
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    description: "Anthropic's latest model with superior reasoning",
    pricing: {
      input: 0.000003,
      output: 0.000015,
    },
    contextLength: 200000,
    capabilities: ['chat', 'code', 'analysis', 'long-context'],
  },
  {
    id: 'google/gemini-pro',
    name: 'Gemini Pro',
    description: "Google's multimodal AI model",
    pricing: {
      input: 0.000001,
      output: 0.000004,
    },
    contextLength: 917280,
    capabilities: ['chat', 'code', 'vision', 'multimodal'],
  },
  {
    id: 'meta-llama/llama-3.2-90b-vision-instruct',
    name: 'Llama 3.2 90B Vision',
    description: "Meta's open-source multimodal model",
    pricing: {
      input: 0.000001,
      output: 0.000001,
    },
    contextLength: 128000,
    capabilities: ['chat', 'code', 'vision', 'multimodal'],
  },
  {
    id: 'mistralai/mistral-large',
    name: 'Mistral Large',
    description: "Mistral's flagship model with strong multilingual support",
    pricing: {
      input: 0.000004,
      output: 0.000012,
    },
    contextLength: 128000,
    capabilities: ['chat', 'code', 'analysis', 'multilingual'],
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const capability = searchParams.get('capability');
  const search = searchParams.get('search');

  let filtered = [...mockModels];

  if (capability) {
    filtered = filtered.filter((m) => m.capabilities.includes(capability));
  }

  if (search) {
    const lowerSearch = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.name.toLowerCase().includes(lowerSearch) ||
        m.description.toLowerCase().includes(lowerSearch)
    );
  }

  return NextResponse.json({
    models: filtered,
    total: filtered.length,
    capabilities: [
      'chat',
      'code',
      'analysis',
      'vision',
      'multimodal',
      'long-context',
      'multilingual',
    ],
  });
}
