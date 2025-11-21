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
    await this.navigateToTab('cart', this.container);
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
    return this.getItemText('cart', 'name', index);
  }

  async getItemQuantity(index) {
    return this.getItemText('cart', 'quantity', index);
  }

  async getItemPrice(index) {
    return this.getItemText('cart', 'price-value', index);
  }

  async getItemTotal(index) {
    return this.getItemText('cart', 'total-value', index);
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
