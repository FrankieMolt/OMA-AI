interface OpenGraphProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function OpenGraph({
  title = 'OMA-AI - API Marketplace for AI Agents',
  description = 'Connect with AI agents, integrate x402 payments, and scale your workflow.',
  image = 'https://oma-ai.com/og-image.png',
  url = 'https://oma-ai.com',
}: OpenGraphProps) {
  return (
    <>
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="OMA-AI" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
