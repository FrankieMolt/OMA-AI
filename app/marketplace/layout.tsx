import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marketplace',
  description: 'Discover and access hundreds of APIs for AI agents.',
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
