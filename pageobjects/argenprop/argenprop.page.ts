import { Page } from "@playwright/test";

export class ArgenpropPage {
  public readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}