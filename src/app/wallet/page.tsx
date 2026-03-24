import { Metadata } from 'next';
import WalletManagement from '@/components/wallet/WalletManagement';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Manage your agent wallet and view transaction history. x402 payments on Base network.',
  keywords: ['wallet', 'x402', 'USDC', 'Base', 'payments', 'transactions'],
};

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-16">
      <WalletManagement />
    </div>
  );
}
