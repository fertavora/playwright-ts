import { test, expect } from "../../fixtures/base.ts";
const WRONG_PASSWORD = 'wrongpassword';

test.describe('Log In Tests', () => {
  test('User logs into the application', async ({ loginPage }) => {
    let inventoryPage;
    await test.step('User enters valid log in credentials', async () => {
      await loginPage.goto();
      inventoryPage = await loginPage.signIn(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Verify valid log in', async () => {
      await expect(inventoryPage.headerContainer).toBeVisible();
      await expect(inventoryPage.inventoryList).toBeVisible();
    });
  });

  test('User is not able to log in with invalid credentials', async ({ loginPage }) => {
    await test.step('User enters invalid log in credentials', async () => {
      await loginPage.goto();
      await loginPage.signIn(process.env.SAUCE_USER, WRONG_PASSWORD);
    });

    await test.step('Verify invalid log in', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
  });

  test('User is not able to log in with locked user credentials', async ({ loginPage }) => {
    await test.step('User enters locked user log in credentials', async () => {
      await loginPage.goto();
      await loginPage.signIn(process.env.SAUCE_LOCKED_USER, process.env.SAUCE_PASSWORD);
    });

    await test.step('Verify locked user log in', async () => {
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
  });

  test('User logs out of the application', async ({ loginPage, inventoryPage }) => {
    await test.step('User logs out of the application', async() => {
      await inventoryPage.goto();
      await inventoryPage.logOut();
      await expect(loginPage.inputUsername).toBeVisible();
      await expect(loginPage.inputPassword).toBeVisible();
      await expect(loginPage.buttonLogIn).toBeVisible();
    })
  });
});
