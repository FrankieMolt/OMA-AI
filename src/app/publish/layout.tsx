import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publish Your MCP Server',
  description: 'Publish and monetize your MCP server on OMA-AI marketplace. Reach thousands of developers with x402 gasless payments.',
};

export default function PublishLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
