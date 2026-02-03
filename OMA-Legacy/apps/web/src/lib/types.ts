export interface Listing {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: 'agent' | 'mcp' | 'api' | 'llm' | 'skill' | 'workflow' | 'subagent' | 'n8n' | 'x402';
  pricingType: 'free' | 'usage' | 'subscription' | 'one-time';
  price: number;
  currency: string;
  capabilities: string[];
  rating: number;
  reviewCount: number;
  totalUsage: number;
  status: 'approved' | 'pending' | 'rejected' | 'suspended';
  ownerName?: string;
  ownerAvatar?: string;
  verified?: boolean;
  featured?: boolean;
  tags?: string[];
  endpointUrl?: string; // Matching DB schema
  endpoint?: string; // For UI compatibility
  icon?: string;
  installs?: number;
  installCommand?: string;
  version?: string;
  license?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ListingDetail extends Listing {
  endpoint?: string;
  type?: string;
  installCommand?: string;
  contextWindow?: number;
  documentation?: string;
  metadata?: Record<string, unknown>;
  reviews: Review[];
  relatedListings: Listing[];
  ownerWallet?: string;
}

export interface Review {
  id: number;
  userId: number;
  user?: {
    id: number;
    name?: string;
    email?: string;
  };
  rating: number;
  content: string;
  title?: string;
  helpfulCount?: number;
  date: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name?: string;
  profile?: Record<string, unknown>;
  bio?: string;
  role: 'user' | 'developer' | 'admin';
  solanaWalletAddress?: string;
  credits: string; // Decimal string
}

export interface User {
  id: number;
  email: string;
  name: string;
  credits: string;
  role: string;
  profile: Record<string, unknown>;
  solanaWalletAddress: string | null;
  usdcBalance: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Console / Agent Interfaces ---

export interface TelemetryFrame {
  timestamp: number;
  battery: {
    level: number; // 0-100
    voltage: number;
    isCharging: boolean;
  };
  position: {
    lat: number;
    lng: number;
    alt: number; // altitude
    heading: number; // 0-360
  };
  hardware: {
    cpuTemp: number;
    motorStatus: 'idle' | 'moving' | 'error';
    activeSensors: string[]; // ['lidar', 'camera_front']
  };
}

export interface MemVidFrame {
  id: string; // UUID
  imageUrl: string; // Base64 or URL
  timestamp: number;
  analysis: {
    objects: string[]; // ["cup", "person"]
    intent: string; // "Moving towards cup"
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isVoice?: boolean; // Was this input/output audio?
}

export interface ConsoleState {
  agentId: string | null;
  status: 'offline' | 'connecting' | 'online' | 'error';
  telemetry: TelemetryFrame | null;
  memvid: MemVidFrame | null;
  chatHistory: ChatMessage[];
}
