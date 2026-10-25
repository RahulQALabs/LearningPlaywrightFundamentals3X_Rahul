import { test, expect } from "@playwright/test";

test('Verify hover on SpiceJet Add-ons menu', async ({ page }) => {

    await page.goto("https://www.spicejet.com/");

    // ---- Start your code here ----
    await page.getByText('Add-ons', { exact: true }).hover();
    await page.getByText('FlyEarly', { exact: true }).click();

    await page.pause();
});
