import type { Page, Locator } from '@playwright/test';
import { InventoryPage } from './inventory.page';
import { CheckoutCompletePage } from './checkoutComplete.page';

export class CheckoutTwoPage {
  public readonly page: Page;
  public readonly buttonFinish: Locator;
  public readonly buttonCancel: Locator;
  public readonly inventoryItem: Locator;
  public readonly itemName: Locator;
  public readonly subtotalLabel: Locator;
  public readonly taxLabel: Locator;
  public readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonFinish = this.page.getByTestId('finish');
    this.buttonCancel = this.page.getByTestId('cancel');
    this.inventoryItem = this.page.getByTestId('inventory-item');
    this.itemName = this.page.getByTestId('inventory-item-name');
    this.subtotalLabel = this.page.getByTestId('subtotal-label');
    this.taxLabel = this.page.getByTestId('tax-label');
    this.totalLabel = this.page.getByTestId('total-label');
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