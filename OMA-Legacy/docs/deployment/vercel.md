# Vercel Deployment

Deploy OpenMarketAccess frontend applications to Vercel.

## Prerequisites

- Vercel account
- Node.js 18 or higher
- Git repository

## Quick Start

### Deploy from CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel
```

### Deploy from Dashboard

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Click Deploy

## Configuration

### vercel.json

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "OMA_API_KEY": "@oma-api-key",
    "OMA_API_URL": "https://api.openmarketaccess.com/v1"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/webhook",
      "destination": "/api/webhook"
    }
  ]
}
```

### Environment Variables

Set environment variables in Vercel dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `OMA_API_KEY` | API key for authentication | Yes |
| `OMA_API_URL` | API base URL | Yes |
| `OMA_WEBHOOK_SECRET` | Webhook secret | Yes |

## Serverless Functions

### API Routes

Create `api/webhook.ts`:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyWebhookSignature } from '@openmarketaccess/sdk';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-oma-signature'] as string;
  const payload = JSON.stringify(req.body);

  // Verify signature
  const isValid = verifyWebhookSignature(
    payload,
    signature,
    process.env.OMA_WEBHOOK_SECRET!
  );

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Handle webhook
  handleWebhook(req.body);

  res.status(200).send('OK');
}

function handleWebhook(event: any) {
  console.log('Webhook received:', event.type);
}
```

### Payment Processing

Create `api/payment.ts`:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenMarketAccess } from '@openmarketaccess/sdk';

const oma = new OpenMarketAccess({
  apiKey: process.env.OMA_API_KEY!
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payment = await oma.payments.create(req.body);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Payment creation failed' });
  }
}
```

## Edge Functions

### Edge Webhook Handler

Create `api/webhook-edge.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@openmarketaccess/sdk';

export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const signature = req.headers.get('x-oma-signature');
  const payload = await req.text();

  // Verify signature
  const isValid = verifyWebhookSignature(
    payload,
    signature!,
    process.env.OMA_WEBHOOK_SECRET!
  );

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Handle webhook
  const event = JSON.parse(payload);
  handleWebhook(event);

  return NextResponse.json({ success: true });
}
```

## Preview Deployments

### Preview Branches

```bash
# Deploy preview for current branch
vercel

# Deploy preview for specific branch
vercel --branch feature/new-feature
```

### Preview Environment Variables

```json
{
  "env": {
    "OMA_API_URL": "https://sandbox-api.openmarketaccess.com/v1"
  }
}
```

## Production Deployments

### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Or use alias
vercel alias set https://your-app.vercel.app yourdomain.com
```

### Production Environment Variables

Set production-specific variables in Vercel dashboard.

## Custom Domains

### Add Custom Domain

```bash
# Add domain
vercel domains add yourdomain.com

# Remove domain
vercel domains rm yourdomain.com
```

### Wildcard Domains

```bash
vercel domains add *.yourdomain.com
```

## Performance Optimization

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority
/>
```

### Static Generation

```typescript
export async function getStaticProps() {
  const listings = await oma.marketplace.listListings({ limit: 10 });

  return {
    props: {
      listings,
    },
    revalidate: 60, // ISR every 60 seconds
  };
}
```

### Edge Caching

```typescript
export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const cache = caches.default;
  const cacheKey = new Request(req.url);

  let response = await cache.match(cacheKey);

  if (!response) {
    response = new NextResponse(JSON.stringify(data));
    response.headers.set('Cache-Control', 'public, max-age=3600');
    await cache.put(cacheKey, response.clone());
  }

  return response;
}
```

## Monitoring

### Vercel Analytics

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <App />
      <Analytics />
    </>
  );
}
```

### Custom Analytics

```typescript
// api/analytics.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Send analytics data to your service
  await fetch('https://analytics.example.com/track', {
    method: 'POST',
    body: JSON.stringify(req.body),
  });

  res.status(200).json({ success: true });
}
```

## Troubleshooting

### Build Errors

```bash
# Check build logs
vercel logs

# View build output
vercel build
```

### Runtime Errors

```bash
# View function logs
vercel logs --follow
```

### Environment Variables

```bash
# List environment variables
vercel env ls

# Pull environment variables
vercel env pull .env.local
```

## See Also

- [Docker Deployment](docker.md)
- [Kubernetes Deployment](kubernetes.md)
- [Environment Variables](env-vars.md)
