import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "dist/**", "src/**/*.browser.test.tsx"],
    setupFiles: ["./src/test.setup.ts"],
    coverage: { thresholds: { lines: 90, functions: 90, branches: 85 } }
  }
});
