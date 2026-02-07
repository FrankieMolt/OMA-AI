import { useEffect } from 'react';

/**
 * Hook to dynamically update page title for client components
 * Note: This doesn't affect SSR metadata, but updates the browser title
 */
export function usePageTitle(title: string) {
  useEffect(() => {
    const fullTitle = `${title} | OMA-AI`;
    document.title = fullTitle;
    return () => {
      document.title = 'OMA-AI - Open Market Access for AI Agents';
    };
  }, [title]);
}

/**
 * Hook to update both title and meta description
 */
export function useMetadata(title: string, description: string) {
  useEffect(() => {
    const fullTitle = `${title} | OMA-AI`;
    document.title = fullTitle;

    // Update or create meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Cleanup
    return () => {
      document.title = 'OMA-AI - Open Market Access for AI Agents';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Browse, test, and integrate 22+ APIs and MCP servers. Pay only for what you use with x402 crypto payments.');
      }
    };
  }, [title, description]);
}
