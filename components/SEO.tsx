import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export default function SEO({ 
  title = 'OMA-AI | The Zero Human Company',
  description = 'The first fully autonomous agentic economy. Trade compute, intelligence, and labor via x402 payments.',
  image = '/og-image.png',
  url = 'https://oma-ai.com'
}: SEOProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
    </Head>
  )
}
