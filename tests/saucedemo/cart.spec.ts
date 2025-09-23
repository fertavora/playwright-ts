import { test, expect } from '../../fixtures/pages.fixture';

test.use({ storageState: 'playwright/.auth/cartWithItems.json' });

test.describe('Cart', () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.goto();
  });

  test('Continue Shopping from Cart page', async ({ cartPage }) => {
    const inventoryPage = await cartPage.clickContinueShopping();
    await expect(inventoryPage.productSortSelect).toBeVisible();
    await expect(inventoryPage.page.getByRole('button', { name: 'Remove'})).toHaveCount(3);
  });

  test('Start checkout from Cart page', async ({ cartPage }) => {
    const cartOnePage = await cartPage.clickCheckout();
    await expect(cartOnePage.inputFirstName).toBeVisible();
    await expect(cartOnePage.inputLastName).toBeVisible();
    await expect(cartOnePage.inputZipCode).toBeVisible();
    await expect(cartOnePage.buttonContinue).toBeVisible();
    await expect(cartOnePage.buttonCancel).toBeVisible();
  });
});