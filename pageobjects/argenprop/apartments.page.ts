import type { Page, Locator } from '@playwright/test';
import { ArgenpropPage } from './argenprop.page';

export class ApartmentsPage extends ArgenpropPage { 
  public readonly selectType: Locator;
  public readonly clearType: Locator;
  public readonly saleType: Locator;
  public readonly rentType: Locator;
  public readonly buttonApplyType: Locator;
  
  public readonly selectRooms: Locator;

  constructor(page: Page) {
    super(page);
    this.selectType = this.page.locator('#filter-tipooperacion');
    this.clearType = this.selectType.locator('div.available-content-footer span');
    this.saleType = this.selectType.locator('li').filter({ has: this.page.locator('#tipooperacion_venta')});
    this.rentType = this.selectType.locator('li').filter({ has: this.page.locator('#tipooperacion_alquiler')});
    this.buttonApplyType = this.selectType.locator('button');

    this.selectRooms = this.page.locator('#filter-group-range');
  }
}