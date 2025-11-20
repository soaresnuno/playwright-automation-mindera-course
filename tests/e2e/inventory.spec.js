import { test, expect } from '../fixtures/index.js';

const MOCK_DATA = {
  products: [
    { name: 'Lightsaber (Star Wars)', price: '9999.99', quantity: '2' },
    { name: 'Giant Rubber Duck', price: '49.99', quantity: '15' },
    { name: 'Shark Repellent', price: '299.99', quantity: '5' },
    { name: 'Aluminum Helmet for Protection Against Alien Mind Control', price: '19.99', quantity: '50' },
    { name: 'Sonic Screwdriver (Doctor Who)', price: '79.99', quantity: '7' },
    { name: 'Bacon-Scented Candle', price: '14.99', quantity: '20' },
    { name: 'Invisible Pen', price: '9.99', quantity: '0' },
    { name: 'Dog Sunglasses', price: '24.99', quantity: '12' }
  ]
};

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.navigateToInventory();
  });

  test.describe('Page Load and Structure', () => {
    test('should load the inventory page', async ({ inventoryPage }) => {
      expect(await inventoryPage.isLoaded()).toBe(true);
    });

    test('should display the correct title "Inventory Management"', async ({ inventoryPage }) => {
      const title = await inventoryPage.getTitle();
      expect(title).toBe('Inventory Management');
    });

    test('should display the inventory form', async ({ inventoryPage }) => {
      expect(await inventoryPage.isFormVisible()).toBe(true);
    });

    test('should have Inventory tab active', async ({ inventoryPage }) => {
      const isActive = await inventoryPage.isTabActive('inventory');
      expect(isActive).toBe(true);
    });
  });

  test.describe('Product List', () => {
    test('should display product list', async ({ page }) => {
      const productList = page.locator('[data-testid="inventory-product-list"]');
      await expect(productList).toBeVisible();
    });

    test('should display correct number of products', async ({ inventoryPage }) => {
      const count = await inventoryPage.getProductCount();
      expect(count).toBe(MOCK_DATA.products.length);
    });

    test('should display correct product names', async ({ inventoryPage }) => {
      const expectedNames = MOCK_DATA.products.map(p => p.name);
      const productNames = await inventoryPage.getAllProductNames();
      expect(productNames).toEqual(expectedNames);
    });
  });

  test.describe('Product Details', () => {
    const testCases = MOCK_DATA.products.map((product, index) => ({
      index,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }));

    for (const { index, name, price, quantity } of testCases) {
      test(`should display product ${index} name "${name}"`, async ({ inventoryPage }) => {
        const actualName = await inventoryPage.getProductName(index);
        expect(actualName).toBe(name);
      });

      test(`should display product ${index} price "${price}"`, async ({ inventoryPage }) => {
        const actualPrice = await inventoryPage.getProductPrice(index);
        expect(actualPrice).toBe(price);
      });

      test(`should display product ${index} quantity "${quantity}"`, async ({ inventoryPage }) => {
        const actualQuantity = await inventoryPage.getProductQuantity(index);
        expect(actualQuantity).toBe(quantity);
      });
    }
  });

  test.describe('Form Elements', () => {
    test('should display name input field', async ({ inventoryPage }) => {
      await expect(inventoryPage.nameInput).toBeVisible();
    });

    test('should display price input field', async ({ inventoryPage }) => {
      await expect(inventoryPage.priceInput).toBeVisible();
    });

    test('should display quantity input field', async ({ inventoryPage }) => {
      await expect(inventoryPage.quantityInput).toBeVisible();
    });

    test('should display submit button with text "Add Product"', async ({ inventoryPage }) => {
      await expect(inventoryPage.submitButton).toBeVisible();
      await expect(inventoryPage.submitButton).toHaveText('Add Product');
    });
  });

  test.describe('Quantity Controls', () => {
    test('should display increase button for each product', async ({ inventoryPage, page }) => {
      const count = await inventoryPage.getProductCount();
      for (let i = 0; i < count; i++) {
        const increaseBtn = page.locator(`[data-testid="inventory-product-increase-${i}"]`);
        await expect(increaseBtn).toBeVisible();
      }
    });

    test('should display decrease button for each product', async ({ inventoryPage, page }) => {
      const count = await inventoryPage.getProductCount();
      for (let i = 0; i < count; i++) {
        const decreaseBtn = page.locator(`[data-testid="inventory-product-decrease-${i}"]`);
        await expect(decreaseBtn).toBeVisible();
      }
    });

    test('should increase product quantity when clicking + button', async ({ inventoryPage }) => {
      const initialQuantity = await inventoryPage.getProductQuantity(1);
      await inventoryPage.increaseQuantity(1);
      const newQuantity = await inventoryPage.getProductQuantity(1);
      expect(Number(newQuantity)).toBe(Number(initialQuantity) + 1);
    });

    test('should decrease product quantity when clicking - button', async ({ inventoryPage }) => {
      const initialQuantity = await inventoryPage.getProductQuantity(1);
      await inventoryPage.decreaseQuantity(1);
      const newQuantity = await inventoryPage.getProductQuantity(1);
      expect(Number(newQuantity)).toBe(Number(initialQuantity) - 1);
    });
  });

  test.describe('Add Product Functionality', () => {
    test('should add a new product to the list', async ({ inventoryPage }) => {
      const initialCount = await inventoryPage.getProductCount();
      await inventoryPage.addProduct('Test Product', 99.99, 10);
      const newCount = await inventoryPage.getProductCount();
      expect(newCount).toBe(initialCount + 1);
    });
  });
});
