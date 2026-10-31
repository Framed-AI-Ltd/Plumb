import { defineConfig } from 'vitest/config';
import stylex from '@stylexjs/unplugin';
// Vitest loads this config too: StyleX create/defineVars calls must be compiled in SSR tests.
export default defineConfig({
  envDir: false, plugins: [stylex.vite({ useCSSLayers: false, propertyValidationMode: "throw" })], test: { include: ['tests/**/*.test.{ts,tsx}'] } });
