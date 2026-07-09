import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@taliya/tokens": new URL("../../packages/tokens/src/index.ts", import.meta.url).pathname,
      "@taliya/ui": new URL("../../packages/ui/src/index.tsx", import.meta.url).pathname,
      "@taliya/crm": new URL("../../packages/crm/src/index.tsx", import.meta.url).pathname
    }
  },
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, "storybook-static/**"]
  }
});
