import type { Page, Locator } from '@playwright/test';
import { ItemPage } from '../pageobjects/item.page';
import { CartPage } from './cart.page';
import { SauceDemoPage } from './saucedemo.page';

export class InventoryPage extends SauceDemoPage {
  public readonly inventoryList: Locator;
  private readonly itemDescription: Locator;
  public readonly productSortSelect: Locator;

  constructor(public readonly page: Page) {
    super(page)
    this.inventoryList = this.page.getByTestId('inventory-list');
    this.itemDescription = this.page.getByTestId('inventory-item-description');
    this.productSortSelect = this.page.getByTestId('product-sort-container');
  }

  async addItemToCartByButton(itemName: string): Promise<void> {
    return this.itemDescription.filter({ hasText: itemName }).locator('.btn_inventory').click();
  }

  async goToItemByLink(itemName: string): Promise<ItemPage> {
    await this.itemDescription.filter({ hasText: itemName }).locator('a').click();
    return new ItemPage(this.page);
  }
  
  async goToItemByImage(itemName: string): Promise<ItemPage> {
    await this.page.getByAltText(itemName).click();
    return new ItemPage(this.page);
  }
  
  async goto() {
    return this.page.goto('/inventory.html');
  }

  async goToCart(): Promise<CartPage> {
    await this.headerPage.cartLink.click();
    return new CartPage(this.page);
  }

  async selectSortingOption(option: string): Promise<void> {
    await this.productSortSelect.selectOption({label: option});
  }
}