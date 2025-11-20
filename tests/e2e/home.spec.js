import { test, expect } from '../fixtures/index.js';

test.describe('Home Page - Store Instructions', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
  });

  test.describe('Page Load and Structure', () => {
    test('should load the instructions page', async ({ homePage }) => {
      expect(await homePage.isLoaded()).toBe(true);
    });

    test('should display the correct title', async ({ homePage }) => {
      const title = await homePage.getTitle();
      expect(title).toBe('Instructions');
    });

    test('should display the description text', async ({ homePage }) => {
      const description = await homePage.getDescription();
      expect(description).toContain(
        "Learn how to make the most of all the features in our application with these quick and easy-to-follow instructions. Each section is designed to make your experience even better!"
      );
    });

    test('should display 5 instruction sections', async ({ homePage }) => {
      const count = await homePage.getInstructionSectionsCount();
      expect(count).toBe(5);
    });
  });

  test.describe('Tab Navigation', () => {
    test('should display all 6 tabs', async ({ homePage }) => {
      const tabNames = ['home', 'inventory', 'catalog', 'cart', 'payments', 'orders'];
      for (const tabName of tabNames) {
        await expect(homePage.tabs[tabName]).toBeVisible();
      }
    });

    test('should have Home tab active by default', async ({ homePage }) => {
      const isActive = await homePage.isTabActive('home');
      expect(isActive).toBe(true);
    });

    test('should display correct tab labels', async ({ homePage }) => {
      await expect(homePage.tabs.home).toHaveText('Home');
      await expect(homePage.tabs.inventory).toHaveText('Inventory');
      await expect(homePage.tabs.catalog).toHaveText('Catalog');
      await expect(homePage.tabs.cart).toHaveText('Cart');
      await expect(homePage.tabs.payments).toHaveText('Payments');
      await expect(homePage.tabs.orders).toHaveText('Orders');
    });

    test('should switch to Inventory tab when clicked', async ({ homePage }) => {
      await homePage.clickTab('inventory');
      const isActive = await homePage.isTabActive('inventory');
      expect(isActive).toBe(true);
    });

    test('should switch to Catalog tab when clicked', async ({ homePage }) => {
      await homePage.clickTab('catalog');
      const isActive = await homePage.isTabActive('catalog');
      expect(isActive).toBe(true);
    });

    test('should switch to Cart tab when clicked', async ({ homePage }) => {
      await homePage.clickTab('cart');
      const isActive = await homePage.isTabActive('cart');
      expect(isActive).toBe(true);
    });

    test('should switch to Payments tab when clicked', async ({ homePage }) => {
      await homePage.clickTab('payments');
      const isActive = await homePage.isTabActive('payments');
      expect(isActive).toBe(true);
    });

    test('should switch to Orders tab when clicked', async ({ homePage }) => {
      await homePage.clickTab('orders');
      const isActive = await homePage.isTabActive('orders');
      expect(isActive).toBe(true);
    });
  });

  test.describe('Instruction Sections Visibility', () => {
    test('should display Inventory section', async ({ homePage }) => {
      expect(await homePage.isSectionVisible('inventory')).toBe(true);
    });

    test('should display Catalog section', async ({ homePage }) => {
      expect(await homePage.isSectionVisible('catalog')).toBe(true);
    });

    test('should display Cart section', async ({ homePage }) => {
      expect(await homePage.isSectionVisible('cart')).toBe(true);
    });

    test('should display Payment section', async ({ homePage }) => {
      expect(await homePage.isSectionVisible('payment')).toBe(true);
    });

    test('should display Orders section', async ({ homePage }) => {
      expect(await homePage.isSectionVisible('orders')).toBe(true);
    });
  });

  test.describe('Section Titles', () => {
    test('should display correct Inventory title', async ({ homePage }) => {
      const title = await homePage.getSectionTitle('inventory');
      expect(title).toBe('Inventory');
    });

    test('should display correct Catalog title', async ({ homePage }) => {
      const title = await homePage.getSectionTitle('catalog');
      expect(title).toBe('Catalog');
    });

    test('should display correct Cart title', async ({ homePage }) => {
      const title = await homePage.getSectionTitle('cart');
      expect(title).toBe('Cart');
    });

    test('should display correct Payment title', async ({ homePage }) => {
      const title = await homePage.getSectionTitle('payment');
      expect(title).toBe('Payment');
    });

    test('should display correct Orders title', async ({ homePage }) => {
      const title = await homePage.getSectionTitle('orders');
      expect(title).toBe('Orders');
    });

    test('should return all section titles in order', async ({ homePage }) => {
      const titles = await homePage.getAllSectionTitles();
      expect(titles).toEqual(['Inventory', 'Catalog', 'Cart', 'Payment', 'Orders']);
    });
  });

  test.describe('Section Descriptions', () => {
    test('should display Inventory description text', async ({ homePage }) => {
      const text = await homePage.getSectionText('inventory');
      expect(text).toBe("Manage the store\u2019s inventory and register new products by defining their name, price, and initial quantity.");
    });

    test('should display Catalog description text', async ({ homePage }) => {
      const text = await homePage.getSectionText('catalog');
      expect(text).toBe('Browse the available products, view details, and add them to your cart for purchase.');
    });

    test('should display Cart description text', async ({ homePage }) => {
      const text = await homePage.getSectionText('cart');
      expect(text).toBe("View the items you\u2019ve added. Quantities can be updated only inside the Catalog. When ready, proceed to checkout.");
    });

    test('should display Payment description text', async ({ homePage }) => {
      const text = await homePage.getSectionText('payment');
      expect(text).toBe("You\u2019ll see a full summary of the cart items. Select a payment method to complete your purchase.");
    });

    test('should display Orders description text', async ({ homePage }) => {
      const text = await homePage.getSectionText('orders');
      expect(text).toBe('Review your purchase history, including date, items, total, and payment method.');
    });
  });

  test.describe('Section Icons', () => {
    test('should display Inventory icon', async ({ homePage, page }) => {
      const icon = page.locator('[data-testid="instructions-icon-inventory"]');
      await expect(icon).toBeVisible();
    });

    test('should display Catalog icon', async ({ homePage, page }) => {
      const icon = page.locator('[data-testid="instructions-icon-catalog"]');
      await expect(icon).toBeVisible();
    });

    test('should display Cart icon', async ({ homePage, page }) => {
      const icon = page.locator('[data-testid="instructions-icon-cart"]');
      await expect(icon).toBeVisible();
    });

    test('should display Payment icon', async ({ homePage, page }) => {
      const icon = page.locator('[data-testid="instructions-icon-payment"]');
      await expect(icon).toBeVisible();
    });

    test('should display Orders icon', async ({ homePage, page }) => {
      const icon = page.locator('[data-testid="instructions-icon-orders"]');
      await expect(icon).toBeVisible();
    });
  });
});
