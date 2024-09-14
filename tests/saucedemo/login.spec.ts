import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../../pageobjects/saucedemo';
const WRONG_PASSWORD = 'wrongpassword';

test.describe('Log In Tests', () => {
  let loginPage; let inventoryPage;
  test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('User logs into the application', async () => {
    await test.step('User enters valid log in credentials', async () => {
      await loginPage.goto();
      inventoryPage = await loginPage.signIn(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Verify valid log in', async () => {
      await expect(inventoryPage.headerContainer).toBeVisible();
      await expect(inventoryPage.inventoryList).toBeVisible();
    });
  });

  test('User is not able to log in with invalid credentials', async () => {
    await test.step('User enters invalid log in credentials', async () => {
      await loginPage.goto();
      await loginPage.signIn(process.env.SAUCE_USER, WRONG_PASSWORD);
    });

    await test.step('Verify invalid log in', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
  });

  test('User is not able to log in with locked user credentials', async () => {
    await test.step('User enters locked user log in credentials', async () => {
      await loginPage.goto();
      await loginPage.signIn(process.env.SAUCE_LOCKED_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Verify locked user log in', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
  });

  test('User logs out of the application', async () => {
    await test.step('User logs out of the application', async() => {
      inventoryPage = new InventoryPage(loginPage.page);
      await inventoryPage.goto();
      await inventoryPage.logOut();
      await expect(loginPage.inputUsername).toBeVisible();
      await expect(loginPage.inputPassword).toBeVisible();
      await expect(loginPage.buttonLogIn).toBeVisible();
    })
  });
});
