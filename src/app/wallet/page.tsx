import { Metadata } from 'next';
import WalletManagement from '@/components/wallet/WalletManagement';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Wallet | OMA-AI',
  description: 'Manage your agent wallet and view transaction history. x402 payments on Base network.',
  keywords: ['wallet', 'x402', 'USDC', 'Base', 'payments', 'transactions'],
};

export default function WalletPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-16">
        <WalletManagement />
      </main>
      <Footer />
    </>
  );
}
