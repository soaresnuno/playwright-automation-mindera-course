import { test, expect } from '../fixtures/index.js';
import { MOCK_HOME as MOCK_DATA } from '../mocks/index.js';

test.describe('Home Page - Store Instructions', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateToHome();
  });

  test.describe('Page Load and Structure', () => {
    test('should load the instructions page', async ({ homePage }) => {
      expect(await homePage.isLoaded()).toBe(true);
    });

    test('should display the correct title', async ({ homePage }) => {
      const title = await homePage.getTitle();
      expect(title).toBe('Instructions');
    });

    test('should display the description text', async ({ homePage }) => {
      const description = await homePage.getDescription();
      expect(description).toContain(MOCK_DATA.pageDescription);
    });

    test('should display correct number of instruction sections', async ({ homePage }) => {
      const count = await homePage.getInstructionSectionsCount();
      expect(count).toBe(MOCK_DATA.sections.length);
    });
  });

  test.describe('Tab Navigation', () => {
    test('should display all tabs', async ({ homePage }) => {
      for (const tab of MOCK_DATA.tabs) {
        await expect(homePage.tabs[tab.key]).toBeVisible();
      }
    });

    test('should have Home tab active by default', async ({ homePage }) => {
      const isActive = await homePage.isTabActive('home');
      expect(isActive).toBe(true);
    });

    test('should display correct tab labels', async ({ homePage }) => {
      for (const tab of MOCK_DATA.tabs) {
        await expect(homePage.tabs[tab.key]).toHaveText(tab.label);
      }
    });

    for (const tab of MOCK_DATA.tabs.filter(t => t.key !== 'home')) {
      test(`should switch to ${tab.label} tab when clicked`, async ({ homePage }) => {
        await homePage.clickTab(tab.key);
        const isActive = await homePage.isTabActive(tab.key);
        expect(isActive).toBe(true);
      });
    }
  });

  test.describe('Instruction Sections', () => {
    for (const section of MOCK_DATA.sections) {
      test(`should display ${section.title} section`, async ({ homePage }) => {
        expect(await homePage.isSectionVisible(section.key)).toBe(true);
      });

      test(`should display correct ${section.title} title`, async ({ homePage }) => {
        const title = await homePage.getSectionTitle(section.key);
        expect(title).toBe(section.title);
      });

      test(`should display ${section.title} description text`, async ({ homePage }) => {
        const text = await homePage.getSectionText(section.key);
        expect(text).toBe(section.description);
      });

      test(`should display ${section.title} icon`, async ({ homePage, page }) => {
        const icon = page.locator(`[data-testid="instructions-icon-${section.key}"]`);
        await expect(icon).toBeVisible();
      });
    }

    test('should return all section titles in order', async ({ homePage }) => {
      const expectedTitles = MOCK_DATA.sections.map(s => s.title);
      const titles = await homePage.getAllSectionTitles();
      expect(titles).toEqual(expectedTitles);
    });
  });
});
