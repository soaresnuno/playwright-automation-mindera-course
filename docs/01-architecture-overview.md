# Test Architecture Overview

## Project Structure

```
tests/
├── e2e/                    # End-to-end test specifications
│   ├── home.spec.js
│   ├── inventory.spec.js
│   ├── catalog.spec.js
│   ├── cart.spec.js
│   └── orders.spec.js
├── pages/                  # Page Object Model classes
│   ├── BasePage.js
│   ├── HomePage.js
│   ├── InventoryPage.js
│   ├── CatalogPage.js
│   ├── CartPage.js
│   ├── PaymentPage.js
│   └── OrdersPage.js
├── fixtures/               # Custom Playwright fixtures
│   └── index.js
└── mocks/                  # Test data
    ├── catalog.js
    ├── inventory.js
    ├── payments.js
    └── index.js
```

## Design Principles

### 1. Separation of Concerns
- **Tests** focus on business logic and assertions
- **Page Objects** encapsulate UI interactions
- **Fixtures** handle dependency injection
- **Mocks** provide consistent test data

### 2. Maintainability
Changes to the UI only require updates in one place (the page object), not across all tests.

### 3. Readability
Tests read like business specifications, not technical implementations.

### 4. Reusability
Common patterns are abstracted into the BasePage class and shared across all page objects.
