import type { Page, Locator } from '@playwright/test';

export class ItemPage {
  
  private readonly buttonBackToProducts: Locator;
  private readonly buttonAddToCart: Locator;
  public readonly titleItem: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.buttonBackToProducts = this.page.getByTestId('back-to-products');
    this.buttonAddToCart = this.page.getByTestId('add-to-cart');
    this.titleItem = this.page.getByTestId('inventory-item-name');
  }

  async goto() {
    return this.page.goto('/inventory-item.html?id=4');
  }
}