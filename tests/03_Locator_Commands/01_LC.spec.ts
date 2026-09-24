import { test, expect } from '@playwright/test';

test("Verify X", async ({ page }) => {
    await page.goto(
        "https://app.thetestingacademy.com/playwright/multiple_element_filter"         //goto command returns a Promise as Respnse or Null. goto command url is mandatory
        , { waitUntil: 'commit' }                                                      //Referer - is prevoius site
    );

    const response = await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter", {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
        referer: 'https://thetestingacademy.com'
    });
});