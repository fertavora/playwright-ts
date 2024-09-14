import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";
import { CheckoutInfo } from "../../types/checkoutInfo";
import { InventoryPage } from "./InventoryPage";
import { CartPage } from "./CartPage";

export class CheckoutPage extends PageObject {
  readonly checkoutContainer: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputPostalCode: Locator;
  readonly buttonContinue: Locator;
  readonly item: Locator;
  readonly buttonFinish: Locator;
  readonly textComplete: Locator;
  readonly buttonBack: Locator;
  readonly buttonContinueShopping: Locator;
  readonly buttonCancel: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutContainer = page.getByTestId('checkout-info-container');
    this.inputFirstName = page.getByTestId('firstName');
    this.inputLastName = page.getByTestId('lastName');
    this.inputPostalCode = page.getByTestId('postalCode');
    this.buttonContinue = page.getByTestId('continue');
    this.item = page.getByTestId('inventory-item');
    this.buttonFinish = page.getByTestId('finish');
    this.textComplete = page.getByTestId('complete-header');
    this.buttonBack = page.getByTestId('back-to-products');
    this.buttonContinueShopping = page.getByTestId('continue-shopping');
    this.buttonCancel = page.getByTestId('cancel');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.context().addCookies(this.cookies);
    await this.page.reload();
    await super.goto('/checkout-step-one.html');
  }

  async fillCheckoutInfo(checkoutInfo: CheckoutInfo) {
    await this.inputFirstName.fill(checkoutInfo.firstName);
    await this.inputLastName.fill(checkoutInfo.lastName);
    await this.inputPostalCode.fill(checkoutInfo.postalCode);
  }

  async clickContinue() {
    await this.buttonContinue.click();
  }

  async clickFinish() {
    await this.buttonFinish.click();
  }

  async clickBackToProducts() {
    await this.buttonBack.click();
    return new InventoryPage(this.page);
  }

  async clickContinueShopping() {
    await this.buttonContinueShopping.click();
    return new InventoryPage(this.page);
  }

  async clickCancelStepOne()  {
    await this.buttonCancel.click();
    return new CartPage(this.page);
  }

  async clickCancelStepTwo() {
    await this.buttonCancel.click();
    return new InventoryPage(this.page);
  }
}