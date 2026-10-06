import { test, expect, Locator } from "@playwright/test";

test('Verify how to handle the multiple statements', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const rightElementsLink: string[] = await page.locator('a.list-group-item').allTextContents();

    console.log("Total Elements :", rightElementsLink.length);

    for (const link of rightElementsLink) {
        console.log("List of locators :",link);
    }

    //await page.pause();
});