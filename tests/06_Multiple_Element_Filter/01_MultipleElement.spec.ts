import { test, expect } from "@playwright/test";

test('Verify how to handle the multiple statements', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    const rightElementsLink: string[] = await page.locator('a.list-group-item').allInnerTexts();

    console.log("Total Elements :", rightElementsLink.length);

    for (const link of rightElementsLink) {
        console.log(link);
    }

    for (const link of rightElementsLink) {
        if (link === "Forgotten Password") {
            await page.getByText(link).first().click();
        }
    }


    const rightElementsLinks = await page.locator('a.list-group-item').all();
    console.log("========== Elements list which having 'href'");
    for (const link of rightElementsLinks) {
        console.log(await link.getAttribute("href"));
    }

    await page.pause();
});