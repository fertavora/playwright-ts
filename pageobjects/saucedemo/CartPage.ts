import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CartPage extends PageObject {
  readonly buttonCheckout: Locator;
  readonly buttonRemove: Locator;
  readonly buttonContinue: Locator;
  readonly itemName: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonCheckout = page.getByTestId('checkout');
    this.buttonRemove = page.getByTestId('remove-sauce-labs-backpack');
    this.buttonContinue = page.getByTestId('continue-shopping');
    this.itemName = page.getByTestId('inventory-item-name');
  }


}