import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
