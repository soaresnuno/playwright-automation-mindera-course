import { BasePage } from './BasePage.js';

export class CatalogPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="catalog-page"]');
    this.title = page.locator('[data-testid="catalog-title"]');
    this.catalogList = page.locator('[data-testid="catalog-list"]');
  }

  async navigateToCatalog() {
    await this.goto();
    await this.clickTab('catalog');
    await this.container.waitFor({ state: 'visible' });
  }

  async isLoaded() {
    await this.container.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getProductCount() {
    return this.catalogList.locator('li').count();
  }

  async getProductName(index) {
    return this.page.locator(`[data-testid="catalog-item-name-${index}"]`).textContent();
  }

  async getProductPrice(index) {
    return this.page.locator(`[data-testid="catalog-item-price-value-${index}"]`).textContent();
  }

  async getProductQuantity(index) {
    const text = await this.page.locator(`[data-testid="catalog-item-quantity-${index}"]`).textContent();
    return text.replace(' units', '');
  }

  async getAllProductNames() {
    const count = await this.getProductCount();
    const names = [];
    for (let i = 0; i < count; i++) {
      names.push(await this.getProductName(i));
    }
    return names;
  }

  async isAddToCartEnabled(index) {
    const button = this.page.locator(`[data-testid="catalog-item-add-button-${index}"]`);
    return button.isEnabled();
  }

  async getAddToCartButtonText(index) {
    return this.page.locator(`[data-testid="catalog-item-add-button-${index}"]`).textContent();
  }

  async clickAddToCart(index) {
    await this.page.click(`[data-testid="catalog-item-add-button-${index}"]`);
  }
}
