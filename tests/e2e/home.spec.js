import { test, expect } from '../fixtures/index.js';

const MOCK_DATA = {
  tabs: [
    { key: 'home', label: 'Home' },
    { key: 'inventory', label: 'Inventory' },
    { key: 'catalog', label: 'Catalog' },
    { key: 'cart', label: 'Cart' },
    { key: 'payments', label: 'Payments' },
    { key: 'orders', label: 'Orders' }
  ],
  sections: [
    {
      key: 'inventory',
      title: 'Inventory',
      description: "Manage the store\u2019s inventory and register new products by defining their name, price, and initial quantity."
    },
    {
      key: 'catalog',
      title: 'Catalog',
      description: 'Browse the available products, view details, and add them to your cart for purchase.'
    },
    {
      key: 'cart',
      title: 'Cart',
      description: "View the items you\u2019ve added. Quantities can be updated only inside the Catalog. When ready, proceed to checkout."
    },
    {
      key: 'payment',
      title: 'Payment',
      description: "You\u2019ll see a full summary of the cart items. Select a payment method to complete your purchase."
    },
    {
      key: 'orders',
      title: 'Orders',
      description: 'Review your purchase history, including date, items, total, and payment method.'
    }
  ],
  pageDescription: "Learn how to make the most of all the features in our application with these quick and easy-to-follow instructions. Each section is designed to make your experience even better!"
};

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
      expect(description).toContain(MOCK_DATA.pageDescription);
    });

    test('should display correct number of instruction sections', async ({ homePage }) => {
      const count = await homePage.getInstructionSectionsCount();
      expect(count).toBe(MOCK_DATA.sections.length);
    });
  });

  test.describe('Tab Navigation', () => {
    test('should display all tabs', async ({ homePage }) => {
      for (const tab of MOCK_DATA.tabs) {
        await expect(homePage.tabs[tab.key]).toBeVisible();
      }
    });

    test('should have Home tab active by default', async ({ homePage }) => {
      const isActive = await homePage.isTabActive('home');
      expect(isActive).toBe(true);
    });

    test('should display correct tab labels', async ({ homePage }) => {
      for (const tab of MOCK_DATA.tabs) {
        await expect(homePage.tabs[tab.key]).toHaveText(tab.label);
      }
    });

    for (const tab of MOCK_DATA.tabs.filter(t => t.key !== 'home')) {
      test(`should switch to ${tab.label} tab when clicked`, async ({ homePage }) => {
        await homePage.clickTab(tab.key);
        const isActive = await homePage.isTabActive(tab.key);
        expect(isActive).toBe(true);
      });
    }
  });

  test.describe('Instruction Sections', () => {
    for (const section of MOCK_DATA.sections) {
      test(`should display ${section.title} section`, async ({ homePage }) => {
        expect(await homePage.isSectionVisible(section.key)).toBe(true);
      });

      test(`should display correct ${section.title} title`, async ({ homePage }) => {
        const title = await homePage.getSectionTitle(section.key);
        expect(title).toBe(section.title);
      });

      test(`should display ${section.title} description text`, async ({ homePage }) => {
        const text = await homePage.getSectionText(section.key);
        expect(text).toBe(section.description);
      });

      test(`should display ${section.title} icon`, async ({ homePage, page }) => {
        const icon = page.locator(`[data-testid="instructions-icon-${section.key}"]`);
        await expect(icon).toBeVisible();
      });
    }

    test('should return all section titles in order', async ({ homePage }) => {
      const expectedTitles = MOCK_DATA.sections.map(s => s.title);
      const titles = await homePage.getAllSectionTitles();
      expect(titles).toEqual(expectedTitles);
    });
  });
});
