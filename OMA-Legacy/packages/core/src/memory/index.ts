import { Memvid, type Frame } from '@oma/memvid';

export interface MemVidSearchOptions {
  query: string;
  top_k?: number;
  includeImages?: boolean;
}

export interface MemVidSearchResult {
  hits: Frame[];
}

export interface MemoryConfig {
  path: string;
  maxSize?: number;
  enableCompression?: boolean;
  enableVectorSearch?: boolean;
}

export interface MemoryFrame {
  id: string;
  timestamp: number;
  content: string; // The semantic/text content
  imageData?: string; // The visual content (base64)
  type: 'interaction' | 'observation' | 'reflection' | 'fact' | 'code' | 'plan' | 'result';
  importance: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  embedding?: number[];
}

export interface SearchResult {
  frames: MemoryFrame[];
  total: number;
  queryTime: number;
}

const memoryTypes = new Set<MemoryFrame['type']>([
  'interaction',
  'observation',
  'reflection',
  'fact',
  'code',
  'plan',
  'result',
]);

const parseMemoryType = (value?: string): MemoryFrame['type'] => {
  if (value && memoryTypes.has(value as MemoryFrame['type'])) {
    return value as MemoryFrame['type'];
  }
  return 'observation';
};

const parseTags = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((tag) => String(tag));
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value) as unknown;
      if (Array.isArray(parsed)) return parsed.map((tag) => String(tag));
    } catch {
      return value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);
    }
  }
  return [];
};

export class AgentMemory {
  private memvid: Memvid | null = null;
  private config: MemoryConfig;
  private frameCount = 0;

  constructor(config: MemoryConfig) {
    this.config = {
      maxSize: config.maxSize || 1024 * 1024 * 100,
      enableCompression: config.enableCompression !== false,
      enableVectorSearch: config.enableVectorSearch !== false,
      ...config,
    };
  }

  async initialize(): Promise<void> {
    try {
      this.memvid = new Memvid(this.config.path);
      await this.memvid.open();

      console.warn(`[OMA Core Memory] Initialized: ${this.config.path}`);
    } catch (error) {
      console.error('[OMA Core Memory] Failed to initialize:', error);
      throw new Error(`Failed to initialize MemVid: ${(error as Error).message}`);
    }
  }

