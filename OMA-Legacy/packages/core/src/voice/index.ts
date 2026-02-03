import { EventEmitter } from 'eventemitter3';

// Mock types for non-browser environments to satisfy TS
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    AudioContext: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitAudioContext: any;
  }
  interface Navigator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gpu?: any;
  }
}

export interface VoiceConfig {
  model?: 'kokoro-v1' | 'kokoro-82m';
  speed?: number;
  voice?: string;
}

export class KokoroTTS extends EventEmitter {
  private config: VoiceConfig;
  private isLoaded: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private audioContext: any | null = null;

  constructor(config: VoiceConfig = {}) {
    super();
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (typeof window === 'undefined') {
      console.warn('[KokoroTTS] Server-side initialized (Mock Mode)');
      return;
    }

    try {
      // Check for WebGPU
      if (!navigator?.gpu) {
        console.warn('[KokoroTTS] WebGPU not supported. Falling back to CPU/WASM.');
      }

      console.warn(`[KokoroTTS] Loading model ${this.config.model || 'default'}...`);
      // Simulation of loading heavy weights
      await new Promise((resolve) => setTimeout(resolve, 500));

      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.isLoaded = true;
      console.warn('[KokoroTTS] Ready.');
    } catch (error) {
      console.error('[KokoroTTS] Failed to initialize:', error);
    }
  }

  async speak(text: string): Promise<void> {
    if (!this.isLoaded) {
      // Fallback if not loaded
      console.warn('[KokoroTTS] Not loaded, skipping synthesis:', text);
      return;
    }

    console.warn(`[KokoroTTS] Synthesizing: "${text.slice(0, 50)}..."`);
    this.emit('start', { text });

    // Mock synthesis delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    // In a real implementation, we would inference the model here
    // and play the audio buffer via AudioContext.

    this.emit('end', { text });
  }

  async stop(): Promise<void> {
    if (this.audioContext) {
      await this.audioContext.suspend();
    }
  }
}
