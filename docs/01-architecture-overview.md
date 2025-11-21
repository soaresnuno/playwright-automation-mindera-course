# Test Architecture Overview

## Project Structure

```
final_project_tests/
├── .github/                   # GitHub workflows and CI/CD
├── .gitignore
├── playwright.config.js       # Playwright configuration
├── package.json
├── README.md
├── docs/                      # Project documentation
│   ├── 01-architecture-overview.md
│   ├── 02-page-object-model.md
│   ├── 03-fixtures.md
│   ├── 04-utility-methods.md
│   └── 05-best-practices.md
├── images/                    # Screenshots for documentation
│   ├── debug.png
│   ├── headed.png
│   ├── pipeline.png
│   ├── pipeline1.png
│   ├── reports.png
│   └── reports1.png
└── tests/
    ├── e2e/                   # Test specifications
    │   ├── cart.spec.js       # Shopping cart tests
    │   ├── catalog.spec.js    # Product catalog tests
    │   ├── home.spec.js       # Home page tests
    │   ├── inventory.spec.js  # Inventory management tests
    │   └── orders.spec.js     # Orders page tests
    ├── fixtures/              # Test fixtures
    │   └── index.js           # Custom fixtures setup
    ├── mocks/                 # Mock data
    │   ├── catalog.js
    │   ├── index.js
    │   ├── inventory.js
    │   └── payments.js
    └── pages/                 # Page Object Models
        ├── BasePage.js        # Base page class
        ├── CartPage.js
        ├── CatalogPage.js
        ├── HomePage.js
        ├── InventoryPage.js
        ├── OrdersPage.js
        └── PaymentPage.js
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
