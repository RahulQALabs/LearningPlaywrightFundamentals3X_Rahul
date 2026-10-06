import { test, expect } from "@playwright/test";

//Load the saved session

test.use(
    {
        storageState: './user-session.json',
        screenshot: 'on',
        video: 'on',
        trace: 'on'
    });

test('go directly to dashboard - no login - Test1', async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1283765");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - No login needed");
    await page.waitForTimeout(3000);

});

test('go directly to dashboard - no login - Test2', async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1283765");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - No login needed");
    await page.waitForTimeout(3000);

});

test('go directly to dashboard - no login - Test3', async ({ page }) => {
    await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1283765");
    await expect(page).toHaveURL(/dashboard/);
    console.log("Dashboard loaded - No login needed");
    await page.waitForTimeout(3000);

});
