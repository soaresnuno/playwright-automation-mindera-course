import { test, expect } from '../fixtures/index.js';
import { MOCK_CATALOG as MOCK_DATA } from '../mocks/index.js';

test.describe('Catalog Page', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.navigateToCatalog();
  });

  test.describe('Page Load and Structure', () => {
    test('should load the catalog page', async ({ catalogPage }) => {
      expect(await catalogPage.isLoaded()).toBe(true);
    });

    test('should display the correct title "Product Catalog"', async ({ catalogPage }) => {
      const title = await catalogPage.getTitle();
      expect(title).toBe('Product Catalog');
    });

    test('should display the catalog list', async ({ catalogPage }) => {
      const catalogList = await catalogPage.getCatalogList();
      await expect(catalogList).toBeVisible();
    });

    test('should have Catalog tab active', async ({ catalogPage }) => {
      const isActive = await catalogPage.isTabActive('catalog');
      expect(isActive).toBe(true);
    });
  });

  test.describe('Product List', () => {
    test('should display correct number of products', async ({ catalogPage }) => {
      const count = await catalogPage.getProductCount();
      expect(count).toBe(MOCK_DATA.products.length);
    });

    test('should display correct product names', async ({ catalogPage }) => {
      const expectedNames = MOCK_DATA.products.map(p => p.name);
      const productNames = await catalogPage.getAllProductNames();
      expect(productNames).toEqual(expectedNames);
    });
  });

  test.describe('Product Details', () => {
    const testCases = MOCK_DATA.products.map((product, index) => ({
      index,
      ...product
    }));

    for (const { index, name, price, quantity } of testCases) {
      test(`should display product ${index} name "${name}"`, async ({ catalogPage }) => {
        const actualName = await catalogPage.getProductName(index);
        expect(actualName).toBe(name);
      });

      test(`should display product ${index} price "${price}"`, async ({ catalogPage }) => {
        const actualPrice = await catalogPage.getProductPrice(index);
        expect(actualPrice).toBe(price);
      });

      test(`should display product ${index} quantity "${quantity} units"`, async ({ catalogPage }) => {
        const actualQuantity = await catalogPage.getProductQuantity(index);
        expect(actualQuantity).toBe(quantity);
      });
    }
  });

  test.describe('Add to Cart Button', () => {
    for (const { index, name, inStock } of MOCK_DATA.products.map((p, i) => ({ index: i, ...p }))) {
      if (inStock) {
        test(`should have enabled Add to Cart button for product ${index} "${name}"`, async ({ catalogPage }) => {
          const isEnabled = await catalogPage.isAddToCartEnabled(index);
          expect(isEnabled).toBe(true);
        });

        test(`should display "Add to Cart" text for product ${index}`, async ({ catalogPage }) => {
          const buttonText = await catalogPage.getAddToCartButtonText(index);
          expect(buttonText).toBe('Add to Cart');
        });
      } else {
        test(`should have disabled button for out of stock product ${index} "${name}"`, async ({ catalogPage }) => {
          const isEnabled = await catalogPage.isAddToCartEnabled(index);
          expect(isEnabled).toBe(false);
        });

        test(`should display "Out of Stock" text for product ${index}`, async ({ catalogPage }) => {
          const buttonText = await catalogPage.getAddToCartButtonText(index);
          expect(buttonText).toBe('Out of Stock');
        });
      }
    }
  });

  test.describe('Product Item Elements', () => {
    test('should display item info container for each product', async ({ catalogPage }) => {
      const count = await catalogPage.getProductCount();
      for (let i = 0; i < count; i++) {
        const info = await catalogPage.getItemInfo(i);
        await expect(info).toBeVisible();
      }
    });

    test('should display item actions container for each product', async ({ catalogPage }) => {
      const count = await catalogPage.getProductCount();
      for (let i = 0; i < count; i++) {
        const actions = await catalogPage.getItemActions(i);
        await expect(actions).toBeVisible();
      }
    });

    test('should display price label with euro symbol for each product', async ({ catalogPage }) => {
      const count = await catalogPage.getProductCount();
      for (let i = 0; i < count; i++) {
        const priceLabel = await catalogPage.getPriceLabel(i);
        await expect(priceLabel).toHaveText('Price: €');
      }
    });
  });
});
