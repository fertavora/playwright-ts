import { Page, Locator } from "@playwright/test";
import { CartPage } from "./cart.page";

export class HeaderPage {
  public readonly cartBadge: Locator;
  public readonly cartLink: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
  }

  async goToCart(): Promise<CartPage> {
      await this.cartLink.click();
      return new CartPage(this.page);
    }
} 