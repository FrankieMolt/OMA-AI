'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { User, CreditCard, Key, Shield, Bell, ChevronRight, Settings, LogOut, Mail, Calendar, CheckCircle } from 'lucide-react';

export default function AccountPage() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ mcpsOwned: 0, totalCalls: 0, totalSpent: 0 });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);

        // Fetch user stats from Supabase
        const { data: userMcps } = await supabase
          .from('user_mcps')
          .select('mcp_server_id, mcp_servers(total_calls, pricing_usdc)')
          .eq('user_id', user.id);

        if (userMcps) {
          const mcpsOwned = userMcps.length;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const totalCalls = userMcps.reduce((sum: number, um: any) => sum + (um.mcp_servers?.total_calls || 0), 0);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const totalSpent = userMcps.reduce((sum: number, um: any) => sum + (um.mcp_servers?.pricing_usdc || 0) * (um.mcp_servers?.total_calls || 0), 0);
          setStats({ mcpsOwned, totalCalls, totalSpent });
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const accountSections = [
    {
      title: 'Profile',
      description: 'Manage your public profile and display information',
      href: '/profile',
      icon: User,
      color: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Security',
      description: 'Password, two-factor authentication, and login history',
      href: '/settings/security',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Billing',
      description: 'Payment methods, invoices, and spending limits',
      href: '/transactions',
      icon: CreditCard,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'API Keys',
      description: 'Manage API keys for programmatic access',
      href: '/keys',
      icon: Key,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Notifications',
      description: 'Email and push notification preferences',
      href: '/settings/notifications',
      icon: Bell,
      color: 'from-pink-500 to-rose-600',
    },
    {
      title: 'Settings',
      description: 'General preferences, language, and theme',
      href: '/settings',
      icon: Settings,
      color: 'from-gray-500 to-zinc-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="container mx-auto px-4 max-w-7xl py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Sign in to your account</h1>
            <p className="text-gray-400 mb-8">Access your account settings and manage your MCPs</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              OMA-AI
            </Link>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Account</h1>
          <p className="text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">MCPs Owned</p>
                <p className="text-2xl font-bold text-white">{stats.mcpsOwned}</p>
              </div>
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔌</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Calls</p>
                <p className="text-2xl font-bold text-white">{stats.totalCalls.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accountSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors">
                        {section.title}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Account Info */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
              <Mail className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-white font-medium">{user.email || 'No email'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-gray-400">Member Since</p>
                <p className="text-sm text-white font-medium">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Email Verified</p>
                <p className="text-sm text-white font-medium">
                  {user.email_confirmed_at ? 'Yes' : 'Pending'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg">
              <Key className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs text-gray-400">User ID</p>
                <p className="text-sm text-white font-medium font-mono">
                  {user.id?.slice(0, 8)}...{user.id?.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-4">
            Irreversible actions for your account
          </p>
          <Link
            href="/logout"
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
