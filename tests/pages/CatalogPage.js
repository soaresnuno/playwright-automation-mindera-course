import { BasePage } from './BasePage.js';

export class CatalogPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="catalog-page"]');
    this.title = page.locator('[data-testid="catalog-title"]');
    this.catalogList = page.locator('[data-testid="catalog-list"]');
  }

  async navigateToCatalog() {
    await this.navigateToTab('catalog', this.container);
  }

  async isLoaded() {
    await this.container.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getCatalogList() {
    return this.catalogList;
  }

  async getProductCount() {
    return this.catalogList.locator('li').count();
  }

  async getProductName(index) {
    return this.getItemText('catalog', 'name', index);
  }

  async getProductPrice(index) {
    return this.getItemText('catalog', 'price-value', index);
  }

  async getProductQuantity(index) {
    const text = await this.getItemText('catalog', 'quantity', index);
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
    return this.getItemLocator('catalog', 'add-button', index).isEnabled();
  }

  async getAddToCartButtonText(index) {
    return this.getItemText('catalog', 'add-button', index);
  }

  async clickAddToCart(index) {
    await this.getItemLocator('catalog', 'add-button', index).click();
  }

  // Additional methods for test coverage
  async getItemInfo(index) {
    return this.getItemLocator('catalog', 'info', index);
  }

  async getItemActions(index) {
    return this.getItemLocator('catalog', 'actions', index);
  }

  async getPriceLabel(index) {
    return this.getItemLocator('catalog', 'price-label', index);
  }
}
