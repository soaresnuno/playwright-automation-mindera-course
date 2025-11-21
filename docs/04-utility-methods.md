# Utility Methods & Mock Data

## BasePage Utility Methods

### Why Centralize Utilities?

Common operations appear across all page objects. Centralizing them in `BasePage`:
- Eliminates code duplication
- Ensures consistent behavior
- Makes maintenance easier
- Provides a single point of change

---

## Key Utility Methods

### 1. Dynamic Item Locators

```javascript
// BasePage.js
getItemLocator(prefix, property, index) {
  return this.page.locator(
    `[data-testid="${prefix}-item-${property}-${index}"]`
  );
}

async getItemText(prefix, property, index) {
  return await this.getItemLocator(prefix, property, index).textContent();
}

async isItemVisible(prefix, property, index) {
  return await this.getItemLocator(prefix, property, index).isVisible();
}
```

### Why This Pattern?

**Problem**: Our app has a consistent naming convention for elements:
```
data-testid="catalog-item-name-0"
data-testid="catalog-item-price-0"
data-testid="cart-item-name-1"
data-testid="cart-item-price-1"
```

**Solution**: One method handles all variations:
```javascript
// Instead of repeating selectors
await this.page.locator('[data-testid="catalog-item-name-0"]').textContent();
await this.page.locator('[data-testid="catalog-item-price-0"]').textContent();
await this.page.locator('[data-testid="cart-item-name-1"]').textContent();

// Use the utility
await this.getItemText('catalog', 'name', 0);
await this.getItemText('catalog', 'price', 0);
await this.getItemText('cart', 'name', 1);
```

---

### 2. Navigation Helpers

```javascript
// BasePage.js
async clickTab(tabName) {
  await this.page.click(`[data-testid="store-tab-${tabName}"]`);
}

async isTabActive(tabName) {
  const tab = this.page.locator(`[data-testid="store-tab-${tabName}"]`);
  return await tab.getAttribute('class').then(
    classes => classes.includes('active')
  );
}
```

### Usage in Page Objects
```javascript
// CatalogPage.js
async navigateToCatalog() {
  await this.clickTab('catalog');  // Inherited from BasePage
}
```

---

### 3. Wait Strategies

```javascript
// BasePage.js
async waitForPageLoad() {
  await this.page.waitForLoadState('domcontentloaded');
}

async waitForNetworkIdle() {
  await this.page.waitForLoadState('networkidle');
}
```

### Why Explicit Waits?

- **Reliability**: Ensures page is ready before interactions
- **Flaky Test Prevention**: Network calls complete before assertions
- **Explicit Intent**: Clear what the test is waiting for

---

## Mock Data Strategy

### Why Mock Data?

| Challenge | Solution |
|-----------|----------|
| Inconsistent test data | Predefined mock objects |
| Hardcoded magic values | Named constants |
| Test maintenance | Single source of truth |
| Data visibility | Clear, documented data |

---

### Mock Data Files

#### catalog.js
```javascript
export const MOCK_CATALOG = {
  lightsaber: { name: 'Lightsaber', price: 199.99, quantity: 5, inStock: true },
  rubberDuck: { name: 'Giant Rubber Duck', price: 49.99, quantity: 10, inStock: true },
  // ... 6 more products
};
```

#### inventory.js
```javascript
export const MOCK_INVENTORY = {
  lightsaber: { name: 'Lightsaber', price: 199.99, quantity: 5 },
  // ... mirrors catalog data
};
```

#### payments.js
```javascript
export const PAYMENT_METHODS = [
  'MBWay',
  'Klarna',
  'Multibanco',
  'PayPal',
  'Visa'
];
```

---

### Using Mock Data in Tests

```javascript
import { MOCK_CATALOG, PAYMENT_METHODS } from '../mocks';

test('product displays correct price', async ({ catalogPage }) => {
  await catalogPage.navigateToCatalog();

  const price = await catalogPage.getProductPrice(0);
  expect(price).toContain(MOCK_CATALOG.lightsaber.price.toString());
});

test('all payment methods available', async ({ paymentPage }) => {
  for (const method of PAYMENT_METHODS) {
    expect(await paymentPage.isPaymentMethodVisible(method)).toBe(true);
  }
});
```

---

### Benefits of Mock Data

1. **Single Source of Truth**
   - Change data once, updates everywhere
   - No hunting for magic numbers

2. **Semantic Meaning**
   - `MOCK_CATALOG.lightsaber.price` vs `199.99`
   - Self-documenting tests

3. **Consistency**
   - Same data across all test files
   - Matches expected app state

4. **Maintainability**
   - App data changes? Update one file
   - Easy to add new test products

---

## Helper Functions in Tests

### Example: Purchase Flow Helper

```javascript
// orders.spec.js
async function addToCartAndGoToPayment(catalogPage, cartPage, productIndex = 0) {
  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(productIndex);
  await cartPage.navigateToCart();
  await cartPage.clickGoToPayment();
}
```

### Why This Helper?

**Problem**: Multiple tests need the same setup
```javascript
// Repeated in every test
await catalogPage.navigateToCatalog();
await catalogPage.clickAddToCart(0);
await cartPage.navigateToCart();
await cartPage.clickGoToPayment();
```

**Solution**: Extract to helper function
```javascript
test('can complete payment with PayPal', async ({
  catalogPage, cartPage, paymentPage
}) => {
  await addToCartAndGoToPayment(catalogPage, cartPage);
  await paymentPage.selectPaymentMethod('PayPal');
  await paymentPage.confirmPayment();
  // assertions...
});
```

### When to Create Helpers

- **3+ repetitions** of same code
- **Multi-step setup** that isn't the focus of test
- **Complex workflows** that should be named

---

## Summary

| Utility Type | Purpose | Location |
|--------------|---------|----------|
| Item Locators | Dynamic element access | `BasePage.js` |
| Navigation | Tab switching | `BasePage.js` |
| Wait Strategies | Timing reliability | `BasePage.js` |
| Mock Data | Test data consistency | `mocks/*.js` |
| Helper Functions | Workflow abstraction | Test files |
