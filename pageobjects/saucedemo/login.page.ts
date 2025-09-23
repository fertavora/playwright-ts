import type { Page, Locator, Response } from '@playwright/test';
import { InventoryPage } from './inventory.page';

export class LoginPage {
  private readonly inputUsername: Locator;
  private readonly inputPassword: Locator;
  private readonly buttonLogin: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.inputUsername = this.page.getByTestId('username');
    this.inputPassword = this.page.getByTestId('password');
    this.buttonLogin = this.page.getByTestId('login-button');
  }

  async goto(): Promise<Response | null> {
    return this.page.goto('/');
  }

  async validLogin(username: string, password: string): Promise<InventoryPage> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.buttonLogin.click();
    return new InventoryPage(this.page);
  }
}