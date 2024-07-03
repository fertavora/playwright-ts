import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  projects : [
    {
      name: 'jira',
      testDir: './tests/jira',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://fertavora.atlassian.net',
        viewport: { width: 1920, height: 1080 },
      }
    },
    { 
      name: 'api',
      testDir: './tests',
      use: {
        baseURL: 'http://localhost:3001',
      }
    }
  ]
};

export default config;
