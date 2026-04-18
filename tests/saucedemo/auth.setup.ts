import { test, expect } from '../../fixtures/saucedemo.fixture';
import path from 'path';

const errorUserAuthFile = path.join(process.cwd(), './playwright/.auth/errorUserAuth.json');
const inventoryAuthFile = path.join(process.cwd(), './playwright/.auth/inventoryAuth.json');
const cartWithItemsFile = path.join(process.cwd(), './playwright/.auth/cartWithItems.json');

test('Authenticate Inventory - Standard User', async ({ loginPage }) => {
  await loginPage.goto();
  const inventoryPage = await loginPage.validLogin(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
  
  await expect(inventoryPage.inventoryList).toBeVisible();

  await inventoryPage.page.context().storageState({ path: inventoryAuthFile });
});

test('Authenticate Inventory - Error User', async ({ loginPage }) => {
  await loginPage.goto();
  const inventoryPage = await loginPage.validLogin(process.env.SAUCE_USERNAME_ERROR!, process.env.SAUCE_PASSWORD!);
  
  await expect(inventoryPage.inventoryList).toBeVisible();

  await inventoryPage.page.context().storageState({ path: errorUserAuthFile });
});

test('Cart With Items', async ({ loginPage }) => {
  await loginPage.goto();
  const inventoryPage = await loginPage.validLogin(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

  await expect(inventoryPage.inventoryList).toBeVisible();

  await inventoryPage.addItemToCartByButton('Sauce Labs Backpack');
  await inventoryPage.addItemToCartByButton('Sauce Labs Bike Light');
  await inventoryPage.addItemToCartByButton('Sauce Labs Fleece Jacket');

  await inventoryPage.page.context().storageState({ path: cartWithItemsFile });
});
