import { test, expect } from '@playwright/test';

const URL = "https://app.thetestingacademy.com/playwright/multiple_element_filter";

test('login form is reachable via steps', async ({ page }) => {
   await test.step('open practice page', async () => {
      await page.goto(URL);
   });

   await test.step('fields are visible', async () => {
      await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
   });

   await test.step('submit + assert validation', async () => {
      await page.getByRole('button', { name: /Login/i }).click();
      await expect(page.getByText(/required | invalid/i)).toBeVisible();
   });

});