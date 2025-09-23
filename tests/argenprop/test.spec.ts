import { test } from '../../fixtures/argenprop.fixture';

test.describe('Web Scrapping', () => {
  test('Argenprop', async ({ homePage }) => {
    const SEARCH_KEYWORD: string = 'Parque Patricios';

    await homePage.goto();
    const apartmentsPage = await homePage.searchByKeyword(SEARCH_KEYWORD);
    await apartmentsPage.selectType.click();
    await apartmentsPage.saleType.click();
    await apartmentsPage.rentType.click();
    await apartmentsPage.buttonApplyType.click();
    await apartmentsPage.page.waitForTimeout(4000);
  });
})