import type { Page, Locator } from '@playwright/test';
import { InventoryPage } from './inventory.page';
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

  async goto(): Promise<void> {
    await this.page.goto('/checkout-step-two.html');
  }

  async clickCancel(): Promise<InventoryPage> {
    await this.buttonCancel.click();
    return new InventoryPage(this.page);
  }

  async clickFinish(): Promise<CheckoutCompletePage> {
    await this.buttonFinish.click();
    return new CheckoutCompletePage(this.page);
  }
}