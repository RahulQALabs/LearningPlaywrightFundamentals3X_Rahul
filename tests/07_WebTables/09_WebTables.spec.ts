import { test, expect } from "@playwright/test";

test('Return the DSLR camera lists from the flipkart portal', async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    // ---- Start your code here ----
    await page.locator(".b3wTlE").click();

    const search = page.locator("input[title='Search for Products, Brands and More']").first();
    await search.fill("DSLR");
    await search.press('Enter');

    while (true) {
        const allElements = await page.locator(".lvJbLV .ZFwe0M.row .RG5Slk").allInnerTexts();
        for (const element of allElements) {
            console.log(element);
        }

         if (await page.locator("//span[normalize-space()='Next']").isDisabled()) {
        break;
    }
    await page.locator("//span[normalize-space()='Next']").click();
    }

    await page.pause();
});
