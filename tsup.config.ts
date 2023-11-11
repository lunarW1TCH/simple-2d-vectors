import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    './src/index.ts',
    './src/angle-helpers.ts',
    './src/error-handlers.ts',
    './src/param-helpers.ts',
    './src/type-guards.ts',
    './src/types.ts',
    './src/vector.ts',
  ],
  format: ['cjs', 'esm'], // Build for commonJS and ESmodules
  dts: true, // Generate declaration file (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true,
});

// TODO: fix composite: false in tsconfig? if needed, might be not
