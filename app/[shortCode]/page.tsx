import { redirect, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { parseUserAgent } from "@/lib/shortener";
import { headers } from "next/headers";

interface RedirectPageProps {
  params: Promise<{ shortCode: string }>;
}

export async function generateMetadata({ params }: RedirectPageProps) {
  const { shortCode } = await params;

  return {
    title: `Redirecting...`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortCode } = await params;
  const headersList = await headers();

  const supabaseClient = supabase;

  if (!supabase) {
    notFound();
  }

  // Fetch the link
  const { data: link, error: linkError } = await supabase
    .from("links")
    .select("id, original_url, is_active")
    .eq("short_code", shortCode)
    .single();

  if (linkError || !link) {
    notFound();
  }

  if (!link.is_active) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Link Inactive</h1>
          <p className="text-gray-400">This link has been deactivated.</p>
        </div>
      </div>
    );
  }

  // Get request metadata for analytics
  const ipAddress =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";
  const referrer = headersList.get("referer") || "";

  // Parse user agent
  const { deviceType, browser, os } = parseUserAgent(userAgent);

  // Get country from headers (if using a CDN like Cloudflare)
  const country =
    headersList.get("cf-ipcountry") ||
    headersList.get("x-vercel-ip-country") ||
    null;

  // Record the click asynchronously (fire and forget)
  // Use void to explicitly ignore the promise
  void (async () => {
    try {
      await supabase.from("link_clicks").insert({
        link_id: link.id,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer: referrer,
        country: country,
        device_type: deviceType,
        browser: browser,
        os: os,
      });
      // Also increment the click count
      await supabase.rpc("increment_link_clicks", { link_uuid: link.id });
    } catch (err) {}
  })();

  // Perform the redirect
  redirect(link.original_url);
}
