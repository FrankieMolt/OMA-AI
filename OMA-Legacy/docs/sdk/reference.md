# SDK Reference

Complete API reference for OpenMarketAccess SDKs.

## TypeScript SDK

### OpenMarketAccess Class

```typescript
class OpenMarketAccess {
  constructor(config: OpenMarketAccessConfig)

  // Modules
  readonly payments: PaymentsModule
  readonly marketplace: MarketplaceModule
  readonly webhooks: WebhooksModule
  readonly users: UsersModule
  readonly oauth: OAuthModule
  readonly apiKeys: ApiKeysModule

  // Middleware
  use(middleware: Middleware): void

  // Interceptors
  readonly interceptors: {
    request: Interceptor<RequestConfig>
    response: Interceptor<Response>
  }

  // Cache
  readonly cache: Cache
}
```

### PaymentsModule

```typescript
class PaymentsModule {
  create(data: CreatePaymentRequest): Promise<Payment>
  get(id: string): Promise<Payment>
  list(filters: PaymentFilters): Promise<PaginatedResponse<Payment>>
  fundEscrow(id: string, data: FundEscrowRequest): Promise<Payment>
  execute(id: string, data: ExecutePaymentRequest): Promise<Payment>
  cancel(id: string, data: CancelPaymentRequest): Promise<Payment>
  refund(id: string, data: RefundPaymentRequest): Promise<Refund>
  negotiate(id: string, data: NegotiationRequest): Promise<Negotiation>
  respondToNegotiation(id: string, response: string, data?: any): Promise<Negotiation>
}
```

### MarketplaceModule

```typescript
class MarketplaceModule {
  createListing(data: CreateListingRequest): Promise<Listing>
  getListing(id: string): Promise<Listing>
  listListings(filters: ListingFilters): Promise<PaginatedResponse<Listing>>
  updateListing(id: string, data: UpdateListingRequest): Promise<Listing>
  deleteListing(id: string): Promise<void>
  createPurchase(data: CreatePurchaseRequest): Promise<Purchase>
  getPurchase(id: string): Promise<Purchase>
  listPurchases(filters: PurchaseFilters): Promise<PaginatedResponse<Purchase>>
  createReview(data: CreateReviewRequest): Promise<Review>
  getReviews(filters: ReviewFilters): Promise<PaginatedResponse<Review>>
}
```

### WebhooksModule

```typescript
class WebhooksModule {
  create(data: CreateWebhookRequest): Promise<Webhook>
  get(id: string): Promise<Webhook>
  list(filters: WebhookFilters): Promise<PaginatedResponse<Webhook>>
  update(id: string, data: UpdateWebhookRequest): Promise<Webhook>
  delete(id: string): Promise<void>
  pause(id: string): Promise<Webhook>
  resume(id: string): Promise<Webhook>
  rotateSecret(id: string): Promise<Webhook>
  verifySignature(payload: string, signature: string, secret: string): boolean
  sendTest(data: TestWebhookRequest): Promise<TestWebhookResult>
  getLogs(id: string, filters: LogFilters): Promise<PaginatedResponse<WebhookLog>>
  retryFailed(id: string, data?: RetryFailedRequest): Promise<RetryResult>
}
```

## Python SDK

### OpenMarketAccess Class

```python
class OpenMarketAccess:
    def __init__(self, api_key: str, api_url: str = 'https://api.openmarketaccess.com/v1',
                 timeout: int = 30, max_retries: int = 3, retry_delay: int = 1,
                 webhook_secret: str = None, environment: str = 'production')

    # Modules
    payments: PaymentsModule
    marketplace: MarketplaceModule
    webhooks: WebhooksModule
    users: UsersModule
    oauth: OAuthModule
    api_keys: ApiKeysModule

    # Methods
    def use(self, middleware: Callable) -> None
    def interceptors(self) -> Interceptors
```

### PaymentsModule

```python
class PaymentsModule:
    def create(self, data: CreatePaymentRequest) -> Payment
    def get(self, id: str) -> Payment
    def list(self, filters: PaymentFilters) -> PaginatedResponse[Payment]
    def fund_escrow(self, id: str, data: FundEscrowRequest) -> Payment
    def execute(self, id: str, data: ExecutePaymentRequest) -> Payment
    def cancel(self, id: str, data: CancelPaymentRequest) -> Payment
    def refund(self, id: str, data: RefundPaymentRequest) -> Refund
    def negotiate(self, id: str, data: NegotiationRequest) -> Negotiation
    def respond_to_negotiation(self, id: str, response: str, data: Any = None) -> Negotiation
```

### MarketplaceModule

```python
class MarketplaceModule:
    def create_listing(self, data: CreateListingRequest) -> Listing
    def get_listing(self, id: str) -> Listing
    def list_listings(self, filters: ListingFilters) -> PaginatedResponse[Listing]
    def update_listing(self, id: str, data: UpdateListingRequest) -> Listing
    def delete_listing(self, id: str) -> None
    def create_purchase(self, data: CreatePurchaseRequest) -> Purchase
    def get_purchase(self, id: str) -> Purchase
    def list_purchases(self, filters: PurchaseFilters) -> PaginatedResponse[Purchase]
    def create_review(self, data: CreateReviewRequest) -> Review
    def get_reviews(self, filters: ReviewFilters) -> PaginatedResponse[Review]
```

### WebhooksModule

```python
class WebhooksModule:
    def create(self, data: CreateWebhookRequest) -> Webhook
    def get(self, id: str) -> Webhook
    def list(self, filters: WebhookFilters) -> PaginatedResponse[Webhook]
    def update(self, id: str, data: UpdateWebhookRequest) -> Webhook
    def delete(self, id: str) -> None
    def pause(self, id: str) -> Webhook
    def resume(self, id: str) -> Webhook
    def rotate_secret(self, id: str) -> Webhook
    def verify_signature(self, payload: str, signature: str, secret: str) -> bool
    def send_test(self, data: TestWebhookRequest) -> TestWebhookResult
    def get_logs(self, id: str, filters: LogFilters) -> PaginatedResponse[WebhookLog]
    def retry_failed(self, id: str, data: RetryFailedRequest = None) -> RetryResult
```

## Type Definitions

### Payment

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
```

### Listing

```typescript
interface Listing {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  sellerId: string;
  status: 'active' | 'inactive' | 'sold';
  images?: string[];
  tags?: string[];
  specifications?: Record<string, any>;
  averageRating?: number;
  totalReviews?: number;
  totalSales?: number;
  createdAt: string;
  updatedAt: string;
}
```

### Webhook

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

## Error Types

### OpenMarketAccessError

```typescript
class OpenMarketAccessError extends Error {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
  timestamp: string;
}
```

## See Also

- [TypeScript SDK](typescript.md)
- [Python SDK](python.md)
- [SDK Examples](examples.md)
