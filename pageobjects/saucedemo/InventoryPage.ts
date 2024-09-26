import { Locator, Page } from "@playwright/test";
import { PageObject } from "../PageObject";
import { ItemPage, CartPage } from "./";

export class InventoryPage extends PageObject {
  readonly headerContainer: Locator;
  readonly inventoryList: Locator;
  readonly buttonMenu: Locator;
  readonly buttonLogOut: Locator;
  readonly firstProductImage: Locator;
  readonly firstProductName: Locator;
  readonly firstProductAddToCart: Locator;
  readonly shoppingCartBadge: Locator;
  readonly linkGoToCart: Locator;
  readonly sortingSelect: Locator;
  readonly allProductsNames: Locator;
  readonly allProductsPrices: Locator;
  readonly allProductsImages: Locator;
  readonly item: Locator;

  constructor(page: Page) {
    super(page);
    this.headerContainer = page.getByTestId('header-container');
    this.inventoryList = page.getByTestId('inventory-list');
    this.buttonMenu = page.getByRole('button', { name: 'Open Menu' });
    this.buttonLogOut = page.getByTestId('logout-sidebar-link');
    this.firstProductImage = page.getByTestId('inventory-item-sauce-labs-backpack-img');
    this.firstProductName = page.getByTestId('inventory-item-name').first();
    this.firstProductAddToCart = page.getByTestId('add-to-cart-sauce-labs-backpack');
    this.shoppingCartBadge = page.getByTestId('shopping-cart-badge');
    this.linkGoToCart = page.getByTestId('shopping-cart-link');
    this.sortingSelect = page.getByTestId('product-sort-container');
    this.allProductsNames = page.getByTestId('inventory-item-name');
    this.allProductsPrices = page.getByTestId('inventory-item-price');
    this.item = page.getByTestId('inventory-item');
    this.allProductsImages = page.locator('div.inventory_item_img');
  }

  async goto(){
    await this.page.goto('/');
    await this.page.context().addCookies(this.cookies);
    await this.page.reload();
    await super.goto('inventory.html');
  }

  async logOut() {
    await this.buttonMenu.click();
    await this.buttonLogOut.click();
  }

  async selectProductImage() {
    await this.firstProductImage.click();
    return new ItemPage(this.page);
  }

  async selectProductName() {
    await this.firstProductName.click();
    return new ItemPage(this.page);
  }

  async addProductToCart() {
    await this.firstProductAddToCart.click();
  }

  async clickGoToCart() {
    await this.linkGoToCart.click();
    return new CartPage(this.page);
  }
}