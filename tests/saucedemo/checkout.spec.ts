import { faker } from '@faker-js/faker';
import { test, expect } from '../../fixtures/pages.fixture';
import { CheckoutData } from '../../types/CheckoutData';

test.use({ storageState: 'playwright/.auth/cartWithItems.json', trace: 'on' });
test.describe('Checkout', () => {

  const checkoutData: CheckoutData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    zipCode: faker.location.zipCode()
  };
  
  test('Complete checkout from Inventory', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    const cartPage = await inventoryPage.headerPage.goToCart();
    const cartOnePage = await cartPage.clickCheckout();
    await cartOnePage.fillForm(checkoutData);
    const cartTwoPage = await cartOnePage.clickContinue();
    await expect(cartTwoPage.inventoryItem).toHaveCount(3);
    const cartCompletePage = await cartTwoPage.clickFinish();
    await expect(cartCompletePage.page.getByText('Thank you for your order!')).toBeVisible();
    await cartCompletePage.clickBackToHome();
    await expect(inventoryPage.productSortSelect).toBeVisible();
  });
});
