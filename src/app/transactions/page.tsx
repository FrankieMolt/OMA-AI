import { Metadata } from 'next';
import TransactionsFeed from '@/components/transactions/TransactionsFeed';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Transactions | OMA-AI',
  description: 'Real-time x402 payment transactions on OMA marketplace. View transaction history and payment details.',
  keywords: ['transactions', 'x402', 'payments', 'USDC', 'Base', 'activity'],
};

export default function TransactionsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-zinc-950 pt-16">
        <TransactionsFeed />
      </main>
      <Footer />
    </>
  );
}
