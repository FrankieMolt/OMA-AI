import { NextResponse } from 'next/server';

export async function GET() {
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "OMA-AI",
    "description": "The premier API marketplace for AI agents. Discover, access, and pay for APIs with x402 crypto micropayments.",
    "url": "https://oma-ai.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Pay-per-use API marketplace with x402 micropayments"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "provider": {
      "@type": "Organization",
      "name": "OMA Systems",
      "url": "https://oma-ai.com"
    },
    "featureList": [
      "450+ verified APIs and MCP servers",
      "x402 crypto micropayments",
      "Agent authentication",
      "Bounty marketplace",
      "Real-time API monitoring"
    ]
  };

  return NextResponse.json(jsonld, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
