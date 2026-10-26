import { test, expect } from '@playwright/test';

test('Verify TTA multiple element filter page login', async ({ page }) => {
  await page.goto('https://app.thetestingacademy.com/playwright/multiple_element_filter');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('rahul@thetestingacademy.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByTestId('login-button').click();

  // The page does not navigate on login - success is signalled by #login-success in the URL.
  await expect(page).toHaveURL(/#login-success/);
  await expect(page.getByRole('heading', { name: 'Master multiple element' })).toBeVisible();
});