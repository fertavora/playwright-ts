// Login - Standard valid
// Login - Wrong password
// Login - User locked
// Logout

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageobjects/saucedemo/LogInPage';

test.describe('Log In Tests', () => {
  let loginPage;
  test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Valid log in', async () => {
    await test.step('User logs into the application', async () => {
      await loginPage.goto('/');
      const inventoryPage = await loginPage.signIn(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
      await expect(inventoryPage.headerContainer).toBeVisible();
      await expect(inventoryPage.inventoryList).toBeVisible();
    });
  });
});
