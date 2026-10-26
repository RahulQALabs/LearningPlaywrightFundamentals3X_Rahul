import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
   });

   test('Multiple element filters', async ({ page }) => {


      const heading = await page.getByText('multiple element filters');
      expect(heading).toBeVisible();
      expect(heading).toContainText('filters', { timeout: 1000 });


   });

});
