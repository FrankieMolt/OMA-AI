'use client';

import { useChat } from '@ai-sdk/react';
import type { UIMessage, ChatTransport, UIMessageChunk, TextUIPart } from 'ai';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Cpu, Database } from 'lucide-react';
import { MemorySidebar } from '@/components/dashboard/MemorySidebar';
type Message = UIMessage & {
  toolInvocations?: ToolInvocation[];
};

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

type ToolInvocation = {
  toolCallId: string;
  toolName: string;
  args?: {
    content?: string;
  };
  result?: unknown;
};
export default function ChatPage() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat({
    transport,
    messages: [],
  });

  const isLoading = status === 'streaming';

  const uiMessages = (messages || []) as Message[];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-background-dark overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        <div className="flex items-center justify-between p-4 border-b border-border/50 glass-panel">
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2 text-foreground">
              <Cpu className="w-5 h-5 text-primary" />
              OMA Prime Agent
            </h1>
            <span className="text-xs text-muted-foreground font-mono">
              Running on GPT-4o • Acontext Active • Encrypted
            </span>
          </div>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse shadow-[0_0_10px_hsl(var(--success)/0.5)]" />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="max-w-3xl mx-auto flex flex-col gap-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <Bot className="size-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">System Ready</h3>
                <p className="max-w-md mx-auto mb-8">
                  I have access to your local context folder and can store memories persistently.
                </p>
                <div className="grid grid-cols-2 gap-2 max-w-lg w-full">
                  {[
                    'Explain x402 protocol',
                    'Memorize this project structure',
                    'Generate a new agent component',
                    'Search memory for "wallet"',
                  ].map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      className="text-xs justify-start border-border/50 hover:bg-accent"
                      onClick={() => setInput(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {uiMessages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar
                  className={`size-8 border ${m.role === 'user' ? 'border-primary/20' : 'border-accent/20'}`}
                >
                  {m.role === 'user' ? (
                    <>
                      <AvatarImage src="/avatars/01.png" />
                      <AvatarFallback className="bg-primary/5 text-primary">
                        <User className="size-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/oma-logo.png" />
                      <AvatarFallback className="bg-accent/10 text-accent">
                        <Bot className="size-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <div
                  className={`flex flex-col gap-2 max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {getMessageText(m) && (
                    <div
                      className={`rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-foreground/5 border border-border/50 text-foreground/80'
                      }`}
                    >
                      {getMessageText(m)}
                    </div>
                  )}

                  {/* Tool Invocations Visualization */}
                  {(Array.isArray(m.toolInvocations)
                    ? (m.toolInvocations as ToolInvocation[])
                    : []
                  ).map((toolInvocation) => {
                    const toolCallId = toolInvocation.toolCallId;
                    const addResult = 'result' in toolInvocation; // Check if completed
                    const contentPreview =
                      typeof toolInvocation.args?.content === 'string'
                        ? toolInvocation.args.content
                        : '';
                    const resultCount = Array.isArray(toolInvocation.result)
                      ? toolInvocation.result.length
                      : undefined;

                    return (
                      <div key={toolCallId} className="w-full">
                        {toolInvocation.toolName === 'memorize' && (
                          <div className="bg-foreground/5 border border-primary/20 rounded-md p-3 text-xs font-mono w-full">
                            <div className="flex items-center gap-2 text-primary mb-2">
                              <Database className="w-3 h-3" />
                              <span>WRITING_MEMORY...</span>
                            </div>

                            <div className="opacity-70 p-2 bg-foreground/5 rounded mb-2">
                              &quot;{contentPreview.substring(0, 50)}...&quot;
                            </div>

                            {addResult && (
                              <div className="flex items-center gap-2 text-success mt-1">
                                <span className="w-2 h-2 rounded-full bg-success" />
                                Memory Saved
                              </div>
                            )}
                          </div>
                        )}

                        {toolInvocation.toolName === 'recall' && (
                          <div className="bg-foreground/5 border border-accent/20 rounded-md p-3 text-xs font-mono w-full">
                            <div className="flex items-center gap-2 text-accent mb-2">
                              <Database className="w-3 h-3" />
                              <span>READING_CONTEXT...</span>
                            </div>
                            {addResult && (
                              <div className="mt-1 opacity-60">
                                Found {resultCount ?? 0} memories
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex gap-4">
                <Avatar className="size-8 border border-accent/20">
                  <AvatarFallback className="bg-accent/10 text-accent">
                    <Bot className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-4 py-3 bg-surface border border-border/50 text-sm animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  Processing...
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border/50 glass-panel">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Interact with OMA Agent (e.g., 'Save my preferences for Solana dev')..."
              className="flex-1 bg-foreground/5 border-border/50 focus-visible:ring-primary/50 text-foreground placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              disabled={isLoading}
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Right Sidebar: Memory Visualizer */}
      <MemorySidebar />
    </div>
  );
}
