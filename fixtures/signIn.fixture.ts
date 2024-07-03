import 'dotenv/config';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/LogInPage';

export const test = base.extend({
  page: async ({ page }, use) => {
    await test.step('User signs into Jira', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.goto('/');
      await loginPage.signIn(process.env.JIRA_USERNAME!, process.env.JIRA_PASSWORD!);
      await use(page);
    });
  },
});

export { expect } from '@playwright/test';