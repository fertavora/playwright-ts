import { test, expect } from "../../fixtures/base.ts";

test.describe('Cart Test', () => {
  test.use({ storageState: { cookies: [], origins: [{
    origin: 'https://www.saucedemo.com',
    localStorage: [
      {
        name: 'cart-contents',
        value: '[4,1,2]'
      }
    ]
  }]}});

  test.beforeEach('Going to the cart page', async ({ cartPage }) => {
    await test.step('Verifying the cart page is properly displayed', async () => {
      await cartPage.goto();
      await expect(cartPage.item).toHaveCount(3);
    });
  });

  test('User clicks Continue Shopping button', async ({ cartPage }) => {
    const inventoryPage = await cartPage.clickContinue();
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('User clicks Remove button', async ({ cartPage }) => {
    await cartPage.clickRemove();
    await expect(cartPage.item).toHaveCount(2);
  });

  test('User clicks Checkout button', async ({ cartPage }) => {
    const checkoutPage = await cartPage.clickCheckout();
    await expect(checkoutPage.checkoutContainer).toBeVisible();
  });
});