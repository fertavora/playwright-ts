import type { Page, Locator } from '@playwright/test';

export class CartPage {
  public readonly cartItem: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.cartItem = this.page.getByTestId('inventory-item');
  }    
}