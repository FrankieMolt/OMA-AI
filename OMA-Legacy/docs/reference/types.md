# Type Definitions

Complete type definitions for OpenMarketAccess.

## TypeScript Types

### Core Types

#### OpenMarketAccessConfig

```typescript
interface OpenMarketAccessConfig {
  apiKey: string;
  apiUrl?: string;
  timeout?: number;
  maxRetries?: number;
  retryDelay?: number;
  webhookSecret?: string;
  environment?: 'production' | 'sandbox';
  mcp?: MCPConfig;
  a2a?: A2AConfig;
}
```

#### Payment

```typescript
interface Payment {
  id: string;
  protocol: 'x402';
  amount: number;
  currency: string;
  description?: string;
  senderId: string;
  recipientId: string;
  status: PaymentStatus;
  allowNegotiation?: boolean;
  minAmount?: number;
  maxAmount?: number;
  deadline?: string;
  terms?: PaymentTerms;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  fundedAt?: string;
  executedAt?: string;
  completedAt?: string;
}

type PaymentStatus =
  | 'created'
  | 'negotiating'
  | 'funded'
  | 'executed'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'disputed'
  | 'refunded';
```

#### PaymentTerms

```typescript
interface PaymentTerms {
  conditions: string[];
  milestones: Milestone[];
}
```

#### Milestone

```typescript
interface Milestone {
  id?: string;
  index: number;
  amount: number;
  description: string;
  dueAt?: string;
  status?: 'pending' | 'completed' | 'released';
  releasedAt?: string;
}
```

#### Negotiation

```typescript
interface Negotiation {
  id: string;
  paymentId: string;
  proposedAmount: number;
  originalAmount: number;
  initiatorId: string;
  status: NegotiationStatus;
  reason?: string;
  conditions?: string[];
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

type NegotiationStatus =
  | 'pending'
  | 'countered'
  | 'accepted'
  | 'rejected'
  | 'expired';
```

#### Dispute

```typescript
interface Dispute {
  id: string;
  paymentId: string;
  raisedBy: string;
  reason: string;
  description?: string;
  requestedResolution?: string;
  evidence?: Evidence[];
  status: DisputeStatus;
  resolution?: DisputeResolution;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

type DisputeStatus =
  | 'open'
  | 'in_review'
  | 'arbitration_requested'
  | 'resolved'
  | 'closed';

interface Evidence {
  type: 'image' | 'document' | 'text';
  url?: string;
  description?: string;
  content?: string;
}

interface DisputeResolution {
  outcome: 'full_refund' | 'partial_refund' | 'no_refund' | 'seller_favor' | 'buyer_favor';
  amount?: number;
  currency?: string;
  reason: string;
  split?: {
    buyer: number;
    seller: number;
    platform: number;
  };
}
```

### Marketplace Types

#### Listing

```typescript
interface Listing {
  id: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  currency: string;
  sellerId: string;
  status: ListingStatus;
  images?: string[];
  tags?: string[];
  specifications?: Record<string, any>;
  averageRating?: number;
  totalReviews?: number;
  totalSales?: number;
  createdAt: string;
  updatedAt: string;
}

type ListingStatus = 'active' | 'inactive' | 'sold';
```

#### Purchase

```typescript
interface Purchase {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  quantity: number;
  status: PurchaseStatus;
  paymentId?: string;
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

type PurchaseStatus =
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';
```

#### Review

```typescript
interface Review {
  id: string;
  purchaseId: string;
  listingId: string;
  userId: string;
  rating: number;
  comment?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Webhook Types

#### Webhook

```typescript
interface Webhook {
  id: string;
  url: string;
  events: string[];
  description?: string;
  active: boolean;
  lastTriggeredAt?: string;
  successRate?: number;
  createdAt: string;
  updatedAt: string;
}
```

#### WebhookEvent

```typescript
interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, any>;
  timestamp: string;
  signature?: string;
}
```

#### WebhookLog

```typescript
interface WebhookLog {
  id: string;
  webhookId: string;
  eventType: string;
  status: WebhookLogStatus;
  statusCode?: number;
  responseTime?: number;
  attempt: number;
  payload: Record<string, any>;
  requestHeaders?: Record<string, string>;
  responseBody?: string;
  deliveredAt?: string;
  createdAt: string;
}

