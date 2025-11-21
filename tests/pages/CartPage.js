import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="cart-page"]');
    this.title = page.locator('[data-testid="cart-title"]');
    this.emptyMessage = page.locator('[data-testid="cart-empty-message"]');
    this.cartList = page.locator('[data-testid="cart-list"]');
    this.cartTotal = page.locator('[data-testid="cart-total-value"]');
    this.goToPaymentButton = page.locator('[data-testid="cart-go-to-payment"]');
  }

  async navigateToCart() {
    await this.goto();
    await this.clickTab('cart');
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

  async getItemCount() {
    const isVisible = await this.cartList.isVisible();
    if (!isVisible) return 0;
    return this.cartList.locator('li').count();
  }

  async getItemName(index) {
    return this.page.locator(`[data-testid="cart-item-name-${index}"]`).textContent();
  }

  async getItemQuantity(index) {
    return this.page.locator(`[data-testid="cart-item-quantity-${index}"]`).textContent();
  }

  async getItemPrice(index) {
    return this.page.locator(`[data-testid="cart-item-price-value-${index}"]`).textContent();
  }

  async getItemTotal(index) {
    return this.page.locator(`[data-testid="cart-item-total-value-${index}"]`).textContent();
  }

  async getCartTotal() {
    return this.cartTotal.textContent();
  }

  async isGoToPaymentVisible() {
    return this.goToPaymentButton.isVisible();
  }

  async clickGoToPayment() {
    await this.goToPaymentButton.click();
  }
}
