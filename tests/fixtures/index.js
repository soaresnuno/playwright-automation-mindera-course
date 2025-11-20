import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CatalogPage } from '../pages/CatalogPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await use(catalogPage);
  },
});

export { expect } from '@playwright/test';
