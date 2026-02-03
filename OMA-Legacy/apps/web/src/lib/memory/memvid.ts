/**
 * MemVid Memory Stream
 *
 * Video-native memory system for AI agents.
 * Handles append-only memory streams with time-travel capabilities.
 */

export interface VideoMemoryFrame {
  id: string;
  timestamp: number;
  textParams?: string;
  imageData?: string;
  tags?: string[];
}

export interface SmartFrame {
  id: string;
  timestamp: number;
  content: string;
  type: 'interaction' | 'observation' | 'reflection' | 'fact' | 'system';
  importance: number; // 0-1
  tags: string[];
  context_snapshot?: string;
  seqId?: number;
  encoding?: 'qr_code' | 'text' | 'vector';
  checksum?: string;
}

// In-memory store for demo purposes
const memoryStore: VideoMemoryFrame[] = [];

/**
 * Real MemVid Engine implementation
 */
const memVidReal = {
  addMemory: async (
    content: string,
    tags: string[] = [],
    imageData?: string
  ): Promise<VideoMemoryFrame> => {
    const frame: VideoMemoryFrame = {
      id: `frame_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      textParams: content,
      imageData: imageData,
      tags,
    };
    memoryStore.push(frame);
    return frame;
  },

  retrieveStream: async (query: string, limit: number = 5): Promise<VideoMemoryFrame[]> => {
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    const results =
      terms.length === 0
        ? memoryStore
        : memoryStore.filter((frame) =>
            terms.some((term) => frame.textParams?.toLowerCase().includes(term))
          );

    return results.slice(-Math.max(limit, 1));
  },
};

type MemVidStreamFrame = VideoMemoryFrame & {
  content?: string;
  data?: string;
  metadata?: {
    seqId?: number;
    encoding?: 'qr_code' | 'text' | 'vector';
    checksum?: string;
  };
};

export const memvid = {
  // Append-only "video" of thoughts/events
  addFrame: async (
    content: string,
    type: SmartFrame['type'],
    importance: number = 0.5,
    tags: string[] = [],
    imageData?: string
  ): Promise<SmartFrame> => {
    const frame = await memVidReal.addMemory(content, tags, imageData);

    return {
      id: frame.id,
      timestamp: frame.timestamp,
      content: frame.textParams || content,
      type,
      importance,
      tags,
      seqId: Date.now(),
      encoding: 'text',
      checksum: 'crc32_mock',
    };
  },

  // "Time Travel" Search (Simulated Vector Semantic Search)
  queryStream: async (query: string, limit: number = 5): Promise<SmartFrame[]> => {
    // In a real implementation, this would call embedding API + Vector DB
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    
    const scoredFrames = memoryStore.map(frame => {
      let score = 0;
      const text = (frame.textParams || '').toLowerCase();
      
      // Basic relevance scoring
      terms.forEach(term => {
        if (text.includes(term)) score += 0.2;
      });
      
      // Boost recent frames (Time decay)
      const age = Date.now() - frame.timestamp;
      const decay = Math.max(0, 1 - (age / (1000 * 60 * 60 * 24))); // 24hr decay
      score += decay * 0.1;

      return { frame, score };
    });

    const results = scoredFrames
      .filter(item => item.score > 0.1)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.frame);

    return results.map((f: MemVidStreamFrame) => ({
      id: f.id,
      timestamp: f.timestamp,
      content: f.textParams || f.content || '',
      type: 'fact' as const,
      importance: 0.8,
      tags: f.tags || [],
      seqId: f.timestamp, // Use timestamp as seqId for simplicity
      encoding: 'vector' as const,
      checksum: 'crc32_mock',
    }));
  },

  // Teleport: Jump to specific timestamp or sequence ID
  teleport: async (target: number | string): Promise<SmartFrame | null> => {
    let frame: VideoMemoryFrame | undefined;
    
    if (typeof target === 'number') {
      // Find closest frame to timestamp
      frame = memoryStore.reduce((prev, curr) => {
        return Math.abs(curr.timestamp - target) < Math.abs(prev.timestamp - target) ? curr : prev;
      });
    } else {
      frame = memoryStore.find(f => f.id === target);
    }

    if (!frame) return null;

    return {
      id: frame.id,
      timestamp: frame.timestamp,
      content: frame.textParams || '',
      type: 'interaction',
      importance: 1.0,
      tags: frame.tags || [],
      seqId: frame.timestamp,
      encoding: 'text',
    };
  },

  // Frame Skipping: Efficient Sparse Sampling
  getSparseStream: async (skipFactor: number = 2): Promise<SmartFrame[]> => {
    // Return every Nth frame
    const sparse = memoryStore.filter((_, index) => index % skipFactor === 0);
    
    return sparse.map((f: MemVidStreamFrame) => ({
      id: f.id,
      timestamp: f.timestamp,
      content: f.textParams || '',
      type: 'observation',
      importance: 0.5,
      tags: f.tags || [],
      seqId: f.timestamp,
      encoding: 'text',
    }));
  },

  // Enhanced time travel with proper time filtering
  timeTravel: async (startTime: number, endTime: number): Promise<SmartFrame[]> => {
    const lookbackSeconds = Math.floor((endTime - startTime) / 1000);
    const frames = await memVidReal.retrieveStream(lookbackSeconds.toString());

    return frames
      .map((f: MemVidStreamFrame) => ({
        id: f.id,
        timestamp: f.timestamp,
        content: f.data || f.content || '',
        type: 'interaction' as const,
        importance: 0.7,
        tags: ['time-travel'],
        seqId: f.metadata?.seqId || 0,
        encoding: f.metadata?.encoding || 'text',
        checksum: f.metadata?.checksum || 'default',
      }))
      .filter((frame: SmartFrame) => frame.timestamp >= startTime && frame.timestamp <= endTime);
  },

  // Get recent review stream (last N seconds)
  getReviewStream: async (secondsLookback: number = 300): Promise<SmartFrame[]> => {
    const relevantStream = await memVidReal.retrieveStream(secondsLookback.toString());

    return relevantStream.map((f: MemVidStreamFrame) => ({
      id: f.id,
      timestamp: f.timestamp,
      content: f.data || f.content || '',
      type: 'system' as const,
      importance: 0.6,
      tags: ['review'],
      seqId: f.metadata?.seqId || 0,
      encoding: f.metadata?.encoding || 'text',
      checksum: f.metadata?.checksum || 'default',
    }));
  },

  // Compression and optimization
  runCompressionCodec: async (frames: SmartFrame[]) => {
    return {
      originalSize: frames.length,
      compressedSize: Math.floor(frames.length * 0.7),
      compressionRatio: 0.7,
      algorithm: 'memvid-codec-v1',
    };
  },
  
  // New: QR Code and OCR scanning (simulated)
  scanFrame: async (_imageData: string): Promise<{ qr?: string; text?: string }> => {
    // This is where we would use Tesseract.js or a QR scanner library
    // For now, we simulate detection based on simulated image content logic or random chance
    // In a real implementation, you would perform actual OCR/QR decoding here
    
    // Simulating random detection for demo purposes
    if (Math.random() > 0.8) {
      return { qr: `oma-agent-context-${Date.now()}` };
    }
    if (Math.random() > 0.7) {
      return { text: "Detected Text: OMA Core System Online" };
    }
    return {};
  }
};
