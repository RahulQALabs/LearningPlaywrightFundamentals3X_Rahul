import { test, expect } from "@playwright/test";

test.describe('SVG Handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://simplemaps.com/svg/country/in");
    });

    test('Verify Indian state click on SVG map using all paths', async ({ page }) => {

        // ---- Start your code here ----
        const states = await page
            .locator("path")
            .all();

        for (const state of states) {
            const s = await state.getAttribute('class');
            console.log(s);

            if (s?.includes('INUP')) {
                state.click();
                console.log("Clicked on the UP");
            }
        }

        await page.pause();
    });
});
