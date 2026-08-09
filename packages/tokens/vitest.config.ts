import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, "dist/**"],
    coverage: { thresholds: { lines: 90, functions: 90, branches: 85 } }
  }
});
