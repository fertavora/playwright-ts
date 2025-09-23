import { Page } from "@playwright/test";
import { HeaderPage } from "./header.page";

export class SauceDemoPage {
  public readonly headerPage: HeaderPage

  constructor(public readonly page: Page) {
    this.page = page;
    this.headerPage = new HeaderPage(this.page);
  }
}