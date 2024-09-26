import { test, expect } from "../../fixtures/base.ts";
import { CheckoutInfo } from "../../types/checkoutInfo";
import { faker } from '@faker-js/faker';

test.describe('Checkout Tests', () => {
  test.use({ storageState: { cookies: [], origins: [{
    origin: 'https://www.saucedemo.com',
    localStorage: [
      {
        name: 'cart-contents',
        value: '[4,1,2]'
      }
    ]
  }]}});

  test.beforeEach(async ({ checkoutPage }) => {
    await checkoutPage.goto();
  });

  test('User submits the order', async ({ checkoutPage }) => {
    const checkoutInfo: CheckoutInfo = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode()
    }
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();
    await expect(checkoutPage.item).toHaveCount(3);
    await checkoutPage.clickFinish();
    await expect(checkoutPage.textComplete).toHaveText('Thank you for your order!');
    const inventoryPage = await checkoutPage.clickBackToProducts();
    await expect(inventoryPage.item).toHaveCount(6);
  });

  test('User clicks Cancel and returns to Cart', async ({ checkoutPage }) => {
    const cartPage = await checkoutPage.clickCancelStepOne();
    await expect(cartPage.item).toHaveCount(3);
  });

  test('User clicks Cancel and returns to Products', async ({ checkoutPage }) => {
    const checkoutInfo: CheckoutInfo = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode()
    }
    await checkoutPage.fillCheckoutInfo(checkoutInfo);
    await checkoutPage.clickContinue();
    await expect(checkoutPage.item).toHaveCount(3);
    const inventoryPage = await checkoutPage.clickCancelStepTwo();
    await expect(inventoryPage.item).toHaveCount(6);
  })
})