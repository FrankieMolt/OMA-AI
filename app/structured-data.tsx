export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'OMA-AI',
          description: 'Open Market Access for AI Agents',
          url: 'https://oma-ai.com',
          logo: 'https://oma-ai.com/logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            email: 'frankie@agentmail.to',
            contactType: 'customer service',
          },
          sameAs: [
            'https://github.com/FrankieMolt',
            'https://twitter.com/oma_ai',
          ],
        }),
      }}
    />
  )
}

export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'OMA-AI',
          url: 'https://oma-ai.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://oma-ai.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  )
}
