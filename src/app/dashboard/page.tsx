import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Zap, DollarSign, Clock, Settings, LogOut } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | OMA-AI',
  description: 'Manage your MCP marketplace dashboard, view earnings, and monitor your AI agent integrations.',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login');
  }

  // Fetch user's MCPs
  const { data: userMcps } = await supabase
    .from('user_mcps')
    .select(`
      *,
      mcp_servers (
        id,
        name,
        slug,
        category,
        status,
        rating,
        total_calls
      )
    `)
    .eq('user_id', user.id);

  // Fetch user's wallets
  const { data: wallets } = await supabase
    .from('user_wallets')
    .select('*')
    .eq('user_id', user.id);

  // Calculate stats
  const mcpsOwned = userMcps?.length || 0;
  const totalCalls = userMcps?.reduce((sum, um) => sum + (um.mcp_servers?.total_calls || 0), 0) || 0;
  const walletsConnected = wallets?.length || 0;
  const avgRating = mcpsOwned > 0
    ? userMcps?.reduce((sum, um) => sum + (um.mcp_servers?.rating || 0), 0) / mcpsOwned
    : 0;

  const userName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const userAvatar = user.user_metadata?.avatar_url || null;

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              OMA-AI
            </Link>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link
                href="/profile"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <Link
                href="/logout"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-7xl py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-400">
            Manage your MCP tools, analytics, and earnings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="MCPs Owned"
            value={mcpsOwned}
            icon={Zap}
            color="text-violet-400"
            bgColor="bg-violet-500/10"
          />
          <StatCard
            title="Total API Calls"
            value={totalCalls.toLocaleString()}
            icon={TrendingUp}
            color="text-green-400"
            bgColor="bg-green-500/10"
          />
          <StatCard
            title="Wallets Connected"
            value={walletsConnected}
            icon={Users}
            color="text-blue-400"
            bgColor="bg-blue-500/10"
          />
          <StatCard
            title="Avg Rating"
            value={avgRating.toFixed(1)}
            icon={DollarSign}
            color="text-amber-400"
            bgColor="bg-amber-500/10"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My MCPs */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">My MCPs</h2>
              <Link
                href="/publish"
                className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300"
              >
                <Zap className="w-4 h-4" />
                Publish New MCP
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {mcpsOwned === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-zinc-800 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No MCPs Yet</h3>
                <p className="text-gray-400 mb-4">
                  Start building and monetizing your MCP tools
                </p>
                <Link
                  href="/publish"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
                >
                  Publish Your First MCP
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {userMcps?.map((userMcp) => (
                  <Link
                    key={userMcp.id}
                    href={`/mcps/${userMcp.mcp_servers?.slug}`}
                    className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {userMcp.mcp_servers?.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {userMcp.mcp_servers?.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                          ★ {userMcp.mcp_servers?.rating?.toFixed(1) || '0.0'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {userMcp.mcp_servers?.total_calls?.toLocaleString() || 0} calls
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Wallets */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Connected Wallets</h2>

              {walletsConnected === 0 ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 mx-auto mb-3 bg-zinc-800 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 mb-3">No wallets connected</p>
                  <WalletConnect />
                </div>
              ) : (
                <div className="space-y-3">
                  {wallets?.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-white capitalize">
                          {wallet.chain}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Earnings */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Earnings</h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  $0.00
                </div>
                <p className="text-sm text-gray-400 mb-4">Total lifetime earnings</p>
                <Link
                  href="/wallet/earnings"
                  className="text-sm text-violet-400 hover:text-violet-300"
                >
                  View detailed earnings →
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
              <div className="space-y-2">
                <QuickLink href="/mcps" icon={Zap}>Browse Marketplace</QuickLink>
                <QuickLink href="/publish" icon={ArrowRight}>Publish MCP</QuickLink>
                <QuickLink href="/profile" icon={Settings}>Settings</QuickLink>
                <QuickLink href="/api/docs" icon={Clock}>API Documentation</QuickLink>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${bgColor} rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className={`text-2xl font-bold text-white`}>{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    </div>
  );
}

function QuickLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors text-gray-300 hover:text-white"
    >
      <Icon className="w-4 h-4 text-violet-400" />
      <span className="text-sm">{children}</span>
    </Link>
  );
}
