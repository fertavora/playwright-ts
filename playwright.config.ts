import 'dotenv/config';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ],
  use: {
    viewport: { width: 1920, height: 1080 },
  },
  projects : [
    {
      name: 'saucedemo',
      testDir: './tests/saucedemo',
      use: {
        baseURL: 'https://www.saucedemo.com',
        testIdAttribute: 'data-test'
      }
    }
  ]
};

export default config;
