import fs from 'fs-extra';
import { z } from 'zod';
import crypto from 'crypto';

// --- Schema Definitions ---

// A "Smart Frame" mimics a video frame but with semantic payload
const _FrameSchema = z.object({
  id: z.string(),
  timestamp: z.number(), // Unix timestamp (ms)

  // Visual Component (The "Video" part)
  // Stores base64 encoded image data.
  // In a real optimized system, this might be a pointer to a blob or use delta compression.
  imageData: z.string().optional(),

  // Semantic Component (The "Memory" part)
  text: z.string(), // Description or OCR result

  // Vector Component (The "AI" part)
  embedding: z.array(z.number()).optional(),

  // Metadata (Tags, Location, Agent State)
  metadata: z.record(z.any()).optional(),

  // Frame Type for compression logic
  frameType: z.enum(['I-Frame', 'P-Frame']).default('I-Frame'),
});

export type Frame = z.infer<typeof _FrameSchema>;

export interface SearchOptions {
  query: string;
  top_k?: number;
  filter?: Record<string, unknown>;
  includeImages?: boolean; // Whether to return heavy image data
}

export interface StreamOptions {
  startTime: number;
  endTime: number;
  fps?: number; // Downsample if needed
}

export interface SearchResult {
  hits: Frame[];
  total: number;
}

