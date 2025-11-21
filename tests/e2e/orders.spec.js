import { test, expect } from '../fixtures/index.js';
import { MOCK_CATALOG } from '../mocks/index.js';

test.describe('Orders Page', () => {
  test.describe('Empty Orders', () => {
    test.beforeEach(async ({ ordersPage }) => {
      await ordersPage.navigateToOrders();
    });

    test('should load the orders page', async ({ ordersPage }) => {
      expect(await ordersPage.isLoaded()).toBe(true);
    });

    test('should display the correct title "Purchase Orders"', async ({ ordersPage }) => {
      const title = await ordersPage.getTitle();
      expect(title).toBe('Purchase Orders');
    });

    test('should have Orders tab active', async ({ ordersPage }) => {
      const isActive = await ordersPage.isTabActive('orders');
      expect(isActive).toBe(true);
    });

    test('should display empty orders message when no orders', async ({ ordersPage }) => {
      const isEmpty = await ordersPage.isEmpty();
      expect(isEmpty).toBe(true);
    });

    test('should display correct empty message text', async ({ ordersPage }) => {
      const message = await ordersPage.getEmptyMessage();
      expect(message).toBe('No orders registered.');
    });

    test('should have zero orders when empty', async ({ ordersPage }) => {
      const count = await ordersPage.getOrderCount();
      expect(count).toBe(0);
    });
  });

  test.describe('Complete Purchase Flow', () => {
    const firstProduct = MOCK_CATALOG.products[0];

    test('should complete purchase and display order in Orders tab', async ({ catalogPage, cartPage, ordersPage, page }) => {
      // Add item to cart from catalog
      await catalogPage.navigateToCatalog();
      await catalogPage.clickAddToCart(0);

      // Go to cart and click Go to Payments
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();
      await cartPage.clickGoToPayment();

      // Verify payment page is displayed
      const paymentPage = page.locator('[data-testid="payment-page"]');
      await expect(paymentPage).toBeVisible();

      // Verify payment title
      const paymentTitle = page.locator('[data-testid="payment-title"]');
      await expect(paymentTitle).toHaveText('Payment');

      // Verify payment methods list is displayed
      const paymentMethodsList = page.locator('[data-testid="payment-methods-list"]');
      await expect(paymentMethodsList).toBeVisible();

      // Verify Confirm Payment button is displayed
      const confirmButton = page.locator('[data-testid="payment-confirm-button"]');
      await expect(confirmButton).toBeVisible();
      await expect(confirmButton).toHaveText('Confirm Payment');

      // Select MBWay payment method
      const mbwayRadio = page.locator('[data-testid="payment-method-input-MBWay"]');
      await mbwayRadio.click();

      // Click Confirm Payment
      await confirmButton.click();

      // Verify redirected to Orders tab
      await ordersPage.isLoaded();

      // Verify Orders tab is active
      const isOrdersActive = await ordersPage.isTabActive('orders');
      expect(isOrdersActive).toBe(true);

      // Verify order is displayed
      const orderCount = await ordersPage.getOrderCount();
      expect(orderCount).toBe(2);

      // Verify order details
      const orderPayment = await ordersPage.getOrderPaymentMethod(0);
      expect(orderPayment).toContain('MBWay');

      // Verify order item
      const orderItemName = await ordersPage.getOrderItemName(0, 0);
      expect(orderItemName).toContain(firstProduct.name);

      // Verify order total
      const orderTotal = await ordersPage.getOrderTotal(0);
      expect(orderTotal).toBe(firstProduct.price);
    });

    test('should display payment methods on payment page', async ({ catalogPage, cartPage, page }) => {
      // Add item to cart and go to payments
      await catalogPage.navigateToCatalog();
      await catalogPage.clickAddToCart(0);
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();
      await cartPage.clickGoToPayment();

      // Verify all payment methods are displayed
      const paymentMethods = ['MBWay', 'Klarna', 'Multibanco', 'PayPal', 'Visa'];

      for (const method of paymentMethods) {
        const methodInput = page.locator(`[data-testid="payment-method-input-${method}"]`);
        await expect(methodInput).toBeVisible();

        const methodLabel = page.locator(`[data-testid="payment-method-label-${method}"]`);
        await expect(methodLabel).toHaveText(method);
      }
    });

    test('should display cart items on payment page', async ({ catalogPage, cartPage, page }) => {
      // Add item to cart and go to payments
      await catalogPage.navigateToCatalog();
      await catalogPage.clickAddToCart(0);
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();
      await cartPage.clickGoToPayment();

      // Verify cart item is displayed on payment page
      const paymentItemName = page.locator('[data-testid="payment-item-name-0"]');
      await expect(paymentItemName).toHaveText(firstProduct.name);

      const paymentItemQuantity = page.locator('[data-testid="payment-item-quantity-0"]');
      await expect(paymentItemQuantity).toHaveText('1');

      const paymentItemPrice = page.locator('[data-testid="payment-item-price-value-0"]');
      await expect(paymentItemPrice).toHaveText(firstProduct.price);

      const paymentTotal = page.locator('[data-testid="payment-total-value"]');
      await expect(paymentTotal).toHaveText(firstProduct.price);
    });
  });
});
