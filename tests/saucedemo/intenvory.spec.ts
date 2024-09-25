import { test, expect } from "../../fixtures/base.ts";

function isArraySorted(stringsArray: string[], order: 'asc' | 'desc') {
  if(order === 'desc') {
    for (let i = 0; i < stringsArray.length - 1; i++) {
      if (stringsArray[i] < stringsArray[i + 1]) {
          return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < stringsArray.length - 1; i++) {
      if (stringsArray[i] > stringsArray[i + 1]) {
          return false;
      }
    }
    return true;
  }
  
}

test.describe('Inventory Tests', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('User selects a product by clicking its image', async ({ inventoryPage }) => {
    const itemPage = await inventoryPage.selectProductImage();
    await expect(itemPage.itemImage).toBeVisible();
    await expect(itemPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(itemPage.buttonAddToCart).toBeVisible();
  });

  test('User selects a product by clicking its name', async ({ inventoryPage }) => {
    const itemPage = await inventoryPage.selectProductName();
    await expect(itemPage.itemImage).toBeVisible();
    await expect(itemPage.itemName).toHaveText('Sauce Labs Backpack');
    await expect(itemPage.buttonAddToCart).toBeVisible();
  });

  test('User adds product to the cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart();
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    const cartPage = await inventoryPage.clickGoToCart();
    await expect(cartPage.buttonCheckout).toBeVisible();
    await expect(cartPage.buttonRemove).toBeVisible();
    await expect(cartPage.buttonContinue).toBeVisible();
    await expect(cartPage.itemName).toHaveText('Sauce Labs Backpack');
  });

  test('User goes to empty cart', async ({ inventoryPage }) => {
    const cartPage = await inventoryPage.clickGoToCart();
    await expect(cartPage.buttonCheckout).toBeVisible();
    await expect(cartPage.buttonRemove).not.toBeVisible();
    await expect(cartPage.buttonContinue).toBeVisible();
  });

  test('User changes sorting to Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortingSelect.selectOption('za');
    const allNames = await inventoryPage.allProductsNames.allInnerTexts();
    await expect(isArraySorted(allNames, 'desc'), 'The products names are not properly sorted!').toBeTruthy();
  });

  test('User changes sorting to Price (high to low)', async ({ inventoryPage }) => {
    await inventoryPage.sortingSelect.selectOption('hilo');
    let allPrices = await inventoryPage.allProductsPrices.allInnerTexts();
    allPrices = allPrices.map(price => parseFloat(price.replace('$', '')));
    expect(isArraySorted(allPrices, 'desc'), 'The products prices are not properly sorted!').toBeTruthy();
  });

  test('User changes sorting to Price (low to high)', async ({ inventoryPage }) => {
    await inventoryPage.sortingSelect.selectOption('lohi');
    let allPrices = await inventoryPage.allProductsPrices.allInnerTexts();
    allPrices = allPrices.map(price => parseFloat(price.replace('$', '')));
    expect(isArraySorted(allPrices, 'asc'), 'The products prices are not properly sorted!').toBeTruthy();
  });
});