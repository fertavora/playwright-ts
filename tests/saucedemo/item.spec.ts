import { test, expect } from '../../fixtures/saucedemo.fixture';
import { CartPage } from '../../pageobjects/saucedemo/cart.page';
import { InventoryPage } from '../../pageobjects/saucedemo/inventory.page';

test.describe('Item', () => {
  const ITEM_ID: number = Math.floor(Math.random() * 6);
  
  test.beforeEach(async ({ itemPage }) => {
    await itemPage.goto(ITEM_ID);
  });

  test('Go back to Products from Item page', async ({ itemPage }) => {
    const inventoryPage: InventoryPage = await itemPage.goToProducts();
    await expect(inventoryPage.productSortSelect).toBeVisible();
  });

  test('Add item to cart', async ({ itemPage }) => {
    await itemPage.buttonAddToCart.click();
    await expect(itemPage.headerPage.cartBadge).toHaveText('1');
    const cartPage: CartPage = await itemPage.headerPage.goToCart();
    await expect(cartPage.cartItem).toHaveCount(1);
  });

});

test.describe('Item with cart', () => {
  test.use({ storageState: 'playwright/.auth/cartWithItems.json' });

  // Sauce Labs Backpack is item id=4, already in cartWithItems
  test.beforeEach(async ({ itemPage }) => {
    await itemPage.goto(4);
  });

  test('Remove from cart updates cart badge', async ({ itemPage }) => {
    await expect(itemPage.headerPage.cartBadge).toHaveText('3');
    await itemPage.buttonRemoveFromCart.click();
    await expect(itemPage.headerPage.cartBadge).toHaveText('2');
  });

  test('Remove from cart updates cart contents', async ({ itemPage }) => {
    await itemPage.buttonRemoveFromCart.click();
    const cartPage: CartPage = await itemPage.headerPage.goToCart();
    await expect(cartPage.cartItem).toHaveCount(2);
  });
});