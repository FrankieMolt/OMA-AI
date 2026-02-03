# Database Schema

Complete database schema documentation for OpenMarketAccess.

## Overview

OpenMarketAccess uses PostgreSQL as its primary database with the following schema structure.

## Tables

### users

User accounts and profiles.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `email` | VARCHAR(255) | No | - | User email (unique) |
| `password_hash` | VARCHAR(255) | No | - | Password hash |
| `name` | VARCHAR(255) | Yes | - | User name |
| `avatar_url` | TEXT | Yes | - | Avatar URL |
| `status` | VARCHAR(50) | No | 'active' | User status |
| `email_verified` | BOOLEAN | No | FALSE | Email verification status |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `users_pkey` (id)
- `users_email_key` (email)
- `users_status_idx` (status)
- `users_created_at_idx` (created_at)

### api_keys

API keys for authentication.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `user_id` | UUID | No | - | User ID (foreign key) |
| `name` | VARCHAR(255) | No | - | API key name |
| `key_hash` | VARCHAR(255) | No | - | API key hash |
| `permissions` | JSONB | No | '[]' | Permissions array |
| `active` | BOOLEAN | No | TRUE | Active status |
| `expires_at` | TIMESTAMP | Yes | NULL | Expiration timestamp |
| `last_used_at` | TIMESTAMP | Yes | NULL | Last used timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `api_keys_pkey` (id)
- `api_keys_user_id_idx` (user_id)
- `api_keys_key_hash_idx` (key_hash)
- `api_keys_active_idx` (active)

### payments

Payment transactions using x402 protocol.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `protocol` | VARCHAR(50) | No | 'x402' | Payment protocol |
| `amount` | DECIMAL(10, 2) | No | - | Payment amount |
| `currency` | VARCHAR(3) | No | 'USD' | Currency code |
| `description` | TEXT | Yes | NULL | Payment description |
| `sender_id` | UUID | No | - | Sender user ID |
| `recipient_id` | UUID | Yes | NULL | Recipient user/agent ID |
| `status` | VARCHAR(50) | No | 'created' | Payment status |
| `allow_negotiation` | BOOLEAN | No | FALSE | Allow negotiation |
| `min_amount` | DECIMAL(10, 2) | Yes | NULL | Minimum amount |
| `max_amount` | DECIMAL(10, 2) | Yes | NULL | Maximum amount |
| `deadline` | TIMESTAMP | Yes | NULL | Payment deadline |
| `terms` | JSONB | Yes | NULL | Payment terms |
| `metadata` | JSONB | Yes | NULL | Additional metadata |
| `funded_at` | TIMESTAMP | Yes | NULL | Funded timestamp |
| `executed_at` | TIMESTAMP | Yes | NULL | Executed timestamp |
| `completed_at` | TIMESTAMP | Yes | NULL | Completed timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `payments_pkey` (id)
- `payments_sender_id_idx` (sender_id)
- `payments_recipient_id_idx` (recipient_id)
- `payments_status_idx` (status)
- `payments_created_at_idx` (created_at)
- `payments_currency_idx` (currency)

### payment_methods

Saved payment methods.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `user_id` | UUID | No | - | User ID (foreign key) |
| `provider` | VARCHAR(50) | No | - | Payment provider |
| `type` | VARCHAR(50) | No | - | Payment type |
| `details` | JSONB | No | '{}' | Payment method details |
| `is_default` | BOOLEAN | No | FALSE | Default payment method |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `payment_methods_pkey` (id)
- `payment_methods_user_id_idx` (user_id)
- `payment_methods_is_default_idx` (is_default)

### escrows

Escrow holdings for payments.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `payment_id` | UUID | No | - | Payment ID (foreign key) |
| `amount` | DECIMAL(10, 2) | No | - | Escrow amount |
| `currency` | VARCHAR(3) | No | 'USD' | Currency code |
| `status` | VARCHAR(50) | No | 'created' | Escrow status |
| `release_conditions` | JSONB | Yes | NULL | Release conditions |
| `released_at` | TIMESTAMP | Yes | NULL | Released timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `escrows_pkey` (id)
- `escrows_payment_id_idx` (payment_id)
- `escrows_status_idx` (status)

### negotiations

Payment negotiations.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `payment_id` | UUID | No | - | Payment ID (foreign key) |
| `proposed_amount` | DECIMAL(10, 2) | No | - | Proposed amount |
| `original_amount` | DECIMAL(10, 2) | No | - | Original amount |
| `initiator_id` | UUID | No | - | Initiator user ID |
| `status` | VARCHAR(50) | No | 'pending' | Negotiation status |
| `reason` | TEXT | Yes | NULL | Reason for negotiation |
| `conditions` | JSONB | Yes | NULL | Negotiation conditions |
| `responded_at` | TIMESTAMP | Yes | NULL | Response timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `negotiations_pkey` (id)
- `negotiations_payment_id_idx` (payment_id)
- `negotiations_status_idx` (status)

