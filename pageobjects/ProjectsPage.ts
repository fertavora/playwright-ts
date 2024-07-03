import { Locator, Page } from "@playwright/test";
import { PageObject } from "./PageObject";
import { HeaderPage } from "./HeaderPage";

export class ProjectsPage extends PageObject {
  readonly header: HeaderPage;
  readonly flagChangesSaved: Locator;
  readonly fieldSearch: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderPage(page);
    this.flagChangesSaved = page.getByTestId('platform.ui.flags.common.ui.common-flag-v2-auto-dismiss').locator('div').filter({ hasText: 'Changes are saved' }).first();
    this.fieldSearch = page.locator('[data-test-id="searchfield"]');
  }

  async goto() {
    await super.goto('/jira/projects');
  }

  async selectProjectByName(projectName: string) {
    await this.page.getByRole('link', { name: projectName }).click();
    await this.fieldSearch.waitFor();
  }
}