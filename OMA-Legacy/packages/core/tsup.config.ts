import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    memory: 'src/memory/index.ts',
    meta: 'src/meta/index.ts',
    voice: 'src/voice/index.ts',
    context: 'src/context/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['@memvid/sdk', 'zod', 'eventemitter3'],
});
