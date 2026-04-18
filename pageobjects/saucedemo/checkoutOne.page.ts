import type { Page, Locator } from '@playwright/test';
import { CheckoutData } from '../../types/CheckoutData';
import { CartPage } from './cart.page';
import { CheckoutTwoPage } from './checkoutTwo.page';

export class CheckoutOnePage {
  public readonly inputFirstName: Locator;
  public readonly inputLastName: Locator;
  public readonly inputZipCode: Locator;
  public readonly buttonContinue: Locator;
  public readonly buttonCancel: Locator;
  public readonly errorMessage: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.inputFirstName = this.page.getByTestId('firstName');
    this.inputLastName = this.page.getByTestId('lastName');
    this.inputZipCode = this.page.getByTestId('postalCode');
    this.buttonContinue = this.page.getByTestId('continue');
    this.buttonCancel = this.page.getByTestId('cancel');
    this.errorMessage = this.page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillForm(checkoutData: CheckoutData): Promise<void> {
    await this.inputFirstName.fill(checkoutData.firstName);
    await this.inputLastName.fill(checkoutData.lastName);
    await this.inputZipCode.fill(checkoutData.zipCode);
  }

  async clickContinue(): Promise<CheckoutTwoPage> {
    await this.buttonContinue.click();
    return new CheckoutTwoPage(this.page);
  }

  async clickCancel(): Promise<CartPage> {
    await this.buttonCancel.click();
    return new CartPage(this.page);
  }

}