import { test, expect } from '@playwright/test';
import { HomePage } from '../page/home.page';


test.describe.parallel('TechMagic web site', () => {
  
  test('has title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.verifyTitle('JavaScript Development Company - TechMagic');
  });
  
  test('get started link', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickGetStarted();
    await homePage.verifyUrl('https://www.techmagic.co/#section-message');
  });

  test('verify UI', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await expect(page).toHaveScreenshot('home.png', {
      threshold: 0.3,
    });
  });
  
});

