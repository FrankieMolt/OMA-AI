import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import { PGlite } from '@electric-sql/pglite';
import type { PGlite as PGliteType, PGliteOptions } from '@electric-sql/pglite';
import postgres from 'postgres';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';
import * as schema from '@/lib/db/schema';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITEST;
const isBuild =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.NEXT_PHASE === 'phase-export';
const rawConnectionString: string | URL = isTest || isBuild
  ? 'memory://'
  : ((process.env.DATABASE_URL as string | URL | undefined) ?? './local-db');
const connectionString = (() => {
  if (rawConnectionString instanceof URL) {
    return rawConnectionString.protocol === 'file:'
      ? fileURLToPath(rawConnectionString)
      : rawConnectionString.toString();
  }

  if (typeof rawConnectionString === 'string' && rawConnectionString.startsWith('file://')) {
    return fileURLToPath(new URL(rawConnectionString));
  }

  return typeof rawConnectionString === 'string'
    ? rawConnectionString
    : String(rawConnectionString);
})();

const pgliteDataDir = connectionString.startsWith('memory://')
  ? connectionString
  : resolve(connectionString);

const resolvePgliteAssetPaths = () => {
  const cwd = process.cwd();
  const normalizedCwd = cwd.replace(/\\/g, '/');
  const appRoot = normalizedCwd.endsWith('/apps/web')
    ? cwd
    : resolve(cwd, 'apps', 'web');
  const appNodeModulesDist = resolve(appRoot, 'node_modules', '@electric-sql', 'pglite', 'dist');
  const workspaceNodeModulesDist = resolve(cwd, 'node_modules', '@electric-sql', 'pglite', 'dist');
  const pgliteDistDir = existsSync(appNodeModulesDist)
    ? appNodeModulesDist
    : workspaceNodeModulesDist;
  const dataSource = resolve(pgliteDistDir, 'pglite.data');
  const wasmSource = resolve(pgliteDistDir, 'pglite.wasm');

  if (!existsSync(dataSource) || !existsSync(wasmSource)) {
    return null;
  }

  return { appRoot, dataSource, wasmSource };
};

const ensurePgliteAssets = () => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const resolved = resolvePgliteAssetPaths();
  if (!resolved) {
    return;
  }

  const vendorDirs = [
    resolve(resolved.appRoot, '.next/dev/server/vendor-chunks'),
    resolve(resolved.appRoot, '.next/server/vendor-chunks'),
  ];

  for (const vendorDir of vendorDirs) {
    const dataTarget = resolve(vendorDir, 'pglite.data');
    const wasmTarget = resolve(vendorDir, 'pglite.wasm');

    if (!existsSync(vendorDir)) {
      mkdirSync(vendorDir, { recursive: true });
    }

    if (!existsSync(dataTarget)) {
      copyFileSync(resolved.dataSource, dataTarget);
    }

    if (!existsSync(wasmTarget)) {
      copyFileSync(resolved.wasmSource, wasmTarget);
    }
  }
};


let db: ReturnType<typeof drizzlePostgres> | ReturnType<typeof drizzlePglite>;
let client: postgres.Sql<Record<string, never>> | PGliteType;

// Global singleton to prevent connection exhaustion in development
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql<Record<string, never>> | PGliteType | undefined;
  db: ReturnType<typeof drizzlePostgres> | ReturnType<typeof drizzlePglite> | undefined;
};

if (connectionString.startsWith('postgres://') || connectionString.startsWith('postgresql://')) {
  const newClient = globalForDb.conn ?? postgres(connectionString, { prepare: false });
  client = newClient as postgres.Sql<Record<string, never>>;
  db = globalForDb.db ?? drizzlePostgres(client, { schema });

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.conn = client;
    globalForDb.db = db;
  }
} else {
  ensurePgliteAssets();
  const resolvedAssets = resolvePgliteAssetPaths();
  const pgliteOptions: PGliteOptions = {};

  if (resolvedAssets) {
    const wasmBuffer = readFileSync(resolvedAssets.wasmSource);
    const dataBuffer = readFileSync(resolvedAssets.dataSource);
    pgliteOptions.wasmModule = new WebAssembly.Module(wasmBuffer);
    const blob = typeof Blob !== 'undefined' ? new Blob([dataBuffer]) : null;
    if (blob) {
      pgliteOptions.fsBundle = blob;
    }
  }

  const pgliteClient = await PGlite.create(pgliteDataDir, pgliteOptions);
  client = pgliteClient;
  db = drizzlePglite(pgliteClient, { schema });
}

export { client, db };

// Export only valid schema tables
export const {
  users,
  apiListings,
  reviews,
  usageRecords,
  transactions,
  skills,
  skillReviews,
  skillDownloads,
  categories,
  apiKeys,
  agents,
  agentSkills,
  agentHires,
  agentTasks,
  p2PEndpoints,
  x402Escrows,
  mcpServers,
  aiFeedbackLessons,
  aiFeedbackRecords,
} = schema;
