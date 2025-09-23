import type { Page, Locator } from '@playwright/test';
import { InventoryPage  } from './inventory.page';

export class CartCompletePage {
  public readonly page: Page;
  public readonly buttonBackToHome: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonBackToHome = this.page.getByTestId('back-to-products');
  }

  async clickBackToHome(): Promise<InventoryPage> {
    await this.buttonBackToHome.click();
    return new InventoryPage(this.page);
  }
}