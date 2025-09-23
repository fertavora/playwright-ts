import type { Page, Locator } from '@playwright/test';
import { CheckoutData } from '../types/CheckoutData';
import { CartPage } from './cart.page';
import { CartTwoPage } from './cartTwo.page';

export class CartOnePage {
  public readonly inputFirstName: Locator;
  public readonly inputLastName: Locator;
  public readonly inputZipCode: Locator;
  public readonly buttonContinue: Locator;
  public readonly buttonCancel: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.inputFirstName = this.page.getByTestId('firstName');
    this.inputLastName = this.page.getByTestId('lastName');
    this.inputZipCode = this.page.getByTestId('postalCode');
    this.buttonContinue = this.page.getByTestId('continue');
    this.buttonCancel = this.page.getByTestId('cancel');
  }

  async fillForm(checkoutData: CheckoutData): Promise<void> {
    await this.inputFirstName.fill(checkoutData.firstName);
    await this.inputLastName.fill(checkoutData.lastName);
    await this.inputZipCode.fill(checkoutData.zipCode);
  }

  async clickContinue(): Promise<CartTwoPage> {
    await this.buttonContinue.click();
    return new CartTwoPage(this.page);
  }

  async clickCancel(): Promise<CartPage> {
    await this.buttonCancel.click();
    return new CartPage(this.page);
  }

}