import { db } from '@/lib/db';
import { users, apiListings } from '@/lib/db';
import { eq } from 'drizzle-orm';
import type { ApiListing } from '@/lib/db/schema';
import {
  Bot,
  Code,
  Cpu,
  Globe,
  Search,
  Plus,
  Filter,
  ArrowUpRight,
  DollarSign,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

async function getMarketplaceData(email: string = 'admin@oma.ai') {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user) return null;

  const listings = await db.select().from(apiListings).where(eq(apiListings.ownerId, user.id));

  return { listings };
}

export default async function MarketplacePage() {
  const data = await getMarketplaceData('admin@oma.ai');

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 text-foreground">
        <Globe className="w-12 h-12 text-muted-foreground/70 mb-4" />
        <h2 className="text-xl font-bold mb-2">No Profile Found</h2>
        <p className="text-muted-foreground mt-2">
          Browse and purchase AI agents and MCP servers for your OMA stack. All transactions are
          secured by x402 {" ' pay-per-request ' "} protocol.
        </p>
        <Link href="/api/test-seed" className="mt-6">
          <button className="py-2 px-6 bg-foreground/5 border border-border/60 rounded-lg hover:bg-foreground/10 transition">
            Run Seeding Utility
          </button>
        </Link>
      </div>
    );
  }

  const { listings } = data;

  const activeListings = listings.filter((l: ApiListing) => l.status === 'approved');
  const pendingListings = listings.filter((l: ApiListing) => l.status === 'pending');

  // Calculate total revenue (mock for now, real implementation would join with transactions)
  const totalRevenue = 1250.5;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 mb-2 text-foreground">
              <Globe className="text-primary" />
              Marketplace Listings
            </h1>
            <p className="text-muted-foreground">Manage your published agents, MCP servers, and APIs.</p>
          </div>
          <Link href="/dashboard/create">
            <button className="py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg transition-all flex items-center gap-2 shadow-neon">
              <Plus className="size-4" />
              Create Listing
            </button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-surface/90 backdrop-blur-md rounded-lg border border-border/60 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-full bg-success/10 flex items-center justify-center border border-success/20">
                <Globe className="size-5 text-success" />
              </div>
              <span className="text-xs text-success font-bold bg-success/10 px-2 py-1 rounded border border-success/20">
                +2 this week
              </span>
            </div>
            <div className="text-3xl font-bold mb-1 text-foreground">{activeListings.length}</div>
            <div className="text-sm text-muted-foreground font-medium">Active Listings</div>
          </div>

          <div className="bg-surface/90 backdrop-blur-md rounded-lg border border-border/60 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-full bg-warning/10 flex items-center justify-center border border-warning/20">
                <Clock className="size-5 text-warning" />
              </div>
              <span className="text-xs text-warning font-bold bg-warning/10 px-2 py-1 rounded border border-warning/20">
                Under Review
              </span>
            </div>
            <div className="text-3xl font-bold mb-1 text-foreground">{pendingListings.length}</div>
            <div className="text-sm text-muted-foreground font-medium">Pending Approval</div>
          </div>

          <div className="bg-surface/90 backdrop-blur-md rounded-lg border border-border/60 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <DollarSign className="size-5 text-primary" />
              </div>
              <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded border border-primary/20">
                +15% vs last month
              </span>
            </div>
            <div className="text-3xl font-bold mb-1 text-foreground">${totalRevenue.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground font-medium">Total Revenue</div>
          </div>
        </div>

        {/* Listings List */}
        <div className="bg-surface/90 backdrop-blur-md rounded-lg border border-border/60 overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-border/60 flex items-center justify-between bg-foreground/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 size-4" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  className="bg-surface border border-border/60 rounded-lg py-1.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary w-64 transition-all"
                />
              </div>
              <button
                className="p-1.5 rounded-lg border border-border/60 hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all flex items-center justify-center"
                aria-label="Filter listings"
              >
                <Filter className="size-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <select
                className="bg-surface border border-border/60 rounded-lg py-1.5 px-3 text-sm text-foreground focus:outline-none focus:border-primary cursor-pointer transition-all"
                aria-label="Filter by type"
              >
                <option value="all">All Types</option>
                <option value="agent">Agents</option>
                <option value="mcp">MCP Servers</option>
                <option value="api">APIs</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase text-muted-foreground/70 tracking-wider border-b border-border/60 bg-foreground/5">
                  <th className="px-6 py-3 font-medium">Listing</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Stats</th>
                  <th className="px-6 py-3 font-medium text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {listings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground/70">
                      No listings found. Create your first listing to get started.
                    </td>
                  </tr>
                ) : (
                  listings.map((listing: ApiListing) => (
                    <tr
                      key={listing.id}
                      className="border-b border-border/60 hover:bg-foreground/5 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-surface border border-border/60 flex items-center justify-center transition-transform group-hover:scale-110">
                            {listing.category === 'agent' ? (
                              <Bot className="size-5 text-primary" />
                            ) : listing.category === 'mcp' ? (
                              <Cpu className="size-5 text-secondary" />
                            ) : (
                              <Code className="size-5 text-info" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {listing.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {listing.description || 'No description provided'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">
                        <span className="capitalize font-medium">{listing.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                            listing.status === 'approved'
                              ? 'bg-success/10 border-success/20 text-success'
                              : 'bg-warning/10 border-warning/20 text-warning'
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${listing.status === 'approved' ? 'bg-success animate-pulse' : 'bg-warning'}`}
                          ></span>
                          {listing.status === 'approved' ? 'Active' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-foreground">
                          {listing.price === 0 || !listing.price ? 'Free' : `$${listing.price}`}
                        </div>
                        <div className="text-xs text-muted-foreground/70 capitalize">
                          {listing.pricingType || 'one-time'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 font-mono">
                            <ArrowUpRight className="size-3" /> 1.2k
                          </span>
                          <span className="flex items-center gap-1">⭐ 4.8</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right pr-12">
                        <Link href={`/marketplace/${listing.slug}`}>
                          <button className="text-primary hover:text-primary-hover font-bold text-xs uppercase tracking-wider transition-all">
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
