import { BasePage } from './BasePage.js';

export class PaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="payment-page"]');
    this.title = page.locator('[data-testid="payment-title"]');
    this.methodsList = page.locator('[data-testid="payment-methods-list"]');
    this.confirmButton = page.locator('[data-testid="payment-confirm-button"]');
    this.totalValue = page.locator('[data-testid="payment-total-value"]');
  }

  async isLoaded() {
    await this.container.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.title.textContent();
  }

  async isMethodsListVisible() {
    return this.methodsList.isVisible();
  }

  async isConfirmButtonVisible() {
    return this.confirmButton.isVisible();
  }

  async getConfirmButtonText() {
    return this.confirmButton.textContent();
  }

  async selectPaymentMethod(method) {
    await this.page.click(`[data-testid="payment-method-input-${method}"]`);
  }

  async isPaymentMethodVisible(method) {
    return this.page.locator(`[data-testid="payment-method-input-${method}"]`).isVisible();
  }

  async getPaymentMethodLabel(method) {
    return this.page.locator(`[data-testid="payment-method-label-${method}"]`).textContent();
  }

  async confirmPayment() {
    await this.confirmButton.click();
  }

  async getItemName(index) {
    return this.page.locator(`[data-testid="payment-item-name-${index}"]`).textContent();
  }

  async getItemQuantity(index) {
    return this.page.locator(`[data-testid="payment-item-quantity-${index}"]`).textContent();
  }

  async getItemPrice(index) {
    return this.page.locator(`[data-testid="payment-item-price-value-${index}"]`).textContent();
  }

  async getTotal() {
    return this.totalValue.textContent();
  }
}
