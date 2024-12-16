import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true, // Start the browser in the background
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});