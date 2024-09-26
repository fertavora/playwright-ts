import { test, expect } from "../../fixtures/base.ts";

test.describe('Visual Tests', () => {
  
  test('Product images with soft assertion test', async ({ loginPage }) => {
    test.skip(process.env.CI !== undefined, 'Not for CI');
    await loginPage.goto();
    const inventoryPage = await loginPage.signIn(process.env.SAUCE_PROBLEM_USER, process.env.SAUCE_PASSWORD);
    await expect.soft(inventoryPage.allProductsImages.first()).toHaveScreenshot('sauce-labs-backpack.png');
    await expect.soft(inventoryPage.allProductsImages.nth(1)).toHaveScreenshot('sauce-labs-bike-light-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(2)).toHaveScreenshot('sauce-labs-bolt-t-shirt-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(3)).toHaveScreenshot('sauce-labs-fleece-jacket-img.png');
    await expect.soft(inventoryPage.allProductsImages.nth(4)).toHaveScreenshot('sauce-labs-onesie-img.png');
    await expect.soft(inventoryPage.allProductsImages.last()).toHaveScreenshot('test-allthethings-t-shirt-red-img.png');

    expect(test.info().errors).toHaveLength(0);
  });
});