### disputes

Payment disputes.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `payment_id` | UUID | No | - | Payment ID (foreign key) |
| `raised_by` | UUID | No | - | User who raised dispute |
| `reason` | VARCHAR(100) | No | - | Dispute reason |
| `description` | TEXT | Yes | NULL | Dispute description |
| `requested_resolution` | VARCHAR(50) | Yes | NULL | Requested resolution |
| `evidence` | JSONB | Yes | NULL | Evidence array |
| `status` | VARCHAR(50) | No | 'open' | Dispute status |
| `resolution` | JSONB | Yes | NULL | Resolution details |
| `resolved_by` | UUID | Yes | NULL | Resolver user ID |
| `resolved_at` | TIMESTAMP | Yes | NULL | Resolved timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `disputes_pkey` (id)
- `disputes_payment_id_idx` (payment_id)
- `disputes_status_idx` (status)

### marketplace_listings

Marketplace listings.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `seller_id` | UUID | No | - | Seller user ID |
| `name` | VARCHAR(255) | No | - | Listing name |
| `description` | TEXT | Yes | NULL | Listing description |
| `category` | VARCHAR(100) | No | - | Listing category |
| `price` | DECIMAL(10, 2) | No | - | Listing price |
| `currency` | VARCHAR(3) | No | 'USD' | Currency code |
| `images` | JSONB | Yes | NULL | Image URLs array |
| `tags` | JSONB | Yes | NULL | Tags array |
| `specifications` | JSONB | Yes | NULL | Specifications |
| `status` | VARCHAR(50) | No | 'active' | Listing status |
| `average_rating` | DECIMAL(3, 2) | Yes | NULL | Average rating |
| `total_reviews` | INTEGER | Yes | 0 | Total reviews |
| `total_sales` | INTEGER | Yes | 0 | Total sales |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `marketplace_listings_pkey` (id)
- `marketplace_listings_seller_id_idx` (seller_id)
- `marketplace_listings_category_idx` (category)
- `marketplace_listings_status_idx` (status)
- `marketplace_listings_price_idx` (price)

### marketplace_purchases

Marketplace purchases.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `listing_id` | UUID | No | - | Listing ID (foreign key) |
| `buyer_id` | UUID | No | - | Buyer user ID |
| `seller_id` | UUID | No | - | Seller user ID |
| `amount` | DECIMAL(10, 2) | No | - | Purchase amount |
| `currency` | VARCHAR(3) | No | 'USD' | Currency code |
| `quantity` | INTEGER | No | 1 | Purchase quantity |
| `status` | VARCHAR(50) | No | 'pending' | Purchase status |
| `payment_id` | UUID | Yes | NULL | Payment ID |
| `delivery_date` | TIMESTAMP | Yes | NULL | Delivery date |
| `notes` | TEXT | Yes | NULL | Purchase notes |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `marketplace_purchases_pkey` (id)
- `marketplace_purchases_listing_id_idx` (listing_id)
- `marketplace_purchases_buyer_id_idx` (buyer_id)
- `marketplace_purchases_seller_id_idx` (seller_id)
- `marketplace_purchases_status_idx` (status)

### marketplace_reviews

Marketplace reviews.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `purchase_id` | UUID | No | - | Purchase ID (foreign key) |
| `listing_id` | UUID | No | - | Listing ID (foreign key) |
| `user_id` | UUID | No | - | Reviewer user ID |
| `rating` | INTEGER | No | - | Rating (1-5) |
| `comment` | TEXT | Yes | NULL | Review comment |
| `images` | JSONB | Yes | NULL | Image URLs array |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `marketplace_reviews_pkey` (id)
- `marketplace_reviews_purchase_id_idx` (purchase_id)
- `marketplace_reviews_listing_id_idx` (listing_id)
- `marketplace_reviews_user_id_idx` (user_id)

### webhooks

Webhook endpoints.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `user_id` | UUID | No | - | User ID (foreign key) |
| `url` | TEXT | No | - | Webhook URL |
| `events` | JSONB | No | '[]' | Event patterns |
| `description` | VARCHAR(255) | Yes | NULL | Webhook description |
| `active` | BOOLEAN | No | TRUE | Active status |
| `secret` | VARCHAR(255) | No | - | Webhook secret |
| `last_triggered_at` | TIMESTAMP | Yes | NULL | Last triggered |
| `success_rate` | DECIMAL(5, 2) | Yes | NULL | Success rate |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | No | NOW() | Last update timestamp |

