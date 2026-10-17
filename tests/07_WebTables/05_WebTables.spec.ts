import { test, expect } from "@playwright/test";

test('Verify Web Tables Part 5', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/webtable");

    // ---- Normal xpath with Click method ----
    // const a = await page.locator("//td[text()='Rohan.Mehta']/preceding-sibling::td/input");
    // await a.click();

    //-------------- Pseudo Selector ------------------------
    const b = await page.locator("tr:has(td:text('Rohan.Mehta'))")
    .locator('input')
    .first()
    .click();

    await page.waitForTimeout(5000);
    //await page.pause();
});
