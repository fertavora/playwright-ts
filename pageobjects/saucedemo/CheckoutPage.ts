import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";

export class CheckoutPage extends PageObject {
  readonly checkoutContainer: Locator;
  
  constructor(page: Page) {
    super(page);
    this.checkoutContainer = page.getByTestId('checkout-info-container');
  }
}