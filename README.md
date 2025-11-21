# Final Project E2E – Test Automation with Playwright

End-to-end test suite for the Store application using Playwright.
This project was developed as the final assignment for the **"Test Automation - WarmUp with Playwright"** course at **Mindera Code Academy**.

## Documentation

Detailed documentation explaining the architectural choices is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [01-architecture-overview.md](docs/01-architecture-overview.md) | Project structure and design principles |
| [02-page-object-model.md](docs/02-page-object-model.md) | POM pattern, BasePage, selector strategy |
| [03-fixtures.md](docs/03-fixtures.md) | Custom fixtures and dependency injection |
| [04-utility-methods.md](docs/04-utility-methods.md) | Utility methods and mock data strategy |
| [05-best-practices.md](docs/05-best-practices.md) | Testing guidelines and configuration |

## Project Structure

```
final_project_tests/
├── playwright.config.js       # Playwright configuration
├── package.json
├── tests/
│   ├── e2e/                   # Test specifications
│   │   ├── home.spec.js       # Home page tests
│   │   ├── inventory.spec.js  # Inventory management tests
│   │   ├── catalog.spec.js    # Product catalog tests
│   │   ├── cart.spec.js       # Shopping cart tests
│   │   └── orders.spec.js     # Orders page tests
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.js        # Base page class
│   │   ├── HomePage.js
│   │   ├── InventoryPage.js
│   │   ├── CatalogPage.js
│   │   ├── CartPage.js
│   │   ├── OrdersPage.js
│   │   └── PaymentPage.js
│   ├── fixtures/              # Test fixtures
│   │   └── index.js           # Custom fixtures setup
│   └── mocks/                 # Mock data
│       ├── index.js
│       ├── catalog.js
│       ├── inventory.js
│       └── payments.js
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed
```

### Run specific test file

```bash
npx playwright test tests/e2e/inventory.spec.js
```

### Run tests on specific browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit
```

### Run tests with debug mode

```bash
npx playwright test --debug
```

## Test Reports

### View HTML report

```bash
npx playwright show-report
```

Reports are generated automatically after test runs with:
- Screenshots on failure
- Video recordings on failure
- Trace files on first retry

### Sample Reports

<p align="center">
  <img src="images/reports.png" alt="Test Report Overview" width="600">
</p>

<p align="center">
  <img src="images/reports1.png" alt="Test Report Details" width="600">
</p>

## Configuration

The test suite is configured in `playwright.config.js`:

- **Base URL**: `https://playground-drab-six.vercel.app/store`
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel execution**: Enabled
- **CI retries**: 2 retries on CI, 0 locally

## Test Categories

| Test File | Description |
|-----------|-------------|
| `home.spec.js` | Home page navigation and layout |
| `inventory.spec.js` | Product inventory management, CRUD operations |
| `catalog.spec.js` | Product catalog browsing |
| `cart.spec.js` | Shopping cart functionality |
| `orders.spec.js` | Order history and management |

## Writing New Tests

Tests use the Page Object Model pattern:

```javascript
import { test, expect } from '../fixtures/index.js';

test.describe('Feature Name', () => {
  test('should do something', async ({ page, inventoryPage }) => {
    await inventoryPage.navigateToInventory();
    expect(await inventoryPage.isLoaded()).toBe(true);
  });
});
```

## Useful Commands

```bash
# Generate new test code with codegen
npx playwright codegen https://playground-drab-six.vercel.app/store

# List all tests without running them
npx playwright test --list

# Run tests with verbose output
npx playwright test --reporter=list

# Update snapshots
npx playwright test --update-snapshots
```

## CI/CD Integration

The test suite is configured for CI environments:
- Single worker on CI for stability
- 2 retries for flaky test handling
- Fails if `test.only` is left in code

```bash
# Run in CI mode
CI=true npx playwright test
```

<p align="center">
  <img src="images/pipeline.png" alt="Github Pipeline" width="600">
</p>

<p align="center">
  <img src="images/pipeline1.png" alt="Github Pipeline" width="600">
</p>