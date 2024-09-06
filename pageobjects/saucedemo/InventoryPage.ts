import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class InventoryPage extends PageObject {
  readonly headerContainer: Locator;
  readonly inventoryList: Locator;

  constructor(page: Page) {
    super(page);
    this.headerContainer = page.getByTestId('header-container');
    this.inventoryList = page.getByTestId('inventory-list');
  }
}