import { test, expect } from '../../fixtures/saucedemo.fixture';
import { CartPage } from '../../pageobjects/cart.page';
import { InventoryPage } from '../../pageobjects/inventory.page';

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