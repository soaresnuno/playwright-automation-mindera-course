import { BasePage } from './BasePage.js';

export class OrdersPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="orders-page"]');
    this.title = page.locator('[data-testid="orders-title"]');
    this.emptyMessage = page.locator('[data-testid="orders-empty-message"]');
    this.ordersList = page.locator('[data-testid="orders-list"]');
  }

  async navigateToOrders() {
    await this.goto();
    await this.clickTab('orders');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isLoaded() {
    await this.container.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.title.textContent();
  }

  async isEmpty() {
    return this.emptyMessage.isVisible();
  }

  async getEmptyMessage() {
    return this.emptyMessage.textContent();
  }

  async getOrderCount() {
    const isVisible = await this.ordersList.isVisible();
    if (!isVisible) return 0;
    return this.ordersList.locator('li').count();
  }

  async getOrderDate(index) {
    return this.page.locator(`[data-testid="order-date-${index}"]`).textContent();
  }

  async getOrderPaymentMethod(index) {
    return this.page.locator(`[data-testid="order-payment-${index}"]`).textContent();
  }

  async getOrderItemName(orderIndex, itemIndex) {
    return this.page.locator(`[data-testid="order-item-name-${orderIndex}-${itemIndex}"]`).textContent();
  }

  async getOrderItemTotal(orderIndex, itemIndex) {
    return this.page.locator(`[data-testid="order-item-total-value-${orderIndex}-${itemIndex}"]`).textContent();
  }

  async getOrderTotal(index) {
    return this.page.locator(`[data-testid="order-total-value-${index}"]`).textContent();
  }
}
