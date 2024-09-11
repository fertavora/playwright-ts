import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";
import { InventoryPage, CheckoutPage } from "./";

export class CartPage extends PageObject {
  readonly buttonCheckout: Locator;
  readonly buttonRemove: Locator;
  readonly buttonContinue: Locator;
  readonly itemName: Locator;
  readonly item: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonCheckout = page.getByTestId('checkout');
    this.buttonRemove = page.getByTestId('remove-sauce-labs-backpack');
    this.buttonContinue = page.getByTestId('continue-shopping');
    this.itemName = page.getByTestId('inventory-item-name');
    this.item = page.getByTestId('inventory-item');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.context().addCookies(this.cookies);
    await this.page.reload();
    await super.goto('/cart.html');
  }

  async clickContinue() {
    await this.buttonContinue.click();
    return new InventoryPage(this.page);
  }

  async clickRemove() {
    await this.buttonRemove.click();
  }

  async clickCheckout() {
    await this.buttonCheckout.click();
    return new CheckoutPage(this.page);
  }

}