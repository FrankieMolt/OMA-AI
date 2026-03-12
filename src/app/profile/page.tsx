'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { User, Mail, Globe, Image as ImageIcon, Save, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setName(user.user_metadata?.name || '');
        setBio(user.user_metadata?.bio || '');
        setAvatarUrl(user.user_metadata?.avatar_url || '');
        setWebsite(user.user_metadata?.website || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          name,
          bio,
          avatar_url: avatarUrl,
          website,
        },
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Profile saved successfully!' });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              OMA-AI
            </Link>
            <div className="flex items-center gap-4">
              <WalletConnect />
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">
            Manage your public profile and account settings
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'error'
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-green-500/10 border border-green-500/20 text-green-400'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Image Preview */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Avatar</h2>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {name.charAt(0).toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 max-w-md">
                <label className="block text-sm font-bold mb-2">Avatar URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500"
                />
                <p className="mt-2 text-sm text-gray-400">
                  Enter a URL for your profile picture
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-300">
                  <User className="w-4 h-4 text-violet-400" />
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
                <p className="mt-1 text-sm text-gray-400">
                  This name will be displayed on your public profile
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-300">
                  <Mail className="w-4 h-4 text-violet-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-gray-400 cursor-not-allowed"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-2 text-gray-300">
                  <Globe className="w-4 h-4 text-violet-400" />
                  Website
                </label>
                <input
                  type="url"
                  placeholder="https://your-website.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Your personal or portfolio website
                </p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Bio</h2>
            <textarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              maxLength={500}
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
            />
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-gray-400">
                A brief description of who you are and what you do
              </p>
              <span className="text-xs text-gray-500">
                {bio.length} / 500
              </span>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Account Information</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-gray-400">User ID</span>
                <span className="text-sm font-mono text-gray-300">
                  {user?.id?.slice(0, 8)}...
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-gray-400">Joined</span>
                <span className="text-sm text-gray-300">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg">
                <span className="text-gray-400">Last Sign In</span>
                <span className="text-sm text-gray-300">
                  {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Link
              href="/logout"
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                'Saving...'
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
