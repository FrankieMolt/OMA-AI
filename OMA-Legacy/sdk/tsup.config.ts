import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'x402/index': 'src/x402/index.ts',
    'mcp/index': 'src/mcp/index.ts',
    'a2a/index': 'src/a2a/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['@solana/web3.js', '@modelcontextprotocol/sdk', 'zod'],
});
