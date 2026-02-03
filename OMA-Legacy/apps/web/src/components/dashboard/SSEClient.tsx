'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface SSEMessage<T = unknown> {
  type: 'activity' | 'balance' | 'agent' | 'system' | 'notification' | 'transaction';
  data: T;
  timestamp: string;
}

export interface SSEClientOptions {
  /** Endpoint to connect to */
  endpoint: string;
  /** Event types to listen for */
  events?: string[];
  /** Reconnection interval in ms (default: 3000) */
  reconnectInterval?: number;
  /** Max reconnection attempts (default: 5) */
  maxReconnectAttempts?: number;
  /** Auto-connect on mount (default: true) */
  autoConnect?: boolean;
  /** On message callback */
  onMessage?: (message: SSEMessage) => void;
  /** On error callback */
  onError?: (error: Event) => void;
  /** On connection close callback */
  onClose?: () => void;
  /** On connection open callback */
  onOpen?: () => void;
}

export function useSSEClient<T = unknown>(options: SSEClientOptions) {
  const {
    endpoint,
    events = ['activity', 'balance', 'agent', 'system', 'notification', 'transaction'],
    reconnectInterval = 3000,
    maxReconnectAttempts = 5,
    autoConnect = true,
    onMessage,
    onError,
    onOpen,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastMessage, setLastMessage] = useState<SSEMessage<T> | null>(null);
  const [messages, setMessages] = useState<SSEMessage<T>[]>([]);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const connect = useCallback(
    function connect() {
      if (eventSourceRef.current?.readyState === EventSource.OPEN) {
        return;
      }

      try {
        const eventSource = new EventSource(endpoint);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          if (!mountedRef.current) return;
          setIsConnected(true);
          setReconnectAttempts(0);
          onOpen?.();
        };

        eventSource.onerror = (error) => {
          if (!mountedRef.current) return;
          setIsConnected(false);
          onError?.(error);

          // Attempt to reconnect
          if (reconnectAttempts < maxReconnectAttempts) {
            reconnectTimeoutRef.current = setTimeout(() => {
              if (mountedRef.current) {
                setReconnectAttempts((prev) => prev + 1);
                connect();
              }
            }, reconnectInterval);
          } else {
            toast.error('Connection lost', {
              description: 'Unable to establish real-time connection. Please refresh the page.',
            });
          }
        };

        events.forEach((eventType) => {
          eventSource.addEventListener(eventType, (event: Event) => {
            if (!mountedRef.current) return;

            try {
              const messageEvent = event as MessageEvent;
              const data: SSEMessage<T> = JSON.parse(messageEvent.data);

              setLastMessage(data);
              setMessages((prev) => [data, ...prev].slice(0, 100)); // Keep last 100 messages
              onMessage?.(data);
            } catch (error) {
              console.error('Failed to parse SSE message:', error);
            }
          });
        });
      } catch (error) {
        console.error('Failed to create EventSource:', error);
        onError?.(error as Event);
      }
    },
    [
      endpoint,
      events,
      reconnectInterval,
      maxReconnectAttempts,
      reconnectAttempts,
      onOpen,
      onError,
      onMessage,
    ]
  );

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setIsConnected(false);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (autoConnect) {
      connect();
    }

    return () => {
      mountedRef.current = false;
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    messages,
    connect,
    disconnect,
  };
}

// Higher-order component for SSE functionality
export function withSSE<P extends object>(
  WrappedComponent: React.ComponentType<P & { sseData?: SSEMessage[] }>,
  options: Omit<SSEClientOptions, 'onMessage' | 'onError' | 'onOpen' | 'onClose'>
) {
  return function SSEWrappedComponent(props: P) {
    const { messages, isConnected } = useSSEClient<unknown>({
      ...options,
      onMessage: (message) => {
        // Handle different message types
        switch (message.type) {
          case 'notification':
            toast.info('New notification', { description: String(message.data) });
            break;
          case 'system':
            if (isConnected) {
              // System updates can trigger UI refresh
            }
            break;
        }
      },
      onError: (error) => {
        console.error('SSE Error:', error);
      },
    });

    return <WrappedComponent {...props} sseData={messages} />;
  };
}
