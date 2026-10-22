import { test, expect } from "@playwright/test";

test('Verify Hover Part 3', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu");

    // ---- Start your code here ----
    await page.getByTestId('nav-add-ons').hover();
    await page.getByTestId('test-id-Wifi').click();

    await page.pause();
});
