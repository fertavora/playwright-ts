import type { Page, Locator } from '@playwright/test';
import { CartOnePage } from './cartOne.page';
import { CartCompletePage } from './cartComplete.page';

export class CartTwoPage {
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

  async clickCancel(): Promise<CartOnePage> {
    await this.buttonCancel.click();
    return new CartOnePage(this.page);
  }

  async clickFinish(): Promise<CartCompletePage> {
    await this.buttonFinish.click();
    return new CartCompletePage(this.page);
  }
}