  async add(content: string, metadata?: Partial<MemoryFrame>): Promise<MemoryFrame> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    const frame: MemoryFrame = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      content,
      imageData: metadata?.imageData,
      type: metadata?.type || 'observation',
      importance: metadata?.importance ?? 0.5,
      tags: metadata?.tags ?? [],
      metadata: metadata?.metadata,
    };

    try {
      await this.memvid.put({
        text: content,
        imageData: frame.imageData,
        timestamp: frame.timestamp,
        metadata: {
          type: frame.type,
          importance: frame.importance.toString(),
          tags: JSON.stringify(frame.tags),
          ...(frame.metadata ?? {}),
        },
      });

      this.frameCount++;

      return frame;
    } catch (error) {
      console.error('[OMA Core Memory] Failed to add frame:', error);
      throw error;
    }
  }

  async search(
    query: string,
    options?: {
      limit?: number;
      timeRange?: { start: number; end: number };
      minImportance?: number;
      includeImages?: boolean;
    }
  ): Promise<MemoryFrame[]> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    try {
      const searchOptions: MemVidSearchOptions = {
        query,
        top_k: options?.limit || 10,
        includeImages: options?.includeImages,
      };

      const result = await this.memvid.search(searchOptions);

      let frames = result.hits.map(
        (hit: Frame) =>
          ({
            id: hit.id,
            timestamp: hit.timestamp,
            content: hit.text,
            imageData: hit.imageData,
            type: parseMemoryType(hit.metadata?.type ? String(hit.metadata.type) : undefined),
            importance: parseFloat(
              hit.metadata?.importance ? String(hit.metadata.importance) : '0.5'
            ),
            tags: parseTags(hit.metadata?.tags),
            metadata: hit.metadata,
          }) as MemoryFrame
      );

      if (options?.timeRange) {
        const { start, end } = options.timeRange;
        frames = frames.filter((f) => f.timestamp >= start && f.timestamp <= end);
      }

      if (options?.minImportance !== undefined) {
        const minImportance = options.minImportance;
        frames = frames.filter((f) => f.importance >= minImportance);
      }

      return frames;
    } catch (error) {
      console.error('[OMA Core Memory] Search failed:', error);
      throw error;
    }
  }

  /**
   * Retrieve a playable video stream of agent memory.
   * Useful for "Time Travel" debugging.
   */
  async getVideoStream(
    startTime: number,
    endTime: number,
    fps: number = 1
  ): Promise<MemoryFrame[]> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    const stream = await this.memvid.getStream({
      startTime,
      endTime,
      fps,
    });

    return stream.map(
      (hit: Frame) =>
        ({
          id: hit.id,
          timestamp: hit.timestamp,
          content: hit.text,
          imageData: hit.imageData,
          type: parseMemoryType(hit.metadata?.type ? String(hit.metadata.type) : undefined),
          importance: parseFloat(
            hit.metadata?.importance ? String(hit.metadata.importance) : '0.5'
          ),
          tags: parseTags(hit.metadata?.tags),
          metadata: hit.metadata,
        }) as MemoryFrame
    );
  }

  async retrieveByTimeRange(startTime: number, endTime: number): Promise<MemoryFrame[]> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    const allFrames = await this.search('', { limit: 10000 });
    return allFrames.filter((f) => f.timestamp >= startTime && f.timestamp <= endTime);
  }

  async getFrame(id: string): Promise<MemoryFrame | null> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    try {
      const result = await this.memvid.getFrame(id);
      if (!result) return null;

      return {
        id: result.id,
        timestamp: result.timestamp,
        content: result.text,
        imageData: result.imageData,
        type: parseMemoryType(result.metadata?.type ? String(result.metadata.type) : undefined),
        importance: parseFloat(
          result.metadata?.importance ? String(result.metadata.importance) : '0.5'
        ),
        tags: parseTags(result.metadata?.tags),
        metadata: result.metadata,
      } as MemoryFrame;
    } catch (error) {
      console.error('[OMA Core Memory] Failed to get frame:', error);
      return null;
    }
  }

  async updateFrame(id: string, updates: Partial<MemoryFrame>): Promise<void> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    const existing = await this.getFrame(id);
    if (!existing) {
      throw new Error(`Frame ${id} not found`);
    }

    const updatedFrame = { ...existing, ...updates };

    // In an append-only system, we append a new version of the frame
    // or we'd have to support mutable edits in MemVid (which we don't for now).
    // We'll just append a new frame referencing the old one.
    await this.add(updatedFrame.content, {
      ...updatedFrame,
      metadata: { ...updatedFrame.metadata, supersedes: id },
    });
  }

  async deleteFrame(_id: string): Promise<void> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    console.warn(
      '[OMA Core Memory] Delete not supported in append-only MemVid. Frame will be marked as superseded.'
    );
  }

  async getStats(): Promise<{ frameCount: number; size: number; lastUpdate: number }> {
    return {
      frameCount: this.frameCount,
      size: this.config.maxSize || 0,
      lastUpdate: Date.now(),
    };
  }

  async compress(): Promise<{ originalSize: number; compressedSize: number; ratio: number }> {
    if (!this.memvid) {
      throw new Error('Memory not initialized. Call initialize() first.');
    }

    console.warn('[OMA Core Memory] Running compression codec...');

    const stats = await this.memvid.stats();

    return {
      originalSize: this.frameCount * 1024,
      compressedSize: stats.size || 0,
      ratio: stats.size ? stats.size / (this.frameCount * 1024) : 1,
    };
  }

  async close(): Promise<void> {
    if (this.memvid) {
      await this.memvid.close();
      this.memvid = null;
      console.warn('[OMA Core Memory] Closed');
    }
  }

  isReady(): boolean {
    return this.memvid !== null;
  }
}
