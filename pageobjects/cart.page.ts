import type { Page, Locator } from '@playwright/test';
import { InventoryPage } from './inventory.page';
import { CartOnePage } from './cartOne.page';

export class CartPage {
  public readonly cartItem: Locator;
  public readonly buttonContinueShopping: Locator;
  public readonly buttonCheckout: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.cartItem = this.page.getByTestId('inventory-item');
    this.buttonContinueShopping = this.page.getByTestId('continue-shopping');
    this.buttonCheckout = this.page.getByTestId('checkout');
  }

  async goto(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async clickContinueShopping(): Promise<InventoryPage> {
    await this.buttonContinueShopping.click();
    return new InventoryPage(this.page);
  }

  async clickCheckout(): Promise<CartOnePage> {
    await this.buttonCheckout.click();
    return new CartOnePage(this.page);
  }
}