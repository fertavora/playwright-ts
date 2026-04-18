import { faker } from '@faker-js/faker';
import { test, expect } from '../../fixtures/saucedemo.fixture';
import { CheckoutData } from '../../types/CheckoutData';

test.use({ storageState: 'playwright/.auth/cartWithItems.json' });
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

  test('Empty form shows First Name required error', async ({ checkoutOnePage }) => {
    await checkoutOnePage.goto();
    await checkoutOnePage.buttonContinue.click();
    await expect(checkoutOnePage.errorMessage).toBeVisible();
    await expect(checkoutOnePage.errorMessage).toContainText('First Name is required');
  });

  test('Missing last name shows Last Name required error', async ({ checkoutOnePage }) => {
    await checkoutOnePage.goto();
    await checkoutOnePage.inputFirstName.fill('John');
    await checkoutOnePage.buttonContinue.click();
    await expect(checkoutOnePage.errorMessage).toBeVisible();
    await expect(checkoutOnePage.errorMessage).toContainText('Last Name is required');
  });

  test('Missing zip code shows Postal Code required error', async ({ checkoutOnePage }) => {
    await checkoutOnePage.goto();
    await checkoutOnePage.inputFirstName.fill('John');
    await checkoutOnePage.inputLastName.fill('Doe');
    await checkoutOnePage.buttonContinue.click();
    await expect(checkoutOnePage.errorMessage).toBeVisible();
    await expect(checkoutOnePage.errorMessage).toContainText('Postal Code is required');
  });

  test('Go back to Cart from Checkout Information', async ({ checkoutOnePage }) => {
    await checkoutOnePage.goto();
    const cartPage = await checkoutOnePage.clickCancel();
    await expect(cartPage.cartItem).toHaveCount(3);
  });

  test('Go back to Inventory from Checkout Overview', async ({ checkoutTwoPage }) => {
    await checkoutTwoPage.goto();
    const inventoryPage = await checkoutTwoPage.clickCancel();
    await expect(inventoryPage.productSortSelect).toBeVisible();
    await expect(inventoryPage.page.getByRole('button', { name: 'Remove'})).toHaveCount(3);
  });
});

test.describe('Checkout Overview', () => {
  test.use({ storageState: 'playwright/.auth/cartWithItems.json' });

  test.beforeEach(async ({ checkoutTwoPage }) => {
    await checkoutTwoPage.goto();
  });

  test('Shows all 3 item names in summary', async ({ checkoutTwoPage }) => {
    await expect(checkoutTwoPage.itemName).toHaveCount(3);
    await expect(checkoutTwoPage.itemName.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(checkoutTwoPage.itemName.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(checkoutTwoPage.itemName.getByText('Sauce Labs Fleece Jacket')).toBeVisible();
  });

  test('Shows correct subtotal, tax and total', async ({ checkoutTwoPage }) => {
    await expect(checkoutTwoPage.subtotalLabel).toContainText('Item total: $89.97');
    await expect(checkoutTwoPage.taxLabel).toContainText('Tax: $7.20');
    await expect(checkoutTwoPage.totalLabel).toContainText('Total: $97.17');
  });
});
