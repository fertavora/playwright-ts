import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends PageObject {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonContinue: Locator;
  readonly buttonLogIn: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsername = page.getByTestId('username');
    this.inputPassword = page.getByTestId('password');
    this.buttonLogIn = page.getByTestId('login-button');
  }

  async signIn(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogIn.click();
    return new InventoryPage(this.page);
  }
}