import { test as base } from '@playwright/test';
import { HomePage } from '../pageobjects/argenprop/home.page';

type ArgenpropPages = {
  homePage: HomePage;
}

export const test = base.extend<ArgenpropPages>({
  homePage: async({ page }, use) => {
    await use(new HomePage(page));
  }
});

export { expect } from '@playwright/test';