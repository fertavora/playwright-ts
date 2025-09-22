import { test, expect } from '../../fixtures/pages.fixture';

test.use({storageState: 'playwright/.auth/cartWithItems.json', trace: 'on'});
test.describe('Cart', () => {
  test.beforeEach(async ({ cartPage }) => {
    await cartPage.goto();
  });

  test('Continue Shopping from Cart page', async ({ cartPage }) => {
    const inventoryPage = await cartPage.clickContinueShopping();
    await expect(inventoryPage.productSortSelect).toBeVisible();
    await expect(inventoryPage.page.getByRole('button', { name: 'Remove'})).toHaveCount(3);
  });
});