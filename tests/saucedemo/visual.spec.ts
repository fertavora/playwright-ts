import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pageobjects/saucedemo";

test.describe('Visual Tests', () => {
  let loginPage; let inventoryPage;
  test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
  });
  
  test('Product images with soft assertion test', async ({ page }) => {
    await loginPage.goto();
    inventoryPage = await loginPage.signIn(process.env.SAUCE_PROBLEM_USER, process.env.SAUCE_PASSWORD);
    await expect.soft(inventoryPage.allProductsImages.first()).toHaveScreenshot('sauce-labs-backpack.png');
    await expect.soft(inventoryPage.allProductsImages.nth(1)).toHaveScreenshot('sauce-labs-bike-light-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(2)).toHaveScreenshot('sauce-labs-bolt-t-shirt-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(3)).toHaveScreenshot('sauce-labs-fleece-jacket-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(4)).toHaveScreenshot('sauce-labs-onesie-img.png');
    await expect.soft(inventoryPage.allProductsImages.last()).toHaveScreenshot('test-allthethings-t-shirt-red-img.png');

    expect(test.info().errors).toHaveLength(0);
  });
});