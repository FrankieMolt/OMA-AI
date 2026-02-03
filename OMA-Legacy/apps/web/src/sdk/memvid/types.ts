export interface SmartFrame {
  id: string;
  timestamp: number;
  content: string; // The raw text/data
  summary?: string; // Compressed version
  visualContext?: string; // Description of visual state (e.g. from robot camera)
  embedding?: number[]; // Vector embedding for semantic search
  tags: string[];
  importance: number; // 0-1, used for "codec" compression
}

export interface MemoryStorage {
  add(frame: SmartFrame): Promise<void>;
  query(text: string, limit?: number): Promise<SmartFrame[]>;
  getRange(start: number, end: number): Promise<SmartFrame[]>;
  prune(threshold: number): Promise<void>; // Remove low importance frames
}

export interface MemVidConfig {
  maxFrames?: number;
  compressionTrigger?: number; // When to run "codec"
  storage?: MemoryStorage;
}
