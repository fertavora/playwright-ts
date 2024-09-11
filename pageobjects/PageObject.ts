import { Page } from "@playwright/test";
import { Cookie } from "../types/cookie";

export class PageObject {
  readonly page: Page;
  readonly cookies: Cookie[];
  
  constructor(page: Page) {
    this.page = page;
    this.cookies = [
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/'
      }
    ]
  }

  async goto(path: string) {
    await this.page.goto(path);
  }
}