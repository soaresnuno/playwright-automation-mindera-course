import { test, expect } from '../fixtures/index.js';
import { MOCK_CATALOG, PAYMENT_METHODS } from '../mocks/index.js';

// Helper function to add item to cart and navigate to payment
async function addToCartAndGoToPayment(catalogPage, cartPage, productIndex = 0) {
  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(productIndex);
  await cartPage.clickTab('cart');
  await cartPage.isLoaded();
  await cartPage.clickGoToPayment();
}

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

    test('should complete purchase and display order in Orders tab', async ({ catalogPage, cartPage, ordersPage, paymentPage }) => {
      await test.step('Add item to cart', async () => {
        await catalogPage.navigateToCatalog();
        await catalogPage.clickAddToCart(0);
      });

      await test.step('Navigate to payment page', async () => {
        await cartPage.clickTab('cart');
        await cartPage.isLoaded();
        await cartPage.clickGoToPayment();
      });

      await test.step('Verify payment page elements', async () => {
        expect(await paymentPage.isLoaded()).toBe(true);
        expect(await paymentPage.getTitle()).toBe('Payment');
        expect(await paymentPage.isMethodsListVisible()).toBe(true);
        expect(await paymentPage.isConfirmButtonVisible()).toBe(true);
        expect(await paymentPage.getConfirmButtonText()).toBe('Confirm Payment');
      });

      await test.step('Complete payment with MBWay', async () => {
        await paymentPage.selectPaymentMethod('MBWay');
        await paymentPage.confirmPayment();
      });

      await test.step('Verify order created', async () => {
        await ordersPage.isLoaded();
        expect(await ordersPage.isTabActive('orders')).toBe(true);
        expect(await ordersPage.getOrderCount()).toBe(2);
        expect(await ordersPage.getOrderPaymentMethod(0)).toContain('MBWay');
        expect(await ordersPage.getOrderItemName(0, 0)).toContain(firstProduct.name);
        expect(await ordersPage.getOrderTotal(0)).toBe(firstProduct.price);
      });
    });

    test('should display payment methods on payment page', async ({ catalogPage, cartPage, paymentPage }) => {
      await test.step('Navigate to payment page', async () => {
        await addToCartAndGoToPayment(catalogPage, cartPage);
      });

      await test.step('Verify all payment methods are displayed', async () => {
        for (const method of PAYMENT_METHODS) {
          expect(await paymentPage.isPaymentMethodVisible(method)).toBe(true);
          expect(await paymentPage.getPaymentMethodLabel(method)).toBe(method);
        }
      });
    });

    test('should display cart items on payment page', async ({ catalogPage, cartPage, paymentPage }) => {
      await test.step('Navigate to payment page', async () => {
        await addToCartAndGoToPayment(catalogPage, cartPage);
      });

      await test.step('Verify cart item details on payment page', async () => {
        expect(await paymentPage.getItemName(0)).toBe(firstProduct.name);
        expect(await paymentPage.getItemQuantity(0)).toBe('1');
        expect(await paymentPage.getItemPrice(0)).toBe(firstProduct.price);
        expect(await paymentPage.getTotal()).toBe(firstProduct.price);
      });
    });
  });
});
