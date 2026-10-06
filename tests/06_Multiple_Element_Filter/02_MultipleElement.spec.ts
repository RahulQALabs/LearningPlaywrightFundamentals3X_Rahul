import { test, expect, Locator } from "@playwright/test";

test('Verify how to handle the multiple statements', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const rightElementsLink: Locator[] = await page.locator('a.list-group-item').all();

    console.log("Total Elements :", rightElementsLink.length);

    for (const link of rightElementsLink) {
        console.log("List of locators :",link);
        console.log("List of href tag elements : ",await link.getAttribute('href'));
    }

    //await page.pause();
});