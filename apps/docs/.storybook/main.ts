import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";

const configDir = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(configDir, "../../..");

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: [
        { find: "@taliya/tokens/tokens.css", replacement: resolve(rootDir, "packages/tokens/src/tokens.css") },
        { find: "@taliya/ui/styles.css", replacement: resolve(rootDir, "packages/ui/src/styles.css") },
        { find: "@taliya/crm/styles.css", replacement: resolve(rootDir, "packages/crm/src/styles.css") },
        { find: "@taliya/tokens", replacement: resolve(rootDir, "packages/tokens/src/index.ts") },
        { find: "@taliya/ui", replacement: resolve(rootDir, "packages/ui/src/index.tsx") },
        { find: "@taliya/crm", replacement: resolve(rootDir, "packages/crm/src/index.tsx") }
      ]
    }
  })
};

export default config;
