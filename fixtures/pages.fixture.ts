import { test as base } from '@playwright/test';
import { LoginPage } from '../pageobjects/login.page';
import { InventoryPage } from '../pageobjects/inventory.page';

type SauceDemoPages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}
export const test = base.extend<SauceDemoPages>({
  loginPage: async({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async({ page }, use) => {
    await use(new InventoryPage(page));
  }
});

export { expect } from '@playwright/test';