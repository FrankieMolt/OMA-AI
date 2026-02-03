/**
 * Local Vector Store (Simulated)
 *
 * Implements a lightweight, browser-compatible vector database interface.
 * In a real 2026 scenario, this would wrap 'EntityDB' or 'LanceDB' (WASM).
 *
 * For 'Low Cost' dev, we use a simple JSON store with cosine similarity simulation.
 */

import { logger } from '@/lib/logger';

export interface VectorDocument {
  id: string;
  content: string;
  metadata?: Record<string, unknown>;
  embedding?: number[]; // Mocking 1536-dim vector
}

export class LocalVectorStore {
  private documents: VectorDocument[] = [];

  constructor(private namespace: string = 'global') {}

  /**
   * Add a document to the store (Simulation of embedding generation)
   */
  async add(content: string, metadata: Record<string, unknown> = {}): Promise<void> {
    const doc: VectorDocument = {
      id: Math.random().toString(36).substring(7),
      content,
      metadata,
      embedding: this.mockEmbedding(content),
    };
    this.documents.push(doc);
    logger.debug(`[VectorStore:${this.namespace}] Added doc`, { id: doc.id });
  }

  /**
   * Semantic Search (Simulated)
   * Instead of real vector math, we just keyword match for the mock,
   * but the interface is ready for real embeddings.
   */
  async search(query: string, limit: number = 5): Promise<VectorDocument[]> {
    logger.debug(`[VectorStore:${this.namespace}] Searching`, { query });

    // In a real implementation:
    // const queryVec = await generateEmbedding(query);
    // return this.documents.map(d => ({ ...d, score: cosineSim(queryVec, d.embedding) })).sort(...).slice(0, limit);

    // Mock implementation: Simple keyword filter
    const terms = query.toLowerCase().split(' ');
    return this.documents
      .filter((d) => terms.some((t) => d.content.toLowerCase().includes(t)))
      .slice(0, limit);
  }

  /**
   * Generates a fake embedding vector (random numbers)
   */
  private mockEmbedding(text: string): number[] {
    const lengthFactor = Math.max(1, text.length);
    return Array(10)
      .fill(0)
      .map((_, index) => (Math.random() * lengthFactor + index) / (lengthFactor + 10));
  }
}

// Export a singleton or factory
export const memoryStore = new LocalVectorStore('agent_memory');
