import { test as base } from '@playwright/test' 
import { CartPage, CheckoutPage, InventoryPage, LoginPage } from "../pageobjects/saucedemo";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  cartPage: async({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  inventoryPage: async({ page }, use) => {
    await use(new InventoryPage(page));
  }
});

export { expect } from '@playwright/test';