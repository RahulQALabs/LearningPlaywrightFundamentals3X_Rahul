import { test, expect } from "@playwright/test";

test('Verify SelectorsHub Frame', async ({ page }) => {

    await page.goto("https://selectorshub.com/iframe-scenario/");
    // ---- Start your code here ----

    await page.pause();
});
