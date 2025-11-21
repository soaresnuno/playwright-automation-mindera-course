import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CatalogPage } from '../pages/CatalogPage.js';
import { CartPage } from '../pages/CartPage.js';
import { OrdersPage } from '../pages/OrdersPage.js';
import { PaymentPage } from '../pages/PaymentPage.js';

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
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  ordersPage: async ({ page }, use) => {
    const ordersPage = new OrdersPage(page);
    await use(ordersPage);
  },
  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
});

export { expect } from '@playwright/test';
