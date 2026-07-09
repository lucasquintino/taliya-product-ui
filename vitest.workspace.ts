import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "packages/tokens/vitest.config.ts",
  "packages/ui/vitest.config.ts",
  "packages/crm/vitest.config.ts",
  "apps/docs/vitest.config.ts"
]);
