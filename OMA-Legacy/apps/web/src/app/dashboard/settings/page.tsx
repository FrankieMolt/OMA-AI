import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings, User, Bell, Shield, Key, Lock, Save } from 'lucide-react';
import { db, users } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';
import { DataImportSettings } from '@/components/dashboard/DataImportSettings';

async function getSettingsData(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) return null;

  return { user };
}

export default async function SettingsPage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const data = await getSettingsData(session.user.email);

  if (!data) {
    return <div>User not found</div>;
  }

  const { user: settingsUser } = data;

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3 mb-2">
          <Settings className="text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Data Import Settings */}
        <DataImportSettings />

        {/* Profile Settings */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Settings
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Update your personal information and public profile
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-foreground">
                {settingsUser.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    defaultValue={settingsUser.name || ''}
                    placeholder="Your display name"
                    className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground min-h-[100px] focus:border-primary/50"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settingsUser.email}
                  disabled
                  className="bg-background/5 border-border/50 text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="twitter">Twitter Handle</Label>
              <Input
                id="twitter"
                placeholder="@yourhandle"
                className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Bell className="w-5 h-5 text-warning" />
              Notification Preferences
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose which notifications you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-foreground font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive updates via email</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-foreground font-medium">New Listings Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Get notified about new marketplace listings
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-foreground font-medium">Payment Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive alerts for deposits and withdrawals
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-foreground font-medium">Usage Reports</div>
                <div className="text-sm text-muted-foreground">Weekly usage and analytics reports</div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              Security Settings
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
                className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-background/5 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-foreground font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <Button variant="outline" className="border-border text-muted-foreground">
                  <Key className="w-4 h-4 mr-2" />
                  Enable 2FA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Key className="w-5 h-5 text-accent" />
              API Keys
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your API access keys for integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 glass-panel border border-border/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-foreground font-medium">Production Key</div>
                  <div className="text-xs text-success bg-success/10 px-2 py-1 rounded">
                    Active
                  </div>
                </div>
                <div className="font-mono text-sm text-muted-foreground mb-2">
                  [API_KEY_PLACEHOLDER]
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/50 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/50 text-muted-foreground hover:bg-accent hover:text-foreground"
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full border-border text-muted-foreground">
                <Key className="w-4 h-4 mr-2" />
                Generate New API Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-border text-muted-foreground hover:bg-accent">
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
