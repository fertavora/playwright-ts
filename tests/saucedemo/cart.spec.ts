import { test, expect } from "@playwright/test";
import { CartPage } from "../../pageobjects/saucedemo";

test.describe('Cart Test', () => {
  let cartPage;
  test.use({ storageState: { cookies: [], origins: [{
    origin: 'https://www.saucedemo.com',
    localStorage: [
      {
        name: 'cart-contents',
        value: '[4,1,2]'
      }
    ]
  }]}});

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
    await expect(cartPage.item).toHaveCount(3);
  });

  test('User clicks Continue Shopping button', async () => {
    const inventoryPage = await cartPage.clickContinue();
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('User clicks Remove button', async () => {
    await cartPage.clickRemove();
    await expect(cartPage.item).toHaveCount(2);
  });

  test('User clicks Checkout button', async () => {
    const checkoutPage = await cartPage.clickCheckout();
    await expect(checkoutPage.checkoutContainer).toBeVisible();
  });
});