import path from "node:path";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["src"], tsconfigPath: "./tsconfig.json" })
  ],
  build: {
    // cssCodeSplit: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        styles: path.resolve(__dirname, "src/styles.ts")
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom"]
    }
  }
});