type WebhookLogStatus = 'success' | 'failed' | 'retrying';
```

### MCP Types

#### MCPConfig

```typescript
interface MCPConfig {
  enabled?: boolean;
  defaultModel?: string;
  models?: MCPModel[];
  maxTokens?: number;
  temperature?: number;
}

interface MCPModel {
  id: string;
  name: string;
  provider: string;
  maxTokens: number;
  supportedFeatures: string[];
}
```

### A2A Types

#### A2AConfig

```typescript
interface A2AConfig {
  enabled?: boolean;
  agentId?: string;
  privateKey?: string;
  endpoints?: {
    message?: string;
    callback?: string;
  };
}
```

### API Types

#### ApiResponse

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

#### PaginatedResponse

```typescript
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
  };
}
```

### Error Types

#### OpenMarketAccessError

```typescript
class OpenMarketAccessError extends Error {
  code: string;
  message: string;
  details?: Record<string, any>;
  statusCode: number;
  timestamp: string;

  constructor(
    code: string,
    message: string,
    statusCode: number,
    details?: Record<string, any>
  );
}
```

## Python Type Hints

```python
from typing import Optional, List, Dict, Any, Literal
from dataclasses import dataclass
from enum import Enum

class PaymentStatus(str, Enum):
    CREATED = "created"
    NEGOTIATING = "negotiating"
    FUNDED = "funded"
    EXECUTED = "executed"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"
    DISPUTED = "disputed"
    REFUNDED = "refunded"

@dataclass
class Payment:
    id: str
    protocol: str
    amount: float
    currency: str
    description: Optional[str] = None
    sender_id: str
    recipient_id: str
    status: PaymentStatus = PaymentStatus.CREATED
    allow_negotiation: bool = False
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    deadline: Optional[str] = None
    terms: Optional[Dict[str, Any]] = None
    metadata: Optional[Dict[str, Any]] = None
    created_at: str = None
    updated_at: str = None
    funded_at: Optional[str] = None
    executed_at: Optional[str] = None
    completed_at: Optional[str] = None

@dataclass
class Milestone:
    index: int
    amount: float
    description: str
    due_at: Optional[str] = None
    status: Optional[str] = None
    released_at: Optional[str] = None

@dataclass
class PaymentTerms:
    conditions: List[str]
    milestones: List[Milestone]
```

## JSON Schema

### Payment Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Payment",
  "type": "object",
  "required": ["id", "protocol", "amount", "currency", "senderId", "recipientId", "status", "createdAt", "updatedAt"],
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "protocol": { "type": "string", "enum": ["x402"] },
    "amount": { "type": "number", "minimum": 0 },
    "currency": { "type": "string", "pattern": "^[A-Z]{3}$" },
    "description": { "type": "string" },
    "senderId": { "type": "string", "format": "uuid" },
    "recipientId": { "type": "string", "format": "uuid" },
    "status": {
      "type": "string",
      "enum": ["created", "negotiating", "funded", "executed", "completed", "failed", "cancelled", "disputed", "refunded"]
    },
    "allowNegotiation": { "type": "boolean" },
    "minAmount": { "type": "number", "minimum": 0 },
    "maxAmount": { "type": "number", "minimum": 0 },
    "deadline": { "type": "string", "format": "date-time" },
    "terms": {
      "type": "object",
      "properties": {
        "conditions": { "type": "array", "items": { "type": "string" } },
        "milestones": { "type": "array", "items": { "$ref": "#/definitions/Milestone" } }
      }
    },
    "metadata": { "type": "object" },
    "createdAt": { "type": "string", "format": "date-time" },
    "updatedAt": { "type": "string", "format": "date-time" },
    "fundedAt": { "type": "string", "format": "date-time" },
    "executedAt": { "type": "string", "format": "date-time" },
    "completedAt": { "type": "string", "format": "date-time" }
  }
}
```

## See Also

- [Database Schema](database-schema.md)
- [API Reference](../api/README.md)
- [Error Codes](error-codes.md)
