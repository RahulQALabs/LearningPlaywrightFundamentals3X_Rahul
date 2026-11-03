import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page");
   });

   test('Visible - Enable - Disable - Checked', async ({ page }) => {
      const automationCheckbox = page.getByRole('checkbox', { name: /UFT/ });
      await automationCheckbox.check();
      await expect(automationCheckbox).not.toBeChecked();


      const submitBt = page.getByTestId('profile-submit');
      await expect(submitBt).toBeVisible();
      await expect(submitBt).toBeEnabled();

      await expect(page).toHaveTitle(/QA Profile/);

      const appUrl = page.url();
      expect(appUrl).toContain('thetestingacademy');

   });
});
