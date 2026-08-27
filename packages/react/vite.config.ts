import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";
import path, { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ entryRoot: "src" })],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.tsx")
      },
      formats: ["es"]
    },
    rollupOptions: {
      external: [/^react(\/.*)?$/, /^react-dom(\/.*)?$/, /^react-markdown/, /^lucide-react/],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src"
      }
    },

    outDir: "dist"
    // sourcemap: true,
  }
});
