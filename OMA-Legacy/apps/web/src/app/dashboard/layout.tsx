import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10">
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
