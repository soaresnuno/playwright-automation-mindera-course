# Custom Fixtures

## What Are Fixtures?

Fixtures are a way to set up the test environment and provide dependencies to tests. Playwright's fixture system handles:
- **Setup**: Creating objects before tests
- **Teardown**: Cleaning up after tests
- **Dependency Injection**: Passing objects to tests

---

## Why Custom Fixtures?

### Without Fixtures
```javascript
import { test } from '@playwright/test';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';

test('add to cart', async ({ page }) => {
  // Manual instantiation in every test
  const catalogPage = new CatalogPage(page);
  const cartPage = new CartPage(page);

  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(0);
  // ...
});
```

**Problems:**
- Boilerplate code in every test
- Easy to forget to create instances
- No standardized setup

### With Fixtures
```javascript
import { test } from '../fixtures';

test('add to cart', async ({ catalogPage, cartPage }) => {
  // Page objects injected automatically
  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(0);
  // ...
});
```

**Benefits:**
- Clean, focused tests
- Automatic dependency injection
- Consistent setup across all tests
- Less code, fewer errors

---

## How Our Fixtures Work

### Implementation

```javascript
// tests/fixtures/index.js
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { InventoryPage } from '../pages/InventoryPage';
import { CatalogPage } from '../pages/CatalogPage';
import { CartPage } from '../pages/CartPage';
import { OrdersPage } from '../pages/OrdersPage';
import { PaymentPage } from '../pages/PaymentPage';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },
});

export { expect } from '@playwright/test';
```

### How It Works

1. **`test.extend()`** - Creates a custom test function with additional fixtures
2. **`async ({ page }, use)`** - Receives the built-in `page` fixture
3. **`await use(new PageObject(page))`** - Provides the page object to the test

---

## Fixture Lifecycle

```
┌─────────────────────────────────────┐
│  Test Starts                        │
├─────────────────────────────────────┤
│  1. Playwright creates `page`       │
│  2. Our fixtures create page objects│
│  3. Test runs with injected objects │
│  4. Test completes                  │
│  5. Playwright closes `page`        │
└─────────────────────────────────────┘
```

Each test gets:
- A fresh browser page
- Fresh page object instances
- Complete isolation from other tests

---

## Usage Patterns

### Using Multiple Fixtures
```javascript
test('complete purchase flow', async ({
  catalogPage,
  cartPage,
  paymentPage,
  ordersPage
}) => {
  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(0);
  await cartPage.navigateToCart();
  await cartPage.clickGoToPayment();
  await paymentPage.selectPaymentMethod('PayPal');
  await paymentPage.confirmPayment();
  await ordersPage.navigateToOrders();
  // assertions...
});
```

### Selective Fixture Usage
Only request what you need:
```javascript
// Only needs homePage
test('home page loads', async ({ homePage }) => {
  await homePage.navigateToHome();
  expect(await homePage.isLoaded()).toBe(true);
});
```

---

## Benefits Summary

| Benefit | Description |
|---------|-------------|
| **DRY** | No repeated setup code |
| **Type Safety** | IDE autocomplete works |
| **Isolation** | Each test gets fresh instances |
| **Flexibility** | Request only what you need |
| **Maintainability** | Change setup in one place |
| **Readability** | Clear dependency declaration |

---

## Comparison With Other Approaches

### 1. Global Setup (Avoid)
```javascript
let catalogPage;
beforeEach(({ page }) => {
  catalogPage = new CatalogPage(page);
});
```
**Problem**: Shared state, potential test pollution

### 2. Test Hooks
```javascript
test.beforeEach(async ({ page }) => {
  // Setup
});
```
**Problem**: Can't easily share between tests

### 3. **Fixtures (Recommended)**
- Automatic lifecycle management
- Dependency injection
- Scoped to each test
- Playwright best practice
