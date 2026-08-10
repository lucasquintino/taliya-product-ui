import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

export default defineConfig({
  root: resolve(root, "tests/browser"),
  plugins: [react()],
  resolve: {
    alias: {
      "@taliya/tokens/tokens.css": resolve(root, "packages/tokens/src/tokens.css"),
      "@taliya/ui/styles.css": resolve(root, "packages/ui/src/styles.css"),
      "@taliya/crm/styles.css": resolve(root, "packages/crm/src/styles.css"),
      "@taliya/tokens": resolve(root, "packages/tokens/src/index.ts"),
      "@taliya/ui": resolve(root, "packages/ui/src/index.tsx"),
      "@taliya/crm": resolve(root, "packages/crm/src/index.tsx")
    }
  }
});