export class Memvid {
  private filePath: string;
  private frames: Frame[] = [];
  private isOpen: boolean = false;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async open(): Promise<void> {
    try {
      await fs.ensureFile(this.filePath);
      const content = await fs.readFile(this.filePath, 'utf-8');

      // Parse JSON Lines
      this.frames = content
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => {
          try {
            return JSON.parse(line);
          } catch (error) {
            return null;
          }
        })
        .filter((f: Frame | null) => f !== null) as Frame[];

      this.isOpen = true;
      console.warn(`[MemVid] Opened database with ${this.frames.length} frames.`);
    } catch (error) {
      this.frames = [];
      this.isOpen = true;
      console.warn('[MemVid] Created new database.');
    }
  }

  /**
   * Add a new frame to the memory stream.
   * Supports "Visual" input via imageData (base64).
   */
  async put(data: {
    text: string;
    imageData?: string;
    metadata?: unknown;
    embedding?: number[];
    timestamp?: number;
  }): Promise<Frame> {
    if (!this.isOpen) throw new Error('MemVid database not open');

    const timestamp = data.timestamp || Date.now();

      // Enhanced Compression Logic:
    // Compare image data with last frame to create P-Frames when possible
    let frameType: 'I-Frame' | 'P-Frame' = 'I-Frame';
    let imageData = data.imageData;

    if (this.frames.length > 0 && data.imageData) {
      const lastFrame = this.frames[this.frames.length - 1];
      if (lastFrame.imageData) {
        // Simple hash comparison for image diffing
        const currentHash = crypto.createHash('md5').update(data.imageData).digest('hex');
        const lastHash = crypto.createHash('md5').update(lastFrame.imageData).digest('hex');
        
        if (currentHash === lastHash) {
          frameType = 'P-Frame'; // Reference frame
          imageData = undefined; // Don't store duplicate image data
        }
      }
    }

    const frame: Frame = {
      id: crypto.randomUUID(),
      timestamp,
      text: data.text,
      imageData,
      metadata: data.metadata as Record<string, unknown> | undefined,
      embedding: data.embedding,
      frameType,
    };

    // Append to in-memory list
    this.frames.push(frame);

    // Append to file (WAL style - robust)
    await fs.appendFile(this.filePath, JSON.stringify(frame) + '\n');

    return frame;
  }

  /**
   * Search for frames based on semantic content (text/tags).
   */
  async search(options: SearchOptions): Promise<SearchResult> {
    if (!this.isOpen) throw new Error('MemVid database not open');

    const queryLower = options.query.toLowerCase();
    const queryWords = queryLower.split(' ').filter(word => word.length > 2);

    let hits = this.frames.filter((frame) => {
      // 1. Enhanced text search with relevance scoring
      let relevanceScore = 0;
      
      // Exact match gets highest score
      if (frame.text.toLowerCase().includes(queryLower)) {
        relevanceScore += 10;
      }
      
      // Word matches get incremental scores
      queryWords.forEach(word => {
        if (frame.text.toLowerCase().includes(word)) {
          relevanceScore += 2;
        }
      });

      // 2. Metadata filter
      let metaMatch = true;
      if (options.filter) {
        metaMatch = Object.entries(options.filter).every(
          ([k, v]) => frame.metadata && frame.metadata[k] === v
        );
      }

      // 3. Temporal relevance - recent frames get slight boost
      const hoursOld = (Date.now() - frame.timestamp) / (1000 * 60 * 60);
      const timeScore = Math.max(0, 5 - hoursOld / 24); // Decay over 5 days
      
      const textMatch = frame.text.toLowerCase().includes(queryLower);
      return textMatch && metaMatch && (relevanceScore + timeScore) > 0;
    });

    // Enhanced sorting: by relevance first, then recency
    hits.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, queryLower, queryWords);
      const scoreB = this.calculateRelevanceScore(b, queryLower, queryWords);
      
      if (scoreB !== scoreA) {
        return scoreB - scoreA; // Higher relevance first
      }
      return b.timestamp - a.timestamp; // Then recency
    });

    if (options.top_k) {
      hits = hits.slice(0, options.top_k);
    }

    // Strip image data if not requested (to save bandwidth)
    if (!options.includeImages) {
      hits = hits.map((h) => {
        const { imageData: _imageData, ...rest } = h;
        return rest as Frame;
      });
    }

    return {
      hits,
      total: hits.length,
    };
  }

  private calculateRelevanceScore(frame: Frame, queryLower: string, queryWords: string[]): number {
    let score = 0;
    
    // Exact match bonus
    if (frame.text.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    // Word matches
    queryWords.forEach(word => {
      if (frame.text.toLowerCase().includes(word)) {
        score += 2;
      }
    });
    
    // Temporal relevance
    const hoursOld = (Date.now() - frame.timestamp) / (1000 * 60 * 60);
    score += Math.max(0, 5 - hoursOld / 24);
    
    return score;
  }

  /**
   * Retrieve a "Video Stream" of frames for playback.
   * This allows the "Time Travel" debugging feature.
   */
  async getStream(options: StreamOptions): Promise<Frame[]> {
    if (!this.isOpen) throw new Error('MemVid database not open');

    // Filter by time range
    let stream = this.frames.filter(
      (f) => f.timestamp >= options.startTime && f.timestamp <= options.endTime
    );

    // Sort chronologically (oldest to newest) for playback
    stream.sort((a, b) => a.timestamp - b.timestamp);

    // FPS / Downsampling logic
    if (options.fps && stream.length > 0) {
      const durationSec = (options.endTime - options.startTime) / 1000;
      const targetFrames = Math.ceil(durationSec * options.fps);

      if (stream.length > targetFrames) {
        const step = Math.floor(stream.length / targetFrames);
        stream = stream.filter((_, i) => i % step === 0);
      }
    }

    return stream;
  }

  /**
   * Get a single frame by ID
   */
  async getFrame(id: string): Promise<Frame | null> {
    const frame = this.frames.find((f) => f.id === id);
    return frame || null;
  }

  async stats(): Promise<{ size: number; count: number; durationMs: number }> {
    if (!this.isOpen) throw new Error('MemVid database not open');

    const stats = await fs.stat(this.filePath);
    const durationMs =
      this.frames.length > 1
        ? this.frames[this.frames.length - 1].timestamp - this.frames[0].timestamp
        : 0;

    return {
      size: stats.size,
      count: this.frames.length,
      durationMs,
    };
  }

  async close(): Promise<void> {
    this.isOpen = false;
    this.frames = [];
  }
}
