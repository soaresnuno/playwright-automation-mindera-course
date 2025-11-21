# Page Object Model (POM)

## Why POM?

### Problems Without POM
```javascript
// Bad: Selectors scattered throughout tests
test('add item to cart', async ({ page }) => {
  await page.click('[data-testid="store-tab-catalog"]');
  await page.click('[data-testid="catalog-item-add-0"]');
  await page.click('[data-testid="store-tab-cart"]');
  const count = await page.locator('[data-testid="cart-item-name-0"]').count();
  expect(count).toBe(1);
});
```

**Issues:**
- Duplicated selectors across tests
- UI changes break multiple tests
- Tests are hard to read
- No encapsulation of page behavior

### Solution With POM
```javascript
// Good: Clean, maintainable tests
test('add item to cart', async ({ catalogPage, cartPage }) => {
  await catalogPage.navigateToCatalog();
  await catalogPage.clickAddToCart(0);
  await cartPage.navigateToCart();
  expect(await cartPage.getItemCount()).toBe(1);
});
```

**Benefits:**
- Single source of truth for selectors
- UI changes only affect page objects
- Tests are readable as business specs
- Page behavior is encapsulated

---

## BasePage Pattern

### Purpose
The `BasePage` class provides common functionality that all pages need, avoiding code duplication.

### Key Methods

| Method | Purpose |
|--------|---------|
| `goto()` | Navigate to base URL |
| `waitForPageLoad()` | Wait for DOM ready |
| `waitForNetworkIdle()` | Wait for API calls |
| `clickTab(tabName)` | Tab navigation |
| `getItemLocator(prefix, property, index)` | Dynamic element location |

### Why Inheritance?

```javascript
class CatalogPage extends BasePage {
  constructor(page) {
    super(page);
    // CatalogPage gets all BasePage methods automatically
  }
}
```

**Benefits:**
- DRY (Don't Repeat Yourself)
- Consistent API across pages
- Easy to add common functionality
- Polymorphism support

---

## Selector Strategy

### Data-TestID Convention
```javascript
// Pattern: data-testid="{prefix}-item-{property}-{index}"
'[data-testid="catalog-item-name-0"]'
'[data-testid="cart-item-price-1"]'
```

### Why Data-TestID?

| Approach | Pros | Cons |
|----------|------|------|
| CSS Classes | Fast | Break with styling changes |
| XPath | Powerful | Brittle, hard to read |
| Text Content | Human readable | Breaks with i18n |
| **Data-TestID** | **Stable, intentional** | **Requires dev cooperation** |

**Data-TestID is best because:**
- Clearly marks elements for testing
- Won't change with styling updates
- Semantic meaning in the ID
- Industry best practice

---

## Page Object Structure

### Anatomy of a Page Object

```javascript
class CatalogPage extends BasePage {
  // 1. Constructor - initialize page
  constructor(page) {
    super(page);
  }

  // 2. Navigation - how to get to this page
  async navigateToCatalog() {
    await this.clickTab('catalog');
  }

  // 3. State checks - is the page ready?
  async isLoaded() {
    return await this.page.locator('[data-testid="catalog-page"]').isVisible();
  }

  // 4. Getters - read data from page
  async getProductName(index) {
    return await this.getItemText('catalog', 'name', index);
  }

  // 5. Actions - interact with page
  async clickAddToCart(index) {
    await this.page.click(`[data-testid="catalog-item-add-${index}"]`);
  }
}
```

### Method Naming Conventions

| Prefix | Purpose | Returns |
|--------|---------|---------|
| `navigate*` | Go to page/section | void |
| `is*` | Check state | boolean |
| `get*` | Retrieve data | string/number |
| `click*` | User action | void |
| `all*` | Multiple items | array |

---

## Real Example: CartPage

```javascript
class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  // Navigation
  async navigateToCart() {
    await this.clickTab('cart');
  }

  // State
  async isEmpty() {
    return await this.page.locator('[data-testid="empty-cart"]').isVisible();
  }

  // Getters
  async getItemCount() {
    return await this.page.locator('[data-testid^="cart-item-name-"]').count();
  }

  async getItemName(index) {
    return await this.getItemText('cart', 'name', index);
  }

  async getCartTotal() {
    return await this.page.locator('[data-testid="cart-total"]').textContent();
  }

  // Actions
  async clickGoToPayment() {
    await this.page.click('[data-testid="go-to-payment"]');
  }
}
```

---

## Best Practices

### 1. Keep Page Objects Focused
Each page object should represent one page or component.

### 2. Return Data, Not Elements
```javascript
// Good
async getProductName(index) {
  return await this.getItemText('catalog', 'name', index);
}

// Avoid returning locators to tests
```

### 3. Hide Implementation Details
Tests shouldn't know about selectors or waiting strategies.

### 4. Use Meaningful Method Names
Method names should describe business actions, not technical operations.
