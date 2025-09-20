import { test, expect } from '../../fixtures/pages.fixture';
import { CartPage } from '../../pageobjects/cart.page';

test.describe('Inventory', () => {
  const ITEM_NAME = 'Sauce Labs Backpack';
  
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Go to item by clicking item image', async ({ inventoryPage }) => {
    const itemPage = await inventoryPage.goToItemByImage(ITEM_NAME);
    await expect(itemPage.titleItem).toHaveText(ITEM_NAME);
  });

  test('Go to item by clicking item title', async ({ inventoryPage }) => {
    const itemPage = await inventoryPage.goToItemByLink(ITEM_NAME);
    await expect(itemPage.titleItem).toHaveText(ITEM_NAME);
  });

  test('Add item to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByButton(ITEM_NAME);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    const cartPage: CartPage = await inventoryPage.goToCart();
    await expect(cartPage.cartItem).toHaveCount(1);
  });

  test('Sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.selectSortingOption('Price (low to high)');
    const firstItem = inventoryPage.inventoryList.locator('.inventory_item').first();
    await expect(firstItem.getByText('Sauce Labs Onesie')).toBeVisible();
  });

  test('Sort products by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.selectSortingOption('Price (high to low)');
    const firstItem = inventoryPage.inventoryList.locator('.inventory_item').first();
    await expect(firstItem.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  });

  test('Sort products by name A to Z', async ({ inventoryPage }) => {
    await inventoryPage.selectSortingOption('Name (A to Z)');
    const firstItem = inventoryPage.inventoryList.locator('.inventory_item').first();
    await expect(firstItem.getByText('Sauce Labs Backpack')).toBeVisible();
  });

  test('Sort products by name Z to A', async ({ inventoryPage }) => {
    await inventoryPage.selectSortingOption('Name (Z to A)');
    const firstItem = inventoryPage.inventoryList.locator('.inventory_item').first();
    await expect(firstItem.getByText('Test.allTheThings() T-Shirt (Red)')).toBeVisible();
  });
});
