'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Settings, Mail, ShieldCheck, Edit2, Save, X, Camera, Upload } from 'lucide-react';
import type { User as UserType } from '@/lib/db/schema';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    twitter: '',
    github: '',
    verified: false,
    tier: '',
  });

  useEffect(() => {
    try {
      const client = createClient();
      setSupabase(client);
    } catch {  
      // Error handling logic if needed
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const fetchUserProfile = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/login');
          return;
        }

        // Get user profile from database (mock for now, replace with real call)
        const mockUserData = {
          id: 1,
          email: authUser.email || '',
          name: authUser.user_metadata?.name || 'Demo User',
          password: 'mock_password',
          role: 'user',
          credits: 5000.0,
          profile: {
            bio: 'AI enthusiast and developer passionate about building future of decentralized AI.',
            website: 'https://demo.com',
            twitter: '@demo_user',
            github: 'demo-user',
            verified: true,
            tier: 'Developer',
          },
          stripeCustomerId: null,
          solanaWalletAddress: null,
          usdcBalance: 500.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setUser(mockUserData);
        setProfile({
          name: mockUserData.name,
          email: mockUserData.email,
          bio: mockUserData.profile?.bio || '',
          website: mockUserData.profile?.website || '',
          twitter: mockUserData.profile?.twitter || '',
          github: mockUserData.profile?.github || '',
          verified: mockUserData.profile?.verified || false,
          tier: mockUserData.profile?.tier || '',
        });
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [supabase, router]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    if (!supabase) {
      setMessage('Configuration error: Supabase not initialized');
      setSaving(false);
      return;
    }

    try {
      // Update Supabase auth metadata
      const { error } = await supabase.auth.updateUser({
        data: {
          name: profile.name,
        },
      });

      if (error) {
        setMessage('Failed to update profile');
      } else {
        setMessage('Profile updated successfully!');
        setEditing(false);
      }
    } catch {  
      setMessage('An error occurred');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mock avatar upload - replace with real implementation
    setMessage('Avatar upload not implemented yet');
    setTimeout(() => setMessage(null), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">Profile not found</h2>
          <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push('/dashboard')}>
              ← Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? (
                    <Save className="w-4 h-4 mr-2 animate-pulse" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div
            className={`p-4 rounded-lg mb-6 text-center ${
              message.includes('successfully')
                ? 'bg-success/10 border border-success/20 text-success'
                : 'bg-destructive/10 border border-destructive/20 text-destructive'
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid gap-8">
          {/* Profile Card */}
          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {editing && (
                    <div className="absolute bottom-0 right-0">
                      <Button size="sm" variant="outline" className="bg-background border-border/60">
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-lg">{profile.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                    {profile.verified && (
                      <Badge className="bg-success/10 text-success border-success/30 ml-2">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge className="bg-accent/10 text-accent border-accent/30">
                      {profile.tier}
                    </Badge>
                    <span className="text-muted-foreground/80">
                      • Joined {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                      disabled={!editing}
                      className="glass-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      disabled={!editing}
                      className="glass-input"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    disabled={!editing}
                    className="min-h-[100px] glass-input"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => setProfile((prev) => ({ ...prev, website: e.target.value }))}
                      disabled={!editing}
                      className="glass-input"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profile.twitter}
                      onChange={(e) => setProfile((prev) => ({ ...prev, twitter: e.target.value }))}
                      disabled={!editing}
                      className="glass-input"
                      placeholder="@username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) => setProfile((prev) => ({ ...prev, github: e.target.value }))}
                      disabled={!editing}
                      className="glass-input"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Upload Input */}
              {editing && (
                <div className="space-y-2">
                  <Label htmlFor="avatar">Avatar</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('avatar')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Avatar
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="glass-card border-border/60">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-foreground/[0.04] border border-border/60 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {user.credits.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Credits Balance</div>
                </div>
                <div className="p-4 bg-foreground/[0.04] border border-border/60 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">${user.usdcBalance}</div>
                  <div className="text-sm text-muted-foreground">USDC Balance</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-foreground/[0.04] border border-border/60 rounded-lg">
                  <div className="text-2xl font-bold text-primary">Premium</div>
                  <div className="text-sm text-muted-foreground">Account Tier</div>
                </div>
                <div className="p-4 bg-foreground/[0.04] border border-border/60 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">Active</div>
                  <div className="text-sm text-muted-foreground">Account Status</div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/60">
                <h4 className="font-semibold text-foreground mb-2">Account Limits</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>API Calls per Month</span>
                    <span className="text-foreground">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Listings</span>
                    <span className="text-foreground">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage Used</span>
                    <span className="text-foreground">2.3 GB / 10 GB</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
