import { test, expect } from "@playwright/test";

test.describe('Verify Scrolling on the Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/widgets/scroll");
    });

    test('Scroll to view', async ({ page }) => {

        await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();
        await page.getByTestId('lazy-list').scrollIntoViewIfNeeded();
        // ---- Start your code here ----

        const list =  page.getByTestId('lazy-list').locator('li');

        //Scroll the last existing item into view,item 11th doestn't exist
        //then nth(10) would just wait until the test timeout
        await list.last().scrollIntoViewIfNeeded();

        //Observer adds only 5 items per intersection, so cross the 200px margin again and again
        await expect.poll(async () => {
            await page.getByTestId('section-lazy').scrollIntoViewIfNeeded();
            const count = await list.count();
            if (count <= 10) {
                await page.evaluate(() => window.scrollBy(0, -1200));
            }
            return count;
        }, {
            message: "expected time > 10",
            timeout: 20_000
        }).toBeGreaterThan(10);

        await expect(list.nth(10)).toContainText('lazy-item-11');

        const finalCount = await list.count();
        console.log(finalCount);

        await page.waitForTimeout(5000);
        //await page.pause();
    });
});
