import type { Page, Locator } from '@playwright/test';
import { SauceDemoPage } from './saucedemo.page';

export class CartPage extends SauceDemoPage {
  public readonly cartItem: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.cartItem = this.page.getByTestId('inventory-item');
  }    
}