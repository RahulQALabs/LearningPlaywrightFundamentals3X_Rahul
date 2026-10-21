import { test, expect } from "@playwright/test";

test('Verify Custom dropdown', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");

    // ---- Start your code here ----
    await page.getByTestId('lang-trigger').click();
    await page.getByRole('option', { name: 'Java', exact: true }).click();


    await page.getByTestId('framework-trigger').click();
    await page.getByRole('option', { name: 'Angular', exact: true }).click();

    await page.getByTestId('experience-trigger').click();
    await page.getByText('Senior (7+ years)', { exact: true }).click();

    await page.pause();
});
