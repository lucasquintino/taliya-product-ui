import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: [
    "tests/e2e/**/*.spec.ts",
    "packages/ui/src/**/*.browser.test.tsx",
    "packages/crm/src/**/*.browser.test.tsx"
  ],
  timeout: 120000,
  retries: process.env.CI ? 2 : 0,
  use: { baseURL: "http://127.0.0.1:4175", trace: "retain-on-failure" },
  webServer: {
    command: "node node_modules/vite/bin/vite.js --config tests/browser/vite.config.ts --host 127.0.0.1 --port 4175",
    url: "http://127.0.0.1:4175",
    reuseExistingServer: !process.env.CI,
    timeout: 180000
  },
  projects: [
    { name: "chromium-pr", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-mobile", use: { ...devices["Pixel 5"] } },
    { name: "chromium-release", use: { ...devices["Desktop Chrome"] } },
    { name: "chromium-release-mobile", use: { ...devices["Pixel 5"] } },
    { name: "firefox-release", use: { ...devices["Desktop Firefox"] } },
    { name: "firefox-release-mobile", use: { ...devices["iPhone 13"], browserName: "firefox" } },
    { name: "webkit-release", use: { ...devices["Desktop Safari"] } },
    { name: "webkit-release-mobile", use: { ...devices["iPhone 13"] } }
  ]
});
