import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@taliya/tokens": new URL("../tokens/src/index.ts", import.meta.url).pathname,
      "@taliya/ui": new URL("../ui/src/index.tsx", import.meta.url).pathname
    }
  },
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist/**"],
    setupFiles: ["./src/test.setup.ts"],
    testTimeout: 30000
  }
});
