import { test, expect } from '@playwright/test';

const URL = "https://app.thetestingacademy.com/playwright/multiple_element_filter";

test('title test', async ({ page, browserName }) => {
   test.skip(browserName === 'firefox', 'Feature not yet supported on Firefox');
   await page.goto(URL);
   await expect(page).toHaveTitle(/Multiple Element Filter/, { timeout: 1500 });
});

test('email is visible (slow on firefox)', async ({ page, browserName }) => {
   test.slow(browserName === 'firefox', 'Firefox is slow on this layout');
   await page.goto(URL);
   await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
});

test.fixme('Password is visible - broken in safari, fix me', async ({ page }) => {
   await page.goto(URL);
   await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});

test('Expected to fail until the backend ships', async ({ page }) => {
   test.fail();
   await page.goto(URL);
   await expect(page.getByText('New Customer Area', { exact: true })).toBeVisible();
});