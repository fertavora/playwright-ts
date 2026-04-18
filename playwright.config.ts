import 'dotenv/config';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 30 * 1000,
  expect: {
    timeout: 10000
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? undefined : 1,
  reporter: [ ['list'], ['html', { open: 'never' }], ['json', { outputFile: 'results.json' }] ],
  use: {
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
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
      name: 'BeSoccer',
      testDir: './tests/besoccer',
      use: {
        baseURL: 'https://es.besoccer.com',
        locale: 'es-AR',
        timezoneId: 'America/Argentina/Buenos_Aires',
        trace: 'on',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    }
  ]
};

export default config;
