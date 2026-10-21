import { test, expect } from "@playwright/test";

test('Verify Cricket Score', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/tables/scorecard");
    // ---- Start your code here ----

    await page.pause();
});
