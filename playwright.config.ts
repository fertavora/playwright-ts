import 'dotenv/config';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? undefined : 1,
  reporter: [ ['list'], ['html'] ],
  use: {
    viewport: { width: 1920, height: 1080 },
    screenshot: 'on',
    trace: 'on',
  },
  projects: [
    { 
      name: 'Auth', 
      testDir: './tests/saucedemo',
      testMatch: /\.*\.setup\.ts/,
      use: {
        testIdAttribute: 'data-test',
        baseURL: process.env.SAUCE_BASE_URL,
      }
    },
    {
      name: 'Sauce Demo',
      testDir: './tests/saucedemo',
      testMatch: /\.*\.spec\.ts/,
      use: {
        storageState: 'playwright/.auth/inventoryAuth.json',
        baseURL: process.env.SAUCE_BASE_URL,
        testIdAttribute: 'data-test',
      },
      dependencies: ['Auth'],
    },
    {
      name: 'Argenprop',
      testDir: './tests/argenprop',
      testMatch: /\.*\.spec\.ts/,
      use: {
        baseURL: process.env.ARGENPROP_BASE_URL
      }
    }
  ]
};

export default config;
