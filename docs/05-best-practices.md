# Best Practices & Guidelines

## Test Organization

### File Naming
```
{feature}.spec.js
```
- One spec file per feature/page
- Clear, descriptive names

### Test Structure
```javascript
test.describe('Feature Name', () => {
  test.describe('Sub-feature', () => {
    test('specific behavior', async ({ fixtures }) => {
      // Arrange - Setup
      // Act - Perform action
      // Assert - Verify result
    });
  });
});
```

---

## AAA Pattern

Every test follows **Arrange-Act-Assert**:

```javascript
test('can add product to cart', async ({ catalogPage, cartPage }) => {
  // Arrange - Navigate to starting point
  await catalogPage.navigateToCatalog();

  // Act - Perform the action being tested
  await catalogPage.clickAddToCart(0);

  // Assert - Verify the expected outcome
  await cartPage.navigateToCart();
  expect(await cartPage.getItemCount()).toBe(1);
});
```

---

## Selector Best Practices

### Do
- Use `data-testid` attributes
- Follow consistent naming patterns
- Make selectors semantic

### Don't
- Use fragile CSS classes
- Rely on text content (i18n issues)
- Use complex XPath expressions

---

## Test Independence

### Each Test Must
- Run independently
- Not depend on other tests
- Not leave state for other tests

### Why?
- Tests can run in parallel
- Failed tests don't cascade
- Easier debugging

---

## Assertions

### Be Specific
```javascript
// Good - specific assertion
expect(await cartPage.getItemName(0)).toBe('Lightsaber');

// Avoid - vague assertion
expect(await cartPage.getItemCount()).toBeGreaterThan(0);
```

### Test One Thing
Each test should verify one specific behavior.

---

## Error Handling

### In Page Objects
```javascript
async getProductName(index) {
  const locator = this.getItemLocator('catalog', 'name', index);
  // Playwright will throw if element not found
  return await locator.textContent();
}
```

Let Playwright handle timeouts and element not found errors - they provide better error messages.

---

## Configuration Highlights

```javascript
// playwright.config.js
{
  baseURL: 'https://playground-drab-six.vercel.app/store',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry'
}
```

### Why These Settings?
- **Screenshots/Videos on failure**: Debug failed tests
- **Trace on retry**: Deep debugging for flaky tests
- **Base URL**: DRY navigation code
