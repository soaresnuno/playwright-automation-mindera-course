import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="inventory-page"]');
    this.title = page.locator('[data-testid="inventory-title"]');
    this.form = page.locator('[data-testid="inventory-form"]');
    this.productList = page.locator('[data-testid="inventory-product-list"]');

    // Form inputs
    this.nameInput = page.locator('[data-testid="inventory-input-name"]');
    this.priceInput = page.locator('[data-testid="inventory-input-price"]');
    this.quantityInput = page.locator('[data-testid="inventory-input-quantity"]');
    this.submitButton = page.locator('[data-testid="inventory-submit-button"]');

    // Tab selector
    this.inventoryTab = page.locator('[data-testid="store-tab-inventory"]');
  }

  async navigateToInventory() {
    await this.goto();
    await this.clickTab('inventory');
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
    return this.productList.locator('li').count();
  }

  async getProductName(index) {
    return this.page.locator(`[data-testid="inventory-product-name-${index}"]`).textContent();
  }

  async getProductPrice(index) {
    return this.page.locator(`[data-testid="inventory-product-price-value-${index}"]`).textContent();
  }

  async getProductQuantity(index) {
    return this.page.locator(`[data-testid="inventory-product-quantity-${index}"]`).textContent();
  }

  async getAllProductNames() {
    const count = await this.getProductCount();
    const names = [];
    for (let i = 0; i < count; i++) {
      const name = await this.getProductName(i);
      names.push(name);
    }
    return names;
  }

  async increaseQuantity(index) {
    await this.page.click(`[data-testid="inventory-product-increase-${index}"]`);
  }

  async decreaseQuantity(index) {
    await this.page.click(`[data-testid="inventory-product-decrease-${index}"]`);
  }

  async addProduct(name, price, quantity) {
    await this.nameInput.fill(name);
    await this.priceInput.fill(String(price));
    await this.quantityInput.fill(String(quantity));
    await this.submitButton.click();
  }

  async isFormVisible() {
    return this.form.isVisible();
  }
}
