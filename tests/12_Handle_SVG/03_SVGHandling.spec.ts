import { test, expect } from "@playwright/test";

test.describe('SVG Handling', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://simplemaps.com/svg/country/in");
    });

    test('Verify Indian state click on SVG map using XPath filter', async ({ page }) => {

        // ---- Start your code here ----
        const states = await page
            .locator("//div[@id='admin1_map_holder']//*[name()='svg']/*[name()='path' and contains(@class,'sm_state')]")
            .all();

        for (const state of states) {
            const s = await state.getAttribute('class');
            console.log(s);

            if (s?.includes('INUP')) {
                state.click();
            }
        }

        await page.pause();
    });
});
