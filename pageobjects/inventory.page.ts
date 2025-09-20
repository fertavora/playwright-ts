import type { Page, Locator } from '@playwright/test';
import { ItemPage } from '../pageobjects/item.page';
import { CartPage } from './cart.page';

export class InventoryPage {
  public readonly inventoryList: Locator;
  private readonly itemDescription: Locator;
  public readonly cartBadge: Locator;
  public readonly cartLink: Locator;
  public readonly productSortSelect: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.inventoryList = this.page.getByTestId('inventory-list');
    this.itemDescription = this.page.getByTestId('inventory-item-description');
    this.cartBadge = this.page.getByTestId('shopping-cart-badge');
    this.cartLink = this.page.getByTestId('shopping-cart-link');
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
    await this.cartLink.click();
    return new CartPage(this.page);
  }

  async selectSortingOption(option: string): Promise<void> {
    await this.productSortSelect.selectOption({label: option});
  }
}