import { test, expect, Locator } from "@playwright/test";

test.describe('SVG Elements', () => {

    const url = "https://app.thetestingacademy.com/playwright/widgets/svg";

    // ---- Start your code here ----
    test.beforeEach(async ({ page }) => {
        console.log('Launch the url of each test cases');
        await page.goto(url);
    });

    test('Verify SVG elements handling', async ({ page }) => {
        const circleShape: Locator = page.locator('#circle-red');
        await circleShape.click();

        await page.waitForLoadState('networkidle');

        const output = await page.locator("#shapes-output").innerText();
        expect(output).toContain('Red circle');


        await page.pause();
    });

    //
});
