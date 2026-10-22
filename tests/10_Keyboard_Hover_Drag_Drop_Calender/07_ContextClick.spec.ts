import { test, expect } from "@playwright/test";

test('Verify Context Click', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/widgets/context-menu");

    // ---- Start your code here ----
    await page.locator('span.context-menu-one').first().click({ button: 'right' });

    const listElements: string[] = await page.locator('#ctx-menu span').allInnerTexts();
    console.log(listElements);

    await page.pause();
});
