import { Page, Locator } from "@playwright/test";

export class HeaderPage {
  public readonly cartBadge: Locator;
  public readonly cartLink: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
  }
} 