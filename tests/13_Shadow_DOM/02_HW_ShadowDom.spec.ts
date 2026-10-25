import { test, expect } from "@playwright/test";

test.describe('Verify Shadow DOM elements handling - Homework', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://selectorshub.com/xpath-practice-page/");
    });

    test('Verify Shadow DOM form fields on SelectorsHub', async ({ page }) => {

        // ---- Start your code here ----
        const shadowdomTest = await page.locator('#userName.jackPart');
        await shadowdomTest.locator('#kils').fill('rahul');
        await shadowdomTest.locator('#pizza').fill('Mc Donald');
        await shadowdomTest.locator('#training').fill('training');
        await shadowdomTest.locator('#pwd').fill('pwd123')

        await page.pause();
    });
});
