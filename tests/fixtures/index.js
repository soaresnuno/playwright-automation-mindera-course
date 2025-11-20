import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
