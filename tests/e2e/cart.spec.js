import { test, expect } from '../fixtures/index.js';
import { MOCK_CATALOG } from '../mocks/index.js';

test.describe('Cart Page', () => {
  test.describe('Empty Cart', () => {
    test.beforeEach(async ({ cartPage }) => {
      await cartPage.navigateToCart();
    });

    test('should load the cart page', async ({ cartPage }) => {
      expect(await cartPage.isLoaded()).toBe(true);
    });

    test('should display the correct title "Your Cart"', async ({ cartPage }) => {
      const title = await cartPage.getTitle();
      expect(title).toBe('Your Cart');
    });

    test('should have Cart tab active', async ({ cartPage }) => {
      const isActive = await cartPage.isTabActive('cart');
      expect(isActive).toBe(true);
    });

    test('should display empty cart message when no items', async ({ cartPage }) => {
      const isEmpty = await cartPage.isEmpty();
      expect(isEmpty).toBe(true);
    });

    test('should display correct empty message text', async ({ cartPage }) => {
      const message = await cartPage.getEmptyMessage();
      expect(message).toBe('Your cart is empty.');
    });

    test('should have zero items in empty cart', async ({ cartPage }) => {
      const count = await cartPage.getItemCount();
      expect(count).toBe(0);
    });
  });

  test.describe('Cart with Items', () => {
    const firstProduct = MOCK_CATALOG.products[0];

    test.beforeEach(async ({ catalogPage }) => {
      await catalogPage.navigateToCatalog();
      await catalogPage.clickAddToCart(0);
    });

    test('should display item after adding from catalog', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const count = await cartPage.getItemCount();
      expect(count).toBe(1);
    });

    test('should display correct product name in cart', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const name = await cartPage.getItemName(0);
      expect(name).toBe(firstProduct.name);
    });

    test('should display correct product quantity in cart', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const quantity = await cartPage.getItemQuantity(0);
      expect(quantity).toBe('1');
    });

    test('should display correct product price in cart', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const price = await cartPage.getItemPrice(0);
      expect(price).toBe(firstProduct.price);
    });

    test('should display correct item total in cart', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const total = await cartPage.getItemTotal(0);
      expect(total).toBe(firstProduct.price);
    });

    test('should display correct cart total', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const total = await cartPage.getCartTotal();
      expect(total).toBe(firstProduct.price);
    });

    test('should display Go to Payments button', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const isVisible = await cartPage.isGoToPaymentVisible();
      expect(isVisible).toBe(true);
    });

    test('should not display empty message when cart has items', async ({ cartPage }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const isEmpty = await cartPage.isEmpty();
      expect(isEmpty).toBe(false);
    });
  });

  test.describe('Cart Item Elements', () => {
    test.beforeEach(async ({ catalogPage }) => {
      await catalogPage.navigateToCatalog();
      await catalogPage.clickAddToCart(0);
    });

    test('should display cart list when items exist', async ({ cartPage, page }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const cartList = page.locator('[data-testid="cart-list"]');
      await expect(cartList).toBeVisible();
    });

    test('should display item info container', async ({ cartPage, page }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const info = page.locator('[data-testid="cart-item-info-0"]');
      await expect(info).toBeVisible();
    });

    test('should display cart summary', async ({ cartPage, page }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const summary = page.locator('[data-testid="cart-summary"]');
      await expect(summary).toBeVisible();
    });

    test('should display euro currency symbol for price', async ({ cartPage, page }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const currency = page.locator('[data-testid="cart-item-price-currency-0"]');
      await expect(currency).toHaveText('€');
    });

    test('should display euro currency symbol for total', async ({ cartPage, page }) => {
      await cartPage.clickTab('cart');
      await cartPage.isLoaded();

      const currency = page.locator('[data-testid="cart-item-total-currency-0"]');
      await expect(currency).toHaveText('€');
    });
  });
});
