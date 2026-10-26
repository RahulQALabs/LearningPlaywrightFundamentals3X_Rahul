import { test, expect } from "@playwright/test";

test.describe('Verify Scrolling on the Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll");
    });

    test('TestCase 01', async ({ page }) => {

        // ---- Start your code here ----

        // //1- Normal Way
        // await page.locator('#deep-anchor').scrollIntoViewIfNeeded();
        // await page.locator('#cta-button').scrollIntoViewIfNeeded();
        // await page.locator('#cta-button').click();

        // expect(page.locator('#output')).toContainText('confirmed');

        // //2 - JS Execute
        // await page.evaluate(() => window.scrollBy(0, 1000));

        //3 - Jump to the bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

        //4 - Jump back to the top
        await page.evaluate(() => window.scrollTo(0, 0));

        await page.pause();
    });
});
