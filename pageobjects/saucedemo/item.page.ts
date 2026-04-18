import type { Page, Locator, Response } from '@playwright/test';
import { InventoryPage } from './inventory.page';
import { SauceDemoPage } from './saucedemo.page';

export class ItemPage extends SauceDemoPage {
  
  private readonly buttonBackToProducts: Locator;
  public readonly buttonAddToCart: Locator;
  public readonly buttonRemoveFromCart: Locator;
  public readonly titleItem: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.buttonBackToProducts = this.page.getByTestId('back-to-products');
    this.buttonAddToCart = this.page.getByTestId('add-to-cart');
    this.buttonRemoveFromCart = this.page.getByTestId('remove');
    this.titleItem = this.page.getByTestId('inventory-item-name');
  }

  async goto(itemId: number): Promise<null | Response> {
    return this.page.goto(`/inventory-item.html?id=${itemId}`);
  }

  async goToProducts(): Promise<InventoryPage> {
    await this.buttonBackToProducts.click();
    return new InventoryPage(this.page); 
  }
}