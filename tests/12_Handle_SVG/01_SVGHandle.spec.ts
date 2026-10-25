import { test, expect, Locator } from "@playwright/test";

test.describe('SVG Elements', () => {

    const url = "https://www.flipkart.com/search";

    // ---- Start your code here ----
    test.beforeEach(async ({ page }) => {
        console.log('Launch the url of each test cases');
        await page.goto(url);
    });

    test('Verify Flipkart search using the SVG element', async ({ page }) => {
        await page.locator("input[name='q']").fill('macmini');
        const svgElement: Locator = page.locator('svg');
        await svgElement.first().click();

        await page.waitForLoadState('networkidle');

        const testResults: Locator = await page.locator("//div[contains(@data-id,'MPC') or contains(@data-id,'COM')  or contains(@data-id,'AIO') or contains(@data-id,'CPU')]/div/a[2]");
        const priceResults: Locator = await page.locator("//div[contains(@data-id,'MPC') or contains(@data-id,'COM')  or contains(@data-id,'AIO') or contains(@data-id,'CPU')]/div/a[3]");

        const countNum: number = await testResults.count();

        for (let index = 0; index < countNum; index++) {
            const itemName: string | null = await testResults.nth(index).textContent();
            const price: string | null = await priceResults.nth(index).textContent();
            console.log(itemName," ============= ",price)

        }


        await page.pause();
    });

    //
});
