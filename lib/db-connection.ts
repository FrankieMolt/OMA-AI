import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Connection pool configuration
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  db: {
    schema: "public",
  },
  global: {
    fetch: fetch.bind(globalThis),
    headers: {
      "X-Client-Info": "oma-ai",
    },
  },
});

// Health check
export async function checkDatabaseHealth() {
  const start = Date.now();
  const { error } = await supabase
    .from("users")
    .select("count", { count: "exact" })
    .limit(1);
  return {
    healthy: !error,
    responseTime: Date.now() - start,
  };
}
