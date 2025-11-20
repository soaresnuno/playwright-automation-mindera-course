import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.container = page.locator('[data-testid="instructions-page"]');
    this.title = page.locator('[data-testid="instructions-title"]');
    this.description = page.locator('[data-testid="instructions-description"]');
    this.instructionsList = page.locator('[data-testid="instructions-list"]');

    // Tab selectors
    this.tabs = {
      home: page.locator('[data-testid="store-tab-home"]'),
      inventory: page.locator('[data-testid="store-tab-inventory"]'),
      catalog: page.locator('[data-testid="store-tab-catalog"]'),
      cart: page.locator('[data-testid="store-tab-cart"]'),
      payments: page.locator('[data-testid="store-tab-payments"]'),
      orders: page.locator('[data-testid="store-tab-orders"]'),
    };

    // Instruction sections
    this.sections = {
      inventory: page.locator('[data-testid="instructions-section-inventory"]'),
      catalog: page.locator('[data-testid="instructions-section-catalog"]'),
      cart: page.locator('[data-testid="instructions-section-cart"]'),
      payment: page.locator('[data-testid="instructions-section-payment"]'),
      orders: page.locator('[data-testid="instructions-section-orders"]'),
    };
  }

  async navigateToHome() {
    await this.goto();
    // Home tab is active by default, no need to click it
  }

  async isLoaded() {
    await this.container.waitFor({ state: 'visible' });
    return true;
  }

  async getTitle() {
    return this.title.textContent();
  }

  async getDescription() {
    return this.description.textContent();
  }

  async getInstructionSectionsCount() {
    return this.instructionsList.locator('> div').count();
  }

  async isSectionVisible(sectionName) {
    return this.sections[sectionName].isVisible();
  }

  async getSectionTitle(sectionName) {
    return this.page.locator(`[data-testid="instructions-${sectionName}-title"]`).textContent();
  }

  async getSectionText(sectionName) {
    return this.page.locator(`[data-testid="instructions-${sectionName}-text"]`).textContent();
  }

  async getAllSectionTitles() {
    const sectionNames = ['inventory', 'catalog', 'cart', 'payment', 'orders'];
    const titles = [];
    for (const section of sectionNames) {
      const title = await this.getSectionTitle(section);
      titles.push(title);
    }
    return titles;
  }
}
