import { test, expect } from "@playwright/test";

test('Verify JS Alerts', async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    // ---- Start your code here ----
    await page.locator('.example ul li button').first().click();

    await page.locator('.example ul li button').nth(1).click();

    await page.locator('.example ul li button').nth(2).click();

    await page.pause();
});
