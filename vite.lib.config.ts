// Library build: ESM JavaScript (styles are copied separately by tools/build-assets.mjs). Dependencies stay external so apps dedupe them.
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const external = [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})];

export default defineConfig({
  envDir: false,
  plugins: [stylex.vite({ useCSSLayers: false, propertyValidationMode: "throw" })],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "index.js" },
    rollupOptions: {
      // Components use hooks and context, so React Server Components must treat the package as client code.
      output: { banner: '"use client";' },
      external: (id) => external.some((dep) => id === dep || id.startsWith(`${dep}/`)) || id === "react/jsx-runtime",
    },
  },
});
