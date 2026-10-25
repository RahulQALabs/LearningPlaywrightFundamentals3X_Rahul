import { test, expect } from "@playwright/test";

test('Verify hover menu widget and submenu selection', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/hover-menu");

    // ---- Start your code here ----
    await page.getByTestId('nav-add-ons').hover();
    await page.getByTestId('test-id-Wifi').click();

    await page.pause();
});
