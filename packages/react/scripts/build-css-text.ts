import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(dirname, "..", "dist");
const cssPath = path.join(outDir, "styles.css");

const css = fs.readFileSync(cssPath, "utf8");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "styles.js"), `export const styles = ${JSON.stringify(css)};\n`);
fs.writeFileSync(path.join(outDir, "styles.d.ts"), "export declare const styles: string;\n");
