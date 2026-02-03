import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getServerSession } from 'next-auth';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { authOptions } = await import('@/lib/auth');
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response('OpenAI API key not configured', { status: 500 });
    }

    const openai = createOpenAI({
      apiKey,
    });

    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant on the OMA (OpenMarketAccess) platform. You help users discover and use AI agents, APIs, and tools. Be helpful, informative, and guide users to relevant marketplace listings when appropriate.`,
    };

    const result = await streamText({
      model: openai('gpt-4'),
      messages: [systemMessage, ...messages],
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
