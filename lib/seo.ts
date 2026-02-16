export function getCanonicalUrl(path: string): string {
  const baseUrl = 'https://oma-ai.com';
  return `${baseUrl}${path}`;
}

export function generateMetaTags({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    title: `${title} | OMA-AI`,
    description,
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(path),
      siteName: 'OMA-AI',
    },
  };
}
