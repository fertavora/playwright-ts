import { Locator, Page } from "@playwright/test";
import { CreateTicket } from "./CreateTicket";

export class HeaderPage {
  readonly page: Page;
  readonly buttonCreate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonCreate = page.getByTestId('create-button-wrapper').getByLabel('Create issue');
  }

  async clickCreateButton() {
    await this.buttonCreate.click();
    return new CreateTicket(this.page);
  }
}