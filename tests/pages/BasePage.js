export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/store');
    await this.waitForPageLoad();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // Tab Navigation
  async clickTab(tabName) {
    await this.page.click(`[data-testid="store-tab-${tabName}"]`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isTabActive(tabName) {
    const tab = this.page.locator(`[data-testid="store-tab-${tabName}"]`);
    const classes = await tab.getAttribute('class');
    return classes.includes('bg-gray-100');
  }

  async getActiveTabContent() {
    return this.page.locator('[data-testid="store-active-tab-content"]');
  }

  // Standardized navigation for child pages
  async navigateToTab(tabName, containerLocator) {
    await this.goto();
    await this.clickTab(tabName);
    await containerLocator.waitFor({ state: 'visible' });
  }

  // Reusable item locator methods
  getItemLocator(prefix, property, index) {
    return this.page.locator(`[data-testid="${prefix}-item-${property}-${index}"]`);
  }

  async getItemText(prefix, property, index) {
    return this.getItemLocator(prefix, property, index).textContent();
  }

  async isItemVisible(prefix, property, index) {
    return this.getItemLocator(prefix, property, index).isVisible();
  }
}
