import type { Page, Locator } from '@playwright/test';
import { CheckoutOnePage } from './checkoutOne.page';
import { CheckoutCompletePage } from './checkoutComplete.page';

export class CheckoutTwoPage {
  public readonly page: Page;
  public readonly buttonFinish: Locator;
  public readonly buttonCancel: Locator;
  public readonly inventoryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonFinish = this.page.getByTestId('finish');
    this.buttonCancel = this.page.getByTestId('cancel');
    this.inventoryItem = this.page.getByTestId('inventory-item');
  }

  async clickCancel(): Promise<CheckoutOnePage> {
    await this.buttonCancel.click();
    return new CheckoutOnePage(this.page);
  }

  async clickFinish(): Promise<CheckoutCompletePage> {
    await this.buttonFinish.click();
    return new CheckoutCompletePage(this.page);
  }
}