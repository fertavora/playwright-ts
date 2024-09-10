import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";
import { InventoryPage } from "./InventoryPage";

export class LoginPage extends PageObject {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogIn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsername = page.getByTestId('username');
    this.inputPassword = page.getByTestId('password');
    this.buttonLogIn = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await super.goto('/');
  }

  async signIn(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogIn.click();
    return new InventoryPage(this.page);
  }

  async invalidSignIn(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogIn.click();
  }
}