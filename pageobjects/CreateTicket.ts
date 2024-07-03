import { Locator, Page } from "@playwright/test";

export class CreateTicket {
  readonly page: Page;
  readonly inputSummary: Locator;
  readonly buttonCreate: Locator;
  readonly textDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputSummary = page.getByTestId('issue-create-commons.common.ui.fields.base-fields.input-field.textfield');
    this.buttonCreate = page.getByTestId('issue-create.common.ui.footer.create-button');
    this.textDescription = page.getByTestId('click-wrapper').getByRole('paragraph');
  }

  async enterSummary(summaryText: string) {
    await this.inputSummary.waitFor();
    await this.inputSummary.fill(summaryText);
  }

  async enterDescription(descriptionText: string) {
    await this.textDescription.fill(descriptionText);
  }

  async clickCreateButton() {
    await this.buttonCreate.click();
  }
}