import { Locator, Request } from '@playwright/test';
import { test, expect } from '../../fixtures/signIn.fixture';
import { ProjectsPage } from '../../pageobjects/ProjectsPage';
import { faker } from '@faker-js/faker';

test.describe('Project', () => {
  test('Create ticket', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await test.step('User goes to Test Automation project', async () => {
      await projectsPage.goto();
      await projectsPage.selectProjectByName('Test Automation');
    });

    await test.step('Click dismiss if present', async () => {
      const buttonDismiss: Locator = page.getByRole('button', { name: 'Dismiss' });
      const buttonDismissQuickstart: Locator = page.getByTestId('checklist-footer-dismiss-link');
      if (await buttonDismiss.isVisible()) {
        await buttonDismiss.click();
      }

      if(await buttonDismissQuickstart.isVisible()) {
        await buttonDismissQuickstart.click();
      }
    });

    await test.step('User creates ticket', async () => {
      // request event
      let issueResponse;
      page.on('response', async response => {
        const request: Request = response.request();
        if(request.url().includes('rest/api/3/issue') && request.method() === 'POST') {
          console.dir(await response.json()); // todo replace logger
          console.log(response.status() + " " + response.statusText()); // todo replace logger
          await expect(response.status()).toBe(201);
        }
      });

      const createTicketDialog = await projectsPage.header.clickCreateButton();
      await createTicketDialog.enterSummary(faker.lorem.words());
      await createTicketDialog.enterDescription(faker.lorem.paragraph());
      await createTicketDialog.clickCreateButton();
      await expect(projectsPage.flagChangesSaved).toBeVisible();
    });
  });

  test.afterEach('Close test', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
  });
})