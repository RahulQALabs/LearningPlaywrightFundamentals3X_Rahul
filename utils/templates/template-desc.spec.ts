import { test, expect } from "@playwright/test";

test.describe('{{TITLE}}', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("");
    });

    test('TestCase 01', async ({ page }) => {

        // ---- Start your code here ----

        await page.pause();
    });
});
