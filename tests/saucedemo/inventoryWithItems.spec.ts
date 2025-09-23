import { test, expect } from '../../fixtures/pages.fixture';
import { CartPage } from '../../pageobjects/cart.page';

test.use({ storageState: 'playwright/.auth/cartWithItems.json' });
test.describe('Inventory with items in cart', () => {
  const ITEM_NAME = 'Sauce Labs Backpack';

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Remove item from cart', async ({ inventoryPage }) => {
    await inventoryPage.removeItemFromCartByButton(ITEM_NAME);
    await expect(inventoryPage.headerPage.cartBadge).toHaveText('2');

    const cartPage: CartPage = await inventoryPage.headerPage.goToCart();
    await expect(cartPage.cartItem).toHaveCount(2);
  });
});
