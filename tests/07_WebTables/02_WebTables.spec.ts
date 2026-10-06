import { test, expect } from "@playwright/test";

test('Verify Web Tables Part 2', async ({ page }) => {

    await page.goto("https://awesomeqa.com/webtable1.html");

    const rows = await page.locator("table[summary='Sample Table'] tbody tr");
    const rowCount = await rows.count();

    for (let index = 0; index < rowCount - 1; index++) {
        // const headers = await rows.nth(1).locator('th').allInnerTexts();
        const colData = await rows.nth(index).locator('td').allInnerTexts();
        // console.log(`Header ${index + 1} :`, headers);
        console.log(`Row ${index + 1}:`, colData);

    }
    //  await page.pause();

});