**Indexes:**
- `webhooks_pkey` (id)
- `webhooks_user_id_idx` (user_id)
- `webhooks_active_idx` (active)

### webhook_logs

Webhook delivery logs.

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | No | gen_random_uuid() | Primary key |
| `webhook_id` | UUID | No | - | Webhook ID (foreign key) |
| `event_type` | VARCHAR(100) | No | - | Event type |
| `status` | VARCHAR(50) | No | - | Delivery status |
| `status_code` | INTEGER | Yes | NULL | HTTP status code |
| `response_time` | INTEGER | Yes | NULL | Response time (ms) |
| `attempt` | INTEGER | No | 1 | Attempt number |
| `payload` | JSONB | No | '{}' | Event payload |
| `request_headers` | JSONB | Yes | NULL | Request headers |
| `response_body` | TEXT | Yes | NULL | Response body |
| `delivered_at` | TIMESTAMP | Yes | NULL | Delivered timestamp |
| `created_at` | TIMESTAMP | No | NOW() | Creation timestamp |

**Indexes:**
- `webhook_logs_pkey` (id)
- `webhook_logs_webhook_id_idx` (webhook_id)
- `webhook_logs_event_type_idx` (event_type)
- `webhook_logs_status_idx` (status)
- `webhook_logs_created_at_idx` (created_at)

## Relationships

### Foreign Keys

- `api_keys.user_id` → `users.id`
- `payments.sender_id` → `users.id`
- `payments.recipient_id` → `users.id`
- `payment_methods.user_id` → `users.id`
- `escrows.payment_id` → `payments.id`
- `negotiations.payment_id` → `payments.id`
- `negotiations.initiator_id` → `users.id`
- `disputes.payment_id` → `payments.id`
- `disputes.raised_by` → `users.id`
- `disputes.resolved_by` → `users.id`
- `marketplace_listings.seller_id` → `users.id`
- `marketplace_purchases.listing_id` → `marketplace_listings.id`
- `marketplace_purchases.buyer_id` → `users.id`
- `marketplace_purchases.seller_id` → `users.id`
- `marketplace_reviews.purchase_id` → `marketplace_purchases.id`
- `marketplace_reviews.listing_id` → `marketplace_listings.id`
- `marketplace_reviews.user_id` → `users.id`
- `webhooks.user_id` → `users.id`
- `webhook_logs.webhook_id` → `webhooks.id`

## Enumerations

### User Status

- `active` - User is active
- `suspended` - User is suspended
- `deleted` - User is deleted

### Payment Status

- `created` - Payment created
- `negotiating` - Payment under negotiation
- `funded` - Payment funded in escrow
- `executed` - Payment executed
- `completed` - Payment completed
- `failed` - Payment failed
- `cancelled` - Payment cancelled
- `disputed` - Payment disputed
- `refunded` - Payment refunded

### Negotiation Status

- `pending` - Negotiation pending response
- `countered` - Counter-offer made
- `accepted` - Negotiation accepted
- `rejected` - Negotiation rejected
- `expired` - Negotiation expired

### Dispute Status

- `open` - Dispute opened
- `in_review` - Dispute under review
- `arbitration_requested` - Arbitration requested
- `resolved` - Dispute resolved
- `closed` - Dispute closed

### Escrow Status

- `created` - Escrow created
- `funded` - Escrow funded
- `releasing` - Funds being released
- `released` - Funds released
- `disputed` - Escrow disputed
- `refunded` - Escrow refunded

### Listing Status

- `active` - Listing active
- `inactive` - Listing inactive
- `sold` - Listing sold

### Purchase Status

- `pending_payment` - Awaiting payment
- `paid` - Payment received
- `processing` - Processing order
- `shipped` - Order shipped
- `delivered` - Order delivered
- `completed` - Purchase completed
- `cancelled` - Purchase cancelled
- `refunded` - Purchase refunded

## Best Practices

1. **Always use UUIDs** for primary keys
2. **Add appropriate indexes** for frequently queried columns
3. **Use JSONB** for flexible data structures
4. **Implement soft deletes** instead of hard deletes
5. **Add timestamps** (created_at, updated_at) to all tables
6. **Use foreign keys** to maintain referential integrity
7. **Normalize data** where appropriate
8. **Consider partitioning** for large tables

## See Also

- [Type Definitions](types.md)
- [API Reference](../api/README.md)
- [Error Codes](error-codes.md)
