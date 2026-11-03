import { test, expect } from '@playwright/test';

test.describe('Scroll to Element - TestingAcademy', () => {

   test.beforeEach(async ({ page }) => {
      await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
   });

   test('Expect', async ({ page }) => {
      let firstName = await page.getByTestId('first-name');

      //Soft: Each records it's own failure.Test continue either way
      await expect.soft(firstName).toHaveAttribute('id', 'first-name');
      await expect.soft(firstName).toBeVisible();
      await expect.soft(firstName).toHaveValue('');

      //Hard: Final hard assertion still runs after the soft block.
      await expect(firstName).toBeEnabled();
      //This line will be not executed if the above line fails
      await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable.html');
      await expect(page.locator('#error')).not.toBeVisible();

      let title = await page.title();
      expect(title).not.toContain('error');

   });
});
