import { test, expect } from '../../fixtures/saucedemo.fixture';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('Invalid credentials shows error', async ({ loginPage }) => {
    await loginPage.invalidLogin('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
  });

  test('Locked out user shows error', async ({ loginPage }) => {
    await loginPage.invalidLogin(process.env.SAUCE_USERNAME_LOCKED!, process.env.SAUCE_PASSWORD!);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('Empty username shows error', async ({ loginPage }) => {
    await loginPage.invalidLogin('', process.env.SAUCE_PASSWORD!);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('Empty password shows error', async ({ loginPage }) => {
    await loginPage.invalidLogin(process.env.SAUCE_USERNAME!, '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
