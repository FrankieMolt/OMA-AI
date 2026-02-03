'use client';

import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage, ChatTransport, UIMessageChunk, TextUIPart } from 'ai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mic, Send, StopCircle, Terminal, Volume2, Loader2 } from 'lucide-react';
import strings from '@/constants/text.json';

const transport: ChatTransport<UIMessage> = {
  async sendMessages({ messages, trigger, chatId, messageId, abortSignal }) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: abortSignal,
      body: JSON.stringify({ messages, trigger, chatId, messageId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.body as unknown as ReadableStream<UIMessageChunk>;
  },

  async reconnectToStream() {
    return null;
  },
};

function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => (part as TextUIPart).text)
    .join('');
}

export function AgentChat() {
  const [input, setInput] = useState('');
  const [initialMessages] = useState<Array<UIMessage>>([
    {
      id: 'system-1',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: strings.console.chat.system_init,
        },
      ],
    },
  ]);

  const { messages, sendMessage, status } = useChat({
    transport,
    messages: initialMessages,
  });

  const isLoading = status === 'streaming';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border/60 flex justify-between items-center">
        <h2 className="text-sm font-mono font-bold text-primary flex items-center gap-2">
          <Terminal className="size-4" />
          CORTEX_LINK
        </h2>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="destructive"
            className="h-7 text-xs font-mono tracking-wider"
            onClick={stop}
            disabled={!isLoading}
          >
            <StopCircle className="size-3 mr-2" />
            STOP_ACTUATION
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role !== 'user' && (
                <div className="size-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                  <Volume2 className="size-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 text-sm border ${
                  msg.role === 'user'
                    ? 'bg-primary/20 border-primary/30 text-foreground rounded-tr-none'
                    : 'bg-foreground/5 border-border/60 text-foreground/80 rounded-tl-none'
                }`}
              >
                {getMessageText(msg)}
                <div className="text-[10px] opacity-40 mt-1">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="size-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Loader2 className="size-4 text-primary animate-spin" />
              </div>
              <div className="bg-foreground/5 border-border/60 text-muted-foreground rounded-lg p-3 text-sm border rounded-tl-none">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/60 bg-foreground/5">
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="shrink-0 border-primary/50 text-primary hover:bg-primary/20 rounded-full size-10"
          >
            <Mic className="size-4" />
          </Button>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={strings.console.chat.input_placeholder}
            className="bg-background/40 border-border/60 focus-visible:ring-primary/50"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0 bg-primary hover:bg-primary/80 text-primary-foreground rounded-full size-10"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
