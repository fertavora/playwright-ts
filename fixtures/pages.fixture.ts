import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/login.page';
import { InventoryPage } from '../pageobjects/inventory.page';
import { ItemPage } from '../pageobjects/item.page';
import { CartPage } from '../pageobjects/cart.page';
import { CheckoutOnePage } from '../pageobjects/checkoutOne.page';
import { CheckoutTwoPage } from '../pageobjects/checkoutTwo.page';

type SauceDemoPages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  itemPage: ItemPage;
  cartPage: CartPage;
  checkoutOnePage: CheckoutOnePage;
  checkoutTwoPage: CheckoutTwoPage;
}
export const test = base.extend<SauceDemoPages>({
  loginPage: async({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async({ page }, use) => {
    await use(new InventoryPage(page));
  },
  itemPage: async({ page }, use) => {
    await use(new ItemPage(page));
  },
  cartPage: async({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutOnePage: async({ page }, use) => {
    await use(new CheckoutOnePage(page));
  },
  checkoutTwoPage: async({ page }, use) => {
    await use(new CheckoutTwoPage(page));
  }
});

export { expect } from '@playwright/test';