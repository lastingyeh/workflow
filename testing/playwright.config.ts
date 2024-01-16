import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testMatch: ['tests/ssh.test.ts'],
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on'
  },
  retries: 0,
  reporter: [
    ['dot'],
    ['json', { outputFile: 'jsonReports/jsonReport.json' }],
    ['html', { open: 'on-failure' }],
  ],
});
