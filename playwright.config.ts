import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.QA_BASE_URL || "http://localhost:3010",
    channel: "chrome",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: [
    {
      command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3010",
      url: "http://localhost:3010/api/health",
      reuseExistingServer: !process.env.CI,
      env: { WORDPRESS_API_URL: "", ALLOW_INDEXING: "false", REVALIDATE_SECRET: "" },
    },
    {
      command: "node tests/fixtures/wordpress.mjs",
      url: "http://127.0.0.1:3102/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "node scripts/start.mjs",
      url: "http://127.0.0.1:3101/api/health",
      reuseExistingServer: !process.env.CI,
      env: {
        PORT: "3101",
        HOSTNAME: "127.0.0.1",
        WORDPRESS_API_URL: "http://127.0.0.1:3102/wp-json/wp/v2",
        ALLOW_INDEXING: "true",
        REVALIDATE_SECRET: "integration-test-secret-minimum-32-characters",
        CONTACT_EMAIL: "test@example.com",
      },
    },
  ],
});
