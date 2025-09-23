import type { Locator, Page } from '@playwright/test';
import { ApartmentsPage } from './apartments.page';
import { ArgenpropPage } from './argenprop.page';

export class HomePage extends ArgenpropPage {
  public readonly inputUbicacion: Locator;
  public readonly autocompleteResult: Locator;
  public readonly buttonBuscar: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUbicacion = this.page.locator('#home-ubicacion');
    this.autocompleteResult = this.page.locator('form.search-location-box div.autocomplete li');
    this.buttonBuscar = this.page.locator('#submit-buscar-por-ubicacion');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickResultBySearchKeyword(keyword: string) {
    await this.autocompleteResult.filter({ hasText: keyword }).click();
  }

  async searchByKeyword(keyword: string): Promise<ApartmentsPage> {
    await this.inputUbicacion.fill(keyword);
    await this.clickResultBySearchKeyword(keyword);
    await this.buttonBuscar.click();
    return new ApartmentsPage(this.page);
  }
}