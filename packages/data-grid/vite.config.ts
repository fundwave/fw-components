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
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        styles: path.resolve(__dirname, "src/styles.ts")
      },
      formats: ["es"],
      fileName: (_format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "@tanstack/react-table", "@tanstack/react-virtual"],
      // Vite names the extracted CSS after the package by default — pin it so
      // the `./styles.css` export always resolves to a real file.
      output: {
        assetFileNames: "styles.css"
      }
    }
  }
});
