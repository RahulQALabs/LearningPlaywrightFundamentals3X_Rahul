import { test, expect } from "@playwright/test";

test.describe('Verify Scrolling on the Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("");
    });

    test('TestCase 01', async ({ page }) => {

        // ---- Start your code here ----

        await page.pause();
    });
});
