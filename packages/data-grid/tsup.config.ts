import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: true,
  external: ["react", "react-dom", "@tanstack/react-table", "@tanstack/react-virtual"],
  treeshake: true,
  esbuildOptions(options) {
    options.resolveExtensions = [".tsx", ".ts", ".jsx", ".js"];
  },
});
