import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class ItemPage extends PageObject {
  readonly itemImage: Locator;
  readonly itemName: Locator;
  readonly buttonAddToCart: Locator;

  constructor(page: Page) {
    super(page);
    this.itemImage = page.getByTestId('item-sauce-labs-backpack-img');
    this.itemName = page.getByTestId('inventory-item-name');
    this.buttonAddToCart = page.getByTestId('add-to-cart');
  }
}