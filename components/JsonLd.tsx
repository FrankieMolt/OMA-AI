export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OMA-AI',
    description: 'API Marketplace for AI Agents and MCPs',
    url: 'https://oma-ai.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://oma-ai.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
