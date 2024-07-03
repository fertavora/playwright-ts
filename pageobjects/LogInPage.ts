import { Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";

export class LoginPage extends PageObject {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonContinue: Locator;
  readonly buttonLogIn: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsername = page.locator('#username'); //.fill('fertavora@proton.me');
    this.inputPassword = page.locator('#password'); //.fill('d86EwS#947$T');
    this.buttonContinue = page.getByRole('button', { name: 'Continue' }); //.click();
    this.buttonLogIn = page.getByRole('button', { name: 'Log in' }); //.click();
  }

  async signIn(username: string, password: string) {
    await this.inputUsername.fill(username);
    await this.buttonContinue.click();
    await this.inputPassword.fill(password);
    await this.buttonLogIn.click();
    await this.page.waitForURL('**\/jira/your-work');
  }
}