# Shorty URL Shortener Service

A full-featured URL shortening service with analytics, QR codes, and a beautiful dashboard. Built with Next.js 16, Supabase, and Tailwind CSS.

## Features

### Core Functionality
- **Shorten URLs** - Create short, memorable links from any URL
- **Custom Short Codes** - Choose your own custom short codes (e.g., `oma-ai.com/my-brand`)
- **QR Code Generation** - Auto-generate QR codes for every short link
- **Click Tracking** - Detailed analytics on every click
- **Fast Redirects** - Optimized for sub-50ms redirect times

### Analytics Dashboard
- **Total Clicks** - See how many times your links are clicked
- **Unique Visitors** - Track unique visitors by IP address
- **Time Series Data** - View clicks over time with beautiful charts
- **Device Breakdown** - Desktop, mobile, tablet statistics
- **Browser Stats** - See which browsers your visitors use
- **Geographic Data** - Country-level click tracking

### API
- **RESTful API** - Simple JSON API for programmatic access
- **Rate Limiting** - Fair usage limits (100/hr free, 1000/hr authenticated)
- **No Auth Required** - Basic shortening works without authentication

### Pricing Tiers
- **Free** - 100 links/month, basic analytics
- **Basic ($5/mo)** - 1000 links/month, custom domains, advanced analytics
- **Pro ($20/mo)** - Unlimited links, team access, full analytics suite

## Setup Instructions

### 1. Database Setup

Run the SQL schema in Supabase:

```bash
# Go to Supabase Dashboard > SQL Editor
# Copy and paste the contents of: supabase/url_shortener_schema.sql
```

The schema creates:
- `links` table - Stores shortened URLs
- `link_clicks` table - Stores click analytics
- `rate_limits` table - For API rate limiting
- Row Level Security (RLS) policies
- Helper functions for incrementing counters

### 2. Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_BASE_URL=https://oma-ai.com
```

### 3. Install Dependencies

```bash
npm install qrcode recharts
```

### 4. Deploy

```bash
npm run build
vercel --prod
```

## API Endpoints

### POST /api/shorten
Create a new short URL.

**Request:**
```json
{
  "url": "https://example.com/very-long-url",
  "custom_code": "my-link"  // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "short_code": "abc123",
    "short_url": "https://oma-ai.com/abc123",
    "original_url": "https://example.com/...",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

### GET /api/links
List all links for authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### GET /api/stats/{shortCode}
Get analytics for a specific link.

**Response:**
```json
{
  "success": true,
  "data": {
    "link": { ... },
    "stats": {
      "total_clicks": 1234,
      "unique_visitors": 987,
      "clicks_by_day": [...],
      "clicks_by_country": [...],
      "clicks_by_device": [...]
    }
  }
}
```

### GET /api/qr/{shortCode}
Generate QR code for a short URL.

**Query Parameters:**
- `format` - `svg` (default) or `png`
- `size` - Size in pixels (default: 300)
- `color` - Hex color (default: #000000)
- `bg` - Background color (default: #FFFFFF)

### GET /{shortCode}
Redirect to the original URL and track the click.

## Pages

| Page | Description |
|------|-------------|
| `/shorten` | Main shortening interface |
| `/shorten/dashboard` | Analytics dashboard (requires auth) |
| `/shorten/api` | API documentation |
| `/shorten/pricing` | Pricing page |
| `/{shortCode}` | Redirect handler |

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** NextAuth.js (optional for basic use)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **QR Codes:** qrcode npm package
- **Animations:** Framer Motion

## Revenue Model

The service is designed to generate revenue through:

1. **Subscription Tiers** - Monthly recurring revenue from Basic ($5) and Pro ($20) plans
2. **API Usage** - Higher rate limits for paid users
3. **Custom Domains** - Premium feature for branded short links
4. **Team Collaboration** - Multi-user access for Pro plans

## Future Enhancements

- [ ] UTM parameter builder
- [ ] Link expiration dates
- [ ] Password-protected links
- [ ] Link folders/organization
- [ ] A/B testing for links
- [ ] Webhook notifications
- [ ] Bulk link import/export
- [ ] Browser extension

## License

MIT - Part of the OMA-AI ecosystem.
