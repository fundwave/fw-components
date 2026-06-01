import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@fw-components/data-grid": path.resolve(__dirname, "../../packages/data-grid/src/index.ts"),
    },
  },
});
