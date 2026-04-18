import { test, expect } from '../../fixtures/saucedemo.fixture';

test.use({ storageState: 'playwright/.auth/errorUserAuth.json' });

test.describe('Error User', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Can browse inventory', async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test('Remove from cart is silently ignored', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByButton('Sauce Labs Backpack');
    await expect(inventoryPage.headerPage.cartBadge).toHaveText('1');
    await inventoryPage.removeItemFromCartByButton('Sauce Labs Backpack');
    // error_user: remove does nothing — item stays in cart
    await expect(inventoryPage.headerPage.cartBadge).toHaveText('1');
  });
});
